(function(){var e=true,g,h=this;function k(a){var b={};if(a){a.charAt(0)=="?"&&(a=a.substring(1));for(var a=a.replace("+"," "),a=a.split(/[&;]/g),c=0;c<a.length;c++){var d=a[c].split("=");b[decodeURIComponent(d[0])]=decodeURIComponent(d[1])}}return b}function l(a,b,c){var d="",f=h.location.href.split("?");f.length&&(f=k(f[1]),b=c||b,f[b]&&(d="&"+a+"="+f[b]));return d};function n(){if(p!==void 0)return p;try{var a=h.localStorage;if(a.removeItem)return p=a}catch(b){}return p=null}var p;function q(){var a="",b,c;for(c=0;c<16;c++)b=Math.floor(Math.random()*36).toString(36),a+=b;return a}function r(a,b){return function(){a.apply(b,arguments)}}function t(a,b){var c=h;c.addEventListener?c.addEventListener(a,b,false):c.attachEvent&&c.attachEvent("on"+a,b)}function u(){return(v("_chartbeat2")||"").split(".")}function w(){return(new Date).getTime()};function x(a){this.a=h._sf_async_config||{};this.C=r(this.I,this);this.f=[];this.p=a;this.b();t("unload",r(this.H,this));for(var a=r(this.J,this),b=h._cbq||[];b.length;)a(b.shift());h._cbq={push:a}}g=x.prototype;g.b=function(){this.l=this.c=0;this.z=w();this.w=q();this.n=e;this.t=72E5;this.h=this.e=0;this.p.b();var a=+this.a.sessionLength;if(!isNaN(a))this.t=a*6E4};g.J=function(a){this.a[a[0]]=a[1];this.c=0};
g.o=function(){var a=h._sf_startpt,b=h._sf_endpt;if(typeof a=="number")this.v=typeof b=="number"?b-a:w()-a;this.g=setInterval(r(this.u,this),15E3);this.u()};g.I=function(){this.f.push(1);for(var a=0,b=0;b<this.f.length;++b)a+=this.f[b];a<3?(this.n=e,y(this)):(clearInterval(this.g),z("_SUPERFLY_nosample","1",0.007))};function A(a){if(!v("_SUPERFLY_nosample"))a.F?a.o():(a.F=e,!h._sf_async_config&&!h._cbq?t("load",r(a.o,a)):a.o())}
g.H=function(){var a=this.w,b=n();if(b)b._cb_cp+=(b._cb_cp?",":"")+a;else if(!h.name)h.name="_cb_cp"+a};function y(a){var b=a.c,b=b?Math.min(b*2,16):1;a.c=b}g.L=function(a,b){this.r=h.location.protocol+"//"+this.a.domain+this.a.path;this.a.path=a;b&&(this.a.title=b);clearInterval(this.g);this.b();A(this)};
g.u=function(){var a=this.p,b=a.e;a.e=0;B(a);this.h=b;this.e+=this.h;a=this.a.reading&&+this.a.reading||this.h>0;if(this.l<this.c&&!a)this.l++;else{a?this.c=0:y(this);this.l=0;this.f.push(0);this.f.length>18&&this.f.shift();var a=this.a,b=C(),c=Math.round((w()-this.z)/600)/100,d=0,f=0,i=0;D(this.p,"onkeydown")?f=1:this.a.reading&&+this.a.reading||this.h>0||c<0.09?d=1:i=1;var G="",s="";if(this.n)this.n=false,G=(E(this)?"&v=":"&r=")+encodeURIComponent(this.r||document.referrer||""),s=this.a.title.slice(0,
100),s="&i="+encodeURIComponent(s);var O=this.v?"&b="+this.v:"",P=this.j?"&A="+this.j:"",Q=this.s?"&f="+this.s:"",o,m=n();if(m)o=m._cb_cp,m._cb_cp="";else if(/_cb_cp[a-z0-9]{16}/.test(h.name))o=h.name.substr(6),h.name="";o=o?"&D="+o:"";var m=[],j;for(j in a)j.charAt(0)=="_"&&m.push(j+"="+a[j]);j=document;j=(h.location.protocol||"http:")+"//"+a.pingServer+"/ping?h="+encodeURIComponent(a.domain)+"&p="+encodeURIComponent(a.path)+"&u="+this.q+"&d="+encodeURIComponent(this.k)+"&g="+a.uid+(a.sections?"&g0="+
encodeURIComponent(a.sections):"")+(a.authors?"&g1="+encodeURIComponent(a.authors):"")+(a.noCookies?"":"&n="+this.G)+Q+"&c="+c+"&x="+b+"&y="+(document.body.scrollHeight||0)+"&w="+(j[j.compatMode==="CSS1Compat"?"documentElement":"body"].clientHeight||0)+"&j="+Math.round((this.c+2)*15E3/1E3)+"&R="+d+"&W="+f+"&I="+i+"&E="+this.e+"&e="+this.h+G+O+P+l("C","utm_campaign",a.campaignTag)+l("M","utm_medium",a.mediumTag)+"&t="+this.w+"&V=12"+o+s+(m.length?"&"+m.join("&"):"")+"&_";a=new Image(1,1);a.onerror=
this.C;a.src=j;w()-this.z>=this.t&&clearInterval(this.g)}};function E(a){if(a.r)return e;a=(document.referrer||"").indexOf("://"+h.location.host+"/");return a!=-1&&a<9};function F(a,b){var c=Math;return c.abs(c.floor((+b-+a)/864E5))}function H(a,b){for(;b--;)a+=b==0?1:0;return a};function C(){var a=document.body,b=document.documentElement;if(typeof h.pageYOffset=="number")return h.pageYOffset;else if(a&&a.scrollTop)return a.scrollTop;else if(b&&b.scrollTop)return b.scrollTop;return 0};function I(a){x.call(this,a)}(function(){var a=x;function b(){}b.prototype=a.prototype;I.K=a.prototype;I.prototype=new b})();
I.prototype.b=function(){I.K.b.call(this);this.j=null;for(var a=this.a,b=document.getElementsByTagName("script"),c=0;c<b.length;++c)if(b[c].src.match(/chartbeat.js/)){b=k(b[c].src.split("?")[1]);a.uid=a.uid||b.uid;a.domain=a.domain||b.domain;break}a=h.location;b=this.a;b.pingServer=b.pingServer||"ping.chartbeat.net";b=this.a;b.title=b.title||document.title;b=this.a;b.domain=b.domain||a.host;b=this.a;a:{c=null;if(this.a.useCanonical){for(var c=null,d=document.getElementsByTagName("link"),f=0;f<d.length;++f)if(d[f].rel==
"canonical")c=d[f].href,c=c.substring(c.indexOf("/",9));if(c)break a}f=h.location;c=f.pathname+(f.search||"");c=c.replace(/PHPSESSID=[^&]+/,"");d=/&utm_[^=]+=[^&]+/ig;(f=d.exec(f.search))&&(c=c.replace(d,""));d=/\?utm_[^=]+=[^&]+(.*)/i;(f=d.exec(c))&&(c=c.replace(d,f[1]!=""?"?"+f[1]:""))}b.path=b.path||c;this.k=a.host.replace(/^www\./,"");this.a.domain=this.a.domain.replace(/^www\./,"");this.d=v("_chartbeat2");a=w()-+((this.d||"").split(".")[1]||0);d=w();f=u();b=H("",14);f&&(c=f[3],(d=F(f[2],d))&&
d<14&&(b=H(c.substr(d),d)));this.G=this.d&&a>18E5?0:1;this.d?(a=u(),a[2]=w(),a[3]=b,this.d=a.join(".")):this.d=q()+"."+w()+"."+w()+"."+b;this.q=this.d.split(".")[0];this.a.utoken=this.q;z("_chartbeat2",this.d,30);var i;a=u();if(b=a[3])F(a[1],a[2])<14&&(b=b.substr(b.indexOf("1"))),i=Math.round(b.length/b.replace(/0/g,"").length*10)/10;this.s=i;h.postMessage&&t("message",r(this.D,this))};I.prototype.B=function(a){this.j=a};
I.prototype.D=function(a){var b=this.a;if(a.origin==="http://"+(b.playerdomain||this.k)){var c=a.data;if(c.indexOf("cbqpush::")===0){if(a=c.split("::"),a.length==3)b[a[1]]=a[2],this.c=0}else c=="cbdata?"&&(b="domain="+encodeURIComponent(b.domain)+"&path="+encodeURIComponent(b.path)+"&title=",c=this.a.title.slice(0,100),a.source.postMessage(b+encodeURIComponent(c)+"&referrer="+encodeURIComponent(this.r||document.referrer||"")+"&internal="+(E(this)?"1":"0")+"&subdomain="+encodeURIComponent(this.k)+
"&utoken="+this.q,"*"))}};function J(){this.i=[];K(this,h,"onscroll");K(this,document.body,"onkeydown");K(this,document.body,"onmousemove");this.b()}J.prototype.b=function(){this.m={};this.e=0;B(this)};function B(a){a.g&&clearInterval(a.g);a.A();a.g=setInterval(r(a.A,a),1E3)}function K(a,b,c){var d=b[c]||function(){};a.i.push(c);b[c]=function(b){d.apply(this,arguments);if(b&&c=="onkeydown"){var i=b.keyCode?b.keyCode:b.which;if(i==32||i>36&&i<41){a.m.onscroll=w();return}}a.m[c]=w()}}
function D(a,b,c){a=a.m[b];if(a===void 0)return false;a=w()-a;return a<=(c||15E3)&&a>=0}J.prototype.A=function(){var a;a:{for(a=0;a<this.i.length;a++)if(D(this,this.i[a],5E3)){a=e;break a}a=false}a&&this.e++};function v(a){a+="=";for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];d.charAt(0)==" ";)d=d.substring(1,d.length);if(d.indexOf(a)==0)return d.substring(a.length,d.length)}return null}function z(a,b,c){var d=h._sf_async_config;if(!d||!d.noCookies)d=new Date,d.setTime(w()+c*864E5),document.cookie=a+"="+b+("; expires="+d.toGMTString())+"; path=/"};var L=(document.location.protocol=="https:"?"https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/":"http://static.chartbeat.com/")+"js/inpage.js";function M(){var a=document.createElement("script");a.async=e;a.src=L;var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}function N(a){if(/[\/|\.]chartbeat.com$/.test(a.origin)){var b=n(),c=String(a.data);if(b&&c.indexOf("_cb_ip")==0)b._cb_ip=1,a.source.postMessage(1,a.origin),M()}};if(!h.pSUPERFLY){var R=new J,S=new I(R);h.pSUPERFLY=S;I.prototype.virtualPage=I.prototype.L;I.prototype.activity=I.prototype.B;A(S);var T=n();T&&(t("message",N),T._cb_ip&&M())};})();
