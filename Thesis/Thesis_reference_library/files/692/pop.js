function PopAds(conf){var qr=0;var fr=0;var url="";var _d=document;var _w=window;var dze={mqbs:function(property,unit,a,b,maxIter,epsilon){var h=_d.getElementsByTagName("head")[0];var s=_d.createElement("style");var div=_d.createElement("div");div.className="mqbs";h.appendChild(s);div.style.display="none";_d.body.appendChild(div);var r=bs(a,b,maxIter);h.removeChild(s);_d.body.removeChild(div);return r;function bs(a,b,maxIter){var mid=(a+b)/2;if(maxIter==0||b-a<epsilon){return mid;}if(mqm(mid+unit)){return bs(mid,b,maxIter-1);}else{return bs(a,mid,maxIter-1);}}function mqm(r){s.sheet.insertRule("@media ("+property+":"+r+") {.mqbs "+"{text-decoration: underline} }",0);var m=getComputedStyle(div,null).textDecoration=="underline";s.sheet.deleteRule(0);return m;}},_zoomIe7:function(){var rect=_d.body.getBoundingClientRect();var z=(rect.right-rect.left)/document.body.offsetWidth;z=Math.round(z*100)/100;return{zoom:z};},_zoomIe8:function(){return{zoom:screen.deviceXDPI/screen.logicalXDPI};},_zoomWebkitMobile:function(){return{zoom:1};},_zoomWebkit:function(){return{zoom:1};},_zoomFF35:function(){var z=screen.width/this.mqbs("min-device-width","px",0,6000,20,0.0001);z=Math.round(z*100)/100;return{zoom:z};},_zoomFF36:function(){return{zoom:1};},_zoomFF4:function(){var z=this.mqbs("min--moz-device-pixel-ratio","",0,10,20,0.0001);z=Math.round(z*100)/100;return{zoom:z};},_zoomOpera:function(){var f=_d.createElement("div");f.style.position="fixed";f.style.border="5px solid blue";f.style.width="100%";f.style.height="100%";f.style.top=f.style.left="0";f.style.visibility="hidden";_d.body.appendChild(f);var z=_w.innerWidth/f.offsetWidth;z=Math.round(z*100)/100;_d.body.removeChild(f);return{zoom:z};},rt:function(){var r;var n=navigator;var b=_d.body.style;if(!isNaN(screen.logicalXDPI)&&!isNaN(screen.systemXDPI)){return this._zoomIe8();}else{if("ontouchstart" in window&&b.webkitTextSizeAdjust!=null){return this._zoomWebkitMobile();}else{if(b.webkitTextSizeAdjust!=null){return this._zoomWebkit();}else{if(-1!=n.userAgent.indexOf("Firefox/3.5")){return this._zoomFF35();}else{if(-1!=n.userAgent.indexOf("Firefox/3.6")){return this._zoomFF36();}else{if(-1!=n.appVersion.indexOf("MSIE 7.")){return this._zoomIe7();}else{if(-1!=n.userAgent.indexOf("Opera")){return this._zoomOpera();}else{if(0.001<(r=this._zoomFF4()).zoom){return r;}else{return{zoom:1};}}}}}}}}},zoom:function(){return this.rt().zoom;}};var ae=function(o,t,f){if(o.addEventListener){o.addEventListener(t,f,false);}else{o["e"+t+f]=f;o[t+f]=function(){o["e"+t+f](_w.event);};o.attachEvent("on"+t,o[t+f]);}};var mx=-1;var my=-1;var mfx=-1;var mfy=-1;var md=0;var mct=0;var mmd=0;var mm=function(e){var tx;var ty;if(!e.pageX){tx=event.clientX+_d.body.scrollLeft;ty=event.clientY+_d.body.scrollTop;}else{tx=e.pageX;ty=e.pageY;}if(mx<0){mx=tx;my=ty;mfx=tx;mfy=ty;}if(tx<0){tx=0;}if(ty<0){ty=0;}var mcd=Math.round(Math.sqrt((tx-mx)*(tx-mx)+(ty-my)*(ty-my)));if((mcd>mmd)&&(tx>50)&&(ty>50)&&((!_w.innerWidth)||(tx<_w.innerWidth-50))&&((!_w.innerHeight)||(ty<_w.innerHeight-50))){mmd=mcd;}md+=mcd;mx=tx;my=ty;mct++;return true;};var sn=0;var sc=0;var ws=function(e){mx=-1;my=-1;sc++;return true;};var mc=function(){var tc=-1;var tfl=-1;var scx=-1;var scy=-1;var wih=-1;var wiw=-1;var woh=-1;var wow=-1;if(Date&&Date.now&&Math&&Math.round){tc=Math.round((Date.now()-sn)/1000);}if(top&&top.frames&&top.frames.length){tfl=top.frames.length;}if(_w.screenX&&_w.screenY){scx=_w.screenX;scy=_w.screenY;}if(_w.innerWidth&&_w.innerHeight){wiw=_w.innerWidth;wih=_w.innerHeight;}if(_w.outerWidth&&_w.outerHeight){wow=_w.outerWidth;woh=_w.outerHeight;}return[mx,my,mct,md,mmd,mfx,mfy,tc,sc,tfl,scx,scy,wiw,wih,wow,woh].join();};var sr=function(){var zv=dze.zoom();return[screen.width,screen.height,zv,screen.width*zv,screen.height*zv].join();};var ij=function(u){var h=_d.getElementsByTagName("body")[0];var n=_d.createElement("script");n.type="text/javascript";n.src=u;n.async=true;h.appendChild(n);};var idp=function(u){var h=_d.getElementsByTagName("head")[0];var n=_d.createElement("link");n.rel="dns-prefetch";n.href="http://"+u+".popads.net";h.appendChild(n);};var wcs=function(n,v,s){if(s){var t=new Date();t.setTime(t.getTime()+(s*1000));var e="; expires="+t.toGMTString();}else{var e="";}_d.cookie=n+"="+v+e+"; path=/";};var wc=function(n,v,d){wcs(n,v,d*86400);};var rc=function(n){var q=n+"=";var a=_d.cookie.split(";");for(var i=0;i<a.length;i++){var c=a[i];while(c.charAt(0)==" "){c=c.substring(1,c.length);}if(c.indexOf(q)==0){return c.substring(q.length,c.length);}}return null;};var cc=function(){var a=rc("noadvtday");return((a==null)||(parseInt(a)<6));};var cd=function(){var a=rc("defaults");return((gc("defaultPerDay")=="")||(gc("defaultPerDay")=="0")||(a==null)||(parseInt(a)<parseInt(gc("defaultPerDay"))));};var cp=function(){var a=rc("nopopatall");return((a==null)||(parseInt(a)<1));};var sp=function(){if(gc("delayBetween")!=""){wc("nopopatall","69",parseInt(gc("delayBetween")));}};var ind=function(){var a=rc("defaults");if(a==null){a=1;}else{a=parseInt(a)+1;}wc("defaults",a.toString(),1);};var it=function(){var a=rc("noadvtday");if(a==null){a=1;}else{a=parseInt(a)+1;}wc("noadvtday",a.toString(),1);};var bd=function(ip){var k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var op="";var c1,c2,c3="";var e1,e2,e3,e4="";var i=0;var bt=/[^A-Za-z0-9\+\/\=]/g;if(bt.exec(ip)){return ip;}ip=ip.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{e1=k.indexOf(ip.charAt(i++));e2=k.indexOf(ip.charAt(i++));e3=k.indexOf(ip.charAt(i++));e4=k.indexOf(ip.charAt(i++));c1=(e1<<2)|(e2>>4);c2=((e2&15)<<4)|(e3>>2);c3=((e3&3)<<6)|e4;op=op+String.fromCharCode(c1);if(e3!=64){op=op+String.fromCharCode(c2);}if(e4!=64){op=op+String.fromCharCode(c3);}c1=c2=c3="";e1=e2=e3=e4="";}while(i<ip.length);return unescape(op);};var tms=function(){var f=_d.getElementsByTagName("iframe");var g="wmode=transparent";for(i in f){if((/youtube\.com\/embed/.test(f[i].src))&&(f[i].src.indexOf(g)==-1)){if(f[i].src.indexOf("?")==-1){f[i].src=f[i].src+"?"+g;}else{f[i].src=f[i].src+"&"+g;}}}};var tmr=function(){var trm=_d.getElementById("popads_topmost");if(trm){trm.parentNode.removeChild(trm);}};var tmi=function(){var t=_d.createElement("div");var h=_d.getElementsByTagName("html")[0];h.appendChild(t);t.id="popads_topmost";t.style.width=(h.offsetWidth-5).toString()+"px";t.style.height=h.offsetHeight.toString()+"px";t.style.position="absolute";t.style.top="0px";t.style.left="0px";t.style.zIndex=9999999999;ae(t,"click",oc);ae(t,"mouseup",oc);_w.setTimeout(tmr,60000);};var rtd=false;var rt=function(rx,tle){if(rtd){return true;}if(rx){wc("noadvtday",0,1);}var e=_d.getElementsByTagName("*");ae(_d,"click",oc);ae(_d,"contextmenu",oc);if(cch){ae(_d,"mousemove",occh);}else{ae(_d,"mouseup",oc);}ae(_d,"keyup",oc);for(var i=0;i<e.length;i++){ae(e[i],"click",oc);ae(e[i],"contextmenu",oc);if(cch){ae(e[i],"mouseup",occh);}else{ae(e[i],"mouseup",oc);}ae(e[i],"keyup",oc);}if((gc("topmostLayer")!="")||(tle)){tmi();}rtd=true;return true;};var occho=false;var occh=function(){if(occho){return;}window.setTimeout(function(){rwo("","").close();},5);occho=true;};var occto=0;var occt=function(){if(occto>1){return;}var ghost=document["createElement"]("a");ghost["href"]="about:blank";ghost["target"]="PopHelper";document["getElementsByTagName"]("body")[0]["appendChild"](ghost);ghost["parentNode"]["removeChild"](ghost);var clk=document["createEvent"]("MouseEvents");clk["initMouseEvent"]("click",true,true,window,0,0,0,0,0,true,false,false,true,0,null);ghost["dispatchEvent"](clk);rwo("about:blank","PopHelper")["close"]();occto++;};var de=function(ev){a=_d.createElement("div");a.style.display="none";_d.body.appendChild(a);buff=bd(ev);a.innerHTML=buff;};var ppd=false;var bc=0;var b;var bcr=function(){try{_w.focus();if(typeof b!="undefined"){b.blur();}_w.focus();bc--;if((bc)>0){_w.setTimeout(bcr,100);}}catch(err){}};var wo=function(url){ppd=true;return _w.open(url,"PopAds"+Math.floor(Math.random()*25),"width="+screen.width+", height="+screen.height+", top=0, left=0, directories=no, location=no, menubar=no, resizable=no, scrollbars=yes, status=no, toolbar=no");};var oc=function(){tmr();if(ppd){return true;}if((qr||fr)&&(url!="")){b=wo(url+"&m="+mc()+"&s="+sr());ppd=cpb(b);if(ppd){sp();if(/rv:[1-9]/.exec(navigator.userAgent)){b.window.open("about:blank").close();}_w.focus();b.blur();_w.focus();bc=75;sun(b);_w.setTimeout(bcr,100);}}else{if((gc("default")!="")&&(cd())){var d=gc("default");if((d.indexOf("http://")==0)||(d.indexOf("https://")==0)){b=wo(d);ppd=cpb(b);if(ppd){sp();ind();if(/rv:[1-9]/.exec(navigator.userAgent)){b.window.open("about:blank").close();}_w.focus();b.blur();_w.focus();bc=75;sun(b);_w.setTimeout(bcr,100);}}else{de(d);ind();ppd=true;}}}return true;};var cpb=function(pw){try{return((typeof pw!="undefined")&&(pw));}catch(err){return false;}};var gc=function(k){for(var i=0;i<conf.length;i++){if(conf[i][0]==k){if((conf[i][1]==false)||(conf[i][1]==null)){return"";}else{return conf[i][1].toString();}}}return"";};this.parse=function(data){var tle=false;if(data.topmost){tle=data.topmost;}if(data.quickresult){qr=data.quickresult;if(qr==1){url=data.url;rt(true,tle);}else{it();}}else{if(data.result){fr=data.result;if(fr==1){url=data.url;rt(true,tle);}else{it();}}}if((qr==0)&&(fr==0)&&(gc("default")!="")){rt(false,false);}};var sunf=false;var sunm=function(){window.showModalDialog("javascript:window.close()",null,"dialogtop:646545;dialogleft:45648748;dialogWidth:1;dialogHeight:1");};var cch=navigator.userAgent.toLowerCase().indexOf("chrome");var sun=function(asd){var cff=navigator.userAgent.toLowerCase().indexOf("firefox");var cie=navigator.userAgent.toLowerCase().indexOf("msie");var cop=navigator.userAgent.toLowerCase().indexOf("opera");if(cie!=-1){if(asd.blur){asd.blur();}asd.opener.window.focus();}if(cch!=-1){window.blur();}else{if(asd.blur){asd.blur();}}if((cch!=-1||cie!=-1||cop!=-1)&&window.focus){window.focus();setTimeout(function(){window.focus();},100);setTimeout(function(){window.focus();},150);setTimeout(function(){window.focus();},250);setTimeout(function(){window.focus();},350);setTimeout(function(){window.focus();},750);setTimeout(function(){window.focus();},850);setTimeout(function(){window.focus();},1850);if(cch!=-1){var e=_d.getElementsByTagName("*");for(var i=0;i<e.length;i++){ae(e[i],"mouseup",occt);ae(e[i],"mousemove",occt);}}}if((cff!=-1)){var acx=false;var p=rwo("about:blank");p.focus();p.close();acx=true;setTimeout(function(){if(acx&&!sunf){var acx=false;var p=rwo("about:blank");p.focus();p.close();acx=true;}},150);setTimeout(function(){if(acx&&!sunf){sunm();}},250);setTimeout(function(){if(acx&&!sunf){sunm();}},350);setTimeout(function(){if(acx&&!sunf){sunm();}},950);}};var ia=function(){if(!cp()){return false;}if(!Date.now){Date.now=function(){return new Date().valueOf();};}if(_d.captureEvents&&Event){_d.captureEvents(Event.MOUSEMOVE);_d.captureEvents(Event.CLICK);}idp("out");idp("serve");ae(_d,"mousemove",mm);ae(_w,"scroll",ws);if(Date&&Date.now){sn=Date.now();}if(cc()){var uv=".php?_="+sn+"&v=2&siteId="+gc("siteId")+"&minBid="+gc("minBid")+"&popundersPerIP="+gc("popundersPerIP")+"&blockedCountries="+gc("blockedCountries")+"&documentRef="+encodeURIComponent(_d.referrer)+"&s="+sr();var uh="http://serve.popads.net/checkInventory";ij(uh+uv);ij(uh+"Quick"+uv);}else{if((gc("default")!="")&&(cd())){rt(false,false);}}};var rwo=_w.open;var owo=function(a,b,c){if(((typeof(b)=="string")&&(b.indexOf("PopAds")!=-1))||(a.indexOf("about:blank")!=-1)){return rwo(a,b,c);}else{if((ppd)||((qr==0)&&(fr==0))){if(typeof(c)=="undefined"){if(typeof(b)=="undefined"){return rwo(a);}else{return rwo(a,b);}}else{return rwo(a,b,c);}}else{oc();return false;}}};var ib=function(){if(gc("noExclusive")==""){window.open=owo;}if(_d.getElementsByTagName("body").length>0){ia();}else{_w.setTimeout(ib,100);}};ib();}if(typeof(_pop)=="undefined"){_pop=[];if(typeof(PopAds_SiteID)!="undefined"){_pop.push(["siteId",PopAds_SiteID]);}if(typeof(PopAds_MinimalBid)!="undefined"){_pop.push(["minBid",PopAds_MinimalBid]);}if(typeof(PopAds_PopundersPerIP)!="undefined"){_pop.push(["popundersPerIP",PopAds_PopundersPerIP]);}if(typeof(PopAds_Default)!="undefined"){_pop.push(["default",PopAds_Default]);}if(typeof(PopAds_TopmostLayer)!="undefined"){_pop.push(["topmostLayer",PopAds_TopmostLayer]);}}if(!window._pao){window._pao=new PopAds(_pop);}
