(function ($) {
var plugin = Echo.createPlugin({
	"name": "sanitize",
	"applications": ["Submit", "Stream"],
	"init": function (plugin, application) {
		//
		if(application instanceof Echo.Submit){
			application.subscribe("Submit.onPostInit", function(topic, data) {
				// strip html
				if(plugin.config.get(application, "stripHtml") == true) {
					// strip all html
					var text = data.postData.content;
					var text2 = $('<span>' + text + '<span>');
					data.postData.content = text2.text();
				} else {
					// strip dangerous tags
					
				};
			});
		} else if (application instanceof Echo.Stream){
			plugin.extendRenderer("Item", "body", plugin.bodyRenderer);
		};
	}
});

/*
div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,time, mark, audio, video
*/

plugin.bodyRenderer = function(element, dom) {
	var item = this;
	this.parentRenderer("body", arguments);
	//
	var settings = plugin.config.get(this, "settings");
	if(!settings) {
		settings = {}
	}
	// remove "style" attributes
	if(plugin.config.get(this, "stripHtml") == true) {
		//
		//var text = element.text();
		//element.text(text);
		$(element).find(".echo-item-text [style]").each(function (i) {
			// remove any inline style
			$(this).removeAttr("style");
		});
	};
	//
	var defaultTagsRemove = ["script", "style", "form", "applet"];
	// remove specific html tags
	var tagsRemove = settings.tags;
	if(typeof tagsRemove != "undefined") {
		for(i=0; i<tagsRemove.length; i++) {
			$(element).find(tagsRemove[i]).each(function() {
				var txt = $(this).text();
				$(this).replaceWith(txt);
			});
		};
	}
	for(i=0; i<defaultTagsRemove.length; i++) {
		$(element).find(defaultTagsRemove[i]).each(function() {
			$(this).remove();
		});
	};
	// remove all html tags but whitelisted
	// http://stackoverflow.com/questions/2392931/how-do-i-strip-all-html-tags-in-javascript-with-exceptions
	var tagsWhitelist = settings.tagWhitelist;
	if(typeof tagsWhitelist != "undefined") {
		for(i=0; i<tagsWhitelist.length; i++) {
			$(element).find(tagsRemove[i]).remove();
		};
	}
	// remove external links
	var externalLinks = settings.externalLinks;
	var validDomains = settings.validDomains;
	if(typeof externalLinks != "undefined" && externalLinks == true) {
		$(element).find("a").each(function() {
			var href = $(this).attr("href");
			if(!href) return; // stop if not href
			if($(this).find("img").length > 0) return; // stop if <a><img>
			var removeEl = true;
			for(i=0; i<validDomains.length; i++) {
				if(href.indexOf(validDomains[i]) >= 0) {
					removeEl = false;
				}
			}
			if(removeEl) $(this).remove();
		});
	}
	//
	var itemText = $(element).html();
	var itemJustText = $(element).text();
	//
	var removeTypes = settings.types;
	if(typeof removeTypes != "undefined" && removeTypes.length) {
		for(i=0; i<removeTypes.length; i++) {
			switch(removeTypes[i]) {
				case 'email':
					var reg = new RegExp("[A-Z0-9._%+-]+@[A-Z0-9\.-]+[a-zA-Z]{2,}", "gi");
					var result;
					while ((result = reg.exec(itemJustText)) !== null) {
						itemText = itemText.replace(result[0], plugin.asterix(result[0].length));
					}
				break;
				case 'phone':
					// north american numbers
					var reg = new RegExp("[0-9.+-]{10,}", "gi");
					var result;
					while ((result = reg.exec(itemJustText)) !== null) {
						itemText = itemText.replace(result[0], plugin.asterix(result[0].length));
					}
					var reg = new RegExp("[0-9]{3}-?\\.? ?[0-9]{3}-?\\.? ?[0-9]{4}", "gi");
					var result;
					while ((result = reg.exec(itemJustText)) !== null) {
						itemText = itemText.replace(result[0], plugin.asterix(result[0].length));
					}
					// internation type numbers
					var reg = new RegExp("(((\\+|00)3[12] ?(\\(0\\))?)|0)([0-9]{2}-? ?[0-9]{7})|([0-9]{3}-? ?[0-9]{6})|([0-9]{1}-? ?[0-9]{8})", "gi");
					var result;
					while ((result = reg.exec(itemJustText)) !== null) {
						itemText = itemText.replace(result[0], plugin.asterix(result[0].length));
					}
				break;
			}
		}
	}
	// set item text
	$(element).html(itemText);
};

plugin.asterix = function(n) {
	var output = "";
	for(i=0; i<n; i++) {
		output += "*";
	}
	return output;
}

})(jQuery);