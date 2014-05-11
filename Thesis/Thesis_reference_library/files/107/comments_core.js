/*
 * Copyright (c) 2011 RealTidbits <support@realtidbits.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 */

if (typeof window.RealTidbits !== 'object') window.RealTidbits = {};
if (typeof window.RealTidbits.settings !== 'object') window.RealTidbits.settings = {};
if (typeof window.RealTidbits.Comments !== 'object') window.RealTidbits.Comments = {};
if (typeof window.RealTidbits.applications !== 'object') window.RealTidbits.applications = {};

// 
(function($) {

// forum wrapper
RealTidbits.Comments = function(config) {
	var self = this;
	// tweak the identity manager with the backplane bus name
    var identityManager = this.getIdentityUrl(config);
	// our default forum config values
	var defaults = {
		"apiBaseURL": window.location.protocol+"//api.echoenabled.com",
		"appkey": null,
		"backplane": {
			"busName": "3ones.com",
			"serverBaseURL": window.location.protocol+"//api.echoenabled.com/v1",
			"channelName": null,
			"rpx": null
		},
		"targetURL": null, // submit and stream url path
		"queryUrl": null, // deprecated
		"streamQuery": null, // full stream search query
		"querySources": null,
		"itemsPerPage": 25,
		"cssDefault": (window.location.protocol=="https:"?"https://ssl.":"http://cdn.") + 'realtidbits.com/libs/v1/comments/comments.css',
		"defaultAvatar": "//c0.echoenabled.com/images/avatar-default.png", 
		"plugins": {},
		"sanitize": {},
		"bozoFilter": false,
		"submitPermissions": "forceLogin",
		"richTextEditor": true,
		"cleditorConfig": {'height':'125px'},
		"identityManagerLogin": identityManager,
		"identityManagerEdit": null,
		"moderationControls": true,
		'postTags': false,
		'emailSubscribe': true,
		'rssFeed': true,
		'initBackplane': true,
		'user': null,
		'fileUploadServer': "http://storage.realtidbits.com.s3.amazonaws.com/comments_photos/",
		'showReply': true,
		'showMedia': false,
		'socialSharing': false,
		'readOnly': false,
		'guestComments': false,
		'hideLogin' : false,
		"preModeration": false,
		"defaultSubscribeChecked": false,
		"itemButtonHover": false,
		"CommunityFlag": true,
		"enableEditPlugin": true,
		"streamStateToggleBy": "mouseover",
		"inlineMedia": {
			"imageMaxHeight": 150,
			"shortenUrls": true
		},
		"scrollToNewComment": false,
		"enableNotifications": false,
		"enableInlineMedia": true,
		"localization": null,
		"loginPrompt": null,
		"enableTokbox": false,
		"tokboxApiKey": 14576382,
		"tokboxApiSecret": "679c6689be6e3105c82cfa878a8dc691ccd58364",
		"tokboxTimeLimit": 30000,
		"ads": false,
		"updatesort": true,
		"events": {
			// "onPostNotLogged": function () {},
		},
		"enableMarkersTags": false,
		"textLimit": 2500,
		"childrenItemsPerPage" : 5,
		"childrenSortOrder": "reverseChronological",
		"submitClientParams": {},
		"streamClientParams": {},
		"safeHTML": "permissive",
		"analytics": true,
		"enableLike": true,
		"doUserInvalidate": false,
		"renderCounter": true
	};
	// fix the target url
	defaults.targetURL = $('head').find("link[rel='canonical']").attr('href') || location.href.split("#")[0];
	if(!this.utils.isUrl(defaults.targetURL)) {
		// if doesn't contain domain add it
		defaults.targetURL = 'http://' + document.domain + defaults.targetURL;
	}
	// set the config
	config.backplane = $.extend({}, defaults.backplane, config.backplane);
	this.config = $.extend({}, defaults, config);
	// fix submit permissions
	if(this.config.queryUrl != null) { 
		this.config.targetURL = this.config.queryUrl;
	};
	// fix targetURL
	if(this.config.guestComments == true) {
		this.config.submitPermissions = 'anonymous';
	};
	// fix file upload
	this.config.fileUploadPlugin = {
		"name": "FileUpload", 
		// width/height in px
		"thumbnailRes": [98, 98],
		"previewRes": [250, 250],
		"webRes": [800, 600],
		// max upload files
		"filesMax": 4,
		// size in bytes, 0 is "none"
		"fileSizeMax": 0,
		"fileSizeMin": 0,
		// Amazon AWS S3 of FTP url
		"storageServer": this.config.fileUploadServer
	};
	// init backplane
	if(this.config.initBackplane == true) {
		var BackplaneConfig = {
			"serverBaseURL": this.config.backplane.serverBaseURL,
			"busName": this.config.backplane.busName
		};
		if(this.config.backplane.channelName) {
			Backplane.resetCookieChannel();
			BackplaneConfig.channelName = this.config.backplane.channelName;
		};
		Backplane.init(BackplaneConfig);
	};
	// if no target is set then just dump the forum <div> here
	if(this.config.target === undefined || !this.config.target || this.config.target == "") {
		var realtidits_comments_id = (new Date).getTime();
		document.writeln('<div id="' + realtidits_comments_id + '"></div>');
		this.config.target = document.getElementById(realtidits_comments_id);
	}
	// continue
	if(typeof(this.config.target) == "string") {
		this.config.target = $('#' + this.config.target);
	}
	// this.config.target will either be a created <div>, an element or jquery element
	this.target = $(this.config.target);
	this.target.addClass("realtidbits-comments");
	// set client vars
	this.submitClient = null;
	this.streamClient = null;
	// append css file
	this.utils.appendCSS('realtidbits-comments-css', this.config.cssDefault);
	if(this.config.css) {
		if(typeof this.config.css == "object" && this.config.css.length) {
			for(var i=0; i<this.config.css.length; i++) {
				this.utils.appendCSS('realtidbits-comments-css-custom' + i, this.config.css[i]);
			}
		} else {
			if(this.config.css) this.utils.appendCSS('realtidbits-comments-css2', this.config.css);
		}
	}
	//
	if(this.config.enableNotifications == true && typeof RealTidbits.Notifications != "undefined") {
		//
		new RealTidbits.Notifications({"appkey": this.config.appkey});
	};
	//
	if(this.config.analytics == true) {
		if (typeof window.RealTidbits.applications !== 'object') window.RealTidbits.applications = {};
		if(typeof window.RealTidbits.applications.analytics == "undefined") {
			if(typeof RealTidbits.Analytics != "undefined") {
				window.RealTidbits.applications.analytics = new RealTidbits.Analytics({"appkey": this.config.appkey});
			} else {
				$.getScript(("https:"=== window.location.protocol?"https://ssl.":"http://cdn.")+"realtidbits.com/libs/v1/analytics/analytics.js", function(data, textStatus, jqxhr) {
					window.RealTidbits.applications.analytics = new RealTidbits.Analytics({"appkey": self.config.appkey});
				});
			}
		};
	};
	// listen for Echo events
	Echo.Broadcast.subscribe("User.onInvalidate", function(topic, scriptURL) {
		//
		
		if(self.config.doUserInvalidate == true) {
			self.streamClient.stopLiveUpdates();
			// put this in a delay so the user object has time to load
			setTimeout(function() {
				self.initStream();
			}, 500);
			if(self.config.renderCounter == true) self.updateCounter();
		};
		//try { self.streamClient.refresh(); } catch(e) {}
	});
	Echo.Broadcast.subscribe("Stream.Plugins.CommunityFlag.onFlagComplete", function(topic, scriptURL) {
		//
		$.fancybox({
			"modal": false,
			'hideOnOverlayClick': true,
			'hideOnContentClick': false,
			'enableEscapeButton' : true,
			"showCloseButton": false,
			"autoDimensions": true,
			//"title": "xxx",
			//"titlePosition": "inside",
			"centerOnScroll": true,
			"content": "Thanks for the feedback. We've noted it."
		})
	});
	// initialize the echo user
	this.config.user = new Echo.User({
		"appkey": this.config.appkey,
		"apiBaseURL": this.config.apiBaseURL,
		"contextId": (new Date()).valueOf() + Math.random()
	});
	// load user object then init the forum
	this.config.user.init(function() {
			// go
		// put in a setTimeout to fix IE7 bug
		setTimeout(function() {
			self.loadContent();
		}, 100);
	});	
};

RealTidbits.Comments.prototype.label = function(name) {
	var namespace = "RealTidbitsComments";
	var label = Echo.Localization.labels[Echo.Localization.key(name, namespace)] || name;
	return label;
};

RealTidbits.Comments.prototype.getIdentityUrl = function(config) {
	if(config.identityManager) {
		return config.identityManager;
	} else {
		var identityManager = {
			"url": config.backplane.rpx + "openid/embed?flags=stay_in_window,no_immediate&token_url=http%3A%2F%2Fapps.echoenabled.com%2Fv2%2Fjanrain%2Fwaiting.html&bp_channel=", 
			"width": 420, 
			"height": 260 
		};
	}
	return identityManager;
};

RealTidbits.Comments.prototype.loadContent = function() {
	var self = this;
	// append base html template
	this.target.append($(RealTidbits.Comments.template.core));
	// init the nav bar
	this.initNavBar();
	//
	
	var template = '<div class="realtidbits-comments-title">' + this.label("commentsTitle")  + ' (<span class="comment-count"></span>)</div>';
	var tabs = $(template);
	/*tabs.find('li:nth-child(1)').click(function() {
		if(self.streamClient) self.streamClient.stopLiveUpdates();
		tabs.find('li').removeClass('selected');
		tabs.find('li:nth-child(1)').addClass('selected');
		self.initStream();
	});
	tabs.find('li:nth-child(2)').click(function() {
		if(self.streamClient) self.streamClient.stopLiveUpdates();
		tabs.find('li').removeClass('selected');
		tabs.find('li:nth-child(2)').addClass('selected');
		self.initParticipants();
	});*/
	
	//this.target.find('.realtidbits-comments-stream-title').append(tabs);
	
	//$(this.target).find(".realtidbits-comments-header").append(tabs);
	
	// refresh the content area
	this.refreshContent();
	//
	if(this.config.renderCounter == true) this.updateCounter();
};

RealTidbits.Comments.prototype.updateCounter = function() {
	var self = this;
	
	var defaultState = this.getDefaultState();
	var defaultChildrenState = this.getDefaultChildrenState();
	// figure out the query
	
	var query = '';
	
	if(this.config.bozoFilter && this.config.user.account && this.config.preModeration == false) {
		query += '(user.id:' + this.config.user.account.id + ' childrenof:' + this.config.targetURL + " " + defaultState + ') OR ';
	}
	
	query += this.config.streamQuery || this.generateQuery();
	//
	
	var counter = new Echo.Counter({
			"target": $("<div></div>"),
			"appkey": this.config.appkey,
			"query": query,
			"liveUpdates": true,
			"liveUpdatesTimeout": 60
	});
	counter.subscribe("Counter.onUpdate", function(topic, args) {
		var header = self.config.header
				? self.config.header
				: function(data) { return self.label("commentsTitle")  +
' (<span class="comment-count">' + (typeof data.count != "undefined" ? data.count : '5000+') + '</span>)';
				}
		$(self.target).find(".realtidbits-comments-header").html('<div class="realtidbits-comments-title">' + header(args.data) + '</div>');
	});	
};

RealTidbits.Comments.prototype.refreshContent = function() {
	// init empty arrays
	this.submitClients = [];
	this.streamClient = [];
	// determine the targetURL and implement the forum template
	this.init();
};

RealTidbits.Comments.prototype.initNavBar = function() {
	var self = this;
	// append navbar stuff
}

RealTidbits.Comments.prototype.getAvatar = function(user) {
	var output = null;
	if(typeof user.avatar != "undefined") {
		output = user.avatar;
	}
	if(user.account && user.account.accounts && user.account.accounts[0] && user.account.accounts[0].photos) {
		var photos = user.account.accounts[0].photos || [];
		for(var i=0; i<photos.length;i++ ) {
			if (photos[i].type == "avatar") output = photos[i].value;
		}
	}
	if($.trim(output) == "" || output == null) {
		output = this.config.defaultAvatar;
	}
	return output;
}

RealTidbits.Comments.prototype.init = function() {
	var self = this;

	// get the client <div> element
	var target = $(this.config.target).find(".realtidbits-comments-submit");
	/*$(this.target).find(".realtidbits-comments-header").empty()
		.append('<div class="realtidbits-comments-title">' + this.label("addNewComment")  + '</div>');
	*/
	this.submitClient = this.initSubmitClient(target);

	if(this.config.readOnly == true) {
		$(this.target).find(".echo-submit-body").hide();
		$(this.target).find(".echo-submit-controls").hide();
	};
	
	
	this.initStream();
	//
/*	if(this.config.showMedia == true) {
		var target = $(this.config.target).find(".realtidbits-comments-stream-media");
		//
		this.galleryPlugin = new Echo.Gallery(target, {
			"appkey": "3ones.com",
			"query": "childrenof:" + this.config.targetURL + " -state:ModeratorDeleted,ModeratorFlagged,SystemFlagged  -user.state:ModeratorBanned,ModeratorDeleted sortOrder:reverseChronological itemsPerPage:15",
			"layout": "horizontal_mini",
			"liveUpdates": true,
			"liveUpdatesTimeout": 10,
			"noContent": "", // leave empty to hide widget
			"media": ["images", "videos"],
			"usePopup": true, // true|false show media in lightbox if using mini mode or open in a new tab
			"moreButton" : false,
			"submitClient": this.submitClient
		});
	};
	*/
}

RealTidbits.Comments.prototype.initStream = function(name) {
	var self = this;
	// get query string for forum location
	var streamParams = {};
	streamParams.targetURL = this.config.targetURL;
	streamParams.updatesort = true;
	streamParams.rssFeed = true;
	streamParams.emailSubscribe = true;

	// hack
	Echo.Broadcast.subscribe("Stream.Plugins.CommunityFlag.onFlagComplete", function(topic, scriptURL) {
		//
		var modal_el = $('<div>' + self.getLabel('flagFeedback') + '</div>');
		$.fancybox({
			"modal": false,
			'hideOnOverlayClick': true,
			'hideOnContentClick': true,
			'enableEscapeButton' : true,
			"showCloseButton": false,
			//"width": 350,
			//"height": 80,
			"autoDimensions": true,
			//"title": "xxx",
			//"titlePosition": "inside",
			"centerOnScroll": true,
			"content": modal_el
		})
	});

	// append stream client
	$(this.config.target).find('.realtidbits-comments-stream-header').empty();
	var target = $(this.config.target).find(".realtidbits-comments-stream");
	target.empty();
	this.streamClient = this.initStreamClient(target, streamParams);
};

RealTidbits.Comments.prototype.initParticipants = function(name) {
	var self = this;
	// append stream client
	$(this.config.target).find('.realtidbits-comments-stream-header').empty();
	var target = $(this.config.target).find(".realtidbits-comments-stream");
	target.empty();
	
	new RealTidbits.Facepile({
		'appkey': this.config.appkey,
		'target': target,
		'max': 100,
		'showOnline': false,
		'doKeepAlive': false,
		'justItems': true,
		'query': 'childrenof:' + location.href.split("#")[0] + ' -state:ModeratorDeleted safeHTML:permissive sortOrder:repliesDescending itemsPerPage:100 children:1',
		'hovercard': function(element, user) {
			var hovercard = new RealTidbits.HoverCard({
				'appkey': self.config.appkey,
				'markers': [],
				'onrender': function(element, user) {
					//onrender
				}
			});
			hovercard.initHoverCard(element, user);
		},
		'callback': function(data) {}
	});
	
};

RealTidbits.Comments.prototype.getItems = function(query, callback) {
	// make a call to Echo API to get items with marker
	var url = ("https:"=== window.location.protocol?"https:":"http:") + "//api.echoenabled.com/v1/search";
	var data = {
		'appkey': this.config.appkey,
		'q': query
	};
	$.ajax({
	  url: url,
	  dataType: 'jsonp',
	  data: data,
	  success: function(data) {
		var entries = data.entries;
		if(entries && entries.length > 0) {
			// send back the content of the post
			callback(entries);
		} else {
			callback(null);
		}
	  }
	});
}

RealTidbits.Comments.prototype.truncate = function(text, n, useWordBoundary){
	var toLong = text.length>n;
	s_ = toLong ? text.substr(0, n-1) : text;
	s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
	return  toLong ? s_ + '...' : s_;
};

RealTidbits.Comments.prototype.getLabel = function(name) {
	var namespace = "RealTidbitsComments";
	var label = Echo.Localization.labels[Echo.Localization.key(name, namespace)] || name;
	return label;
};

RealTidbits.Comments.prototype.isModerator = function() {
	return this.isRole(['administrator', 'moderator']);
}

RealTidbits.Comments.prototype.isRole = function(arr) {
	for(var i=0; i<arr.length;i++ ) {
		//if(this.config.user.data.roles[arr[i]] == true) return true;
		if(this.submitClient.user.data.roles[arr[i]] == true) return true;
	}
	return false;
}

RealTidbits.Comments.prototype.initSubmitClient = function(target) {
	
	// create formAuth plugin
	// set this formAuth plugin so the stream can use it
	if(typeof this.config.plugins.formAuthTop != "undefined") {
		// customer supplies this
		var FormAuth = this.config.plugins.formAuthTop;
	} else {
		var FormAuth = {"name": "FormAuth", "submitPermissions": this.config.submitPermissions || "forceLogin"};
	}
	
	FormAuth.apiBaseURL = this.config.apiBaseURL;
	FormAuth.nestedPlugins = [];
	// add any custom nested plugins to this plugin
	if(this.config.plugins.formAuth) {
		FormAuth.nestedPlugins = this.config.plugins.formAuth
	}
	if(this.config.identityManagerLogin) {
	   FormAuth.identityManagerLogin = this.config.identityManagerLogin;
	}
	if(this.config.identityManagerEdit) {
	   FormAuth.identityManagerEdit = this.config.identityManagerEdit;
	}
	if(this.config.submitPermissions) {
	   FormAuth.submitPermissions = this.config.submitPermissions;
	}
	if(this.config.hideLogin == true) {
		FormAuth.identityManagerLogin = null;
		FormAuth.identityManagerEdit = null;
		FormAuth.identityManagerLogout = null;
	}
	if(typeof this.config.plugins.formAuthTop != undefined) {
		this.config.plugins.formAuthTop = FormAuth;
	}	
	
	// collect all submit client plugins
	var plugins = [
		FormAuth,
		// enable "Forum" plugin with the necessary presentation parameters
		{
			"name": "CommentsSubmit",
			"appWrapper": this
		},
		{
			"name": "LoginPrompt",
			"appWrapper": this
		}
	];
	
	//
	plugins.push({
		"name": "sanitize",
		"stripHtml": false // (this.config.richTextEditor == false ? true : false)
	});
	
	// this plugin must go before the RichTextEditor which overrides the <textarea>
	if(this.config.fileUploadServer) {
		plugins.push(this.config.fileUploadPlugin);
	}
	if(this.config.enableTokbox) {
		plugins.push({
			"name": "Tokbox",
			"recordTimeLimit": this.config.tokboxTimeLimit,
			"apikey": this.config.tokboxApiKey,
			"apisecret": this.config.tokboxApiSecret
		});
	}
	// must go after the photo uploader
	if(this.config.richTextEditor == true) {		
		plugins.push({
			"name": "RichTextEditor",
			"cleditorConfig": this.config.cleditorConfig
		});
	}
	if(this.config.emailSubscribe) {
		//
		plugins.push({
		   "name": "EMBSubscription",
		   "defaultChecked": this.config.defaultSubscribeChecked
	    });
	};
/*
	if(this.config.socialSharing != false && this.config.socialSharing.appId) {
		plugins.push({
			"name": "JanrainSharingv2",
			"appUrl": this.config.socialSharing.appUrl,
			"activity": {
				"sharePrompt": null,
				"shareContent": "{content}",
				"itemURL": this.config.targetURL,
				"itemTitle": this.config.socialSharing.itemTitle || null
			}
		});
	};
	*/

	plugins.push({
		"name": "RTBAnalytics",
		"product": "comments"
	});
	
	plugins.push({
        "name": "SubmitTextCounter",
        "limit": this.config.textLimit
    });
	
	plugins.push({"name": "rtbSubmitPlugin", "appWrapper": this});
	
	// if there are custom plugins to add here then do it
	if(this.config.plugins.submit) {
		$.merge(plugins, this.config.plugins.submit);
	};
	
	var opts = {
		//"apiBaseURL": this.config.apiBaseURL,
		"target": target,
		"appkey": this.config.appkey,
		"targetURL": this.config.targetURL,
		"plugins": plugins
	}
	
	var opts = $.extend({}, opts, this.config.submitClientParams);
	
	// init submit client
	var x = new Echo.Submit(opts);
	this.config.user = x.user; // set the user object
	return x;
}

RealTidbits.Comments.prototype.isModerator = function() {
	if(!this.config.user.data.roles) return false;
	if(this.config.user.data.roles['administrator'] == true) return true;
	if(this.config.user.data.roles['moderator'] == true) return true;
	return false;
}

RealTidbits.Comments.prototype.getDefaultState = function() {
	if(this.isModerator()) {
		var defaultState = '-state:ModeratorDeleted,UserDeleted -user.state:ModeratorBanned,ModeratorDeleted';
	} else {
		// normal user or not logged in
		var defaultState = 'state:Untouched,ModeratorApproved';
		//'-state:ModeratorDeleted,UserDeleted,SystemFlagged,CommunityFlagged,ModeratorFlagged -user.state:ModeratorBanned,ModeratorDeleted';
		// Untouched,ModeratorApproved
	}
	// if premoderation then posts must be approved
	if(this.config.preModeration) {
		defaultState = 'state:ModeratorApproved';
	}
	return defaultState;
};

RealTidbits.Comments.prototype.getDefaultChildrenState = function() {
	if(this.isModerator()) {
		var defaultChildrenState = '-state:ModeratorDeleted,UserDeleted -user.state:ModeratorBanned,ModeratorDeleted';
	} else {
		// normal user or not logged in
		var defaultChildrenState = 'state:Untouched,ModeratorApproved';
		//'-state:ModeratorDeleted,UserDeleted,SystemFlagged -user.state:ModeratorBanned,ModeratorDeleted';
		// Untouched,ModeratorApproved
	}
	// if premoderation then posts must be approved
	if(this.config.preModeration) {
		defaultChildrenState = 'state:ModeratorApproved ' + defaultChildrenState;
	}
	return defaultChildrenState;
};

RealTidbits.Comments.prototype.generateQuery = function(params) {
	// generate params
	params = params || {};
	var sortBy = params.sortBy;
	var after = params.after || '';
	var isSticky = params.isSticky || false;
	var showFlagged = params.showFlagged || false;
	var showDeleted = params.showDeleted || '';
	var showModeration = params.showModeration || '';
	var markers = params.markers || [];
	var markersOR = params.markersOR || [];
	var nomarkers = params.nomarkers || [];
	var tags = params.tags || [];
	var children = params.children || "children";
	var scope = params.scope || "childrenof";
	var targetURL = params.targetURL || this.config.targetURL;
	var user = params.user ? "user.id:'" + params.user + "' "  : '';
	var itemsPerPage = this.config.itemsPerPage || 100;
	/*if (isSticky == true) {
		markers.push("sticky");
	} else {
		nomarkers.push("sticky");
	}*/	

	var defaultState = this.getDefaultState();
	var defaultChildrenState = this.getDefaultChildrenState();
	
	// process query
	
	var query = '';
	
	if(this.config.bozoFilter && this.config.user.account && this.config.preModeration == false) {
		query += '(user.id:' + this.config.user.account.id + " childrenof:'" + this.config.targetURL + "' " + defaultState + ') OR ';
	}
	
	query += user + scope + ":'" + targetURL + "'"
		+ (this.config.querySources ? " " + this.config.querySources : "")
		+ (markers.length ? ' ' + this.utils.encodeJoinArray(markers, 'markers:') : '')
		+ (markersOR.length ? ' (' + this.utils.encodeJoinArray(markersOR, 'markers:', ' OR ') + ')' : '')
		
		+ (tags.length ? ' ' + this.utils.encodeJoinArray(tags, 'tags:') : '')
		+ (after ? " after:'" + after + "' " : "")
		+ (nomarkers.length ? ' ' + this.utils.encodeJoinArray(nomarkers, '-markers:') : '')
		+ ' itemsPerPage:' + itemsPerPage
		+ (sortBy ? ' sortOrder:'+sortBy : ' sortOrder:reverseChronological')
		+ (showFlagged ? ' state:CommunityFlagged,ModeratorFlagged,SystemFlagged ' : '') 
		+ (showDeleted ? ' state:ModeratorDeleted ' : '') 
		+ (showModeration ? ' state:CommunityFlagged,ModeratorFlagged,SystemFlagged,ModeratorDeleted ' : '') 
		+ (!showFlagged && !showDeleted && !showModeration ? ' '+defaultState+' ' : '')
		+ ' safeHTML:' + this.config.safeHTML + ' '
		+ children + ' ' + defaultChildrenState + ' '
		+ 'childrenItemsPerPage: ' + this.config.childrenItemsPerPage + ' childrenSortOrder: ' + this.config.childrenSortOrder + ' '
		+ '';
	//console.log(query);
	return query;
};

RealTidbits.Comments.prototype.initStreamClient = function(target, params) {
	var self = this;
	// alter the target url since we are using markers for comments
	params = params || {};
	var streamType = typeof params.streamType == "undefined" ? null : params.streamType;
	var childrenSortOrder = typeof params.childrenSortOrder == "undefined" ? null: params.childrenSortOrder;
	var liveUpdatesTimeout = typeof params.liveUpdatesTimeout == "undefined" ? 10 : params.liveUpdatesTimeout;
	var liveUpdates = typeof params.liveUpdates == "undefined" ? true : params.liveUpdates;
	
	var pluginReply = {}

	//
	var query = this.config.streamQuery || this.generateQuery(params);
	
	// collect all the stream plugins
	var plugins = [];
	
	plugins.push({"name": "TwitterIntents"});
	
	// sanitize must go above inline and/or any other plugin that makes changes to the DOM cuz it overrides the DOM
	plugins.push({"name": "sanitize", "settings": this.config.sanitize});
	//
	
	plugins.push({
			"name": "CommentsStream",
			"appWrapper": this
	});
	if(this.config.richTextEditor == true) {
		plugins.push({
		"name": "RichTextEditor",
		"textarea": null,
		"cleditorConfig": this.config.cleditorConfig
		});
	};
	//


	if(this.config.showReply == true && this.config.readOnly != true) {
		var nestedPlugins = [this.config.plugins.formAuthTop];
		//
		nestedPlugins.push({"name": "InlineMedia", "settings": this.config.inlineMedia});
		if(this.config.emailSubscribe) {
			nestedPlugins.push({
			   "name": "EMBSubscription",
			   "defaultChecked": this.config.defaultSubscribeChecked
			});
		};
		if(this.config.fileUploadServer) {
			//nestedPlugins.push(this.config.fileUploadPlugin);
		};
		
		nestedPlugins.push(
			{
				"name": "LoginPrompt",
				"appWrapper": this
			},
			{"name": "rtbSubmitPlugin", "appWrapper": this}
		);
		
		if(this.config.richTextEditor == true) {
			nestedPlugins.push({
				"name": "RichTextEditor",
				//"textarea": ".realtidits-forum-submit-content-text",
				"cleditorConfig": this.config.cleditorConfig,
				"isReplyPlugin": true
			});
		}
		
		if(typeof this.config.plugins.reply != "undefined") {
			$.merge(nestedPlugins, this.config.plugins.reply);
		};
		
		//
		/*if(this.config.socialSharing != false && this.config.socialSharing.appId) {
			nestedPlugins.push({
				"name": "JanrainSharingv2",
				"appUrl": this.config.socialSharing.appUrl,
				"activity": {
					"sharePrompt": null,
					"shareContent": "{content}",
					"itemURL": this.config.targetURL
				}
			});
		};*/
		// reply plugin
		plugins.push({
			"name": "Reply",
			"actionString": "Write reply here...",
			"nestedPlugins": nestedPlugins
		});
	};
	if(this.config.enableLike) {
		if(typeof this.config.plugins.like != "undefined") {
			plugins.push({"name": "Like", "nestedPlugins": this.config.plugins.like});
		} else {
			plugins.push({"name": "Like"});
		};
	};
	
	if(this.config.enableInlineMedia == true) {
		plugins.push({"name": "InlineMedia", "settings": this.config.inlineMedia});
	}
	
	if(this.config.socialSharing != false) {
		var appUrl = typeof this.config.socialSharing.appUrl != "undefined" ? this.config.socialSharing.appUrl : this.config.backplane.rpx;
		if(!appUrl) appUrl = "https://3ones.rpx.com";
		plugins.push({
			"name": "JanrainSharingv2",
			"appUrl": appUrl,
			"activity": {
				"sharePrompt": null,
				"shareContent": "{content}",
				"itemURL": this.config.targetURL
			}
		});
	};

	if(this.config.enableEditPlugin == true) {
		plugins.push({"name": "EditComments", "layout":"inline", "richTextEditor": this.config.richTextEditor, "cleditorConfig" : {}});
	}
	
	if(this.config.CommunityFlag == true) {
		plugins.push({"name": "CommunityFlag"});
	}
	if(this.config.emailSubscribe) {
		//
		plugins.push({
		   "name": "EMBSubscription",
		   "itemControls": false,
		   "target": $(this.config.target).find('.realtidbits-comments-stream-header'),
		   "defaultChecked": this.config.defaultSubscribeChecked
	    });
	};
	if(this.config.rssFeed) {
		//
		plugins.push({
		   "name": "RSSFeed",
		   "itemControls": false,
		   "target": $(this.config.target).find('.realtidbits-comments-stream-header')
	    });
	};
	/*plugins.push({
		'name': 'HoverCard',
		'markers': [],
		'onrender': function(element, user) {
		}
	});
	*/
	
	// if there are custom plugins to add here then do it
	if(this.config.plugins.stream) {
		$.merge(plugins, this.config.plugins.stream);
	};
	
	// sorty by drop down on stream client
	if(params.updatesort == true && this.config.updatesort == true) {
		var sortPlugin = {
			"name": "UpdateSort",
			"target": $(this.config.target).find(".realtidbits-comments-stream-header"),
			"options": [
				{
					"label": this.getLabel('streamSortRecent'),
					"sortby": 'reverseChronological',
					"after": null
				},
				{
					"label": this.getLabel('streamSortPopular'),
					"sortby": "repliesDescending",
					"after": "'1 day ago'" 
				},
				{
					"label": this.getLabel('streamSortRating'),
					"sortby": 'likesDescending',
					"after": null
				},
				{
					"label": this.getLabel('streamSortOldest'),
					"sortby": 'chronological',
					"after": null
				}
			]
		};
		if(this.config.sortPlugin) {
			if(this.config.sortPlugin.target) sortPlugin.target = this.config.sortPlugin.target;
			sortPlugin.options = this.config.sortPlugin.options;
		};
		plugins.push(sortPlugin);
	}

	if(this.config.enableTokbox) {
		plugins.push({
			"name": "Tokbox",
			"apikey": this.config.tokboxApiKey,
			"apisecret": this.config.tokboxApiSecret
		});
	}

	// moderation
	if(this.config.moderationControls == true) {
		plugins.push(
			{"name": "Curation", "removePersonalItemsAllowed": true},
			{"name": "UserBan"},
			{"name": "UserPrivileges"}
		);
	}
	
	plugins.push({
		"name": "RTBAnalytics",
		"product": "comments"
	});
	
	var opts = {
		//"apiBaseURL": this.config.apiBaseURL,
		"target": target,
		"appkey": this.config.appkey,
		"query": query,
		"params": params,
		"liveUpdates": liveUpdates,
		"liveUpdatesTimeout": liveUpdatesTimeout,
		"streamStateToggleBy": "mouseover",
		"reTag": false,
		"viaLabel": {
			  "icon": true,
			  "text": false
		},
		"streamStateLabel": {
			"icon": false, //(this.config.streamStateToggleBy == "mouseover" ? true : false),
			"text": false //(this.config.streamStateToggleBy == "mouseover" ? true : false)
		},
		"contentTransformations": { 
        	"text": ["smileys", "urls", "newlines"], // "hashtags",
        	"html": ["smileys", "urls", "newlines"], //"hashtags",
        	"xhtml": ["smileys", "urls"] //"hashtags",
		},
		"plugins": plugins
	};
	
	var opts = $.extend({}, opts, this.config.streamClientParams);
	
	//console.log(opts)
	//console.log(query);
	// init stream
	var x = new Echo.Stream(opts);
	return x;
}

/* templates */
RealTidbits.Comments.template = {};
RealTidbits.Comments.template.core =
	'<div class="realtidbits-comments-header clearfix"></div>' +
	'<div class="realtidbits-comments-submit clearfix"></div>' +
	'<div class="realtidbits-comments-content clearfix">' +
		'<div class="realtidbits-comments-stream-header clearfix"></div>' +
		'<div class="realtidbits-comments-stream-media clearfix"></div>' +
		'<div class="realtidbits-comments-stream"></div>' +
	'</div>' +
	'<div class="realtidbits-comments-footer clearfix"></div>';

/* utilities */
RealTidbits.Comments.prototype.utils = {};

RealTidbits.Comments.prototype.utils.isUrl = function(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}

RealTidbits.Comments.prototype.utils.ajax = function(url, data, callback) {
	$.ajax({
	  url: url,
	  dataType: 'jsonp',
	  data: data,
	  success: function(response) {
		callback(response);
	  }
	});
}


RealTidbits.Comments.prototype.utils.appendCSS = function(id, href) {
	if(!document.getElementById(id)) {
		var newCss = document.createElement('link');
		newCss.rel = 'stylesheet';
		newCss.type = 'text/css';
		newCss.href = href;
		newCss.id = id;
		//document.body.appendChild(newCss);
		document.getElementsByTagName('head')[0].appendChild(newCss);
	}
}

RealTidbits.Comments.prototype.utils.encodeJoinArray = function(arr, prepend, append) {
	var arr2 = [];
	for(var i=0; i<arr.length;i++ ) {
		arr2[i] = (prepend ? prepend : '') + '\'' + arr[i] + '\'';
	}
	return arr2.join((append ? append : ' '));
}

RealTidbits.Comments.prototype.utils.parseMarker = function(key, array, toLower) {
	for(var i=0; i<array.length;i++ ) {
		var row = array[i].split(':');
		var row_key = row.shift();
		var row_value = row.join(':');
		// for long ints like "ID:129539496013246542" if you parseInt the result will be rounded, wierd!
		var row_value = (isNaN(row_value) || row_value.length > 10 ? row_value : parseFloat(row_value));
		if(row_key.toLowerCase() == key.toLowerCase()) {
			if(toLower) return row_value.toLowerCase();
			return row_value;
		}
	}
	return null;
}

RealTidbits.Comments.prototype.utils.truncate = function(text, n, useWordBoundary){
	var toLong = text.length>n;
	s_ = toLong ? text.substr(0, n-1) : text;
	s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
	return  toLong ? s_ + '...' : s_;
};

RealTidbits.Comments.prototype.utils.removeByElement = function(arrayName,arrayElement) {
	for(var i=0; i<arrayName.length;i++ ) { 
		if(arrayName[i]==arrayElement) {
			arrayName.splice(i,1); 
		}
	} 
}

RealTidbits.Comments.prototype.utils.getParam = function(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* submit client */
var plugin7 = Echo.createPlugin({
    // this is the name of the plugin
    "name": "rtbSubmitPlugin",
    // plugin is written for the Stream application
    "applications": ["Submit"],
    // it uses User List application inside
    "dependencies": [],
    "init": function(plugin, application) {
		
		var appWrapper = application.config.get(plugin.config("appWrapper"));
		plugin7.extendRenderer("Submit", "container", function(element, dom, extra) {
			this.parentRenderer("container", arguments);
			// hide logout <div>
			if(appWrapper.config.hideLogin == true) {
				$(element).find('.echo-auth-login, .echo-auth-edit, .echo-auth-logout').hide();
			};
		});
		
		application.subscribe("Submit.onPostInit", function(topic, data) {
			var depth = 0;
			if(data.inReplyTo.object) {
				depth = 1;
				if(data.inReplyTo.object.markers) {
					var d = RealTidbits.Comments.prototype.utils.parseMarker("depth", data.inReplyTo.object.markers, false);
					if(d != null) {
						var d = parseInt(d);
						depth = d + 1;
					};
				}
			};
			var markers = ["depth:" + depth];
			var itemMarkers = data.postData.markers;
			itemMarkers = itemMarkers.replace(/depth:.*?,/gi, '');
			var tmp = itemMarkers.split(",");
			var markers = markers.concat(tmp);
			data.postData.markers = markers.join(',');	
			//console.log(data.postData.markers)
		});
	}
});

/* submit client */
var plugin = Echo.createPlugin({
    // this is the name of the plugin
    "name": "CommentsSubmit",
    // plugin is written for the Stream application
    "applications": ["Submit"],
    // it uses User List application inside
    "dependencies": [],
    "init": function(plugin, application) {
		var appWrapper = application.config.get(plugin.config("appWrapper"));
		plugin.appWrapper = appWrapper;


		// renderers are executed within the Submit form context
		plugin.extendRenderer("Submit", "postButton", function(element, dom) {
			var item = this;
			// "element" inside a renderer is a jQuery-wrapped DOM element
			var handler = plugin.get(application, "postButtonHandler");
			if (!handler) {
				handler = function(event) {
					//
					if (application.user.logged()) {
						//
					} else if (application.config.get("mode") != "edit"
							&& appWrapper.config.submitPermissions == "forceLogin") {
						//
						if(typeof appWrapper.config.events.onPostNotLogged != "undefined") {
							appWrapper.config.events.onPostNotLogged();
						};
					}
					// error handeling
					var text = dom.get("text").val();
					if(text.length > appWrapper.config.textLimit) {
						alert(appWrapper.label("maxChars").replace('{LIMIT}', appWrapper.config.textLimit));
						event.stopImmediatePropagation();
						return false;
					}
				};
				plugin.set(application, "postButtonHandler", handler);
			};		
			// rebind post button handler
			element.unbind("click", handler).bind("click", handler);
			// call parent renderer
			item.parentRenderer("postButton", arguments);
		});
		
		// allow users to tag a post
		if(appWrapper.config.postTags == true) {
			plugin.extendRenderer("Submit", "metadata", plugin.metadataRenderer);
		}
		
		plugin.extendRenderer("Submit", "text", function(element, dom, extra) {
			this.parentRenderer("text", arguments);
			
			//element.select(function() { this.val('');});
			/*
			element.iHint({
				"text": "hi",
				"className": "echo-secondaryColor"
			});	
			*/		
		});

		plugin.extendRenderer("Submit", "markersContainer", function(element, dom, extra) {
			this.parentRenderer("markersContainer", arguments);
			if(appWrapper.config.enableMarkersTags == false) {
				element.hide();
			};
		});		
		plugin.extendRenderer("Submit", "container", function(element, dom, extra) {
			this.parentRenderer("container", arguments);
			// hide logout <div>
			if(appWrapper.config.hideLogin == true) {
				$(element).find('.echo-auth-login, .echo-auth-edit, .echo-auth-logout').hide();
			};
		});

		plugin.extendRenderer("Submit", "markersContainer", function(element, dom, extra) {
			this.parentRenderer("markersContainer", arguments);
			if(appWrapper.config.enableMarkersTags == false) {
				element.hide();
			};
		});	
	
		// subscribe to events
		plugin.listenEvents(plugin, application);
    }
});

plugin.listenEvents = function(plugin, application) {
	//
	var appWrapper = application.config.get(plugin.config("appWrapper"));
	//
	application.subscribe("Submit.onRender", function(topic, data) {
	});
	
	application.subscribe("Submit.onPostInit", function(topic, data) {
	});
	
	application.subscribe("Submit.onPostComplete", function(topic, data) {
		// if premodertation post a notice
		if(appWrapper.config.preModeration) {
			var el = $('<div class="realtidbits-comments-flash-message">' + appWrapper.getLabel('flashMsgModertation') + '</div>').hide();
			$(appWrapper.config.target).find('.realtidbits-comments-submit').append(el);
			el.show();
		} else {
			//
			if(appWrapper.config.scrollToNewComment) {
				var destination = $(appWrapper.config.target).find('.realtidbits-comments-content').offset().top-100;
				$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 1500, function() {
					//
				});
			};
		}
	});
}

plugin.metadataRenderer = function(element, dom, extra) {
	// call parent renderer
	this.parentRenderer("metadata", arguments);
	// show tags for all elements
	var type = extra.type;
	if(type == "tags") {
		var data = this.config.get("data.object." + type, this.config.get(type));
		dom.get(type)
			.iHint({
				"text": this.label(type + "Hint"),
				"className": "echo-secondaryColor"
			})
			.val($.trim($.stripTags(data.join(", "))))
			.blur();
		element.show();
	}
};

var plugin4 = Echo.createPlugin({
    // this is the name of the plugin
    "name": "LoginPrompt",
    // plugin is written for the Stream application
    "applications": ["Submit"],
    // it uses User List application inside
    "dependencies": [],
    "init": function(plugin4, application) {
		var appWrapper = application.config.get(plugin4.config("appWrapper"));
		plugin4.appWrapper = appWrapper;
		
		plugin4.extendRenderer("Submit", "auth", function(element, dom) {
			var application = this;
			// call parent renderer
			this.parentRenderer("auth", arguments);
			if(plugin4.appWrapper.config.loginPrompt != null) {
				var el_login = $(element).find(".echo-auth-login");
				var el_prompt = el_login.clone(false);
				// <span class="echo-auth-login echo-linkColor echo-clickable">Login</span>
				el_login.hide();
				el_login.parent().prepend(el_prompt);
				//el_prompt.html(el_login.html());
				//el_login.empty().append(el_prompt);
				el_prompt.click(function(event) {
					if(typeof plugin4.appWrapper.config.events.onLoginPromptInit != "undefined") {
						plugin4.appWrapper.config.events.onLoginPromptInit();
					};
					if(plugin4.appWrapper.config.loginPrompt != null) {
						var text = $('<div><p>' + plugin4.appWrapper.config.loginPrompt.text + '</p></div>');
						var butotn1 = $('<button>' + plugin4.appWrapper.config.loginPrompt.button1 + '</button>');
						butotn1.click(function() {
							// ACCEPT was clicked
							Echo.Broadcast.publish("Submit.Plugins.Auth.TermsAccepted", {"data": {}, "appkey": application.config.data.appkey}, application.config.data.contextId);
							//$.fancybox.close();
							el_login.show();
							el_prompt.hide();
							el_login.trigger('click');
					});
					var butotn2 = $('<button>' + plugin4.appWrapper.config.loginPrompt.button2 + '</button>');
					butotn2.click(function() {
						// CANCEL was clicked
						$.fancybox.close();
					});					
					text.append(butotn1)
					text.append(butotn2)
					$.fancybox({
						"modal": false,
						'hideOnOverlayClick': true,
						'hideOnContentClick': false,
						'enableEscapeButton' : true,
						"showCloseButton": false,
						"autoDimensions": true,
						//"title": "xxx",
						//"titlePosition": "inside",
						"centerOnScroll": true,
						"content": text
					})
					return false;
				}
			});
			};
		});
    }
});

// Stream Plugin

var plugin2 = Echo.createPlugin({
    // this is the name of the plugin
    "name": "CommentsStream",
    // plugin is written for the Stream application
    "applications": ["Stream"],
    // it uses User List application inside
    "dependencies": [],
    "init": function(plugin2, application) {
		//
		var appWrapper = application.config.get(plugin2.config("appWrapper"));
		
		// save the parent application
		plugin2.appWrapper = appWrapper;

		// allows non-square user avatar pictures
		plugin.addCss(
			'.echo-item-avatar {height: auto !important;max-height: 48px !important;overflow: hidden !important;width: 48px;}' +
			'.echo-item-avatar img {height: auto !important;}' +
			'.echo-auth-avatar img {width: auto !important;}'
		, 'EchoAvatarHeightFix');

		plugin2.addCss(
			'.echo-stream-toggleModerationControls { float: right; margin-left: 15px; cursor: pointer; font-family: Arial; font-size: 11px; }' +
			'.echo-stream-toggleModerationControls-label {color: #777;}'
		);

		if(appWrapper.isModerator() == true) {
			//plugin2.extendRenderer("Stream", "adminExtraStuff", plugin2.renderers.Stream.adminExtraStuff);
			//plugin2.extendTemplate("Stream", plugin2.templateAdminStuff, "insertAsFirstChild", "echo-stream-header");
			plugin2.extendRenderer("Stream", "toggleModerationControls", plugin2.renderers.Stream.toggleModerationControls);
			plugin2.extendTemplate("Stream", plugin2.toggleModerationControlsTemplate, "insertAsFirstChild", "echo-stream-header");
		} else {
			setTimeout(function() {
				$(appWrapper.target).find(".echo-stream-toggleModerationControls").remove();
			}, 500);
		};

		plugin2.extendRenderer("Stream", "more", function(element, dom) {
			this.parentRenderer("more", arguments);
			element.click(function() {
				if(typeof plugin2.appWrapper.config.events.streamOnMore != "undefined") {
					plugin2.appWrapper.config.events.streamOnMore();
				};
			});
		});

		plugin2.extendRenderer("Item", "date", plugin2.dateRenderer);
		plugin2.extendRenderer("Item", "container", plugin2.containerRenderer);
		plugin2.extendRenderer("Item", "body", plugin2.bodyRenderer);
		plugin2.extendRenderer("Item", "sourceIcon", plugin2.sourceIconRenderer);
		plugin2.extendRenderer("Item", "controls", plugin2.controlsRenderer);
		plugin2.extendRenderer("Item", "control", plugin2.controlRenderer);
		plugin2.extendRenderer("Item", "authorName", plugin2.authorNameRenderer);
		plugin2.extendRenderer("Item", "avatar", function(element, dom) {
			var output = this.parentRenderer("avatar", arguments);
			if(output && output.attr("src")) output.attr("src", output.attr("src").replace("http:", ""));
			return output;
		});
				
		// subscribe to events
		plugin2.listenEvents(plugin2, application);
    }
});

plugin2.addLabels({
	"moderationShow": "Show moderation controls",
	"moderationHide": "Hide moderation controls"
});

plugin2.listenEvents = function(plugin2, application) {
	application.subscribe("Stream.onRender", function(topic, data) {
	});
	//
	application.subscribe("Stream.onReady", function(topic, data) {
		// auto scroll to comment
		var anchorName = location.href.split("#")[1];
		var destination = $(application.config.data.target).find("a[name='" + anchorName + "']");
		if(destination.length) {
			var destination = destination.offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 1500, function() {
				//
			});
		};
	});
	application.subscribe("Stream.onRerender", function(topic, data) {
	});
	application.subscribe("Stream.Item.onRender", function(topic, data) {
		if(typeof plugin2.appWrapper.config.events.itemOnRender != "undefined") {
			plugin2.appWrapper.config.events.itemOnRender();
		};
	});
};

plugin2.renderers = {};
plugin2.renderers.Stream = {};

plugin2.renderers.Stream.adminExtraStuff = function(element, dom) {
	var application = this;
	var appWrapper = plugin2.appWrapper;
	// add click bindings
	var el = element.find(".toggleDeleteItems");
	var nextToggle = (appWrapper.config.showDeleted == true ? false : true);
	el.html(nextToggle ? appWrapper.getLabel('adminToggleModeration') : appWrapper.getLabel('adminToggleModeration'));
	el.click(function() {
		// set boolean
		plugin2.appWrapper.config.showDeleted = nextToggle;
		// refresh the stream
		var params = application.config.get("params");
		params.showModeration = plugin2.appWrapper.config.showDeleted;
		var query = plugin2.appWrapper.generateQuery(params);
		plugin2.applyQuery(application, query);
	});
};

plugin2.renderers.Stream.toggleModerationControls = function(element, dom) {
	var appWrapper = plugin2.appWrapper;
	element.empty()
		.append('<span class="echo-stream-toggleModerationControls-label">' + plugin2.label("moderationHide") + '</span>')
		.show()
		.data('status', 'show')
		.click(function() {
			var $this = $(this),
				status = $this.data('status'),
				label;

			if (status == 'show') {
				label = plugin2.label("moderationShow");
				$this.data('status', 'hide');
			} else {
				label = plugin2.label("moderationHide");
				$this.data('status', 'show');
			}

			$this.children().first().html(label);

			var $content = $(appWrapper.streamClient.dom.content);

			$content.find('a.echo-item-control-moderation').toggle();
			$content.find('input.echo-item-statusCheckbox').parent().toggle();
		});
};

plugin2.applyQuery = function(application, query) {
	application.config.set("query", query);
	application.refresh();
};

plugin2.dateRenderer = function(element, dom) {
	var item = this;   // renderer is called within the current Echo.Item context
	//
	this.parentRenderer("date", arguments);
	// '<a class="permalink" title="Permanent link to this comment" href="#comment-'+MD5(this.data.object.id)+'">#</a>'
	var html = element.text();
	html = $('<a>' + html + '</a>');
	html.attr("title", "Permanent link to this comment");
	//
	var tmp = (this.data.object.id).split("/");
	var href = /*item.data.object.context[0].uri + */"#comment-" + tmp[tmp.length-1];
	html.attr("href", href);
	element.html(html);
}

plugin2.authorNameRenderer = function(element, dom) {
	// add role to username
	var authorName = $('<span>' + this.parentRenderer("authorName", arguments) + '</span>');
	var arr = this.data.actor.roles || [];
	for(var i=0; i<arr.length;i++) {
		$(element).addClass(arr[i]);
		authorName.append($('<span class="echo-author-role">'+arr[i]+'</span>'));
	}
	return authorName.html();
};

plugin2.controlRenderer = function(element, dom, extra) {
	var control = this.parentRenderer("control", arguments);
	
	if(typeof plugin2.appWrapper.streamClient.dom != "undefined") {
		var status = plugin2.appWrapper.streamClient.dom.content.find('.echo-stream-toggleModerationControls').data('status');
	} else {
		var status = 'show';
	};

	if (extra.plugin && extra.plugin in {'Curation':1, 'UserBan':1, 'UserPrivileges':1}) {
		var $control = $(control);
		$control.addClass('echo-item-control-moderation');
		if (status == 'hide') {
			$control.hide();
		}
	}
	return control;
};

plugin2.controlsRenderer = function(element, dom) {
	this.parentRenderer("controls", arguments);
	// hide the controls by default
	if(plugin2.appWrapper.config.itemButtonHover == true) {
		$(element).hide();
	}
};

plugin2.sourceIconRenderer = function(element, dom) {
	this.parentRenderer("sourceIcon", arguments);
	// fix source icon
	var el = $(element);
	if(el.css("background-image").indexOf("cdn.js-kit.com/images/echo.png") != -1) {
		el.css("backgroundImage", "url(" + ("https:"=== window.location.protocol?"https://ssl.":"http://cdn.") + "realtidbits.com/libs/v1/comments/comment.png)");
	};
};

plugin2.bodyRenderer = function(element, dom) {
	var application = this;
	//console.log(this)
	// <a name="'+anchorName+'" />
	this.parentRenderer("body", arguments);
	//
	element.find("a").attr("target", "_blank");
};

plugin2.containerRenderer = function(element, dom) {
	var application = this;
	// do this before we try to manipulate the text
	this.parentRenderer("container", arguments);
	// <a name="'+anchorName+'" />
	var tmp = (this.data.object.id).split("/");
	var el_anchor = $('<a name="comment-' + tmp[tmp.length-1] + '" />');
	element.prepend(el_anchor);
	// show/hide item controls on hover
	if(plugin2.appWrapper.config.itemButtonHover == true) {
		$(element).hover(function()  {
			$(this).find('.echo-item-controls').first().show();
		}, function() {
			$(this).find('.echo-item-controls').first().hide();
		});
	} else {
		$(this).find('.echo-item-controls').first().show();
	}
};

plugin2.templateAdminStuff =
	'<div class="echo-stream-curate realtidbits-comments-stream-admin-stuff echo-stream-adminExtraStuff">' +
		'&nbsp;<span class="echo-item-control-delim"> &middot; </span>' +
		'<a href="javascript:void(0);" class="toggleDeleteItems echo-linkColor"></a>' +
	'</div>';

plugin2.toggleModerationControlsTemplate =
	'<div class="echo-stream-toggleModerationControls echo-linkColor"></div>';


/* IP Tracker */

RealTidbits.TrackIP = function(appkey) {
	var self = this;
	self.appkey = appkey;
	// listen for Echo events
	Echo.Broadcast.subscribe("User.onInvalidate", function(topic, args) {
	});
	Echo.Broadcast.subscribe("User.onInit", function(topic, args) {
		// get ip and send it to API
		var user = new Echo.User({"appkey": self.appkey});
		user.init(function() {
			if(user.logged()) {
				var id = user.get("id");
				//
				$.ajax({
				  url: "http://api.realtidbits.com/iptrack_track",
				  dataType: 'jsonp',
				  data: {"appkey": self.appkey, "user_id": id},
				  success: function(rsp) {
					//console.log(rsp);
				  }
				});
			};
		});
	});
};

})(jQuery);
