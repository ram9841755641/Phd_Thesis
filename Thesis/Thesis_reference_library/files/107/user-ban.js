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
	"name": "UserBan",
	"applications": ["Stream"],
	"init": function(plugin, application) {
		plugin.addItemControl(application,
			plugin.assembleControl("Ban", application));
		plugin.addItemControl(application,
			plugin.assembleControl("Unban", application));
		plugin.addCss(plugin.css);
	}
});

plugin.addLabels({
	"banUser": "Ban User",
	"unbanUser": "Unban",
	"userBanned": "Banned User",
	"processingAction": "Setting up '{state}' user state..."
});

plugin.controlLabels = {
	"banned": '<span class="echo-item-control-state echo-item-control-state-banned">' +
		plugin.label("userBanned") + '</span>' +
		'(<span class="echo-clickable">' + plugin.label("unbanUser") + '</span>)',
	"unbanned": '<span class="echo-clickable">' + plugin.label("banUser") + '</span>'
};

plugin.assembleControl = function(action, application) {
	var callback = function() {
		var item = this;
		var newState = action == "Ban" ? "ModeratorBanned" : "Untouched";
		item.controls[plugin.name + "." + action].element
			.empty()
			.append(plugin.label("processingAction", {"state": newState}));
		$.get(plugin.config.get(application, "submissionProxyURL", "", true), {
			"appkey": application.config.get("appkey"),
			"content": $.object2JSON({
				"endpoint": "users/update",
				"field": "state",
				"value": newState,
				"identityURL": item.data.actor.id,
				"username": item.data.actor.title
			}),
			"target-query": application.config.get("query", ""),
			"sessionID": application.user.get("sessionID", "")
		}, function(data) {
			if (!data || data.result == "error") {
				item.rerender();
				return;
			}
			$.map(application.threads, function(thread) {
				thread.traverse(thread.children, function(child) {
					plugin.applyUserStateUpdate(child, item, newState);
				});
				plugin.applyUserStateUpdate(thread, item, newState);
			});
		}, "jsonp");
	};
	return function() {
		var item = this;
		var isBanned = plugin.isUserBanned(item);
		var visible = item.data.actor.id != item.user.get("fakeIdentityURL") &&
			isBanned ^ (action == "Ban");
		return {
			"name": action,
			"label": plugin.controlLabels[isBanned ? "banned" : "unbanned"],
			"visible": visible && item.user.isAdmin(),
			"callback": callback,
			"onetime": true
		};
	};
};

plugin.applyUserStateUpdate = function(target, source, state) {
	if (target.data.actor.id != source.data.actor.id) return;
	target.data.actor.status = state;
	target.rerender();
};

plugin.isUserBanned = function(item) {
	return item.data.actor.status == "ModeratorBanned";
};

plugin.css =
	".echo-item-control-state { margin-right: 3px; }" +
	".echo-item-control-state-banned { color: #FF0000; }";

})(jQuery);

