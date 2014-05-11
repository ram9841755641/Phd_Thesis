(function(a){if(typeof(Wicket)==="undefined"){window.Wicket={}
}if(typeof(Wicket.Event)==="object"){return
}jQuery.extend(true,Wicket,{Browser:{isKHTML:function(){return(/Konqueror|KHTML/).test(window.navigator.userAgent)&&!/Apple/.test(window.navigator.userAgent)
},isSafari:function(){return !/Chrome/.test(window.navigator.userAgent)&&/KHTML/.test(window.navigator.userAgent)&&/Apple/.test(window.navigator.userAgent)
},isChrome:function(){return(/KHTML/).test(window.navigator.userAgent)&&/Apple/.test(window.navigator.userAgent)&&/Chrome/.test(window.navigator.userAgent)
},isOpera:function(){return !Wicket.Browser.isSafari()&&typeof(window.opera)!=="undefined"
},isIE:function(){return !Wicket.Browser.isSafari()&&typeof(document.all)!=="undefined"&&typeof(window.opera)==="undefined"
},isIEQuirks:function(){return Wicket.Browser.isIE()&&window.document.documentElement.clientHeight===0
},isIELessThan7:function(){var c=window.navigator.userAgent.indexOf("MSIE");
var b=parseFloat(window.navigator.userAgent.substring(c+5));
return Wicket.Browser.isIE()&&b<7
},isIE7:function(){var c=window.navigator.userAgent.indexOf("MSIE");
var b=parseFloat(window.navigator.userAgent.substring(c+5));
return Wicket.Browser.isIE()&&b>=7
},isIELessThan9:function(){var c=window.navigator.userAgent.indexOf("MSIE");
var b=parseFloat(window.navigator.userAgent.substring(c+5));
return Wicket.Browser.isIE()&&b<9
},isGecko:function(){return(/Gecko/).test(window.navigator.userAgent)&&!Wicket.Browser.isSafari()
}},Event:{idCounter:0,getId:function(c){var b=jQuery(c),d=b.prop("id");
if(typeof(d)==="string"&&d.length>0){return d
}else{d="wicket-generated-id-"+Wicket.Event.idCounter++;
b.prop("id",d);
return d
}},keyCode:function(b){return Wicket.Event.fix(b).keyCode
},stop:function(b){b=Wicket.Event.fix(b);
b.stopPropagation();
return b
},fix:function(b){var c=b||window.event;
return jQuery.event.fix(c)
},fire:function(b,c){c=(c==="mousewheel"&&Wicket.Browser.isGecko())?"DOMMouseScroll":c;
jQuery(b).trigger(c)
},add:function(b,e,d,f){if(e==="domready"){jQuery(d)
}else{e=(e==="mousewheel"&&Wicket.Browser.isGecko())?"DOMMouseScroll":e;
var c=b;
if(typeof(b)==="string"){c=document.getElementById(b)
}if(!c&&Wicket.Log){Wicket.Log.error("Cannot find element with id: "+b)
}jQuery(c).on(e,f,d)
}return b
},subscribe:function(b,c){if(b){jQuery(document).on(b,c)
}},publish:function(c){if(c){var b=Array.prototype.slice.call(arguments).slice(1);
jQuery(document).triggerHandler(c,b);
jQuery(document).triggerHandler("*",b)
}}}})
})();