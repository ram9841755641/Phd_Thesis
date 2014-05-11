/* jGrowl */

(function($){$.jGrowl=function(m,o){if($('#jGrowl').size()==0)
$('<div id="jGrowl"></div>').addClass((o&&o.position)?o.position:$.jGrowl.defaults.position).appendTo('body');$('#jGrowl').jGrowl(m,o);};$.fn.jGrowl=function(m,o){if($.isFunction(this.each)){var args=arguments;return this.each(function(){var self=this;if($(this).data('jGrowl.instance')==undefined){$(this).data('jGrowl.instance',$.extend(new $.fn.jGrowl(),{notifications:[],element:null,interval:null}));$(this).data('jGrowl.instance').startup(this);}
if($.isFunction($(this).data('jGrowl.instance')[m])){$(this).data('jGrowl.instance')[m].apply($(this).data('jGrowl.instance'),$.makeArray(args).slice(1));}else{$(this).data('jGrowl.instance').create(m,o);}});};};$.extend($.fn.jGrowl.prototype,{defaults:{pool:0,header:'',group:'',sticky:false,position:'top-right',glue:'after',theme:'default',themeState:'highlight',corners:'10px',check:250,life:3000,closeDuration:'normal',openDuration:'normal',easing:'swing',closer:true,closeTemplate:'&times;',closerTemplate:'<div>[ close all ]</div>',log:function(e,m,o){},beforeOpen:function(e,m,o){},afterOpen:function(e,m,o){},open:function(e,m,o){},beforeClose:function(e,m,o){},close:function(e,m,o){},animateOpen:{opacity:'show'},animateClose:{opacity:'hide'}},notifications:[],element:null,interval:null,create:function(message,o){var o=$.extend({},this.defaults,o);if(typeof o.speed!=='undefined'){o.openDuration=o.speed;o.closeDuration=o.speed;}
this.notifications.push({message:message,options:o});o.log.apply(this.element,[this.element,message,o]);},render:function(notification){var self=this;var message=notification.message;var o=notification.options;var notification=$('<div class="jGrowl-notification '+o.themeState+' ui-corner-all'+
((o.group!=undefined&&o.group!='')?' '+o.group:'')+'">'+'<div class="jGrowl-close">'+o.closeTemplate+'</div>'+'<div class="jGrowl-header">'+o.header+'</div>'+'<div class="jGrowl-message">'+message+'</div></div>').data("jGrowl",o).addClass(o.theme).children('div.jGrowl-close').bind("click.jGrowl",function(){$(this).parent().trigger('jGrowl.close');}).parent();$(notification).bind("mouseover.jGrowl",function(){$('div.jGrowl-notification',self.element).data("jGrowl.pause",true);}).bind("mouseout.jGrowl",function(){$('div.jGrowl-notification',self.element).data("jGrowl.pause",false);}).bind('jGrowl.beforeOpen',function(){if(o.beforeOpen.apply(notification,[notification,message,o,self.element])!=false){$(this).trigger('jGrowl.open');}}).bind('jGrowl.open',function(){if(o.open.apply(notification,[notification,message,o,self.element])!=false){if(o.glue=='after'){$('div.jGrowl-notification:last',self.element).after(notification);}else{$('div.jGrowl-notification:first',self.element).before(notification);}
$(this).animate(o.animateOpen,o.openDuration,o.easing,function(){if($.browser.msie&&(parseInt($(this).css('opacity'),10)===1||parseInt($(this).css('opacity'),10)===0))
this.style.removeAttribute('filter');if($(this).data("jGrowl")!=null)
$(this).data("jGrowl").created=new Date();$(this).trigger('jGrowl.afterOpen');});}}).bind('jGrowl.afterOpen',function(){o.afterOpen.apply(notification,[notification,message,o,self.element]);}).bind('jGrowl.beforeClose',function(){if(o.beforeClose.apply(notification,[notification,message,o,self.element])!=false)
$(this).trigger('jGrowl.close');}).bind('jGrowl.close',function(){$(this).data('jGrowl.pause',true);$(this).animate(o.animateClose,o.closeDuration,o.easing,function(){if($.isFunction(o.close)){if(o.close.apply(notification,[notification,message,o,self.element])!==false)
$(this).remove();}else{$(this).remove();}});}).trigger('jGrowl.beforeOpen');if(o.corners!=''&&$.fn.corner!=undefined)$(notification).corner(o.corners);if($('div.jGrowl-notification:parent',self.element).size()>1&&$('div.jGrowl-closer',self.element).size()==0&&this.defaults.closer!=false){$(this.defaults.closerTemplate).addClass('jGrowl-closer ui-state-highlight ui-corner-all').addClass(this.defaults.theme).appendTo(self.element).animate(this.defaults.animateOpen,this.defaults.speed,this.defaults.easing).bind("click.jGrowl",function(){$(this).siblings().trigger("jGrowl.beforeClose");if($.isFunction(self.defaults.closer)){self.defaults.closer.apply($(this).parent()[0],[$(this).parent()[0]]);}});};},update:function(){$(this.element).find('div.jGrowl-notification:parent').each(function(){if($(this).data("jGrowl")!=undefined&&$(this).data("jGrowl").created!=undefined&&($(this).data("jGrowl").created.getTime()+parseInt($(this).data("jGrowl").life))<(new Date()).getTime()&&$(this).data("jGrowl").sticky!=true&&($(this).data("jGrowl.pause")==undefined||$(this).data("jGrowl.pause")!=true)){$(this).trigger('jGrowl.beforeClose');}});if(this.notifications.length>0&&(this.defaults.pool==0||$(this.element).find('div.jGrowl-notification:parent').size()<this.defaults.pool))
this.render(this.notifications.shift());if($(this.element).find('div.jGrowl-notification:parent').size()<2){$(this.element).find('div.jGrowl-closer').animate(this.defaults.animateClose,this.defaults.speed,this.defaults.easing,function(){$(this).remove();});}},startup:function(e){this.element=$(e).addClass('jGrowl').append('<div class="jGrowl-notification"></div>');this.interval=setInterval(function(){$(e).data('jGrowl.instance').update();},parseInt(this.defaults.check));if($.browser.msie&&parseInt($.browser.version)<7&&!window["XMLHttpRequest"]){$(this.element).addClass('ie6');}},shutdown:function(){$(this.element).removeClass('jGrowl').find('div.jGrowl-notification').remove();clearInterval(this.interval);},close:function(){$(this.element).find('div.jGrowl-notification').each(function(){$(this).trigger('jGrowl.beforeClose');});}});$.jGrowl.defaults=$.fn.jGrowl.prototype.defaults;})(jQuery);

