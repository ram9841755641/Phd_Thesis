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
	"name": "Curation",
	"applications": ["Stream"],
	"dependencies": [{
		"application": "QueryPalette",
		"url": "//cdn.echoenabled.com/clientapps/v2/curation.js"
	}],
	"init": function(plugin, application) {
		plugin.set(application, "queue", []);
		plugin.addCss(plugin.assembleCss());
		plugin.extendRenderer("Item", "status", plugin.renderers.Item.status);
		plugin.extendRenderer("Item", "statusIcon", plugin.renderers.Item.statusIcon);
		plugin.extendRenderer("Item", "statusCheckbox", plugin.renderers.Item.statusCheckbox);
		plugin.extendTemplate("Item", plugin.statusItemTemplate,
			"insertAfter", "echo-item-avatar");
		plugin.extendRenderer("Stream", "curate", plugin.renderers.Stream.curate);
		plugin.extendTemplate("Stream", plugin.curateStreamTemplate,
			"insertAsFirstChild", "echo-stream-header");
		plugin.listenEvents(application);
		plugin.addItemControl(application, plugin.assembleControl("Approve", application));
		plugin.addItemControl(application, plugin.assembleControl("Spam", application));
		plugin.addItemControl(application, plugin.assembleControl("Delete", application));
	}
});

plugin.statusItemTemplate = 
	'<div class="echo-item-status">' +
		'<input type="checkbox" class="echo-item-statusCheckbox">' +
		'<div class="echo-item-statusIcon"></div>' +
		'<div class="echo-clear"></div>' +
	'</div>';

plugin.curateStreamTemplate =
	'<div class="echo-stream-curate echo-linkColor"></div>',

plugin.addLabels({
	"approveControl": "Approve",
	"deleteControl": "Delete",
	"spamControl": "Spam",
	"changingStatusToCommunityFlagged": "Flagging...",
	"changingStatusToModeratorApproved": "Approving...",
	"changingStatusToModeratorDeleted": "Deleting...",
	"changingStatusToUserDeleted": "Deleting...",
	"changingStatusToModeratorFlagged": "Marking as spam...",
	"queries": "Queries",
	"actions": "Actions",
	"curate": "Curate",
	"curation": "Curation",
	"statusCommunityFlagged": "Flagged by Community",
	"statusModeratorApproved": "Approved by Moderator",
	"statusModeratorDeleted": "Deleted by Moderator",
	"statusUserDeleted": "Deleted by User",
	"statusModeratorFlagged": "Flagged by Moderator",
	"statusSystemFlagged": "Flagged by System",
	"statusUntouched": "New"
});

plugin.statuses = [
	"Untouched",
	"ModeratorApproved",
	"ModeratorDeleted",
	"UserDeleted",
	"CommunityFlagged",
	"ModeratorFlagged",
	"SystemFlagged"
];

plugin.control2status = {
	"Spam": "ModeratorFlagged",
	"Delete": "ModeratorDeleted",
	"Approve": "ModeratorApproved"
};

plugin.renderers = {"Item": {}, "Stream": {}};

plugin.renderers.Item.status = function(element) {
	var item = this;
	if (!item.user.isAdmin()) {
		element.hide();
		return;
	}
	if (item.depth) {
		element.addClass('echo-item-status-child');
	}
	var status = item.data.object.status || "Untouched";
	element.addClass("echo-item-status-" + status);
};

plugin.renderers.Item.statusIcon = function(element) {
	var item = this;
	if (!item.user.isAdmin()) return;
	var status = item.data.object.status || "Untouched";
	var title = plugin.label("status" + status);
	element.addClass("echo-item-status-icon-" + status).attr("title", title);
};

plugin.renderers.Item.statusCheckbox = function(element) {
	var item = this;
	if (!item.user.isAdmin()) return;
	element.click(function() {
		plugin.set(item, "selected", !plugin.get(item, "selected"));
		item.publish(plugin.topic("internal.Item", "onSelect"), {"item": item});
	}).attr("checked", plugin.get(item, "selected"));
};

