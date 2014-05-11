(function($) {

var plugin = Echo.createPlugin({
	"name": "EditComments",
	"applications": ["Stream", "Submit"],
	"dependencies": [{
		"application": "Submit",
		"url": "//cdn.echoenabled.com/clientapps/v2/submit.js"
	}],
	"init": function(plugin, application) {
		if (application instanceof Echo.Stream) {
			var layout = plugin.config.get(application, "layout");
			if (!layout || !/^(?:popup|inline)$/.test(layout)) {
				plugin.config.set(application, "layout", "popup");
			}
			plugin.addCss(plugin.css);
			plugin.listenEvents(application);
			plugin.addItemControl(application, plugin.assembleControl(application));
		} else if (application instanceof Echo.Submit) {
			plugin.extendTemplate("Submit", plugin.template,
				"insertAfter", "echo-submit-post-container");
			plugin.extendRenderer("Submit", "cancelButton", function(element) {
				var application = this;
				element.click(function() {
					application.publish("Submit.onEditError",
						application.prepareBroadcastParams());
				});
			});
		}
	}
});

plugin.template =
	'<div class="echo-submit-cancelButton-container">' +
		'<a href="javascript:void(0);" class="echo-submit-cancelButton echo-primaryFont echo-clickable echo-linkColor">' + plugin.label("cancel") + '</a>' +
	'</div>';

plugin.addLabels({
	"edit": "Edit",
	"editControl": "Edit",
	"updating": "Updating...",
	"cancel": "cancel"
});

plugin.popupClose = function(item) {
	if (plugin.get(item, "popup")) {
		plugin.get(item, "popup").close();
	}
};

plugin.submitConfig = function(application, item, target) {
	return plugin.assembleConfig(application, {
		"target": target,
		"data": item.data,
		"mode": "edit",
		"targetURL": item.id
	});
};

plugin.callbacks = {"inline": {}, "popup": {}};

plugin.callbacks.inline = {
	"control": function(application) {
		var item = this;
		var config = plugin.submitConfig(application, item, item.dom.get("subcontainer"));
		config.plugins.push({"name": "EditComments"});
		if(plugin.config.get(application, "richTextEditor")) {
			config.plugins.push({
				"name": "RichTextEditor",
				"cleditorConfig": plugin.config.get(application, "cleditorConfig")
			});
		};
		new Echo.Submit(config);
		item.dom.content.get(0).scrollIntoView(true);
	},
	"events": {
		"complete": function(item) {
			item.rerender();
		}
	}
		
};

plugin.callbacks.inline.events.error = plugin.callbacks.inline.events.complete;

plugin.callbacks.popup = {
	"control": function(application) {
		var item = this;
		plugin.popupClose(item);
		var popup = new Echo.UI.Dialog({
			"content": function(target) {
				$(target).addClass("echo-edit-item-container");
				var config = plugin.submitConfig(application, item, target);
				config.plugins.push({"name": "Edit"});
				new Echo.Submit(config);
			},
			"config": {
				"autoOpen": true,
				"title": plugin.label("edit"),
				"width": 400,
				"height": 320,
				"minWidth": 300,
				"minHeight": 320
			}
		});
		plugin.set(item, "popup", popup);
	},
	"events": {
		"init": function(item) {
			item.block(plugin.label("updating"));
		},
		"complete": function(item) {
			plugin.popupClose(item);
		},
		"error": function(item) {
			plugin.popupClose(item);
			item.unblock();
		}
	}
};

plugin.assembleControl = function(application) {
	return function() {
		var item = this;
		return {
			"name": "Edit",
			"label": plugin.label("editControl"),
			"visible": item.user.isAdmin() || item.user.hasIdentity(item.data.actor.id),
			"callback": function() {
				var layout = plugin.config.get(application, "layout");
				plugin.callbacks[layout].control.call(item, application);
			} 

		};
	};
};

plugin.listenEvents = function(application) {
	var callbacks = plugin.callbacks[plugin.config.get(application, "layout")].events;
	$.each(["Init", "Complete", "Error"], function(i, stage) {
		plugin.subscribe(application, "Submit.onEdit" + stage, function(topic, args) {
			var item = application.items[args.data.unique];
			var handler = callbacks[stage.toLowerCase()];
			if (item && handler) handler(item);
		});
	});
};

plugin.css = 
	'.echo-edit-item-container .echo-submit-container { margin: 10px; }'+
	'.echo-submit-cancelButton { float: right; margin: 6px 15px 0px 0px; }';

})(jQuery);