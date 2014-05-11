YUI.add("bepress.webservice",function(i){var k=i.namespace("bepress.webservice"),o=new RegExp("https?://"+i.getLocation().hostname+"[:/]"),r=/(http(?:s)?):\/\/(.+?)\//,u="{proto}//{host}{wspath}",s='<b class="{message_class}">{message}</b><p style="{details_style}">{details}</p>',m="wsconfig",d=".followable",g="messagePanel",t=g+"HideTimer",n="net",q="bp",p,h,l,a,j,e;k.getMessagePanel=function(w){var v=w.getData(g);if(!v){v=new e(w);}return v;};k.MessagePanel=e=function(v){if(v.getData(g)){throw"MessagePanel exists for node "+v;}this.positioner=f;this.overlay=b();this.node=v;v.setData(g,this);};e.prototype.getOverlay=function(){return this.overlay;};e.prototype.getAnchor=function(){return this.node;};e.prototype.setContent=function(v){this.overlay.set("footerContent",null);this.overlay.set("headerContent",v);this.overlay.set("bodyContent",null);};e.prototype.set=function(w,v){this.overlay.set(w,v);};e.prototype.hide=function(){this.overlay.hide();};e.prototype.show=function(w){var v=this.node.getData(t);if(v){v.cancel();this.node.setData(t,null);}var x=this.positioner(this.node,this.overlay.get("contentBox"),this.center?true:false);this.overlay.move(x);this.overlay.show();if(w){this.node.setData(t,i.later(w,this.overlay,this.overlay.hide));}};e.prototype.setMessage=function(w){var v=i.substitute(s,{message:w.message,message_class:w.classNames,details:w.details,style:w.showDetails?"":"display:none"});this.setContent(v);};function f(w,C,z){var x=w.get("winHeight"),B=w.get("winWidth"),A,F,v=c(w),y=c(C),E,D;if(document.documentElement&&typeof(document.documentElement.scrollTop)=="number"){A=document.documentElement.scrollTop;F=document.documentElement.scrollLeft;}else{A=document.body.scrollTop;F=document.body.scrollLeft;}if(!z&&(v.left+v.width)+(y.width)<B-F){E=v.left+v.width;}else{if(z||v.left+(v.width/2)+y.width<B-F){E=v.left+(v.width/2);}else{E=(v.left+(v.width/2))-y.width;}}if(v.top+v.height+y.height<x+A){D=v.top+v.height;}else{D=v.top-y.height;}return[E,D];}function c(w){var v={left:w.getX(),top:w.getY(),width:parseInt(w.get("offsetWidth"),10),height:parseInt(w.get("offsetHeight"),10)};return v;}function b(){var v=new i.Overlay({bodyContent:"",visible:false,zIndex:20}).plug(i.Plugin.WidgetAnim);v.anim.get("animHide").set("duration",0.1);v.anim.get("animShow").set("duration",0.01);v.get("contentBox").addClass("follow-message-container");v.render();return v;}k.getAuthCookie=l=function(){var v=i.Cookie.get("BPAuthDevTree");if(!v){v=i.Cookie.get("BPAuth");}return v;};k.setAuthCookie=setAuthCookie=function(w,v,y){var x=i.Cookie.set(w,v,y);};k.isURLLocal=p=function(v){return(/^\//).exec(v)||o.exec(v)?true:false;};k.getHost=h=function(w,z){var y="",v="",x;if(z){y=inNode.getAttribute(inAttrName);}else{y=w;}x=r.exec(y);return x?x[2]:"";};k.SWSRequest=a=function(v,x){var w=p(v),y;if(!x.hasOwnProperty("tag_request")){x.tag_request=true;}if(p(v)){this.doLocal(v,x);}else{this.doForeign(v,x);}};a.prototype.doLocal=function(v,w){var x=w.context?w.context:this;i.Object.each(w.on,function(z,y,B){var A=this;if(y==="success"){B[y]=function(D,E,C){if(E.responseText){z.call(A,i.JSON.parse(E.responseText),C);}};}else{B[y]=function(){z.call(A,arguments[arguments.length-1]);};}},x);if(w.tag_request){if(w.data){w.data+="&swsrequest=t";}else{w.data="swsrequest=t";}}i.io(v,w);};a.prototype.jsonPURL=function(v,w){if(v.indexOf("?")<0){v+="?callback={callback}";}else{v+="&callback={callback}";}if(w.data){v+="&"+w.data;}if(w.tag_request){v+="&swsrequest=t";}return v;};a.prototype.doForeign=function(w,y){var z={args:y["arguments"],on:{}},x=y.on.end,v=this.jsonPURL(w,y);i.Object.each(y.on,function(B,A,D){var C=this;if(A==="failure"){z.on[A]=function(){B.call(C,z.args);if(D.end){D.end.call(C,z.args);}};z.on.timeout=z.on[A];}else{if(A==="success"){z.on[A]=function(E){B.call(C,E,z.args);if(D.end){D.end.call(C,z.args);}};}}},y.context);if(y.on.start){y.on.start.call(y.context,z.args);}i.jsonp(v,z);};k.ConfigLoader=j=function(v){this.buildConfig=null;this.configCallback=v;};j.prototype.handleLookupSuccess=function(w,v){this.buildConfig=w;this.updateConfig();};j.prototype.configFromDOM=function(){var v=i.one("a"+d),x,w,y;if(v){x=h(v,"href");w=/^([^.:])+/.exec(x);if(x!=="network.bepress.com"){w=/^([^.:]+)/.exec(x);if(w){y=w[1]+".works.bepress.com";}}this.buildConfig={};this.buildConfig[q]={host:y,wspath:"/do/api"};this.buildConfig[n]={host:x,wspath:"/api"};this.updateConfig();}};j.prototype.handleLookupError=function(x,w){var v=this;i.on("available",function(){v.configFromDOM();},d);};j.prototype.updateConfig=function(){var z=i.getLocation(),x=z.host,v=z.hostname,y=z.protocol,w=this.buildConfig;w.protocol=y;if(x===w[n].host){w.ctx=n;w[n].wsurl=w[n].wspath;w[q].wsurl=i.substitute(u,{proto:y,host:w[q].host,wspath:w[q].wspath});}else{w.ctx=q;w[q].wsurl=w[q].wspath;w[n].wsurl=i.substitute(u,{proto:y,host:w[n].host,wspath:w[n].wspath});}if(x!==w[q].host){w.is_sw=false;w[q].sw_wsurl=i.substitute(u,{proto:y,host:w[q].host,wspath:w[q].wspath});}else{w.is_sw=true;w[q].sw_wsurl=w[q].wsurl;}if(i.Lang.isValue(localStorage)){w.storedTimeMillis=new Date().getTime();localStorage.setItem(m,i.JSON.stringify(w));}this.configCallback(w);};j.prototype.doLookup=function(){new a("/followconfig.json",{context:this,tag_request:false,on:{success:this.handleLookupSuccess,failure:this.handleLookupError}});};j.prototype.getStored=function(){var x,w,v=null;if(i.Lang.isValue(localStorage)){x=localStorage.getItem(m);if(x){w=i.JSON.parse(x);if(new Date().getTime()-w.storedTimeMillis<=86400000){v=w;}}}return v;};j.prototype.run=function(){var v=this.getStored();if(false&&v){configString=localStorage.getItem(m);this.configCallback(i.JSON.parse(configString));}else{this.doLookup();}};},"0.01",{requires:["node","event-base","io-base","json","jsonp","overlay","widget-anim","substitute","cookie"]});