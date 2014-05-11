/* This module allows to automate tracking of various events and responding to them, i.e sending an ajax request on clicks.
 *  See achs-track.js as an example of use case. */
var Track = {};
(function(undefined) {
    var jquery = typeof jQuery != 'undefined';

    var elements = {};

    var userAgent = navigator.userAgent.toLowerCase();

    var defaultAjaxSettings = {
        // webkit browsers abort async ajax requests if new page is requested in the same window
        async: !/webkit/.test(userAgent),
        asynchronous: !/webkit/.test(userAgent), // prototype
        cache: false,
        // jQuery raises an exception if ajax request times out in IE and a new page is requested in the same window
        timeout: /msie/.test(userAgent) ? 0 : 100,
        requestTimeout: /msie/.test(userAgent) ? 0 : 100, // prototype
        contentType: 'application/x-www-form-urlencoded',
        url: '/action/clickThrough'
    };

    var extend = function(dst, src) {
        if (jquery) {
            extend = jQuery.extend;
        } else {
            extend = Object.extend;
        }
        return extend(dst, src);
    };

    var each = function(o, iterator) {
        if (jquery) {
            each = jQuery.each;
        } else {
            each = function(object, callback) {
                var name, i = 0,
                        length = object.length,
                        isObj = length === undefined || typeof object === "function";

                if (isObj) {
                    for (name in object) {
                        if (callback.call(object[ name ], name, object[ name ]) === false) {
                            break;
                        }
                    }
                } else {
                    for (var value = object[0];
                         i < length && callback.call(value, i, value) !== false; value = object[++i]) {
                    }
                }
                return object;
            };
        }
        return each(o, iterator);
    };

    var bind = function(selector, options, callback) {
        var jQueryBind = function(selector, options, callback) {
            jQuery(selector).bind(options.on, options, callback);
        };
        var prototypeBind = function(selector, options, callback) {
            $$(selector).each(function(el) {
                Event.observe(el, options.on, callback.bindAsEventListener(this, options));
            });
        };
        if (jquery) {
            bind = jQueryBind;
        } else {
            bind = prototypeBind;
        }
        return bind(selector, options, callback);
    };

    var unbind = function(selector, options, callback) {
        var jQueryUnbind = function(selector, options, callback) {
            jQuery(selector).unbind(options.on, options, callback);
        };
        var prototypeUnbind = function(selector, options, callback) {
            $$(selector).each(function(el) {
                Event.stopObserving(el, options.on);
            });
        };
        if (jquery) {
            bind = jQueryUnbind;
        } else {
            bind = prototypeUnbind;
        }
        return unbind(selector, options, callback);
    };

    var ajax = function(options) {
        if (jquery) {
            ajax = jQuery.ajax;
        } else {
            ajax = function(options) {
                options.parameters = options.data;
                new Ajax.Request(options.url, options);
            }
        }
        ajax(options);
    };


    var defaultFire = function(options, data) {
        var ajaxSettings = extend(extend({}, defaultAjaxSettings), options.ajaxSettings);
        ajaxSettings.data = extend(extend({}, ajaxSettings.data), data);
        ajax(ajaxSettings);
    };

    var defaultOptions = {
        on: 'click',
        fire: defaultFire,
        data: {}
    };

    var methods = {
        setup: function(options) {
            if (options.fire !== undefined) {
                defaultFire = options.fire;
            }
            if (options.options !== undefined) {
                defaultOptions = extend(extend({}, defaultOptions), options.options);
            }
            if (options.ajax !== undefined) {
                defaultAjaxSettings = extend(extend({}, defaultAjaxSettings), options.ajax);
            }
        },


        init : function(el) {
            each(elements = el, function(selector, options) {
                options = extend(extend({}, defaultOptions), options);
                if (options.fire !== undefined) {
                    bind(selector, options, methods.onEvent);
                }
            });
            return this;
        },

        destroy : function() {
            elements.each(function(selector, options) {
                unbind(selector, options.on, options.fire);
            });
            return this;
        },

        onEvent : function(event, options) {
            if (options == undefined) {
                options = event.data;
            }
            var data = options.data;
            var addData = options.addData;
            if (typeof addData == 'function') {
                extend(data, addData(options));
            }
            options.fire(options, data);
            return true;
        }
    };

    Track = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        }
    };
})();