plugin.renderers.Stream.curate = function(element, dom) {
	var stream = this;
	if (!stream.user.isAdmin() || !Echo.QueryPalette) {
		element.hide();
		return;
	}
	element.empty()
		.append('<span class="echo-stream-curate-label">' + plugin.label("curate") + '</span>')
		.show()
		.click(function() {
			plugin.assembleDialog(stream);
			plugin.get(stream, "dialog").open();
		});
};

plugin.extractURI = function(query) {
	var path = query.match(/(?:url|scope|childrenof):(\S+)(?: |$)/);
	return path ? path[1] : window.location.protocol + "//" + window.location.host + "/*";
};

plugin.assembleDialog = function(application) {
	if (plugin.get(application, "dialog")) return;
	var assembleQueryPalette = function(target) {
		var config = plugin.assembleConfig(application, {
			"target": target,
			"query": {
				"path": plugin.extractURI(application.config.get("query")),
				"states": [
					"Untouched",
					"SystemFlagged",
					"CommunityFlagged",
					"ModeratorFlagged"
				],
				"itemsPerPage": application.config.get("itemsPerPage"),
				"sortOrder": application.config.get("sortOrder")
			}
		});
		plugin.set(application, "palette", new Echo.QueryPalette(config));
		plugin.subscribe(application, "QueryPalette.onApply", function(event, data) {
			application.config.set("query", data.query);
			application.refresh();
		});
	};
	var assembleBulkActions = function(target) {
		var config = plugin.assembleConfig(application, {
			"target": target,
			"data": {
				"items": plugin.get(application, "queue")
			}
		});
		plugin.set(application, "bulk", new Echo.BulkActions(config));
	};
	var assembleTabs = function(target) {
		plugin.set(application, "tabs", new Echo.UI.Tabs({
			"target": $(target),
			"content": $(target),
			"addUIClass": false,
			"idPrefix": "curation-tabs-",
			"tabs": [{
				"id": "queries",
				"label": plugin.label("queries"),
				"icon": true,
				"content": assembleQueryPalette
			}, {
				"id": "actions",
				"label": plugin.label("actions"),
				"icon": true,
				"content": assembleBulkActions
			}]
		}));
	};
	plugin.set(application, "dialog", new Echo.UI.Dialog({
		"content": assembleTabs,
		"hasTabs": true,
		"config": {
			"autoOpen": false,
			"open": function() {
				plugin.get(application, "palette").refresh();
			},
			"title": plugin.label("curation"),
			"width": 500,
			"height": 550,
			"minWidth": 450,
			"minHeight": 415,
			"maxHeight": 600
		}
	}));
};

plugin.listenEvents = function(application) {
	plugin.subscribe(application, application.namespace + ".onRerender", function() {
		application.rerender("curate");
	});
	plugin.subscribe(application, plugin.topic("internal.Item", "onSelect"), function(event, data) {
		var item = data.item;
		if (plugin.get(item, "selected")) {
			plugin.get(application, "queue").push(item);
			plugin.assembleDialog(application);
			plugin.get(application, "dialog").open();
			plugin.get(application, "tabs").select("actions");
		} else {
			var queue = plugin.get(application, "queue");
			plugin.set(application, "queue",
				$.foldl([], queue, function(element, acc) {
					if (element.data.unique != item.data.unique) {
						acc.push(element);
					}
				}));
		}
		if (plugin.get(application, "bulk")) {
			plugin.get(application, "bulk").refresh(plugin.get(application, "queue"));
		}
		var action = plugin.get(item, "selected") ? "Select" : "Unselect";
		plugin.publish(application, plugin.topic(application.namespace + ".Item", "on" + action),
			application.prepareBroadcastParams({
				"item": {
					"data": item.data,
					"target": item.dom.content
				}
			}));	
	});
	plugin.subscribe(application, "BulkActions.onStatusChange", function(event, data) {
		var queue = [];
		$.each(plugin.get(application, "queue"), function(i, item) {
			item.block(plugin.label("changingStatusTo" + data.state));
			plugin.set(item, "selected", false);
			queue.push(item);
		});
		plugin.set(application, "queue", []);
		if (plugin.get(application, "bulk")) {
			plugin.get(application, "bulk").refresh([]);
		}
		if (!queue.length) return;
		var activities = $.map(queue, function(item) {
			return {
				"verb": "update",
				"target": item.id,
				"author": item.data.actor.id,
				"field": "state",
				"value": data.state
			};
		});
		$.sendPostRequest(plugin.config.get(application, "submissionProxyURL", "", true), {
			"appkey": application.config.get("appkey"),
			"content": $.object2JSON(activities),
			"target-query": application.config.get("query", ""),
			"sessionID": application.user.get("sessionID", "")
		}, function() {
			application.startLiveUpdates(true);
		});
	});
};

