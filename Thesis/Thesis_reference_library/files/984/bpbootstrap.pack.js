var console;(function(){var c="http://yui.yahooapis.com/3.6.0/build/yui/yui-min.js",k,g,a,j,l,b,h="undefined",d="BPAuth",e="requires";if(typeof window.BPBootstrap===h&&(k=window.BPBootstrap={})!=null){g=[{name:"nav-f2b",requires:["cookie"],fn:function(i){if(i.Cookie.get(d+"DevTree")||i.Cookie.get(d)){k.loggedIn=true;}if(k.loggedIn){i.Get.script("/assets/scripts/nav-f2b.pack.js");}}},{name:"cover-page-counter",requires:["node"],fn:function(n){var m,i;if(n.one('meta[name="bepress_is_article_cover_page"]')||n.one('meta[name="bepress_citation_title"]')){m=n.one(document.body);i='<img src="/do/tracking-gif/cover-page.gif?article_uri='+encodeURIComponent(document.location)+'" height="1" width="1" style="display: none">';m.append(i);}}},{name:"follow-feature",requires:["bepress.follow"],fn:function(i){},modules:{"bepress.webservices":{type:"js",fullpath:"/assets/scripts/webservice-base.pack.js"},"bepress.followcss":{type:"css",fullpath:"/assets/styles/followable.css"},"bepress.follow":{type:"js",fullpath:"/assets/scripts/followable.pack.js",requires:["bepress.webservices","bepress.followcss"]}}}];b=100;j=300;l=0;a=[];if(typeof YUI===h){a.push(c);}for(var f=0;f<a.length;f++){document.write('<script type="text/javascript" src="'+a[f]+'"><\/script>');}k.waitForYUI=function(){var n,o,q;if(typeof YUI===h){l++;if(l<j){setTimeout("BPBootstrap.waitForYUI()",b);}}else{var m={modules:{}};q=["node","event","get"];for(n=0;n<g.length;n++){if(typeof g[n][e]!==h){q.push.apply(q,g[n][e]);}if(typeof g[n]["modules"]!==h){for(o in g[n]["modules"]){m.modules[o]=g[n]["modules"][o];}}}q.push(function(s){var r,p;for(r=0;r<g.length;r++){g[r].fn(s);}});YUI.use.apply(YUI(m),q);}};k.waitForYUI();}})();