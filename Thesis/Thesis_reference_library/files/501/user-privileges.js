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
	"name": "UserPrivileges",
	"applications": ["Stream"],
	"init": function(plugin, application) {
		plugin.addItemControl(application,
			plugin.assembleControl("GrantPermissions", application));
		plugin.addCss(plugin.css);
	}
});

plugin.addLabels({
	"moderatorRole": "Moderator",
	"administratorRole": "Administrator",
	"userControl": "Demote to User",
	"moderatorControl": "Promote to Moderator",
	"administratorControl": "Promote to Admin",
	"setRoleAction": "Setting up '{role}' role...",
	"unsetRoleAction": "Removing '{role}' role..."
});

plugin.roles = ["", "moderator", "administrator"];

plugin.assembleControl = function(action, application) {
	var callback = function() {
		var item = this;
		var role = plugin.getRole(item);
		var next = plugin.getNextRole(role);
		var roles = next != ""
			? (item.data.actor.roles || []).concat(next)
			: $.foldl([], item.data.actor.roles || [], function(_role, acc) {
				if ($.inArray(_role, plugin.roles) < 0) acc.push(_role);
			});
		var label = next == "" ? "unset" : "set";
		item.controls[plugin.name + "." + action].element
			.empty()
			.append(plugin.label(label + "RoleAction", {"role": next || role}));
		$.get(plugin.config.get(application, "submissionProxyURL", "", true), {
			"appkey": application.config.get("appkey"),
			"content": $.object2JSON({
				"endpoint": "users/update",
				"field": "roles",
				"value": roles.length ? roles.join(",") : "-",
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
					plugin.applyUserRolesUpdate(child, item, roles);
				});
				plugin.applyUserRolesUpdate(thread, item, roles);
			});
		}, "jsonp");
	};
	return function() {
		var item = this;
		var role = plugin.getRole(item);
		var template = (role
			? '<span class="echo-item-control-role echo-item-control-role-{Data:role}">{Data:label}</span>' +
				'(<span class="echo-clickable">{Data:button}</span>)'
			: '<span class="echo-clickable">{Data:button}</span>'
		);
		var label = item.substitute(template, {
			"role": role,
			"label": role ? plugin.label(role + "Role") : "",
			"button": plugin.label((plugin.getNextRole(role) || "user") + "Control")
		});
		return {
			"name": action,
			"label": label,
			"visible": item.data.actor.id != item.user.get("fakeIdentityURL") &&
				item.user.hasAny("roles", ["administrator"]),
			"callback": callback,
			"onetime": true
		};
	};
};

plugin.getRole = function(item) {
	var result = "";
	$.each(item.data.actor.roles || [], function(id, role) {
		if ($.inArray(role, plugin.roles) > 0) {
			result = role;
			if (role == "administrator") {
				return false; // break;
			}
		}
	});
	return result;
};

plugin.getNextRole = function(role) {
	return plugin.roles[($.inArray(role, plugin.roles) + 1) % plugin.roles.length];
};

plugin.applyUserRolesUpdate = function(target, source, roles) {
	if (target.data.actor.id != source.data.actor.id) return;
	target.data.actor.roles = roles;
	target.rerender();
};

plugin.css =
	".echo-item-control-role { margin-right: 3px; }" +
	".echo-item-control-role-moderator { color: #0000FF; }" +
	".echo-item-control-role-administrator { color: #008000; }";

})(jQuery);