/*
 * Tinycon - A small library for manipulating the Favicon
 * Tom Moor, http://tommoor.com
 * Copyright (c) 2012 Tom Moor
 * MIT Licensed
 * @version 0.2.4
*/

(function(){var Tinycon={};var currentFavicon=null;var originalFavicon=null;var originalTitle=document.title;var faviconImage=null;var canvas=null;var options={};var defaults={width:7,height:9,font:'10px arial',colour:'#ffffff',background:'#F03D25',fallback:true};var ua=(function(){var agent=navigator.userAgent.toLowerCase();return function(browser){return agent.indexOf(browser)!==-1}}());var browser={chrome:ua('chrome'),webkit:ua('chrome')||ua('safari'),safari:ua('safari')&&!ua('chrome'),mozilla:ua('mozilla')&&!ua('chrome')&&!ua('safari')};var getFaviconTag=function(){var links=document.getElementsByTagName('link');for(var i=0,len=links.length;i<len;i++){if((typeof links[i] != "undefined" && links[i].getAttribute('rel')||'').match(/\bicon\b/)){return links[i]}}return false};var removeFaviconTag=function(){var links=document.getElementsByTagName('link');var head=document.getElementsByTagName('head')[0];for(var i=0,len=links.length;i<len;i++){if(typeof links[i] != "undefined" && links[i].getAttribute('rel')==='icon'){head.removeChild(links[i])}}};var getCurrentFavicon=function(){if(!originalFavicon||!currentFavicon){var tag=getFaviconTag();originalFavicon=currentFavicon=tag?tag.getAttribute('href'):'/favicon.ico'}return currentFavicon};var getCanvas=function(){if(!canvas){canvas=document.createElement("canvas");canvas.width=16;canvas.height=16}return canvas};var setFaviconTag=function(url){removeFaviconTag();var link=document.createElement('link');link.type='image/x-icon';link.rel='icon';link.href=url;document.getElementsByTagName('head')[0].appendChild(link)};var log=function(message){if(window.console)window.console.log(message)};var drawFavicon=function(num,colour){if(!getCanvas().getContext||browser.safari||options.fallback==='force'){return updateTitle(num)}var context=getCanvas().getContext("2d");var colour=colour||'#000000';var num=num||0;faviconImage=new Image();faviconImage.crossOrigin='anonymous';faviconImage.onload=function(){context.clearRect(0,0,16,16);context.drawImage(faviconImage,0,0,faviconImage.width,faviconImage.height,0,0,16,16);if(num>0)drawBubble(context,num,colour);refreshFavicon()};faviconImage.src=getCurrentFavicon()};var updateTitle=function(num){if(options.fallback){if(num>0){document.title='('+num+') '+originalTitle}else{document.title=originalTitle}}};var drawBubble=function(context,num,colour){var len=(num+"").length-1;var width=options.width+(6*len);var w=16-width;var h=16-options.height;context.font=(browser.webkit?'bold ':'')+options.font;context.fillStyle=options.background;context.strokeStyle=options.background;context.lineWidth=1;context.fillRect(w,h,width-1,options.height);context.beginPath();context.moveTo(w-0.5,h+1);context.lineTo(w-0.5,15);context.stroke();context.beginPath();context.moveTo(15.5,h+1);context.lineTo(15.5,15);context.stroke();context.beginPath();context.strokeStyle="rgba(0,0,0,0.3)";context.moveTo(w,16);context.lineTo(15,16);context.stroke();context.fillStyle=options.colour;context.textAlign="right";context.textBaseline="top";context.fillText(num,15,browser.mozilla?7:6)};var refreshFavicon=function(){if(!getCanvas().getContext)return;setFaviconTag(getCanvas().toDataURL())};Tinycon.setOptions=function(custom){options={};for(var i in defaults){options[i]=custom[i]?custom[i]:defaults[i]}return this};Tinycon.setImage=function(url){currentFavicon=url;refreshFavicon();return this};Tinycon.setBubble=function(num,colour){if(isNaN(num))return log('Bubble must be a number');drawFavicon(num,colour);return this};Tinycon.reset=function(){Tinycon.setImage(originalFavicon)};Tinycon.setOptions(defaults);window.Tinycon=Tinycon})();

