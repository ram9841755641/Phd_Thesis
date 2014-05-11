var _gaq = _gaq || [];

var gadgetAnalytics = (function () {
	var my = {}; // will hold the public methods and properties
	var _debug = false;
	var _gadgetName;
	var _contextInfo;
	var _path;
	var useDevelopment = false;

	my.showDebugInfo = function() {
		_debug = true;
	};

	// simple firebug log function, shows up 
 	var log = my.log = function (s, title) {
		if (!_debug) {
			return;
		}
		try {
			window.loadFirebugConsole();
		} catch(e) {
		 	// do nothing
		}
		if (window.console && window.console.dir) {
			if (typeof(s) === 'object') {
				if (title) {
					console.log(title);
				}
				console.dir(s);
			} else {
				if (title) {
					s = title + ": " + s;
				}
				console.log(s);
			}
		} else {
			var output = document.getElementsByTagName('body')[0]; 
			if (typeof(s) === 'object') {
				if(s.toSource) {
					if (title) {
						var logTitle = document.createElement("strong");
						logTitle.innerHTML = title + ':<br/>';
						output.appendChild(logTitle);
					}
					var logLine = document.createElement("div");
					logLine.innerHTML = s.toSource() + '<br/>';
					output.appendChild(logLine);
				}
			} else {
				if (title) {
					s = '<strong>' + title + ':</strong> ' + s;
				}
				var logLine = document.createElement("div");
				logLine.innerHTML = s;
				output.appendChild(logLine);
			}
		}
	};

	// possibility to set gadgetname, is called automatically by trackPageview, but if there are events or other tracks before that happens, it needs to be set as soon as possible
	var setGadgetName = my.setGadgetName = function (gadgetName) {
		_gadgetName = gadgetName;
	};

	my.setContextInfo = function (contextInfo) {
		_contextInfo = contextInfo;
	};

	var analyticsKey = {
			production: 'UA-24097162-1', 
			development: 'UA-18766548-1'
	};

	my.useDevelopmentAccount = function() {
		useDevelopment = true;
		log('GA using development account');
	};


	var insertGoogleAnalyticScript = function () {
		var accountId = analyticsKey.production;
		if (useDevelopment) {
			accountId = analyticsKey.development;
		}
		/* insert google standard code, except page tracking */
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

		_gaq.push(['_setAccount', accountId]);
	};

	// private function that makes a virtual path of the context info plus gadget name
	var getVirtualUrl = function(gadgetName, contextInfo) {
		var path;

		gadgetName = gadgetName.replace(/ /g,"_"); // replace all spaces with underscores, makes better paths

		var pageType = contextInfo.pageType.toLowerCase(); // hub and sciencedir uses a different name for search results page type with capital L

		path = '/' + contextInfo.platform + '/' + pageType + '/' + gadgetName;

		if (pageType == 'resultslist' ) {
			path += '?platform=' + contextInfo.platform + '&searchTerms=' + contextInfo.searchTerms;
		}

		if ( contextInfo.platform == 'SD' && pageType == 'article' ) {
			path += '/' + contextInfo.pii;
		}

		if ( contextInfo.platform == 'SC' && pageType == 'recordpage' ) {
			var scopusId = contextInfo.scDocId || contextInfo.SCOPUSID;
			path += '/' + scopusId;
		}

		if (contextInfo.platform == 'SC' && pageType == 'authorprofile') {
			path += '/' + contextInfo.auId;
		}

		return path;
	}

	my.trackFacebookLike = function(url) {
		trackSocial('Facebook', 'Like', url);
	};

	my.trackTwitterTweet = function(url) {
		trackSocial('Twitter', 'Tweet', url);
	};

	my.trackCiteulike = function(url) {
		trackSocial('Citeulike', 'Post article', url);
	};

	var trackSocial = my.trackSocial = function(network, socialAction, url) {
		_gaq.push(['_trackSocial', network, socialAction, url, _path]);
		log('network=' + network + ', socialAction=' + socialAction + ', url=' + url, 'trackSocial');
		//for easy reporting, create an event too
		trackEvent(network + ' - ' + socialAction, url);
	};

	my.trackExternalLink = function(href) {
		trackEvent('External link', href);
	};

	my.trackInternalLink = function(href) {
		trackEvent('Internal link', href);
	};

	my.trackNamedLink = function(name) {
		trackEvent('Named link', name);
	};

	var trackEvent = my.trackEvent = function (action, opt_label, opt_value) {
		var category = _gadgetName;
		_gaq.push(['_trackEvent', category, action, opt_label, opt_value]);
		log('action=' + action + ', label=' + opt_label + ', value=' + opt_value, 'trackEvent');
		if (opt_value && isNaN(opt_value)) {
			log('opt_value needs to be a number', 'warning');
		}
	};

	var setAnalyticVariables = function(gadgetName, contextInfo) {
		gadgetName = gadgetName.replace(/ /g,"_"); // spaces came from some browsers as %20
		_gaq.push(['_setCustomVar',
			1,							// This custom var is set to slot #1.
			'Account Id',
			contextInfo.accountId,
			3							// Sets the scope to page-level.  Optional parameter.
		]);
		_gaq.push(['_setCustomVar',
			2,
			'Gadget',
			gadgetName,
			3
		]);
		_gaq.push(['_setCustomVar',
			3,
			'ISSN',
			contextInfo.issn,
			3
		]);
		_gaq.push(['_setCustomVar',
			4,
			'Platform',
			contextInfo.platform,
			4
		]);
		log(contextInfo.accountId, 'GA Account id (1)');
		log(gadgetName, 'GA Gadget (2)');
		log(contextInfo.issn, 'GA ISSN (3)');
	};

	my.trackPageview = function (gadgetName, contextInfo) {
		contextInfo = contextInfo || _contextInfo; // if not supplied, get the private one that has been set before
		if (gadgetName) {
			setGadgetName(gadgetName); // store gadget name for later use
		} else {
			if (_gadgetName) {
				gadgetName = _gadgetName;
			} else {
				log('gadget name has not been set, use setGadgetName before calling trackPageview', 'warning');
				return;
			}
		}
		_path = getVirtualUrl(gadgetName, contextInfo);
		setAnalyticVariables(gadgetName, contextInfo);
		_gaq.push(['_trackPageview', _path]);
		log(_path, 'trackPageview');
	};

	insertGoogleAnalyticScript();

	// my.xxx are public functions
	return my;

}());