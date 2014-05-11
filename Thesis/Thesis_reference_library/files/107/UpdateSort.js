(function($) {

var plugin = Echo.createPlugin({
       "name": "UpdateSort",
       "applications": ["Stream"],
       "init": function(plugin, application) {
			//
			var target = application.config.get(plugin.config("target"));
			var optionsItems = application.config.get(plugin.config("options"));
			//
			//
			var element = $(plugin.template).html('<span>' + plugin.label('sortLabel') + '&nbsp;</span>');
			
			setTimeout(function() {
				if(typeof target == "string") {
					target = $(target);
				};
				target.append(element);
			}, 500);			
			
			// create the drop down
			var el_select = $("<select>").appendTo(element);
			$.each(optionsItems, function(i, optionItem){
				var value = optionItem.sortby + '|' + (optionItem.after ? optionItem.after : ''); // handle null
				el_select.append($("<option>").val(value).text(optionItem.label));
			});
			el_select.change(function() {
				var value = $(this).val();
				var tmp = value.split('|');
				var sortby = tmp[0];
				var after = tmp[1];
				//
				var query = application.config.get("query");
				var new_query = query;
				// split on children so we update the correct part of the query
				
				var query_pieces = new_query.split(/ children\b|children:/gi);
				new_query = query_pieces[0];
				//
				if(new_query.match(/sortOrder:/gi)) {
					new_query = new_query.replace(/sortOrder:.+?\b/i, "sortOrder:" + sortby);
				} else {
					new_query = new_query + " sortOrder:"+sortby
				}
				if(after == null || after == '') {
					// if new sort has no "after:" then remove it
					new_query = new_query.replace(/after:'.+?'/i, '');
				} else {
					// replace "after:" or add it after the "sortOrder:"
					if(new_query.match(/after:/gi)) {
						new_query = new_query.replace(/after:'.+?'/i, "after:" + after);
					} else {
						var new_sortby = "sortOrder:"+sortby;
						var index = new_query.indexOf(new_sortby);
						index = index + new_sortby.length;
						new_query = new_query.substr(0,index) + ' after:' + after + ' ' + new_query.substr(index);
					}
				}
				if(query_pieces.length > 1) {
					new_query = new_query + " children" + query_pieces[1];
				}
				//console.log(new_query)
				// remove any double spaces
				new_query = new_query.replace(/\s{2,}/g,' ');
				//console.log(new_query)
				application.config.set("query", new_query);
				application.refresh();
			});
       }
});

plugin.addLabels({
	"sortLabel": "Sort By:"
});

plugin.template = '<div class="echo-update-sort-container"></div>';

})(jQuery);