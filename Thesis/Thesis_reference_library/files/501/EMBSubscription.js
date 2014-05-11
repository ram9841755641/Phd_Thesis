(function ($) {
    var plugin = Echo.createPlugin({
        "name": "EMBSubscription",
        "applications": ["Submit", "Stream"],
        "init": function (plugin, application) {
            // append css
            plugin.addCss(
				'.echo-email-feed {background:transparent url("http://cdn.realtidbits.com/libs/v1/images/email.jpg") no-repeat 0 center; height: 16px;margin-left:4px;}' +
			'.echo-submit-EMBSubscription-button-container { float:left;position: relative;margin: 0 0 0 10px;padding:5px 0 0;} ' +
			'.echo-submit-EMBSubscription-button-container button {font-size:11px;text-decoration:none;}' +
			'.echo-submit-EMBSubscription-button-container {cursor:pointer;}' +
			'.echo-submit-EMBSubscription-button-container:hover {text-decoration:underline;}' +
				'.echo-email-feed a {display:block;min-width:16px;min-height: 16px;}' +
				'.echo-email-submit-checkbox {font-size:0.8em;color:#777;float:left;white-space: nowrap;}'
			, 'RSSFeed');
            //
            plugin.vars = plugin.vars || {}; // init the plugin vars
            plugin.set(plugin, "appkey", application.config.get("appkey"));
            plugin.set(plugin, "query", application.config.get("query"));
            //
            if (application instanceof Echo.Submit) {
                // submit
                // extending template and insert extra HTML to the necessary area
                plugin.extendTemplate("Submit", plugin.templateSubmit, "insertAsFirstChild", "echo-submit-controls");

                plugin.extendRenderer("Submit", "controls", function (element, dom) {
                    var self = this;
                    // call parent renderer
                    self.parentRenderer("controls", arguments);
                    /*var email = plugin.getUserEmail();
                    if(email != "" && email != null) {
                    element.find(".echo-email-submit-checkbox").append($(' <span>(' + email + '[x])</span>'))
                    }
                    */
                    var button = element.find(".echo-submit-EMBSubscription-button-container button");
                    button.text(plugin.label("submitSubscribe"));

                    button.click(function () {
                        $(this).blur()
                        var subscribeCheckbox = $(this).parent().find(".echo-email-submit-checkbox input[name='echo-subscribe']");
                        if (subscribeCheckbox.is(':checked')) {
                            // uncheck
                            subscribeCheckbox.attr('checked', false);
                            $(this).removeClass("btn-info");
                        } else {
                            // check
                            subscribeCheckbox.attr('checked', true);
                            $(this).addClass("btn-info");
                        };
                    });
                });
            } else if (application instanceof Echo.Stream) {
                // stream
                if (application.user.logged() && plugin.config.get(application, "itemControls") != false) {
                    plugin.addItemControl(application, function () {
                        return {
                            "name": "Subscribe",
                            "label": plugin.label("link"),
                            "callback": plugin.commentSubscribe
                        }
                    });
                }
                //
                if (plugin.config.get(application, "subscribeEmail")) {
                    // use the pres param
                    plugin.set(plugin, "email", plugin.config.get(application, "subscribeEmail"));
                }
                else {
                    // init to blank
                    plugin.set(plugin, "email", "");
                }
                //
                var title = plugin.config.get(application, "title");
                if (typeof plugin.config.get(application, "target") != 'undefined') {
                    var el = $('<div class="echo-email-feed"><a href="javascript:void(0);">' + (title ? title : plugin.label("link")) + '</a></div>');
                    el.find("a").click(function () {
                        plugin.commentSubscribe(null, application, true);
                    });
                    $(plugin.config.get(application, "target")).append(el);
                }
            };
            // subscribe to events
            plugin.listenEvents(plugin, application);
        }
    });

    plugin.addLabels({
        "submitSubscribe": "Follow Conversation",
        "link": " ",
        "subscribeButton": "Subscribe",
        "cancelButton": "Cancel",
        "enterEmail": "Enter your email to subscribe to new comments:",
        "userEmail": "Your email address:",
        "userName": "Your name:",
        "noEmail": "No email available to subscribe you to replies to this comment.",
        "success": "Your are now subscribed to new replies.",
        "notValid": "Email address is not valid."
    });

    plugin.templateSubmit = '' +
	'<div class="echo-submit-EMBSubscription-button-container">' +
		'<button class="btn btn-mini bt-no-radius"></button>' +
		'<div class="echo-email-submit-checkbox" style="display:none;">' +
			'<input type="checkbox" name="echo-subscribe" />' +
		'</div>'
    '</div>';

    plugin.listenEvents = function (plugin, application) {
        //
        var defaultChecked = plugin.config.get(application, "defaultChecked");
        //
        application.subscribe("Submit.onRender", function (topic, data) {
            var subscribeCheckbox = $(data.target).find(".echo-email-submit-checkbox input[name='echo-subscribe']");
            if (defaultChecked) {
                subscribeCheckbox.attr('checked', true);
                $(data.target).find(".echo-submit-EMBSubscription-button-container button").addClass("btn-info");
            }
        });
        application.subscribe("Submit.onPostInit", function (topic, data) {
            if (topic != "Submit.onPostInit") return;
            var subscribeCheckbox = $(data.target).find(".echo-email-submit-checkbox input[name='echo-subscribe']");
            // check if checkbox is set
            if (subscribeCheckbox.is(':checked')) {
                // set the targetURL ourselves
                plugin.commentSubscribe(data.targetURL, application, false);
            };
            $(data.target).find(".echo-submit-EMBSubscription-button-container button").removeClass("btn-info");
            // regardless if user subscribed uncheck it
            subscribeCheckbox.attr('checked', false);
        });
    }

    plugin.getUserEmail = function () {
        var user = new Echo.User({ "appkey": plugin.get(plugin, "appkey") });
        user.init();
        var account = user.getActiveAccounts();
        var email = plugin.get(plugin, "email");
        if (email == "") {
            email = null;
            //email = plugin.getCookie("echo_subscribe_email");
        }
        if (email == "" || email == null) {
            if (account.length) {
                if (account[0].emails) {
                    $.each(account[0].emails, function (id, data) {
                        if (data.primary == "true") {
                            email = data.value;
                            plugin.set(plugin, "email", email);
                        }
                    });
                } else {
                    if (user.account.poco.entry.accounts[0].emails != null) {
                        email = user.account.poco.entry.accounts[0].username.emails[0].value;
                        plugin.set(plugin, "email", email);
                    }
                }
            }
        }
        return email
    }

    plugin.commentSubscribe = function (objectID, application, showAlert) {
        //
        Echo.Broadcast.publish("Echo.Plugins.EMBSubscription.subscribe", { "data": {}, "appkey": application.config.data.appkey }, application.config.data.contextId);
        //
        if (typeof showAlert == "undefined") showAlert = true;
        var objectID = (objectID ? objectID : this.id);
        // if the email plugin param is set then use it, else use the login email if available
        var haveEmail = false;
        var user = new Echo.User({ "appkey": plugin.get(plugin, "appkey") });
        user.init();
        var account = user.getActiveAccounts();
        var email = plugin.get(plugin, "email");
        var displayName = "";
        if (email == "") {
            email = null;
            //email = plugin.getCookie("echo_subscribe_email");
        }
        if (email == "" || email == null) {
            if (account.length) {
                if (account[0].emails) {
                    $.each(account[0].emails, function (id, data) {
                        if (data.primary == "true") {
                            email = data.value;
                            plugin.set(plugin, "email", email);
                            haveEmail = true;
                        }
                    });
                } else {
                    if (user.account.poco.entry.accounts[0].emails != null) {
                        email = user.account.poco.entry.accounts[0].username.emails[0].value;
                        plugin.set(plugin, "email", email);
                        // show the label
                        haveEmail = true;
                    }
                }
            }
            if (email == "" || email == null) {
                // check cookie

                function isEmail(str) { re = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/; if (str.match(re)) { return true; } else { return false; }; }

                var emailForm = $('<div><b>' + plugin.label("enterEmail") + '</b></br>' +
					'<div class="echo-email-error">&nbsp;</div>' +
					plugin.label("userEmail") + '<br> ' +
					'<input type="text" id="em_email" name="email" style="width:225px;" /><br> ' +
					plugin.label("userName") + '<br> ' +
					'<input type="text" id="em_name" name="displayName" style="width:225px;" /> <p>' +
					'<input type="submit" class="realtidbits-button-submit" name="subscribe" value="' + plugin.label("subscribeButton") + '" />' +
					'<button name="cancel">' + plugin.label("cancelButton") + '</button>' +
					'</p></div>');
                emailForm.find('input[name="subscribe"]').click(function () {
                    //
                    var email = emailForm.find('#em_email').val();
                    var displayName = emailForm.find('#em_name').val();
                    if (isEmail(email)) {
                        // save the email
                        //plugin.setCookie("echo_subscribe_email", email, 30);
                        plugin.set(plugin, "email", email);
                        $.fancybox.close();
                        plugin.sendSubscribe(objectID, email, displayName, application, showAlert);
                    } else {
                        //
                        emailForm.find('.echo-email-error').html($('<span style="color:red">Please enter a valid email!</span>'));
                    }
                });
                emailForm.find('button[name="cancel"]').click(function () {
                    $.fancybox.close();
                });

                $.fancybox({
                    "modal": false,
                    'hideOnOverlayClick': true,
                    'hideOnContentClick': false,
                    'enableEscapeButton': true,
                    "showCloseButton": false,
                   // "width": 350,
                    //"height": 300,
                    "autoDimensions": true,
					'autoScale': true,
                    //"title": "xxx",
                    //"titlePosition": "inside",
                    "centerOnScroll": true,
                    "content": emailForm
                })
                return;
            }
        }
        else {
            haveEmail = true;
        }
        if (haveEmail) {
            plugin.sendSubscribe(objectID, email, displayName, application, showAlert);
        }
        else {
            // indicate a problem subscribing
            //alert(plugin.label("noEmail"));
        }
    };

    plugin.sendSubscribe = function (objectID, email, displayName, application, showAlert) {
        //
        // build the custom query and submit the subscription
        /*var query = plugin.get(plugin, "query"); //"childrenof:" + objectID;
        var tmp = query.split(" ");
        tmp[0] = "childrenof:" + objectID;
        query = tmp.join(" ");
        */
        var rxEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (rxEmail.test(email)) {
            var hurl = $(location).attr("href");
            var hname = $(document).attr("title");
            var cmd = "subscribe";
            var params = {
                "query": (typeof objectID == 'undefined' || !objectID ? application.config.get("query") : "childrenof:" + objectID + " itemsPerPage:25 sortOrder:reverseChronological -state:ModeratorDeleted -user.state:ModeratorBanned,ModeratorDeleted children:2 -state:ModeratorDeleted -user.state:ModeratorBanned,ModeratorDeleted"),
                "appkey": plugin.get(plugin, "appkey"),
                "email": email,
                "displayName" : displayName,
                "cmd": cmd,
                "hurl": hurl,
                "hname": hname,
                "expire": "999",
                "format": "jsonp"
            };
            //console.log(params)
            // $.get function will send the HTTP GET request to the URL
            // specified in the first argument, the "params" object contains
            // the necessary GET parameters
            try {
                var EBURL = "https://api.embarke.com";
                $.get(EBURL + "/v1/public/echosubscribe",
                      params,
                      function (data) {
                      },
                      "jsonp");
            } catch (e) { }
            // notify the user
            //alert(plugin.label("success"));
            if (showAlert) {
                $.fancybox({
                    "modal": false,
                    'hideOnOverlayClick': true,
                    'hideOnContentClick': true,
                    'enableEscapeButton': true,
                    "showCloseButton": false,
                    "width": 325,
                    "height": 40,
                    "autoDimensions": false,
                    "centerOnScroll": true,
                    "content": plugin.label("success")
                });
            };
        } else {
            plugin.set(plugin, "email", "");
            //alert(plugin.label("notValid"));
        }
    };

    plugin.setCookie = function (c, d, b) { if (b) { var a = new Date; a.setTime(a.getTime() + b * 864E5); b = "; expires=" + a.toGMTString() } else b = ""; document.cookie = c + "=" + d + b + "; path=/" }
    plugin.getCookie = function (c) { c += "="; for (var d = document.cookie.split(";"), b = 0; b < d.length; b++) { for (var a = d[b]; a.charAt(0) == " "; ) a = a.substring(1, a.length); if (a.indexOf(c) == 0) return a.substring(c.length, a.length) } return null }
    plugin.deleteCookie = function (c) { plugin.setCookie(c, "", -1) };

})(jQuery);