plugin.changeItemStatus = function(item, status) {
	plugin.set(item, "selected", false);
	item.data.object.status = status;
	item.rerender("controls");
	// rerender status recursive
	// since it contains other renderers
	item.rerender("status", true);
};

plugin.assembleControl = function(name, application) {
	var getStatus = function(item) {
		var status = plugin.control2status[name];
		if (!item.user.isAdmin() &&
			name == "Delete" &&
			plugin.config.get(application, "removePersonalItemsAllowed") &&
			item.user.hasIdentity(item.data.actor.id)
		) {
			status = "UserDeleted";
		}
		return status;
	};
	var callback = function() {
		var item = this;
		var status = getStatus(item);
		item.block(plugin.label("changingStatusTo" + status));
		$.get(plugin.config.get(application, "submissionProxyURL", "", true), {
			"appkey": application.config.get("appkey"),
			"content": $.object2JSON({
				"verb": "update",
				"target": item.id,
				"author": item.data.actor.id,
				"field": "state",
				"value": status
			}),
			"target-query": application.config.get("query", ""),
			"sessionID": item.user.get("sessionID", "")
		}, function(data) {
			if (data.result == "error") {
				item.unblock();
			} else {
				plugin.changeItemStatus(item, status);
				application.startLiveUpdates(true);
			}
		}, "jsonp");
	};
	return function() {
		var item = this;
		var status = getStatus(item);
		return {
			"name": name,
			"label": plugin.label(name.toLowerCase() + "Control"),
			"visible": item.data.object.status != status &&
				(item.user.isAdmin() || status == "UserDeleted"),
			"callback": callback
		};
	};
};

plugin.assembleCss = function() {
	var msieCss = "";
	if ($.browser.msie) {
		msieCss =
			'.echo-item-status { zoom: 1; }' +
			'.echo-item-statusCheckbox { margin: 1px; }';
	};
	return '.echo-item-status { width: 48px; height: 24px; }' +
		'.echo-item-status-child { width: 24px; height: 48px; }' +
		'.echo-item-statusCheckbox { float: left; margin: 4px; }' +
		'.echo-item-status-child .echo-item-statusCheckbox { display: block; }' +
		'.echo-item-statusIcon { float: right; margin: 4px; width: 16px; height: 16px; }' +
		// statuses
		'.echo-item-status-Untouched { background: #00aaff; }' +
		'.echo-item-status-ModeratorApproved { background: #bdfb6d; }' +
		'.echo-item-status-ModeratorDeleted { background: #f20202; }' +
		'.echo-item-status-UserDeleted { background: #ff8e8e; }' +
		'.echo-item-status-SystemFlagged, .echo-item-status-CommunityFlagged, .echo-item-status-ModeratorFlagged { background: #ff9e00; }' +
		'.echo-stream-curate { float: right; margin-left: 15px; cursor: pointer; font-family: Arial; font-size: 11px; }' +
		'.echo-curation-tabs-queries span { background: no-repeat center left url("//cdn.echoenabled.com/images/curation/tabs/queries.png"); }' +
		'.echo-curation-tabs-actions span { background: no-repeat center left url("//cdn.echoenabled.com/images/curation/tabs/actions.png"); }' +
		// status icons
		$.map(plugin.statuses, function(name) {
			return '.echo-item-status-icon-' + name + '{ background: url("//cdn.echoenabled.com/images/curation/status/' + name.toLowerCase() + '.png") no-repeat; }';
		}).join("") + msieCss;
};

})(jQuery);

