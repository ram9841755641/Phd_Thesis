// vim: set ts=8 sts=8 sw=8 noet:
/*
 * Copyright (c) 2006-2011 Echo <solutions@aboutecho.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 * Version: v2.6.34
 */

(function($) {
 
var plugin = Echo.createPlugin({
	"name": "SubmitTextCounter",
	"applications": ["Submit"],
	"init": function(plugin, application) {
		plugin.extendRenderer("Submit", "text",
			plugin.renderers.Submit.text);
		plugin.extendRenderer("Submit", "counterLabel",
			plugin.renderers.Submit.counterLabel);
		plugin.extendTemplate("Submit",
			plugin.counterTemplate, "insertAfter", "echo-submit-content");
		plugin.listenEvents(application);
	}
});
 
plugin.addLabels({
	"limited": "{typed}/{left} characters",
	"unlimited": "{typed} characters"
});
 
plugin.counterTemplate = '<div class="echo-submit-counterLabel echo-primaryFont echo-primaryColor"></div>';

plugin.renderers = {"Submit": {}};
 
plugin.renderers.Submit.text = function(element, dom) {
	var application = this;
	application.parentRenderer("text", arguments);
	var limit = plugin.config.get(application, "limit", 0);
	var handler = plugin.get(application, "keyPressHandler");
	if (!handler) {
		handler = function() {
			if (limit) {
				var text = element.val();
				if (text.length <= limit) {
					plugin.set(application, "text", text);
				} else if (text.length > limit) {
					element.val(plugin.get(application, "text"));
					return;
				}
			}
			application.rerender("counterLabel");
		};
		plugin.set(application, "keyPressHandler", handler);
	}
	element.unbind("blur focus keyup keypress", handler).bind("blur focus keyup keypress", handler);
};
 
plugin.renderers.Submit.counterLabel = function(element, dom) {
	var application = this;
	if (application.config.get("mode") == "compact") {
		element.hide();
		return;
	}
	var typed = dom.get("text").val().length;
	var limit = plugin.config.get(application, "limit", 0);
	var label = plugin.label(
		plugin.config.get(application, "label", limit ? "limited" : "unlimited"),
		{"typed": typed, "left": Math.max(limit - typed, 0), "limit": limit}
	);
	element.text(label);
};

plugin.listenEvents = function(application) {
	plugin.subscribe(application, "Submit.onPostComplete", function() {
		application.rerender("counterLabel");
	});
};
 
})(jQuery);