(function ($) {

if (!window.RealTidbits) window.RealTidbits = {};

/*

TODO:
save activity to other user's stream
save "since" in a cookie so when you logged back in you get all notifications
change stream to show your user's activity
if you're not logged in hide the notifications

*/

RealTidbits.Notifications = function(config) {
	var self = this;
	var defaults = {
		//"appkey": "",
		//"target": "",
		//"itemLinkHash": "",
		"targetURL": window.location.protocol + '//' + window.location.hostname + '/echo-notifications/user/',
		"css": window.location.protocol + "//cdn.realtidbits.com/libs/v1/notifications/notifications.css",
		"enableTinycon": true
	};
	// Extend our default options with those provided.
	this.config = $.extend(defaults, config);
	// add css
	this.addCss(
		'.echo-notification-wrapper {position:fixed;top:0;right:0;margin:5px 5px 0 0;width:28px;}' +
		'.echo-notification {position:relative;}'+
		'.notif_icon {background: url("//cdn.realtidbits.com/libs/v1/notifications/icon.png") no-repeat scroll bottom left transparent;height: 28px;width: 28px;}' +
		'.t_red_count {background: none repeat scroll 0 0 #FF4040;border-radius: 3px;color: white;font-size: 10px;height: auto;line-height: 15px;padding: 1px 4px;position: absolute;right: 0px;top: 0px;font-weight:bold;}' +
		'.echo-notification-popup {padding: 10px !important;}' +
		'.echo-notification-popup .echo-item-authorName, .echo-notification-popup .echo-item-markers {display:none;}' +
		'.echo-notification-popup .echo-item-body {padding-top:0;}' +
		'.echo-notification-popup .echo-item-text {font-size: 12px;color:#000;}' +
		'.echo-notification-popup .echo-notification-item {padding:4px;background:#eee;margin-bottom:2px;}' +
		'.echo-notification-popup .echo-notification-item a {font-weight:bold;color:#000;}' +
		'.echo-notification-popup a {color:#0064AA;}' +
		'.jGrowl-message {color:#fff;}' +
		'.jGrowl-message a {color:#ccc;text-decoration:underline;}'
	, 'notifications');
	//
	this.appendCSS('jGrowlCSS', this.config.css);
	// setup broadcasts
	// we capture "likes" and "replies"
	Echo.Broadcast.subscribe("Stream.Plugins.Like.onLikeComplete",
		function(topic, data, contextId) {
			self.sendActivity(this, data, 'like');
		}
	);
	Echo.Broadcast.subscribe("Submit.onPostComplete",
		function(topic, data) {
			if(data.inReplyTo.actor) {
				// is a reply
				self.sendActivity(this, data, 'reply');
			} else {
				// is a comment
				data.actor = data.actor || {};
				data.actor.id = data.actor.id || self.config.user.get('id');
				self.sendActivity(this, data, 'comment');
			}
		}
	);
	Echo.Broadcast.subscribe("User.onInvalidate", function(topic, scriptURL) {
		// user may have logged in or out
		self.whoami(function() {
			self.renderIcon();
		});
	});
	// if user is already logged in then go
	this.whoami(function() {
		self.renderIcon();
	});
};

RealTidbits.Notifications.prototype.appendCSS = function(id, href) {
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

RealTidbits.Notifications.prototype.whoami = function(callback) {
	// do a whoami
	this.config.user = new Echo.User({
		"appkey": this.config.appkey,
		"apiBaseURL": "http://api.echoenabled.com"
	});
	this.config.user.init(function() {
		if(callback) callback(); 
	});
};

RealTidbits.Notifications.prototype.getTargetURL = function(userId) {
	return this.config.targetURL + MD5(userId);
};

RealTidbits.Notifications.prototype.renderIcon = function() {
	var self = this;
	//console.log(this.config.user)
	//console.log(this.config.user.logged())
	// if not logged in then remove the notification <div>
	if(!this.config.user.logged()) {
		$("#echo-notification-container").remove();
		if(self.config.enableTinycon) {
			try {
				Tinycon.setBubble(0);
				Tinycon.reset();
			} catch(e) {}
		};
		return;	
	}	
	// logged in so continue
	if(this.config.target) {
		this.config.iconTarget = $('<div id="echo-notification-container" class="echo-notification-wrapper-nostyle"></div>');
		$(this.config.target).append(this.config.iconTarget);
	} else {
		this.config.iconTarget = $('<div id="echo-notification-container" class="echo-notification-wrapper"></div>');
		$("body").append(this.config.iconTarget);
	}
	if(this.config.iconTarget) {
		// add template
		var el = $('' +
		'<div class="echo-notification echo-clickable" title="' + self.label("popupTitle") + '">' +
			'<div class="notif_icon" style="margin:auto; position:relative;">' +
				'<div class="t_red_count t_notifications_count" style="display: none;"></div>' +
			'</div>' +
		'</div>');
		$(this.config.iconTarget).append(el);
		// set click
		el.click(function() {
			// open fancybox + stream
			var popup = new Echo.UI.Dialog({
				"content": function(target) {
					$(target).addClass("echo-notification-popup");
					var popupEl = $('<span></span>');
					$(target).append(popupEl);
					var x = new Echo.Stream({
						"target": popupEl,
						"appkey": self.config.appkey,
						"query": 'childrenof:' + self.getTargetURL(self.config.user.account.id) +
							' -state:ModeratorDeleted sortOrder:reverseChronological after:"7 days ago" itemsPerPage:10 children:0 safeHTML:off',
						"liveUpdates": false,
						"reTag": false,
						"viaLabel": {
							  "icon": true,
							  "text": false
						},
						"contentTransformations": { 
							"text": ["smileys", "hashtags", "urls", "newlines"],
							"html": ["smileys", "hashtags", "urls", "newlines"],
							"xhtml": ["smileys", "hashtags", "urls"]
						},
						"plugins": [{"name":"NotificationPlugin", "parentApp": self}]
					});
				},
				"config": {
					"autoOpen": true,
					"title": self.label("popupTitle"),
					"width": 400,
					"height": 320,
					"minWidth": 300,
					"minHeight": 320
				}
			});
			// reset count
			$(self.config.iconTarget).find('.t_notifications_count').empty().hide();
			if(self.config.enableTinycon) {
				try {
					Tinycon.setBubble(0);
					Tinycon.reset();
				} catch(e) {}
			};
			self.config.countSince = (new Date().getTime()) / 1000;
			self.config.totalCount = 0;
			// cookies
			setCookie("echo_notifications_since", self.config.countSince, 30);
			setCookie("echo_notifications_totalCount", self.config.totalCount, 30);
		});
		// set since at init
		// the echo api will not let you use a "since" that is older then a few mins so doing this will break the count
		// just start the "since" count from now and count it up
		//if(getCookie("echo_notifications_since")) {
		//	self.config.countSince = getCookie("echo_notifications_since");
		//} else {
			self.config.countSince = (new Date().getTime()) / 1000;
			setCookie("echo_notifications_since", self.config.countSince, 30);
		//}
		if(getCookie("echo_notifications_totalCount")) {
			self.config.totalCount = parseInt(getCookie("echo_notifications_totalCount"));
		} else {
			self.config.totalCount = 0;
			setCookie("echo_notifications_totalCount", self.config.totalCount, 30);
		}
		if(self.config.totalCount > 0) {
			var str_count = self.config.totalCount >= 15 ? '15+' : self.config.totalCount;
			$(self.config.iconTarget).find('.t_notifications_count').empty().text(str_count).show();	
			//
			if(self.config.enableTinycon) {
				try {
					Tinycon.setBubble(self.config.totalCount);
				} catch(e) {};
			};
		}
		//console.log(parseInt(getCookie("echo_notifications_totalCount")))
		// run interval
		self.interval = setInterval(function() {
			// check for login state
			if(!self.config.user.logged()) {
				clearInterval(self.interval);
				return;
			} else {
				self.getNotifications(false);
			}
		}, 5000);
		// do right away
		self.getNotifications(true);
	}	
};

RealTidbits.Notifications.prototype.getNotifications = function(isOnLoad) {
	//
	var self = this;
	var since = self.config.countSince;
	self.config.countSince = (new Date().getTime()) / 1000;
	setCookie("echo_notifications_since", self.config.countSince, 30);
	//
	var ajaxUrl = 'http://api.echoenabled.com/v1/search?q=childrenof%3A' + self.getTargetURL(self.config.user.account.id) + ' ' +
		'+-state:ModeratorDeleted' +
		'+sortOrder:reverseChronological+itemsPerPage:15+children:0' +
		'&appkey=' + self.config.appkey;
	//console.log(ajaxUrl);
	// make call for count
	$.ajax({
		url: ajaxUrl,
		dataType: 'jsonp',
		data: '',
		beforeSend: function(xhr){
			xhr.withCredentials = true;
		},
		success: function(data) {
			//console.log(data)
			if(data.entries && data.entries instanceof Array) {
				//
				var new_item_count = 0;
				// if there items
				if(data.entries.length > 0) {
					var last_item_id = getCookie("echo_notifications_last_item_id");
					for(i=0; i<data.entries.length; i++) {
						//console.log(data.entries[i].id)
						// have we reached an item we've already counted?
						if(last_item_id == data.entries[i].id) {
							break;
						}
						// increase count
						new_item_count++;
						// add growl popups
						if(!isOnLoad) {
							// only show notification popups after inital page load
							//console.log(data.entries[i].object.content)
							var content = data.entries[i].object.content;
							var href = plugin.parseMarker("URL", data.entries[i].object.markers);
							//
							if(href) {
								$(content).find("a").attr("href", href);
							}
							// 
							$.jGrowl(content, {
								position: 'bottom-left',
								life: 5000
							});
						}
						
					}
					// set the lastest item id
					setCookie("echo_notifications_last_item_id", data.entries[0].id, 30);
				}
				// get the count of new items/notifications
				self.config.totalCount = self.config.totalCount + new_item_count;
				setCookie("echo_notifications_totalCount", self.config.totalCount, 30);
				
				//
				if(self.config.totalCount > 0) {
					var str_count = self.config.totalCount >= 15 ? '15+' : self.config.totalCount;
					$(self.config.iconTarget).find('.t_notifications_count').empty().text(str_count).show();
					try {
						Tinycon.setBubble(self.config.totalCount);
					} catch(e) {}	
				}
			}
		}
	})
}

Echo.Localization.extend({
	"verbageComment": "posted a comment",
	"verbageReply": "replied to your",
	"verbageLike": "liked your",
	"popupTitle": "Notifications",
	"verbageReplyYourOwn": "You replied to your own",
	"verbageLikeYourOwn": "You liked your own"
}, "Notifications");

RealTidbits.Notifications.prototype.label = function(name) {
	var namespace = "Notifications";
	var label = Echo.Localization.labels[Echo.Localization.key(name, namespace)] || name;
	return label;
};

RealTidbits.Notifications.prototype.sendActivity = function(application, data, verbage) {
	//console.log(application)
	//console.log(data)
	//return;
	
	var isActivityParentOwnItem = false;
	
	//console.log(application.user.account.name)
	switch(verbage) {
		case 'comment':
			// disable these types of notifications
			return;
			var str_verbage = this.label("verbageComment");
			//
			var target = this.getTargetURL(data.actor.id);
			var avatar = data.postData.avatar;
			var contentName = data.postData.name;
			var contentText = $('<span>' + data.postData.content + '</span>');
			var entryContent = '<div><a href="javascript:void(0);">' + contentName +'</a> ' +
				'' + str_verbage + '</div>' +
				'<div>'+ this.truncate(contentText.text(), 100, true) + '</div>';
		break;
		case 'reply':
			var str_verbage = this.label("verbageReply"); //.replace('{0}', '<a href="#">' + data.inReplyTo.actor.title + '</a>');
			var item_type = data.inReplyTo.verbs[0].split('/');
			item_type = item_type[item_type.length-1]; // get the exact verb
			//
			var target = this.getTargetURL(data.inReplyTo.actor.id);
			//
			var avatar = data.postData.avatar;
			var contentName = data.postData.name;
			var contentText = $('<span>' + data.postData.content + '</span>');
			//
			var entryContent = '<div class="echo-notification-item">';
			if(contentName == data.inReplyTo.actor.title) { 
				entryContent += this.label("verbageReplyYourOwn");
				// disable reply notifications to your own comment
				isActivityParentOwnItem = true;
			} else {
				entryContent += '<a href="javascript:void(0);">' + contentName +'</a> ' + str_verbage;
			}
			//
			entryContent = entryContent +
				' <a href="#" class="echo-notification-item-type">' + item_type + '</a>' +
				'</div>' +
				'<div>'+ this.truncate(contentText.text(), 100, true) + '</div>';
		break;
		case 'like':
			var str_verbage = this.label("verbageLike"); //.replace('{0}', '<a href="#">' + data.item.data.actor.title + '</a>');
			var item_type = data.item.data.verbs[0].split('/');
			item_type = item_type[item_type.length-1]; // get the exact verb
			//
			var target = this.getTargetURL(data.item.data.actor.id);
			//
			var avatar = data.item.data.actor.avatar;
			var contentName = this.config.user.account.name; // current logged in user
			//
			var contentText = $('<span>' + data.item.data.object.content + '</span>');
			//
			var entryContent = '<div class="echo-notification-item">';
			if(contentName == data.item.data.actor.title) { 
				entryContent += this.label("verbageLikeYourOwn");
				// disable reply notifications to your own comment
				isActivityParentOwnItem = true;
			} else {
				entryContent += '<a href="javascript:void(0);">' + contentName +'</a> ' + str_verbage;
			}
			//
			entryContent = entryContent +
				' <a href="#" class="echo-notification-item-type">' + item_type + '</a>' +
				'</div>' +
				'<div>'+ this.truncate(contentText.text(), 100, true) + '</div>';
		break;
	};
	
	if(isActivityParentOwnItem == false) {
		// send notification
		var content = {
			"avatar" : avatar,
			"content" : entryContent,
			"name" : contentName,
			"markers": "URL:" + encodeURIComponent(location.href) + ",Type:" + verbage + ",notification",
			"target" : target,
			"verb" : "post"
		};
		var entry = {
			"appkey" : this.config.appkey,
			"content" : $.object2JSON(content),
			"sessionID": Backplane.getChannelID()
		};
		//console.log(entry)
		//return;
		$.ajax({
			"type": "GET",
			"url": window.location.protocol + "//apps.echoenabled.com/v2/esp/activity",
			"data": entry,
			"success": void(0),
			"error": void(0),
			"dataType": "jsonp"
		});
	};
}

RealTidbits.Notifications.prototype.truncate = function(text, n, useWordBoundary){
	var toLong = text.length>n;
	s_ = toLong ? text.substr(0, n-1) : text;
	s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
	return  toLong ? s_ + '...' : s_;
};

RealTidbits.Notifications.prototype.addCss = function(cssCode, id) {
    // did we already append this css...
	if(id && $('#'+id).length) return;
	// if not then do it
    var newStyle = $('<style id="' + id + '" type="text/css">' + cssCode + '</style>');
	$(document.getElementsByTagName("head")[0] || document.documentElement).prepend(newStyle);
}

var plugin = Echo.createPlugin({
    // this is the name of the plugin
    "name": "NotificationPlugin",
    // plugin is written for
    "applications": ["Stream"],
    // it uses User List application inside
    "dependencies": [],
    "init": function(plugin, application) {	
		//
		var parentApp = application.config.get(plugin.config("parentApp"));
		//
		plugin.extendRenderer("Item", "body", function(element, dom) {
			this.parentRenderer("body", arguments);		
			//
			var href = plugin.parseMarker("URL", this.data.object.markers);
			//
			if(href) {
				$(element).find(".echo-notification-item-type").attr("href", href);
			}
		});
		//
		plugin.extendRenderer("Item", "modeSwitch", function(element, dom) {
			this.parentRenderer("modeSwitch", arguments);
			$(element).remove();
		});
		//
		plugin.extendRenderer("Item", "sourceIcon", function(element, dom) {
			this.parentRenderer("sourceIcon", arguments);
			//
			var type = plugin.parseMarker("Type", this.data.object.markers);
			if(type && type == "like") {
				$(element).attr("src", "//c0.echoenabled.com/images/likes.png");
			}
		});
		//
		plugin.extendRenderer("Item", "date", function(element, dom) {
			var item = this;   // renderer is called within the current Echo.Item context
			this.parentRenderer("date", arguments);
			// '<a class="permalink" title="Permanent link to this comment" href="#comment-'+MD5(this.data.object.id)+'">#</a>'
			var html = element.text();
			html = $('<a>' + html + '</a>');
			var href = item.data.object.context[0].uri;
			html.attr("href", href);
			element.html(html);
		});
    }
});

plugin.parseMarker = function(key, array) {
	if(!array) return null;
	for(var i=0; i<array.length;i++ ) {
		var row = plugin.splitOnce(array[i], ":");
		var row_key = row[0];
		var row_value = row[1];
		if(row_key.toLowerCase() == key.toLowerCase()) {
			return decodeURIComponent(row_value);
		}
	}
	return null;
}

plugin.splitOnce = function(input, splitBy) {
    var fullSplit = input.split(splitBy);
    var retVal = [];
    retVal.push( fullSplit.shift() );
    retVal.push( fullSplit.join( splitBy ) );
    return retVal;
}


function setCookie(c,d,b){if(b){var a=new Date;a.setTime(a.getTime()+b*864E5);b="; expires="+a.toGMTString()}else b="";document.cookie=c+"="+d+b+"; path=/"}function getCookie(c){c+="=";for(var d=document.cookie.split(";"),b=0;b<d.length;b++){for(var a=d[b];a.charAt(0)==" ";)a=a.substring(1,a.length);if(a.indexOf(c)==0)return a.substring(c.length,a.length)}return null}function deleteCookie(c){setCookie(c,"",-1)};

var MD5=function(a){function n(a){a=a.replace(/\r\n/g,"\n");var b="";for(var c=0;c<a.length;c++){var d=a.charCodeAt(c);if(d<128){b+=String.fromCharCode(d)}else if(d>127&&d<2048){b+=String.fromCharCode(d>>6|192);b+=String.fromCharCode(d&63|128)}else{b+=String.fromCharCode(d>>12|224);b+=String.fromCharCode(d>>6&63|128);b+=String.fromCharCode(d&63|128)}}return b}function m(a){var b="",c="",d,e;for(e=0;e<=3;e++){d=a>>>e*8&255;c="0"+d.toString(16);b=b+c.substr(c.length-2,2)}return b}function l(a){var b;var c=a.length;var d=c+8;var e=(d-d%64)/64;var f=(e+1)*16;var g=Array(f-1);var h=0;var i=0;while(i<c){b=(i-i%4)/4;h=i%4*8;g[b]=g[b]|a.charCodeAt(i)<<h;i++}b=(i-i%4)/4;h=i%4*8;g[b]=g[b]|128<<h;g[f-2]=c<<3;g[f-1]=c>>>29;return g}function k(a,d,e,f,h,i,j){a=c(a,c(c(g(d,e,f),h),j));return c(b(a,i),d)}function j(a,d,e,g,h,i,j){a=c(a,c(c(f(d,e,g),h),j));return c(b(a,i),d)}function i(a,d,f,g,h,i,j){a=c(a,c(c(e(d,f,g),h),j));return c(b(a,i),d)}function h(a,e,f,g,h,i,j){a=c(a,c(c(d(e,f,g),h),j));return c(b(a,i),e)}function g(a,b,c){return b^(a|~c)}function f(a,b,c){return a^b^c}function e(a,b,c){return a&c|b&~c}function d(a,b,c){return a&b|~a&c}function c(a,b){var c,d,e,f,g;e=a&2147483648;f=b&2147483648;c=a&1073741824;d=b&1073741824;g=(a&1073741823)+(b&1073741823);if(c&d){return g^2147483648^e^f}if(c|d){if(g&1073741824){return g^3221225472^e^f}else{return g^1073741824^e^f}}else{return g^e^f}}function b(a,b){return a<<b|a>>>32-b}var o=Array();var p,q,r,s,t,u,v,w,x;var y=7,z=12,A=17,B=22;var C=5,D=9,E=14,F=20;var G=4,H=11,I=16,J=23;var K=6,L=10,M=15,N=21;a=n(a);o=l(a);u=1732584193;v=4023233417;w=2562383102;x=271733878;for(p=0;p<o.length;p+=16){q=u;r=v;s=w;t=x;u=h(u,v,w,x,o[p+0],y,3614090360);x=h(x,u,v,w,o[p+1],z,3905402710);w=h(w,x,u,v,o[p+2],A,606105819);v=h(v,w,x,u,o[p+3],B,3250441966);u=h(u,v,w,x,o[p+4],y,4118548399);x=h(x,u,v,w,o[p+5],z,1200080426);w=h(w,x,u,v,o[p+6],A,2821735955);v=h(v,w,x,u,o[p+7],B,4249261313);u=h(u,v,w,x,o[p+8],y,1770035416);x=h(x,u,v,w,o[p+9],z,2336552879);w=h(w,x,u,v,o[p+10],A,4294925233);v=h(v,w,x,u,o[p+11],B,2304563134);u=h(u,v,w,x,o[p+12],y,1804603682);x=h(x,u,v,w,o[p+13],z,4254626195);w=h(w,x,u,v,o[p+14],A,2792965006);v=h(v,w,x,u,o[p+15],B,1236535329);u=i(u,v,w,x,o[p+1],C,4129170786);x=i(x,u,v,w,o[p+6],D,3225465664);w=i(w,x,u,v,o[p+11],E,643717713);v=i(v,w,x,u,o[p+0],F,3921069994);u=i(u,v,w,x,o[p+5],C,3593408605);x=i(x,u,v,w,o[p+10],D,38016083);w=i(w,x,u,v,o[p+15],E,3634488961);v=i(v,w,x,u,o[p+4],F,3889429448);u=i(u,v,w,x,o[p+9],C,568446438);x=i(x,u,v,w,o[p+14],D,3275163606);w=i(w,x,u,v,o[p+3],E,4107603335);v=i(v,w,x,u,o[p+8],F,1163531501);u=i(u,v,w,x,o[p+13],C,2850285829);x=i(x,u,v,w,o[p+2],D,4243563512);w=i(w,x,u,v,o[p+7],E,1735328473);v=i(v,w,x,u,o[p+12],F,2368359562);u=j(u,v,w,x,o[p+5],G,4294588738);x=j(x,u,v,w,o[p+8],H,2272392833);w=j(w,x,u,v,o[p+11],I,1839030562);v=j(v,w,x,u,o[p+14],J,4259657740);u=j(u,v,w,x,o[p+1],G,2763975236);x=j(x,u,v,w,o[p+4],H,1272893353);w=j(w,x,u,v,o[p+7],I,4139469664);v=j(v,w,x,u,o[p+10],J,3200236656);u=j(u,v,w,x,o[p+13],G,681279174);x=j(x,u,v,w,o[p+0],H,3936430074);w=j(w,x,u,v,o[p+3],I,3572445317);v=j(v,w,x,u,o[p+6],J,76029189);u=j(u,v,w,x,o[p+9],G,3654602809);x=j(x,u,v,w,o[p+12],H,3873151461);w=j(w,x,u,v,o[p+15],I,530742520);v=j(v,w,x,u,o[p+2],J,3299628645);u=k(u,v,w,x,o[p+0],K,4096336452);x=k(x,u,v,w,o[p+7],L,1126891415);w=k(w,x,u,v,o[p+14],M,2878612391);v=k(v,w,x,u,o[p+5],N,4237533241);u=k(u,v,w,x,o[p+12],K,1700485571);x=k(x,u,v,w,o[p+3],L,2399980690);w=k(w,x,u,v,o[p+10],M,4293915773);v=k(v,w,x,u,o[p+1],N,2240044497);u=k(u,v,w,x,o[p+8],K,1873313359);x=k(x,u,v,w,o[p+15],L,4264355552);w=k(w,x,u,v,o[p+6],M,2734768916);v=k(v,w,x,u,o[p+13],N,1309151649);u=k(u,v,w,x,o[p+4],K,4149444226);x=k(x,u,v,w,o[p+11],L,3174756917);w=k(w,x,u,v,o[p+2],M,718787259);v=k(v,w,x,u,o[p+9],N,3951481745);u=c(u,q);v=c(v,r);w=c(w,s);x=c(x,t)}var O=m(u)+m(v)+m(w)+m(x);return O.toLowerCase()}

})(jQuery);