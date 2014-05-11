/*!
 * jQuery UI @1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(a,d){a.ui=a.ui||{};
if(a.ui.version){return
}a.extend(a.ui,{version:"@VERSION",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(e,f){return typeof e==="number"?this.each(function(){var g=this;
setTimeout(function(){a(g).focus();
if(f){f.call(g)
}},e)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var e;
if((a.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){e=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(a.curCSS(this,"position",1))&&(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))
}).eq(0)
}else{e=this.parents().filter(function(){return(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!e.length?a(document):e
},zIndex:function(h){if(h!==d){return this.css("zIndex",h)
}if(this.length){var f=a(this[0]),e,g;
while(f.length&&f[0]!==document){e=f.css("position");
if(e==="absolute"||e==="relative"||e==="fixed"){g=parseInt(f.css("zIndex"),10);
if(!isNaN(g)&&g!==0){return g
}}f=f.parent()
}}return 0
},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
if(!a("<a>").outerWidth(1).jquery){a.each(["Width","Height"],function(g,e){var f=e==="Width"?["Left","Right"]:["Top","Bottom"],h=e.toLowerCase(),k={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};
function j(m,l,i,n){a.each(f,function(){l-=parseFloat(a.curCSS(m,"padding"+this,true))||0;
if(i){l-=parseFloat(a.curCSS(m,"border"+this+"Width",true))||0
}if(n){l-=parseFloat(a.curCSS(m,"margin"+this,true))||0
}});
return l
}a.fn["inner"+e]=function(i){if(i===d){return k["inner"+e].call(this)
}return this.each(function(){a(this).css(h,j(this,i)+"px")
})
};
a.fn["outer"+e]=function(i,l){if(typeof i!=="number"){return k["outer"+e].call(this,i)
}return this.each(function(){a(this).css(h,j(this,i,true,l)+"px")
})
}
})
}function c(g,e){var j=g.nodeName.toLowerCase();
if("area"===j){var i=g.parentNode,h=i.name,f;
if(!g.href||!h||i.nodeName.toLowerCase()!=="map"){return false
}f=a("img[usemap=#"+h+"]")[0];
return !!f&&b(f)
}return(/input|select|textarea|button|object/.test(j)?!g.disabled:"a"==j?g.href||e:e)&&b(g)
}function b(e){return !a(e).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)
}).length
}a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(e){return function(f){return !!a.data(f,e)
}
}):function(g,f,e){return !!a.data(g,e[3])
},focusable:function(e){return c(e,!isNaN(a.attr(e,"tabindex")))
},tabbable:function(g){var e=a.attr(g,"tabindex"),f=isNaN(e);
return(f||e>=0)&&c(g,!f)
}});
a(function(){var e=document.body,f=e.appendChild(f=document.createElement("div"));
f.offsetHeight;
a.extend(f.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
a.support.minHeight=f.offsetHeight===100;
a.support.selectstart="onselectstart" in f;
e.removeChild(f).style.display="none"
});
if(!a.curCSS){a.curCSS=a.css
}a.extend(a.ui,{plugin:{add:function(f,g,j){var h=a.ui[f].prototype;
for(var e in j){h.plugins[e]=h.plugins[e]||[];
h.plugins[e].push([g,j[e]])
}},call:function(e,g,f){var j=e.plugins[g];
if(!j||!e.element[0].parentNode){return
}for(var h=0;
h<j.length;
h++){if(e.options[j[h][0]]){j[h][1].apply(e.element,f)
}}}},contains:function(f,e){return document.compareDocumentPosition?f.compareDocumentPosition(e)&16:f!==e&&f.contains(e)
},hasScroll:function(h,f){if(a(h).css("overflow")==="hidden"){return false
}var e=(f&&f==="left")?"scrollLeft":"scrollTop",g=false;
if(h[e]>0){return true
}h[e]=1;
g=(h[e]>0);
h[e]=0;
return g
},isOverAxis:function(f,e,g){return(f>e)&&(f<(e+g))
},isOver:function(j,f,i,h,e,g){return a.ui.isOverAxis(j,i,e)&&a.ui.isOverAxis(f,h,g)
}})
})(jQuery);