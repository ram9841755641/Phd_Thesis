(function($) {

var plugin = Echo.createPlugin({
    // this is the name of the plugin
    "name": "Tokbox",
    // plugin is written for the Stream application
    "applications": ["Submit", "Stream"],
    // it uses User List application inside
    "dependencies": [{
		"application": "opentok",
		"url": (window.location.protocol=="https:" ? "https://swww.tokbox.com/v0.91/js/TB.min.js" : "http://static.opentok.com/v0.91/js/TB.min.js")
	}],
    "init": function(plugin, application) {       
		// adding extra CSS rules for plugin components
		plugin.addCss('' +
			'.echo-submit-tokbox-container {display:none;} ' +
			'.echo-submit-uploadedPhotos { overflow:hidden;padding:7px;background-color:#eee; } ' +
			'.echo-submit-text-input-photoUpload { width: 100%; border: 1px solid #D2D2D2; }' +
			'.echo-submit-upload-control-wrapper { margin: 0 5px 0 0; float:left; width: 106px; overflow: hidden; position: relative; } ' +
			'.echo-submit-tokbox-button-container { float:left;position: relative;margin: 0 0 0 10px;padding:5px 0 0; } ' +
			'.echo-submit-tokbox-button-container button {font-size:11px;text-decoration:none;}' +
			'.echo-submit-tokbox-button-container {cursor:pointer;}'+
			'.echo-submit-tokbox-button-container:hover {text-decoration:underline;}' +
			'.echo-submit-tokbox {background-color:#f9f9f9; padding: 10px;height:270px;}' +
			'.tokboxTitle {margin-bottom:10px; font-weight:normal;color: #777;font-size: 12px;}' +
			'.echo-item-body img { border:0; }' +
			'.echo-item-body .echo-item-photo {display:inline-block; }' +
			'.echo-item-body .echo-item-photo img {margin:0 5px 5px 0; border:1px solid #CCCCCC; padding:3px; background:#FFFFFF; }' +
			'.echo-item-body .echo-item-photo img:hover { border:1px solid #aeaeae; }' +
			'.recorderWrapper, .playerWrapper {margin-bottom: 5px;}' +
			'.rtb-tokbox-stream-wrapper {text-align:center;color:#fff;line-height: 250px;font-size:18px;font-weight:bold;}' +
			'.echo-item-tokbox {height:271px;width:320px;margin-top:5px;background-color:#ccc;}' +
			'');
		// setting up plugin-specific variable
		plugin.set(application, "apikey", 14576382);
		plugin.set(application, "apisecret", "679c6689be6e3105c82cfa878a8dc691ccd58364");

		// override the tokbox api
		if(typeof plugin.config.get(application, "apikey") != "undefined") {
			plugin.set(application, "apikey", plugin.config.get(application, "apikey"));
		};
		if(typeof plugin.config.get(application, "apisecret") != "undefined") {
			plugin.set(application, "apisecret", plugin.config.get(application, "apisecret"));
		};

		// reset the source
		plugin.set(application, "archiveId", null);
		
		plugin.config.set(application, "postMarkers", ["tokbox", "video"]);
		
		// set record time limit (default is 1 min)
		if(typeof plugin.config.get(application, "recordTimeLimit") == "undefined") {
			plugin.config.set(application, "recordTimeLimit", 60000);
		};
		
		// extending template and insert extra HTML to the necessary area
		plugin.extendTemplate("Submit", plugin.template, "insertAfter", "echo-submit-content");
		
		// extending "Post" button renderer
		plugin.extendRenderer("Submit", "postButton", plugin.postButtonRenderer);
		
		//
		if(application instanceof Echo.Stream){
			plugin.set(application, "token", null);
			plugin.getTokboxToken({"apikey": plugin.get(application, "apikey"), "apisecret": plugin.get(application, "apisecret")}, function(data) {
				plugin.set(application, "token", data.token);
			});

			plugin.extendRenderer("Item", "body", function(element, dom) {
				var item = this;
				this.parentRenderer("body", arguments);
				//
				var token = plugin.get(application, "token");
				$(element).find('.echo-item-tokbox').each(function() {
					var el_tokbox = $(this);
					var archive_id = $(this).attr('data-archive-id');
					if(archive_id) {
						// add download link if user is an admin
						if(application.user.isAdmin()) {
							var el_download = $('<div><small><a href="" target="_blank">' + plugin.label("download") + '</a></small></div>');
							el_download.find("a").attr("href", window.location.protocol + "//api.realtidbits.com/tokbox_downloadVideo/?archive_id=" + archive_id);
							$(this).after(el_download);
						};
					}
					// add analytics
					function playbackStartedHandler(event) {
						Echo.Broadcast.publish("Submit.Plugins.Tokbox.VideoPlay", {"data": {}, "appkey": application.config.data.appkey}, application.config.data.contextId);
					};
					//
					if(!token) {
						// loop until we have the token
						var timeout = setInterval(function() {
							token = plugin.get(application, "token");
							if(token) {
								if(archive_id) {
									var el_tokbox_id = 'tokbox-' + archive_id;
									var el_tokbox_video_wrapper = $('<div class="rtb-tokbox-stream-wrapper">Loading...</div>');
									el_tokbox_video_wrapper.attr('id', el_tokbox_id);
									el_tokbox.empty().append(el_tokbox_video_wrapper);
									var recorderManager = TB.initRecorderManager(plugin.get(application, "apikey"));
									
									var player = recorderManager.displayPlayer(archive_id, token, el_tokbox_id, {"height": 271, "width": 320});
									player.addEventListener('playbackStarted', playbackStartedHandler);
								} else {
									var param = $(el_tokbox).find('param[name="flashvars"]');
									var param_val = param.val();
									if(!param_val) clearTimeout(timeout); return;
									var new_val = param_val.replace(/token=[^&]*/g, 'token=' + token);
									param.val(new_val);
									var html = el_tokbox.html();
									el_tokbox.empty().html(html);
								};
								clearTimeout(timeout);
							};
						}, 500);
					} else {
						if(archive_id) {
							setTimeout(function() {
								var el_tokbox_id = 'tokbox-' + archive_id;
								var el_tokbox_video_wrapper = $('<div class="rtb-tokbox-stream-wrapper">Loading...</div>');
								el_tokbox_video_wrapper.attr('id', el_tokbox_id);
								el_tokbox.empty().append(el_tokbox_video_wrapper);
								var recorderManager = TB.initRecorderManager(plugin.get(application, "apikey"));
								var player = recorderManager.displayPlayer(archive_id, token, el_tokbox_id, {"height": 271, "width": 320});
								player.addEventListener('playbackStarted', playbackStartedHandler);
							}, 250);
						} else {
							var param = $(el_tokbox).find('param[name="flashvars"]');
							var param_val = param.val();
							if(typeof param_val != "undefined") {
								var new_val = param_val.replace(/token=[^&]*/g, 'token=' + token);
								param.val(new_val);
								var html = el_tokbox.html();
								el_tokbox.empty().html(html);
							};
						};
					}
				});
			});
		};
		
		/*plugin.getTokboxToken({}, function(data) {
			plugin.set(application, "token", data.token);
		});*/
		
		// subscribe to events
		plugin.listenEvents(plugin, application);
    }
});

plugin.listenEvents = function(plugin, application) {
	//
	application.subscribe("Submit.onRender", function(topic, data) {
		plugin.initTokbox(application);
	});
	
	application.subscribe("Submit.onPostComplete", function(topic, data) {
		// clear the input text
		/*application.dom.get("text").iHint({
				"text": "Type your comment here...",
				"className": "echo-secondaryColor"
		})
		application.dom.get("markers").val("");
		*/
		// remove all the uploaded files
		var target = application.config.data.target;
		var element = $(target).find(".echo-submit-tokbox-container");
		$(element).hide();
		if(!$(target).find('.echo-submit-content').is(":visible")) $(target).find('.echo-submit-content').show();
		plugin.set(application, "archiveId", null);
		$(target).find('.echo-submit-tokbox-container').empty();
	});
	//
	//plugin.subscribe(application, "Submit.onPostInit", function(topic, args) {
	application.subscribe("Submit.onPostInit", function(topic, args) {
       if (application.config.get("target").get(0) != args.target) return;
       //
	   var target = args.target;
		var text = args.postData.content;
		//
		// update text with image html
		if(plugin.get(application, "archiveId") != null) {
			if(text == "...") {
				text = '';
			}
			text += '<div class="echo-item-tokbox" data-archive-id="' + plugin.get(application, "archiveId")+ '">' + 
				$(target).find(".playerWrapper").html() +
			'</div>';
			var markers = plugin.config.get(application, "postMarkers");
			if(markers) {
				var tmp = args.postData.markers.split(",");
				var markers = markers.concat(tmp);
				args.postData.markers = markers.join(',');
			}
		};
		// set
	   args.postData.content = text;
		// custom markers		
	});
}

plugin.addLabels({
	"attachWebVideo": "+ Video",
	"titleRecord": "Record Your Comment:",
	"titlePlayback": "Comment Playback:",
	"buttonCancel": "Cancel",
	"buttonDelete": "Delete Recording",
	"download": "Download Video",
	"timelimit": "NOTE: XXX seconds record time limit."
});

plugin.template =
'<div class="echo-submit-tokbox-container">' +
'</div>';

plugin.templateTokbox = 
'<div class="echo-submit-tokbox">' +
'<div class="recorderContainer" style="float:left; margin-right:8px;">' +
	'<div class="recorder-title tokboxTitle"></div>' +
	'<div class="recorderWrapper"></div>' +
	'<div style="clear:both; margin"><button class="btn btn-small bt-no-radius"></button></div>' +
'</div>' +
'<div class="playerContainer" style="float:left; display:none">' +
	'<div class="playback-title tokboxTitle"></div>' +
	'<div class="playerWrapper"></div>' +
	'<div style="clear:both; margin"><button class="btn btn-small bt-no-radius"></button></div>' +
'</div>' +
'<div style="clear:both; margin"></div>' +
'<div id="archiveList" style="height:100px; display:none">' +
	'<p>Recordings (click to play):</p>' +
'</div>' +
'</div>';

plugin.templateControl = 
'<div class="echo-submit-tokbox-button-container">' +
	'<button class="btn btn-mini bt-no-radius"></button>' +
'</div>';

plugin.initTokbox = function(application) {
	//
	var target = application.config.data.target;

	// add upload control to container
	$(target).find('.echo-submit-controls').prepend($(plugin.templateControl));
	$(target).find(".echo-submit-tokbox-button-container button").text(plugin.label("attachWebVideo"));

	// http://staging.tokbox.com/v0.91/js/TB.min.js
	// http://static.opentok.com/v0.91/js/TB.min.js
		
	$(target).find(".echo-submit-tokbox-button-container button").click(function() {
		var element = $(target).find(".echo-submit-tokbox-container");
		if($(element).is(":visible")) {
			$(target).find('.echo-submit-tokbox-container').empty();
			$(element).slideToggle();
			//$(target).find('.echo-submit-content').slideToggle();
			plugin.set(application, "archiveId", null);
			/*application.dom.get("text").iHint({
				"text": "Type your comment here...",
				"className": "echo-secondaryColor"
			})
			*/
			// hide
		} else {
			// show - load tokbox
			$(target).find('.echo-submit-tokbox-container').append($(plugin.templateTokbox));
			
			// locale
			$(target).find(".recorder-title").text(plugin.label("titleRecord"));
			$(target).find(".playback-title").text(plugin.label("titlePlayback"));
			$(target).find(".recorderContainer button").text(plugin.label("buttonCancel"));
			$(target).find(".playerContainer button").text(plugin.label("buttonDelete"));
			
			var text = plugin.label("timelimit").replace('XXX', (plugin.config.get(application, "recordTimeLimit")/1000));
			$(target).find(".recorderContainer button").after($('<small style="display:block;"></small>').text(text));			
			
			//
			//$(target).find('.echo-submit-content').slideToggle();
			$(element).slideToggle();
			
			plugin.getTokboxToken({"apikey": plugin.get(application, "apikey"), "apisecret": plugin.get(application, "apisecret")}, function(data) {
				//
				var recorderManager;
				var recorder;
				var player;
				var recImgData;
		
				var API_KEY = plugin.get(application, "apikey"); //'1127';  // OpenTok sample code key. Replace with your own API key.
									
				var TOKEN = data.token; //'moderator_token';
				
				var width = $(target).find('.echo-submit-tokbox-container').width();
				width = (width/2) - 100;
				
				var VIDEO_HEIGHT = 200;
				var VIDEO_WIDTH = 200;
				
				// Un-comment either of the following to set automatic logging and exception handling.
				// See the exceptionHandler() method below.
				// TB.setLogLevel(TB.DEBUG);
				// TB.addEventListener('exception', exceptionHandler);
		
				function init() {
					recorderManager = TB.initRecorderManager(API_KEY);
					createRecorder();
				}
		
				function createRecorder() {
					var recDiv = document.createElement('div');
					recDiv.setAttribute('id', 'recorderElement');
					$(target).find(".recorderWrapper").append($(recDiv));
					// Cancel Button
					$(target).find(".recorderContainer button").click(function() {
						//$(target).find(".echo-submit-tokbox-button-container button").trigger("click");
						$(target).find('.echo-submit-tokbox-container').empty();
						$(target).find(".echo-submit-tokbox-container").slideToggle();
						plugin.set(application, "archiveId", null);
						//
					});
					//document.getElementById('recorderContainer').appendChild(recDiv);
					recorder = recorderManager.displayRecorder(TOKEN, recDiv.id, {"style": {"showSaveButton": false}, "height": VIDEO_HEIGHT, "width": VIDEO_WIDTH});
					recorder.addEventListener('recordingStarted', recStartedHandler);
					recorder.addEventListener("recordingStopped", recordingStoppedHandler);
					recorder.addEventListener('archiveSaved', archiveSavedHandler);
				}
		
				function getImg(imgData) {
					var img = document.createElement('img');
					img.setAttribute('src', 'data:image/png;base64,' + imgData);
					return img;
				}
		
				function loadArchiveInPlayer(archiveId) {
					if (!player) {
						playerDiv = document.createElement('div');
						playerDiv.setAttribute('id', 'playerElement');
						var el_player = $(playerDiv).hide();
						$(target).find(".playerWrapper").append(el_player);
						$(target).find(".recorderContainer").hide();
						el_player.show();
						//document.getElementById('playerContainer').appendChild(playerDiv);
						player = recorderManager.displayPlayer(archiveId, TOKEN, playerDiv.id, {"height": VIDEO_HEIGHT, "width": VIDEO_WIDTH});
						$(target).find(".playerContainer").css("display", "block");
						$(target).find(".playerContainer button").click(function() {
							recorderManager.removeRecorder(recorder);
							$(target).find(".playerContainer").hide(); // hide
							$(target).find(".recorderContainer").show(); // show							
							plugin.set(application, "archiveId", null);
							$(target).find('.echo-submit-text-area').val("");
						});
						
						/*
						// ADD tokbox TEXT to post text input
						$(target).find('.echo-submit-text-area').val('' +
							'<div class="echo-item-tokbox" data-archive-id="' + archiveId+ '">' + 
								$(target).find(".playerWrapper").html() +
							'</div>');
						*/
						Echo.Broadcast.publish("Submit.Plugins.Tokbox.VideoComment", {"data": {}, "appkey": application.config.data.appkey}, application.config.data.contextId);
						//document.getElementById('playerContainer').style.display = 'block';
					} else {
						player.loadArchive(archiveId);
					}
					//
					plugin.set(application, "archiveId", archiveId);
				}
		
				//--------------------------------------
				//  OPENTOK EVENT HANDLERS
				//--------------------------------------
		
				function recStartedHandler(event) {
					recImgData = recorder.getImgData();
					//
					setTimeout(function() {
						recordingStoppedHandler(event);
					}, plugin.config.get(application, "recordTimeLimit"));
				}
				
				function recordingStoppedHandler(event) {
					recorder.saveArchive();
				}
				
				function archiveSavedHandler(event) {
					loadArchiveInPlayer(event.archives[0].archiveId);
					/*
					document.getElementById('archiveList').style.display = 'block';
					var aLink = document.createElement('a');
					aLink.setAttribute('href', "javascript:loadArchiveInPlayer(\'" + event.archives[0].archiveId + "\')");
					var recImg = getImg(recImgData);
					recImg.setAttribute('style', 'width:80; height:60; margin-right:2px');
					aLink.appendChild(recImg);
					document.getElementById('archiveList').appendChild(aLink);
					*/
				}
		
				function archiveLoadedHandler(event) {
					archive = event.archives[0];
					archive.startPlayback();
				}
		
				/*
				If you un-comment the call to TB.addEventListener('exception', exceptionHandler) above, OpenTok calls the
				exceptionHandler() method when exception events occur. You can modify this method to further process exception events.
				If you un-comment the call to TB.setLogLevel(), above, OpenTok automatically displays exception event messages.
				*/
				function exceptionHandler(event) {
					alert('Exception: ' + event.code + '::' + event.message);
				}
				
				// go
				init();
			});
		};
	});
};

// renderers are executed within the Submit form context
plugin.postButtonRenderer = function(element, dom) {
    var application = this;
    // "element" inside a renderer is a jQuery-wrapped DOM element
	var handler = plugin.get(application, "postButtonHandler");
	if (!handler) {
		handler = function(event) {
			// if there is no text we add something to prevent the error
			if(plugin.get(application, "archiveId") != null) {
				var inputText = dom.get("text").val();
				if(inputText == "") {
					// add lots of spaces yeehaw!
					dom.get("text").val('...');
				};
			};
		};
		plugin.set(application, "postButtonHandler", handler);
    };
	// rebind post button handler
	element.unbind("click", handler).bind("click", handler);
	// call parent renderer
	application.parentRenderer("postButton", arguments);
};

plugin.getTokboxToken = function(params, callback) {
	$.ajax({
		url: window.location.protocol + "//api.realtidbits.com/tokbox_getToken",
		type: "get",
		dataType: "jsonp",
		data: params,
		success: function(data) {
			callback(data);
		}
	});
}

plugin.showHideBrowseButton = function(plugin, application) {
        //console.log(plugin.get(application, "photosTotal"));
        var filesMax = plugin.get(application, "filesMax");
        if(plugin.get(application, "photosTotal") == filesMax) {
                $(application.config.data.target).find(".echo-submit-tokbox-button-container").slideUp();      
        } else {
                $(application.config.data.target).find(".echo-submit-tokbox-button-container").slideDown();    
        }
}

plugin.utils = {};
plugin.utils.removeByElement = function(arrayName,arrayElement) {
        for(var i=0; i<arrayName.length;i++ ) { 
                if(arrayName[i]==arrayElement) {
                        arrayName.splice(i,1); 
                }
        } 
}
plugin.utils.time = function() {
        return Math.round(new Date().getTime() / 1000); 
}


plugin.appendCSS = function(id, path) {
	var head = document.getElementsByTagName('head')[0];
	if (!document.getElementById(id)) {
		var link = document.createElement('link');
		link.id = id;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = path;
		link.media = 'all';
		head.appendChild(link);
	}
}

})(jQuery);
