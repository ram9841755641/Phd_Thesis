function addCssRule(selector, rule) {
    if (document.styleSheets) {
        var css = document.styleSheets[document.styleSheets.length - 1]; // get last css
        if (css.addRule) css.addRule(selector, rule);         // IE
        else if (css.insertRule) css.insertRule(selector + "{" + rule + "}", css.cssRules.length);  // W3C
    }
}
function addListener(el, evname, func) {
    if (el.attachEvent) el.attachEvent("on" + evname, func);
    else if (el.addEventListener) el.addEventListener(evname, func, true);
}
function getCookie(name) {
    name = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') c = c.substring(1);// LTrim
        if (c.indexOf(name) == 0) return c.substring(name.length);
    }
    return null;
}
function syncSession(sid) {
    if (sid) {
        var host = location.host;
        host = host.indexOf("staging.") == 0 ? host.substring(8) : ("staging." + host);
        window._sidImg = new Image;
        window._sidImg.src = "http://" + host + "/session.jsp" + "?JSESSIONID=" + sid;
    }
}
function _getSession() {
    return window.session ? window.session : (window.session = new Array());
}
function setSessionAttribute(name, value) {
    function test() {
    }
    sendServerMsg("/action/sessionAccess?action=setJavaScriptAttribute&name=" + name + "&value=" + value, test);
    _getSession()[name] = value;
}
function getSessionAttribute(name) {
    return _getSession()[name];
}
/** return true if element has that class */
function hasClass(el, className) {
    if (!(el && el.className)) return false;
    var cls = el.className.split(" ");
    for (var i = cls.length; i > 0;) if (cls[--i] == className) return true;
    return false;
}
/** add class to element, if element already had that class - does nothing */
function addClass(el, className) {
    if (!el || hasClass(el, className)) return;
    if (el.className) el.className += " " + className;
    else el.className = className;
}
function confirmAction(url, msg) {
    if (confirm(msg)) document.location = url;
}