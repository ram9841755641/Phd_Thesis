
/*
 * Copyright (c) 2011 RealTidbits <support@realtidbits.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 */

if (!window.RealTidbits) window.RealTidbits = {};
if (!RealTidbits.Analytics) RealTidbits.Analytics = {};

(function($) {

var plugin = Echo.createPlugin({
    // this is the name of the plugin
    "name": "RTBAnalytics",
    // plugin is written for
    "applications": ["Submit", "Stream"],
    // it uses User List application inside
    "dependencies": [],
    "init": function(plugin, application) {	
		//plugin.application = application;	
		//plugin.appkey = application.config.data.appkey;
		//var tmp = plugin.application.config.get(plugin.config("defaultAvatar"));
		/*application.config.set("parent", new RealTidbits.Analytics({
			"appkey": application.config.data.appkey,
			"product": plugin.config.get(application, "product")
		}));
		*/
		//
		plugin.extendRenderer("Submit", "auth", plugin.renderers_submit_auth);
		// subscribe to events
		plugin.listenEvents(plugin, application);
    }
});

plugin.renderers_submit_auth = function(element, dom) {
	var application = this;
	// call parent renderer
	this.parentRenderer("auth", arguments);
	$(element).find(".echo-auth-login").click(function() {
		plugin.track("Login", application);
	});
};

plugin.listenEvents = function(plugin, application) {
	//
	if (application instanceof Echo.Submit) {
		application.subscribe("Submit.onPostComplete", function(topic, data) {
			// posts
			plugin.track("Post", application);
		});
	};
	if (application instanceof Echo.Stream) {
		application.subscribe("Submit.onPostComplete", function(topic, data) {
			// replies
			plugin.track("Reply", application);
		});
		//
		application.subscribe("Stream.Plugins.CommunityFlag.onFlagComplete", function(topic, data) {
			// flag
			plugin.track("Flag", application);
		});
		application.subscribe("Stream.Plugins.Like.onLikeComplete", function(topic, data) {
			// like
			plugin.track("Like", application);
		});
	};
	//
	application.subscribe("Submit.Plugins.FileUpload.onUpload", function(topic, data) {
		// file/photo upload
		plugin.track("PhotoUpload", application);
	});
	application.subscribe("Echo.Plugins.JanrainSharingv2.share", function(topic, data) {
		// janrain share
		plugin.track("PostShare", application);
	});
	application.subscribe("Echo.Plugins.EMBSubscription.subscribe", function(topic, data) {
		// email subscribe
		plugin.track("Subscribe", application);
	});
	//
	application.subscribe("Submit.Plugins.Tokbox.VideoComment", function(topic, data) {
		// file/photo upload
		plugin.track("VideoPost", application);
	});
	application.subscribe("Submit.Plugins.Tokbox.VideoPlay", function(topic, data) {
		// file/photo upload
		plugin.track("VideoPlay", application);
	});
	application.subscribe("Submit.Plugins.Auth.TermsAccepted", function(topic, data) {
		// posts
		plugin.track("TermsAccepted", application);
	});
};

plugin.track = function(eventName, application) {
	if(typeof RealTidbits.applications.analytics == "object") {
		RealTidbits.applications.analytics.track(eventName, plugin.config.get(application, "product"));
	}
}

RealTidbits.Analytics = function(config, callback) {
	var self = this;
	var defaults = {
		//"appkey": RealTidbits.settings.appkey,
		"gaTrackers": [],
		"mixpanelTrackers": [],
		"ga": "UA-20691440-1",
		"mixpanel": "948b359d7741fa246376d95399585cc3",
		"ignoreAppkeys": ["prod.wwe", "dev.wwe", "echo::3ones::comments::sportsmansparadiseonline::dev", "echo.3ones.comments.cwtv.dev"]
	};
	// Extend our default options with those provided.
	this.config = $.extend(defaults, config);
	// fix
	if (typeof window.RealTidbits.settings !== 'object') window.RealTidbits.settings = {};
	// load google analytics in setTimeout so Chrome plugin still works - ack!
	setTimeout(function() {
		if(typeof _gat == 'undefined' || typeof _gaq == 'undefined') {
			$.getScript(("https:"=== window.location.protocol?"https:":"http:") + '//www.google-analytics.com/ga.js', function(data, textStatus){
				self.loadGoogleAnalyticTrackers();
				self.pageTracker = _gat._getTracker(self.config.googleAnalyticsAccount);
				self.pageTracker._trackPageview(self.config.appkey + "/comments/" + window.location.hostname);
			});
		} else {
			self.loadGoogleAnalyticTrackers();
		}
	}, 1500);
	// load mixpanel
	if(typeof mixpanel == 'undefined') {
		// mixpanel api code
		(function(d,c){var a,b,g,e;a=d.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===d.location.protocol?"https:":"http:")+'//api.mixpanel.com/site_media/js/api/mixpanel.2.js';b=d.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);c._i=[];c.init=function(a,d,f){var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";g="disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config".split(" ");
		for(e=0;e<g.length;e++)(function(a){b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,0)))}})(g[e]);c._i.push([a,d,f])};window.mixpanel=c})(document,[]);
		self.loadMixpanelTrackers();
	} else {
		self.loadMixpanelTrackers();
	};
	// TODO get user?
	this.config.user = new Echo.User({
		"appkey": this.config.appkey,
		"apiBaseURL": (window.location.protocol=="https:"?"https:":"http:")+"//api.echoenabled.com",
		"contextId": (new Date()).valueOf() + Math.random()
	});
	// load user object then init the forum
	this.config.user.init(function() {
		// check cookie to see if user has visited this page yet
		// if not go pageview
		// set cookie
	});
};

