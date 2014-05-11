
/*
 * Copyright (c) 2006-2011 Echo <solutions@aboutecho.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 * $Id: janrain-sharing.js 34457 2011-07-21 07:31:06Z jskit $
 */


(function($) {

var plugin = Echo.createPlugin({
	"name": "JanrainSharingv2",
	"applications": ["Submit", "Stream"],
	"init": function(plugin, application) {
		// avoid nonsynchronized scripts cache issue
		if (!Echo.Global) Echo.Global = {};
		
		var rpxJsHost = ("https:" == document.location.protocol)
			? "https://ssl."
			: "http://cdn.";
		
		// append css
		plugin.addCss(
			'.echo-share-submit-checkbox {font-size:0.8em;color:#777;float:left;white-space: nowrap; margin-right: 5px;}' +
			'.echo-share-submit-checkbox label {height:16px; padding-right:40px;background:transparent URL("' + rpxJsHost + 'realtidbits.com/libs/v1/images/share_icon.png") no-repeat top right;display: block;}' +
			''
			//'.echo-share-submit-control {height:16px; padding-right:40px;background:transparent URL("http://cdn.realtidbits.com/libs/v1/images/share_icon.png") no-repeat top right;display: inline-block;}'
		, 'EchoShare');
		//
		
		//janrain.settings.common.appUrl = plugin.config.get(application, "appUrl");
		//janrain.settings.appUrl = plugin.config.get(application, "appUrl");
		//janrain.settings.share.appUrl = plugin.config.get(application, "appUrl");
		
		plugin.loadJanRain(application);
		// body css must be position:static
		
		$("body").css("position", "static");
		
		if(application instanceof Echo.Submit){
			// submit
			// extending template and insert extra HTML to the necessary area
			plugin.extendTemplate("Submit", plugin.templateSubmit, "insertAsFirstChild", "echo-submit-controls");
			plugin.extendRenderer("Submit", "controls",  function(element, dom) {
				var application = this;
				application.parentRenderer("controls", arguments);
				element.find(".echo-share-submit-checkbox label").append($('<span>'+plugin.label("shareLabel")+'</span>'));
			});
		} else if (application instanceof Echo.Stream){
			//
			plugin.addItemControl(application, function () {
				return {
					"name": plugin.label("shareLabel"),
					"label": '<span class="echo-share-submit-control">' + plugin.label("shareLabel") + '</span>',
					"callback": plugin.doShare
				}
			});
		}
		//
		plugin.listenEvents(application);
	}
});

plugin.loadJanRain = function(application) {
	if (typeof window.janrain !== 'object') window.janrain = {};
	if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
	if (typeof window.janrain.settings.share !== 'object') window.janrain.settings.share = {};
	if (typeof window.janrain.settings.packages !== 'object') janrain.settings.packages = [];
	
	if (typeof window.janrain.engage !== "object") window.janrain.engage = {};
	if (!window.janrain.settings.capture) window.janrain.settings.capture = {};
	if (!window.janrain.settings.common) window.janrain.settings.common = {};
	if (!window.janrain.settings.language) window.janrain.settings.language = 'en';
	//if (!window.janrain.settings.providers) window.janrain.settings.providers = ["aol","google","yahoo","openid"];
	if (!window.janrain.settings.packages) window.janrain.settings.packages = ['login'];
	if (!window.janrain.settings.publish) window.janrain.settings.publish = {};
	if (!window.janrain.settings.share) window.janrain.settings.share = {};
	if (!window.janrain.settings.simpleshare) window.janrain.settings.simpleshare = {};
	if (!window.janrain.settings.linkClass) window.janrain.settings.linkClass = 'janrainEngage';
	
	if (typeof window.janrain.settings.common.appUrl === 'undefined')window.janrain.settings.common.appUrl = plugin.config.get(application, "appUrl");
	
	if (typeof window.janrain.settings.showAttribution === 'undefined')window.janrain.settings.showAttribution = true;
	if (typeof window.janrain.settings.type === 'undefined')window.janrain.settings.type = 'embed';
	if (typeof window.janrain.settings.format === 'undefined')window.janrain.settings.format = 'two column';
	if (typeof window.janrain.settings.width === 'undefined')window.janrain.settings.width = '392';
	if (typeof window.janrain.settings.providersPerPage === 'undefined')window.janrain.settings.providersPerPage = '6';
	if (typeof window.janrain.settings.actionText === 'undefined')window.janrain.settings.actionText = 'Sign in using your account with';
	if (typeof window.janrain.settings.fontColor === 'undefined')window.janrain.settings.fontColor = '#666666';
	if (typeof window.janrain.settings.fontFamily === 'undefined')window.janrain.settings.fontFamily = 'lucida grande, Helvetica, Verdana, sans-serif';
	if (typeof window.janrain.settings.backgroundColor === 'undefined')window.janrain.settings.backgroundColor = '#ffffff';
	if (typeof window.janrain.settings.buttonBorderColor === 'undefined')window.janrain.settings.buttonBorderColor = '#CCCCCC';
	if (typeof window.janrain.settings.buttonBorderRadius === 'undefined')window.janrain.settings.buttonBorderRadius = '5';
	if (typeof window.janrain.settings.buttonBackgroundStyle === 'undefined')window.janrain.settings.buttonBackgroundStyle = 'gradient';
	if (typeof window.janrain.settings.borderWidth === 'undefined')window.janrain.settings.borderWidth = '10';
	if (typeof window.janrain.settings.borderColor === 'undefined')window.janrain.settings.borderColor = '#C0C0C0';
	if (typeof window.janrain.settings.borderRadius === 'undefined')window.janrain.settings.borderRadius = '0';
	if (typeof window.janrain.settings.appId === 'undefined')window.janrain.settings.appId = 'bkkjpjpidfbeddljhkgl';
	if (typeof window.janrain.settings.appUrl === 'undefined')window.janrain.settings.appUrl = plugin.config.get(application, "appUrl");
	window.janrain.settings.permissions = ["customizable_auth_widget_styling"];
	if (typeof window.janrain.settings.providers === 'undefined')window.janrain.settings.providers = [
	'google',
	'facebook',
	'twitter',
	'flickr',
	'wordpress',
	'yahoo',
	'livejournal',
	'blogger',
	'myopenid',
	'aol'];
	if (typeof window.janrain.settings.noReturnExperience === 'undefined')window.janrain.settings.noReturnExperience = false;
	
	if (typeof window.janrain.settings.share.attributionDisplay === 'undefined')window.janrain.settings.share.attributionDisplay = true;
	if (typeof window.janrain.settings.share.elementColor === 'undefined')window.janrain.settings.share.elementColor = '#cccccc';
	if (typeof window.janrain.settings.share.elementHoverBackgroundColor === 'undefined')window.janrain.settings.share.elementHoverBackgroundColor = '#eeeeee';
	if (typeof window.janrain.settings.share.elementButtonBorderRadius === 'undefined')window.janrain.settings.share.elementButtonBorderRadius = '6';
	if (typeof window.janrain.settings.share.elementBorderColor === 'undefined')window.janrain.settings.share.elementBorderColor = '#cccccc';
	if (typeof window.janrain.settings.share.elementBackgroundColor === 'undefined')window.janrain.settings.share.elementBackgroundColor = '#f6f6f6';
	if (typeof window.janrain.settings.share.elementLinkColor === 'undefined')window.janrain.settings.share.elementLinkColor = '#009DDC';
	if (typeof window.janrain.settings.share.elementBorderRadius === 'undefined')window.janrain.settings.share.elementBorderRadius = '3';
	if (typeof window.janrain.settings.share.elementButtonBoxShadow === 'undefined')window.janrain.settings.share.elementButtonBoxShadow = '3';
	if (typeof window.janrain.settings.share.modalOpacity === 'undefined')window.janrain.settings.share.modalOpacity = '0.5';
	if (typeof window.janrain.settings.share.modalBorderRadius === 'undefined')window.janrain.settings.share.modalBorderRadius = '5';
	if (typeof window.janrain.settings.share.bodyColor === 'undefined')window.janrain.settings.share.bodyColor = '#333333';
	if (typeof window.janrain.settings.share.bodyTabBackgroundColor === 'undefined')window.janrain.settings.share.bodyTabBackgroundColor = '#f8f8f8';
	if (typeof window.janrain.settings.share.bodyTabColor === 'undefined')window.janrain.settings.share.bodyTabColor = '#000000';
	if (typeof window.janrain.settings.share.bodyContentBackgroundColor === 'undefined')window.janrain.settings.share.bodyContentBackgroundColor = '#ffffff';
	if (typeof window.janrain.settings.share.bodyBackgroundColorOverride === 'undefined')window.janrain.settings.share.bodyBackgroundColorOverride = false;
	if (typeof window.janrain.settings.share.bodyFontFamily === 'undefined')window.janrain.settings.share.bodyFontFamily = 'Helvetica';
	if (typeof window.janrain.settings.share.bodyBackgroundColor === 'undefined')window.janrain.settings.share.bodyBackgroundColor = '#009DDC';
	if (typeof window.janrain.settings.share.modalBackgroundColor === 'undefined')window.janrain.settings.share.modalBackgroundColor = '#000000';
	if (typeof window.janrain.settings.share.appUrl === 'undefined')window.janrain.settings.share.appUrl = plugin.config.get(application, "appUrl");
	window.janrain.settings.share.permissions = [];
	if (typeof window.janrain.settings.share.providers === 'undefined')window.janrain.settings.share.providers = ["email","facebook","twitter"];
	if (typeof window.janrain.settings.share.providersEmail === 'undefined')window.janrain.settings.share.providersEmail = [];
	if (typeof window.janrain.settings.share.modes === 'undefined')window.janrain.settings.share.modes = ["broadcast"];
	
	// hack to get janrain library files
	var rpxJsHost = ("https:" == document.location.protocol)
		? "https://d29usylhdk1xyu.cloudfront.net"
		: "http://widget-cdn.rpxnow.com";
	$.getScript(rpxJsHost + "/translations/share/en", function() {
		window.janrain.ready = true;
		$.getScript(rpxJsHost + "/manifest/share", function() {});
		//$.getScript("http://realtidbits.com/libs/v1/comments/share.js", function() {});
	});
	// hack to keep console.error() silent cuz JanRain breaks on certain URLs - ugh!
	if("object" === typeof console) {
		var x = console.error;
		console.error = function(msg) {
			// if JanRain then stop else do it
			if(msg.indexOf("WARNING ID:") > -1) return;
			x(msg);
		};
	};
};

plugin.templateSubmit = '' +
	'<div class="echo-share-submit-checkbox"><label><input type="checkbox" name="echo-share" /></label></div>';

// actual limit is 140, reserving some space for ellipses and shortened link to the page
plugin.contentMaxLength = 300;

plugin.addLabels({
	"sharePrompt": "Share your comment:",
	"shareLabel": "Share"
});

plugin.isReplyToTweet = function(item) {
	return !!(item && item.source && item.source.name == "Twitter");
};

plugin.getTweetAuthor = function(item) {
	return item.actor.id.replace(/http\:\/\/twitter.com\//, "");
};

plugin.truncate = function(text, limit) {
	return limit > 0 && text.length > limit ? text.substring(0, limit) + "..." : text;
};

plugin.prepareContent = function(args, application) {
	var text = $.stripTags(args.postData.content);
	var customShareMessagePattern = plugin.config.get(application, "activity.shareContent");
	if (customShareMessagePattern) {
		return plugin.label(customShareMessagePattern, {
			"domain": window.location.host,
			"content": plugin.truncate(text, 30)
		});
	}
	// if a reply to a tweet was posted
	if (plugin.isReplyToTweet(args.inReplyTo)) {
		var author = plugin.getTweetAuthor(args.inReplyTo);
		return plugin.label("@{author} {content}", {
			"author": author,
			"content": plugin.truncate(text, plugin.contentMaxLength - author.length - 2)
		});
	}
	return plugin.truncate(text, plugin.contentMaxLength);
};

plugin.doShare = function() {
	var application = this;
	var args = {};
	args.postData = application.data.object;
	//
	var key = "subscriptionID-" + application.getContextId();
	//
	Echo.Broadcast.publish("Echo.Plugins.JanrainSharingv2.share", {"data": {}, "appkey": application.config.data.appkey}, application.config.data.contextId);
	//
	var config = function(key, defaults) {
		return plugin.config.get(application, key, defaults);
	};

	// populate share modal
	janrain.settings.common.appUrl = plugin.config.get(application, "appUrl");
	janrain.settings.appUrl = plugin.config.get(application, "appUrl");
	janrain.settings.share.appUrl = plugin.config.get(application, "appUrl");

	var title = document.title;
	if(config("activity.itemTitle", null)) {
		title = config("activity.itemTitle", null);
	}

	var description = "";
	if(config("activity.itemDescription", null)) {
		description = config("activity.itemDescription", null);
	};
	
	janrain.engage.share.reset();
	janrain.engage.share.setUrl(config("activity.itemURL", application.data.target.id));
	janrain.engage.share.setMessage(plugin.prepareContent(args, application));
	janrain.engage.share.setTitle(title);
	janrain.engage.share.setDescription(description);
	//janrain.engage.share.showProvider('facebook');
	janrain.engage.share.setActionLink(({"name":title, "link": document.location.href}));
	
	if (config("activity.pageImage")) {
		janrain.engage.share.setImage(config("activity.pageImage.src"));
	}

	janrain.engage.share.show();

};

plugin.listenEvents = function(application) {
	var key = "subscriptionID-" + application.getContextId();
	if (plugin.get(Echo.Global, key)) return;
	var subscriptionID = plugin.subscribe(application, "Submit.onPostComplete", function(topic, args) {
		//console.log(args)
	});
	plugin.subscribe(application, "Submit.onPostInit", function(topic, args) {
		// determine if checkbox is checked
		var subscribeCheckbox = $(args.target).find(".echo-share-submit-checkbox input[name='echo-share']");
		if(subscribeCheckbox.is(':checked') == false) return;
		//
		Echo.Broadcast.publish("Echo.Plugins.JanrainSharingv2.share", {"data": {}, "appkey": application.config.data.appkey}, application.config.data.contextId);
		//
		var config = function(key, defaults) {
			return plugin.config.get(application, key, defaults);
		};
		
		// populate share modal
		janrain.settings.common.appUrl = plugin.config.get(application, "appUrl");
		janrain.settings.appUrl = plugin.config.get(application, "appUrl");
		janrain.settings.share.appUrl = plugin.config.get(application, "appUrl");
	
		var title = document.title;
		if(config("activity.itemTitle", null)) {
			title = config("activity.itemTitle", null);
		}
	
		var description = "";
		if(config("activity.itemDescription", null)) {
			description = config("activity.itemDescription", null);
		};

		janrain.engage.share.reset();
		janrain.engage.share.setUrl(config("activity.itemURL", args.targetURL));
		janrain.engage.share.setMessage(plugin.prepareContent(args, application));
		janrain.engage.share.setTitle(title);
		janrain.engage.share.setDescription(description);
		//janrain.engage.share.showProvider('facebook');
		janrain.engage.share.setActionLink(({"name":title, "link": document.location.href}));
		
		if (config("activity.pageImage")) {
			janrain.engage.share.setImage(config("activity.pageImage.src"));
		}
		janrain.engage.share.show();
		
		$($.find('#janrain-share')).css('z-index', 9999);

	});
	//plugin.set(Echo.Global, key, subscriptionID);
};

})(jQuery);


