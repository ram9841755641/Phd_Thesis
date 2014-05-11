(function ($) {
    var plugin = Echo.createPlugin({
        "name": "RSSFeed",
        "applications": ["Stream"],
        "init": function (plugin, application) {
			plugin.vars = plugin.vars || {}; // init the plugin vars
			plugin.set(plugin, "appkey", application.config.get("appkey"));
			//
			if(application.user.logged() && plugin.config.get(application, "itemControls") != false) {
				plugin.addItemControl(application, function () {
					return {
						"name": "RSSFeed",
						"label": plugin.label("link"),
						"callback": plugin.commentRSS
					}
				});
			}

			// append css
			plugin.addCss(
				'.echo-rss-feed {background:transparent url("http://cdn.realtidbits.com/libs/v1/images/rss.png") no-repeat 0 center; height: 16px;}' +
				'.echo-rss-feed a {display:block;min-width:16px;min-height: 16px;}'
			, 'RSSFeed');
			// add RSS link (only unique urls)
			if(typeof plugin.config.get(application, "target") != 'undefined') {
				var title = plugin.config.get(application, "title");
				var href = plugin.getRSSLink(application,application.config.get("query"), title);
				var el = $('<div class="echo-rss-feed"><a href="' + href + '" target="_blank">' + plugin.label("link") + '</a></div>');
				$(plugin.config.get(application, "target")).append(el);
			};
        }
    });

	plugin.addLabels({
		"link": " "
	});

    plugin.getRSSLink = function (application, query, title) {
		var params = {
			"query": query,
			"appkey": plugin.get(plugin, "appkey"),
			"title": title || location.href,
			"link": plugin.config.get(application, "link") || '',
			"permalink": location.href
		};
        return "http://api.realtidbits.com/rss?" + $.param(params);
    };

    plugin.commentRSS = function () {
		var application = this;
        var objectID = this.id;
		var title = $(location).attr("href");
        //
		var query = (typeof objectID == 'undefined' ? plugin.get(plugin, "query") : "childrenof:" + objectID + " -state:ModeratorDeleted -user.state:ModeratorBanned,ModeratorDeleted safeHTML:off");
		//
		window.open(plugin.getRSSLink(application, query, title));
    };

})(jQuery);