RealTidbits.Analytics.prototype.loadGoogleAnalyticTrackers = function() {
	var self = this;
	//
	var domain = document.domain;
	domain = domain.replace('www.', '');
	//
	_gaq.push(['b._setAccount', self.config.ga]);
	_gaq.push(['b._setDomainName', '.' + domain]);
	//self.config.gaTrackers.push(_gat._getTracker(self.config.ga));
	// customer ga account
	if(typeof RealTidbits.settings.googleAnalytics == "string" && RealTidbits.settings.googleAnalytics.length > 0) {
		_gaq.push(['c._setAccount', RealTidbits.settings.googleAnalytics]);
		_gaq.push(['c._setDomainName', '.' + domain]);
		self.config.gaTrackers.push('c');		
	};
	// track pageview only in google for RTB only
	_gaq.push(['b._trackPageview', self.config.appkey + "/" + window.location.hostname]);
	self.config.gaTrackers.push('b');
	//this.config.gaTrackers[0]._trackPageview(self.config.appkey + "/" + window.location.hostname);
};

RealTidbits.Analytics.prototype.loadMixpanelTrackers = function() {
	var self = this;
	// set the default RTB mixpanel account
	mixpanel.init(self.config.mixpanel, {track_pageview:false}, "rtbp2");
	self.config.mixpanelTrackers.push("rtbp2");
	// customer mixpanel account
	if(typeof RealTidbits.settings.mixpanelAnalytics == "string" && RealTidbits.settings.mixpanelAnalytics.length > 0) {
		mixpanel.init(RealTidbits.settings.mixpanelAnalytics, {track_pageview:false}, "rtbp3");
		self.config.mixpanelTrackers.push("rtbp3");		
	};
};

RealTidbits.Analytics.prototype.setUser = function(user_id, email, last_login, params) {
	// mixpanel
	// do it
	for(var x=0; x<this.config.mixpanelTrackers.length; x++) {
		// set  user
		mixpanel[this.config.mixpanelTrackers[x]].identify(user_id);
		mixpanel[this.config.mixpanelTrackers[x]].name_tag(user_id);
		//
		var opts = {
			"$email": email,
			//"$created": "2011-03-16 16:53:54",
			"$last_login": last_login
		};
		if(typeof params != "undefined") {
			$.merge(opts, params);
		};
		//
		mixpanel.people.set(opts);
	};
};

RealTidbits.Analytics.prototype.track = function(eventName, product, eventValue, eventParams) {
	// get urser id
	var user_id = (typeof this.config.user.account.id != "undefined" ? this.config.user.account.id : this.config.user.account.fakeIdentityURL);
	var eventValue = (typeof eventValue == "undefined" ? 1 : eventValue);
	// google analytics
	var category = "RealTidbits";
	var action = eventName;
	var opt_label = this.config.appkey;
	var opt_value = eventValue; // must be numerical
	var opt_noninteraction = true;
	// do it
	for(var x=0; x<this.config.gaTrackers.length; x++) {
		_gaq.push([this.config.gaTrackers[x] + '._trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);
		//this.config.gaTrackers[x]._trackEvent(category, action, opt_label, opt_value, opt_noninteraction);
	}
	// mixpanel
	// if current appkey is not on the ignore list then send activity to mixpanel
	// event params
	var opts = 	{
		"appkey": this.config.appkey,
		"domain": window.location.host,
		"product": product,
		"user": user_id,
		"url": window.location,
		"value": eventValue
	};
	if(typeof eventParams != "undefined") {
		$.merge(opts, eventParams);
	};
	// do it
	for(var x=0; x<this.config.mixpanelTrackers.length; x++) {
		var mp = this.config.mixpanelTrackers[x];
		// if tracker is not RTB
		if((mp == "rtbp2" && $.inArray(this.config.appkey, this.config.ignoreAppkeys) == -1) || (mp != "rtbp2")) {
			// set  user
			mixpanel[this.config.mixpanelTrackers[x]].identify(user_id);
			mixpanel[this.config.mixpanelTrackers[x]].name_tag(user_id);
			// record event
			mixpanel[this.config.mixpanelTrackers[x]].track(eventName, opts);
		}
	};
};

})(jQuery);