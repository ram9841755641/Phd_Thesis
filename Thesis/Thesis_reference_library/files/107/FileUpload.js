// Photo upload for Submit form plugin
(function($) {

/**
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009, Øyvind Sean Kinsey, oyvind@kinsey.no.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function(I,c,l,F,g,C){var b=this;var j=Math.floor(Math.random()*100)*100;var m=Function.prototype;var L=/^(http.?:\/\/([^\/\s]+))/;var M=/[\-\w]+\/\.\.\//;var A=/([^:])\/\//g;var D="";var k={};var H=I.easyXDM;var P="easyXDM_";var z;function x(S,U){var T=typeof S[U];return T=="function"||(!!(T=="object"&&S[U]))||T=="unknown"}function q(S,T){return !!(typeof(S[T])=="object"&&S[T])}function n(S){return Object.prototype.toString.call(S)==="[object Array]"}var r,t;if(x(I,"addEventListener")){r=function(U,S,T){U.addEventListener(S,T,false)};t=function(U,S,T){U.removeEventListener(S,T,false)}}else{if(x(I,"attachEvent")){r=function(S,U,T){S.attachEvent("on"+U,T)};t=function(S,U,T){S.detachEvent("on"+U,T)}}else{throw new Error("Browser not supported")}}var R=false,E=[],G;if("readyState" in c){G=c.readyState;R=G=="complete"||(~navigator.userAgent.indexOf("AppleWebKit/")&&(G=="loaded"||G=="interactive"))}else{R=!!c.body}function o(){o=m;R=true;for(var S=0;S<E.length;S++){E[S]()}E.length=0}if(!R){if(x(I,"addEventListener")){r(c,"DOMContentLoaded",o)}else{r(c,"readystatechange",function(){if(c.readyState=="complete"){o()}});if(c.documentElement.doScroll&&I===top){(function e(){if(R){return}try{c.documentElement.doScroll("left")}catch(S){F(e,1);return}o()}())}}r(I,"load",o)}function B(T,S){if(R){T.call(S);return}E.push(function(){T.call(S)})}function i(){var U=parent;if(D!==""){for(var S=0,T=D.split(".");S<T.length;S++){U=U[T[S]]}}return U.easyXDM}function d(S){I.easyXDM=H;D=S;if(D){P="easyXDM_"+D.replace(".","_")+"_"}return k}function u(S){return S.match(L)[2]}function f(S){return S.match(L)[1]}function w(S){S=S.replace(A,"$1/");if(!S.match(/^(http||https):\/\//)){var T=(S.substring(0,1)==="/")?"":l.pathname;if(T.substring(T.length-1)!=="/"){T=T.substring(0,T.lastIndexOf("/")+1)}S=l.protocol+"//"+l.host+T+S}while(M.test(S)){S=S.replace(M,"")}return S}function K(S,V){var X="",U=S.indexOf("#");if(U!==-1){X=S.substring(U);S=S.substring(0,U)}var W=[];for(var T in V){if(V.hasOwnProperty(T)){W.push(T+"="+C(V[T]))}}return S+((S.indexOf("?")===-1)?"?":"&")+W.join("&")+X}var N=(function(){var U={},V,T=l.search.substring(1).split("&"),S=T.length;while(S--){V=T[S].split("=");U[V[0]]=g(V[1])}return U}());function p(S){return typeof S==="undefined"}function J(){var T={};var U={a:[1,2,3]},S='{"a":[1,2,3]}';if(JSON&&typeof JSON.stringify==="function"&&JSON.stringify(U).replace((/\s/g),"")===S){return JSON}if(Object.toJSON){if(Object.toJSON(U).replace((/\s/g),"")===S){T.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){U=S.evalJSON();if(U.a&&U.a.length===3&&U.a[2]===3){T.parse=function(V){return V.evalJSON()}}}if(T.stringify&&T.parse){J=function(){return T};return T}return null}function O(S,T,U){var W;for(var V in T){if(T.hasOwnProperty(V)){if(V in S){W=T[V];if(typeof W==="object"){O(S[V],W,U)}else{if(!U){S[V]=T[V]}}}else{S[V]=T[V]}}}return S}function a(){var S=c.createElement("iframe");S.name=P+"TEST";O(S.style,{position:"absolute",left:"-2000px",top:"0px"});c.body.appendChild(S);z=!(S.contentWindow===I.frames[S.name]);c.body.removeChild(S)}function v(S){if(p(z)){a()}var T;if(z){T=c.createElement('<iframe name="'+S.props.name+'"/>')}else{T=c.createElement("IFRAME");T.name=S.props.name}T.id=T.name=S.props.name;delete S.props.name;if(S.onLoad){r(T,"load",S.onLoad)}if(typeof S.container=="string"){S.container=c.getElementById(S.container)}if(!S.container){T.style.position="absolute";T.style.left="-2000px";T.style.top="0px";S.container=c.body}T.border=T.frameBorder=0;S.container.insertBefore(T,S.container.firstChild);O(T,S.props);return T}function Q(V,U){if(typeof V=="string"){V=[V]}var T,S=V.length;while(S--){T=V[S];T=new RegExp(T.substr(0,1)=="^"?T:("^"+T.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(T.test(U)){return true}}return false}function h(U){var Z=U.protocol,T;U.isHost=U.isHost||p(N.xdm_p);if(!U.props){U.props={}}if(!U.isHost){U.channel=N.xdm_c;U.secret=N.xdm_s;U.remote=N.xdm_e;Z=N.xdm_p;if(U.acl&&!Q(U.acl,U.remote)){throw new Error("Access denied for "+U.remote)}}else{U.remote=w(U.remote);U.channel=U.channel||"default"+j++;U.secret=Math.random().toString(16).substring(2);if(p(Z)){if(f(l.href)==f(U.remote)){Z="4"}else{if(x(I,"postMessage")||x(c,"postMessage")){Z="1"}else{if(x(I,"ActiveXObject")&&x(I,"execScript")){Z="3"}else{if(navigator.product==="Gecko"&&"frameElement" in I&&navigator.userAgent.indexOf("WebKit")==-1){Z="5"}else{if(U.remoteHelper){U.remoteHelper=w(U.remoteHelper);Z="2"}else{Z="0"}}}}}}}switch(Z){case"0":O(U,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(U.isHost){if(!U.local){var X=l.protocol+"//"+l.host,S=c.body.getElementsByTagName("img"),Y;var V=S.length;while(V--){Y=S[V];if(Y.src.substring(0,X.length)===X){U.local=Y.src;break}}if(!U.local){U.local=I}}var W={xdm_c:U.channel,xdm_p:0};if(U.local===I){U.usePolling=true;U.useParent=true;U.local=l.protocol+"//"+l.host+l.pathname+l.search;W.xdm_e=U.local;W.xdm_pa=1}else{W.xdm_e=w(U.local)}if(U.container){U.useResize=false;W.xdm_po=1}U.remote=K(U.remote,W)}else{O(U,{channel:N.xdm_c,remote:N.xdm_e,useParent:!p(N.xdm_pa),usePolling:!p(N.xdm_po),useResize:U.useParent?false:U.useResize})}T=[new k.stack.HashTransport(U),new k.stack.ReliableBehavior({}),new k.stack.QueueBehavior({encode:true,maxLength:4000-U.remote.length}),new k.stack.VerifyBehavior({initiate:U.isHost})];break;case"1":T=[new k.stack.PostMessageTransport(U)];break;case"2":T=[new k.stack.NameTransport(U),new k.stack.QueueBehavior(),new k.stack.VerifyBehavior({initiate:U.isHost})];break;case"3":T=[new k.stack.NixTransport(U)];break;case"4":T=[new k.stack.SameOriginTransport(U)];break;case"5":T=[new k.stack.FrameElementTransport(U)];break}T.push(new k.stack.QueueBehavior({lazy:U.lazy,remove:true}));return T}function y(V){var W,U={incoming:function(Y,X){this.up.incoming(Y,X)},outgoing:function(X,Y){this.down.outgoing(X,Y)},callback:function(X){this.up.callback(X)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var T=0,S=V.length;T<S;T++){W=V[T];O(W,U,true);if(T!==0){W.down=V[T-1]}if(T!==S-1){W.up=V[T+1]}}return W}function s(S){S.up.down=S.down;S.down.up=S.up;S.up=S.down=null}O(k,{version:"2.4.10.103",query:N,stack:{},apply:O,getJSONObject:J,whenReady:B,noConflict:d});k.DomHelper={on:r,un:t,requiresJSON:function(S){if(!q(I,"JSON")){c.write('<script type="text/javascript" src="'+S+'"><\/script>')}}};(function(){var S={};k.Fn={set:function(T,U){S[T]=U},get:function(U,T){var V=S[U];if(T){delete S[U]}return V}}}());k.Socket=function(T){var S=y(h(T).concat([{incoming:function(W,V){T.onMessage(W,V)},callback:function(V){if(T.onReady){T.onReady(V)}}}])),U=f(T.remote);this.origin=f(T.remote);this.destroy=function(){S.destroy()};this.postMessage=function(V){S.outgoing(V,U)};S.init()};k.Rpc=function(U,T){if(T.local){for(var W in T.local){if(T.local.hasOwnProperty(W)){var V=T.local[W];if(typeof V==="function"){T.local[W]={method:V}}}}}var S=y(h(U).concat([new k.stack.RpcBehavior(this,T),{callback:function(X){if(U.onReady){U.onReady(X)}}}]));this.origin=f(U.remote);this.destroy=function(){S.destroy()};S.init()};k.stack.SameOriginTransport=function(T){var U,W,V,S;return(U={outgoing:function(Y,Z,X){V(Y);if(X){X()}},destroy:function(){if(W){W.parentNode.removeChild(W);W=null}},onDOMReady:function(){S=f(T.remote);if(T.isHost){O(T.props,{src:K(T.remote,{xdm_e:l.protocol+"//"+l.host+l.pathname,xdm_c:T.channel,xdm_p:4}),name:P+T.channel+"_provider"});W=v(T);k.Fn.set(T.channel,function(X){V=X;F(function(){U.up.callback(true)},0);return function(Y){U.up.incoming(Y,S)}})}else{V=i().Fn.get(T.channel,true)(function(X){U.up.incoming(X,S)});F(function(){U.up.callback(true)},0)}},init:function(){B(U.onDOMReady,U)}})};k.stack.PostMessageTransport=function(V){var X,Y,T,U;function S(Z){if(Z.origin){return Z.origin}if(Z.uri){return f(Z.uri)}if(Z.domain){return l.protocol+"//"+Z.domain}throw"Unable to retrieve the origin of the event"}function W(aa){var Z=S(aa);if(Z==U&&aa.data.substring(0,V.channel.length+1)==V.channel+" "){X.up.incoming(aa.data.substring(V.channel.length+1),Z)}}return(X={outgoing:function(aa,ab,Z){T.postMessage(V.channel+" "+aa,ab||U);if(Z){Z()}},destroy:function(){t(I,"message",W);if(Y){T=null;Y.parentNode.removeChild(Y);Y=null}},onDOMReady:function(){U=f(V.remote);if(V.isHost){r(I,"message",function Z(aa){if(aa.data==V.channel+"-ready"){T=("postMessage" in Y.contentWindow)?Y.contentWindow:Y.contentWindow.document;t(I,"message",Z);r(I,"message",W);F(function(){X.up.callback(true)},0)}});O(V.props,{src:K(V.remote,{xdm_e:l.protocol+"//"+l.host,xdm_c:V.channel,xdm_p:1}),name:P+V.channel+"_provider"});Y=v(V)}else{r(I,"message",W);T=("postMessage" in I.parent)?I.parent:I.parent.document;T.postMessage(V.channel+"-ready",U);F(function(){X.up.callback(true)},0)}},init:function(){B(X.onDOMReady,X)}})};k.stack.FrameElementTransport=function(T){var U,W,V,S;return(U={outgoing:function(Y,Z,X){V.call(this,Y);if(X){X()}},destroy:function(){if(W){W.parentNode.removeChild(W);W=null}},onDOMReady:function(){S=f(T.remote);if(T.isHost){O(T.props,{src:K(T.remote,{xdm_e:l.protocol+"//"+l.host+l.pathname+l.search,xdm_c:T.channel,xdm_p:5}),name:P+T.channel+"_provider"});W=v(T);W.fn=function(X){delete W.fn;V=X;F(function(){U.up.callback(true)},0);return function(Y){U.up.incoming(Y,S)}}}else{/*I.parent.location=N.xdm_e+"#";*/V=I.frameElement.fn(function(X){U.up.incoming(X,S)});U.up.callback(true)}},init:function(){B(U.onDOMReady,U)}})};k.stack.NixTransport=function(T){var V,X,W,S,U;return(V={outgoing:function(Z,aa,Y){W(Z);if(Y){Y()}},destroy:function(){U=null;if(X){X.parentNode.removeChild(X);X=null}},onDOMReady:function(){S=f(T.remote);if(T.isHost){try{if(!x(I,"getNixProxy")){I.execScript("Class NixProxy\n    Private m_parent, m_child, m_Auth\n\n    Public Sub SetParent(obj, auth)\n        If isEmpty(m_Auth) Then m_Auth = auth\n        SET m_parent = obj\n    End Sub\n    Public Sub SetChild(obj)\n        SET m_child = obj\n        m_parent.ready()\n    End Sub\n\n    Public Sub SendToParent(data, auth)\n        If m_Auth = auth Then m_parent.send(CStr(data))\n    End Sub\n    Public Sub SendToChild(data, auth)\n        If m_Auth = auth Then m_child.send(CStr(data))\n    End Sub\nEnd Class\nFunction getNixProxy()\n    Set GetNixProxy = New NixProxy\nEnd Function\n","vbscript")}U=getNixProxy();U.SetParent({send:function(aa){V.up.incoming(aa,S)},ready:function(){F(function(){V.up.callback(true)},0)}},T.secret);W=function(aa){U.SendToChild(aa,T.secret)}}catch(Z){throw new Error("Could not set up VBScript NixProxy:"+Z.message)}O(T.props,{src:K(T.remote,{xdm_e:l.protocol+"//"+l.host+l.pathname+l.search,xdm_c:T.channel,xdm_s:T.secret,xdm_p:3}),name:P+T.channel+"_provider"});X=v(T);X.contentWindow.opener=U}else{/*I.parent.location=N.xdm_e+"#";*/try{U=I.opener}catch(Y){throw new Error("Cannot access window.opener")}U.SetChild({send:function(aa){b.setTimeout(function(){V.up.incoming(aa,S)},0)}});W=function(aa){U.SendToParent(aa,T.secret)};F(function(){V.up.callback(true)},0)}},init:function(){B(V.onDOMReady,V)}})};k.stack.NameTransport=function(W){var X;var Z,ad,V,ab,ac,T,S;function aa(ag){var af=W.remoteHelper+(Z?"#_3":"#_2")+W.channel;ad.contentWindow.sendMessage(ag,af)}function Y(){if(Z){if(++ab===2||!Z){X.up.callback(true)}}else{aa("ready");X.up.callback(true)}}function ae(af){X.up.incoming(af,T)}function U(){if(ac){F(function(){ac(true)},0)}}return(X={outgoing:function(ag,ah,af){ac=af;aa(ag)},destroy:function(){ad.parentNode.removeChild(ad);ad=null;if(Z){V.parentNode.removeChild(V);V=null}},onDOMReady:function(){Z=W.isHost;ab=0;T=f(W.remote);W.local=w(W.local);if(Z){k.Fn.set(W.channel,function(ag){if(Z&&ag==="ready"){k.Fn.set(W.channel,ae);Y()}});S=K(W.remote,{xdm_e:W.local,xdm_c:W.channel,xdm_p:2});O(W.props,{src:S+"#"+W.channel,name:P+W.channel+"_provider"});V=v(W)}else{W.remoteHelper=W.remote;k.Fn.set(W.channel,ae)}ad=v({props:{src:W.local+"#_4"+W.channel},onLoad:function af(){t(ad,"load",af);k.Fn.set(W.channel+"_load",U);(function ag(){if(typeof ad.contentWindow.sendMessage=="function"){Y()}else{F(ag,50)}}())}})},init:function(){B(X.onDOMReady,X)}})};k.stack.HashTransport=function(U){var X;var ac=this,aa,V,S,Y,ah,W,ag;var ab,T;function af(aj){if(!ag){return}var ai=U.remote+"#"+(ah++)+"_"+aj;((aa||!ab)?ag.contentWindow:ag).location=ai}function Z(ai){Y=ai;X.up.incoming(Y.substring(Y.indexOf("_")+1),T)}function ae(){if(!W){return}var ai=W.location.href,ak="",aj=ai.indexOf("#");if(aj!=-1){ak=ai.substring(aj)}if(ak&&ak!=Y){Z(ak)}}function ad(){V=setInterval(ae,S)}return(X={outgoing:function(ai,aj){af(ai)},destroy:function(){I.clearInterval(V);if(aa||!ab){ag.parentNode.removeChild(ag)}ag=null},onDOMReady:function(){aa=U.isHost;S=U.interval;Y="#"+U.channel;ah=0;ab=U.useParent;T=f(U.remote);if(aa){U.props={src:U.remote,name:P+U.channel+"_provider"};if(ab){U.onLoad=function(){W=I;ad();X.up.callback(true)}}else{var ak=0,ai=U.delay/50;(function aj(){if(++ak>ai){throw new Error("Unable to reference listenerwindow")}try{W=ag.contentWindow.frames[P+U.channel+"_consumer"]}catch(al){}if(W){ad();X.up.callback(true)}else{F(aj,50)}}())}ag=v(U)}else{W=I;ad();if(ab){ag=parent;X.up.callback(true)}else{O(U,{props:{src:U.remote+"#"+U.channel+new Date(),name:P+U.channel+"_consumer"},onLoad:function(){X.up.callback(true)}});ag=v(U)}}},init:function(){B(X.onDOMReady,X)}})};k.stack.ReliableBehavior=function(T){var V,X;var W=0,S=0,U="";return(V={incoming:function(aa,Y){var Z=aa.indexOf("_"),ab=aa.substring(0,Z).split(",");aa=aa.substring(Z+1);if(ab[0]==W){U="";if(X){X(true)}}if(aa.length>0){V.down.outgoing(ab[1]+","+W+"_"+U,Y);if(S!=ab[1]){S=ab[1];V.up.incoming(aa,Y)}}},outgoing:function(aa,Y,Z){U=aa;X=Z;V.down.outgoing(S+","+(++W)+"_"+aa,Y)}})};k.stack.QueueBehavior=function(U){var X,Y=[],ab=true,V="",aa,S=0,T=false,W=false;function Z(){if(U.remove&&Y.length===0){s(X);return}if(ab||Y.length===0||aa){return}ab=true;var ac=Y.shift();X.down.outgoing(ac.data,ac.origin,function(ad){ab=false;if(ac.callback){F(function(){ac.callback(ad)},0)}Z()})}return(X={init:function(){if(p(U)){U={}}if(U.maxLength){S=U.maxLength;W=true}if(U.lazy){T=true}else{X.down.init()}},callback:function(ad){ab=false;var ac=X.up;Z();ac.callback(ad)},incoming:function(af,ad){if(W){var ae=af.indexOf("_"),ac=parseInt(af.substring(0,ae),10);V+=af.substring(ae+1);if(ac===0){if(U.encode){V=g(V)}X.up.incoming(V,ad);V=""}}else{X.up.incoming(af,ad)}},outgoing:function(ag,ad,af){if(U.encode){ag=C(ag)}var ac=[],ae;if(W){while(ag.length!==0){ae=ag.substring(0,S);ag=ag.substring(ae.length);ac.push(ae)}while((ae=ac.shift())){Y.push({data:ac.length+"_"+ae,origin:ad,callback:ac.length===0?af:null})}}else{Y.push({data:ag,origin:ad,callback:af})}if(T){X.down.init()}else{Z()}},destroy:function(){aa=true;X.down.destroy()}})};k.stack.VerifyBehavior=function(W){var X,V,T,U=false;function S(){V=Math.random().toString(16).substring(2);X.down.outgoing(V)}return(X={incoming:function(aa,Y){var Z=aa.indexOf("_");if(Z===-1){if(aa===V){X.up.callback(true)}else{if(!T){T=aa;if(!W.initiate){S()}X.down.outgoing(aa)}}}else{if(aa.substring(0,Z)===T){X.up.incoming(aa.substring(Z+1),Y)}}},outgoing:function(aa,Y,Z){X.down.outgoing(V+"_"+aa,Y,Z)},callback:function(Y){if(W.initiate){S()}}})};k.stack.RpcBehavior=function(Y,T){var V,aa=T.serializer||J();var Z=0,X={};function S(ab){ab.jsonrpc="2.0";V.down.outgoing(aa.stringify(ab))}function W(ab,ad){var ac=Array.prototype.slice;return function(){var ae=arguments.length,ag,af={method:ad};if(ae>0&&typeof arguments[ae-1]==="function"){if(ae>1&&typeof arguments[ae-2]==="function"){ag={success:arguments[ae-2],error:arguments[ae-1]};af.params=ac.call(arguments,0,ae-2)}else{ag={success:arguments[ae-1]};af.params=ac.call(arguments,0,ae-1)}X[""+(++Z)]=ag;af.id=Z}else{af.params=ac.call(arguments,0)}if(ab.namedParams&&af.params.length===1){af.params=af.params[0]}S(af)}}function U(ai,ah,ad,ag){if(!ad){if(ah){S({id:ah,error:{code:-32601,message:"Procedure not found."}})}return}var af,ac;if(ah){af=function(aj){af=m;S({id:ah,result:aj})};ac=function(aj,ak){ac=m;var al={id:ah,error:{code:-32099,message:aj}};if(ak){al.error.data=ak}S(al)}}else{af=ac=m}if(!n(ag)){ag=[ag]}try{var ab=ad.method.apply(ad.scope,ag.concat([af,ac]));if(!p(ab)){af(ab)}}catch(ae){ac(ae.message)}}return(V={incoming:function(ac,ab){var ad=aa.parse(ac);if(ad.method){if(T.handle){T.handle(ad,S)}else{U(ad.method,ad.id,T.local[ad.method],ad.params)}}else{var ae=X[ad.id];if(ad.error){if(ae.error){ae.error(ad.error)}}else{if(ae.success){ae.success(ad.result)}}delete X[ad.id]}},init:function(){if(T.remote){for(var ab in T.remote){if(T.remote.hasOwnProperty(ab)){Y[ab]=W(T.remote[ab],ab)}}}V.down.init()},destroy:function(){for(var ab in T.remote){if(T.remote.hasOwnProperty(ab)&&Y.hasOwnProperty(ab)){delete Y[ab]}}V.down.destroy()}})};b.easyXDM=k})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);

var plugin = Echo.createPlugin({
    // this is the name of the plugin
    "name": "FileUpload",
    // plugin is written for the Stream application
    "applications": ["Submit"],
    // it uses User List application inside
    "dependencies": [],
    "init": function(plugin, application) {       
		// adding extra CSS rules for plugin components
		plugin.addCss('' +
			'.echo-submit-photoUploadContainer {margin-top:5px;display:none;} ' +
			'.echo-submit-uploadedPhotos { overflow:hidden;padding:7px;background-color:#eee; } ' +
			'.echo-submit-text-input-photoUpload { width: 100%; border: 1px solid #D2D2D2; }' +
			'.echo-submit-upload-control-wrapper { margin: 0 5px 0 0; float:left; width: 106px; overflow: hidden; position: relative; } ' +
			'.echo-submit-upload-button-container { float:left;position: relative; } ' +
			'.echo-upload-control-container-button {font-size:12px;text-decoration:none;}' +
			'.echo-submit-upload-button-container {cursor:pointer;}'+
			//'.echo-submit-upload-button-container:hover .echo-upload-control-container-button {text-decoration:underline;}' +
			'.echo-submit-upload-file-container { width: 103px; height: 103px; text-align:center; margin: 0 0 10px 0; border:1px solid #CCCCCC; background:#FFFFFF; } ' +
			'.echo-submit-upload-button-container{margin: 0px 0px 0px 10px;padding: 5px 0px 0px 0px;}' +
			'.echo-submit-upload-control-caption { font:italic 11px/1.5 Arial; color:#616161; cursor: pointer;height:17px; }' +
			'.echo-submit-upload-control-caption:hover { background:#FAF1AA; }' +
			'.echo-submit-upload-control-caption input[type="text"] { background:#FAF1AA; border:none;font-size:12px; }' +
			'.echo-submit-upload-file-container img { padding:3px; max-height:98px; max-width:98px; }' +
			'.echo-submit-upload-control-caption button[class="cancel"] { display:none; }' +
			'.echo-upload-control-container-loader { height:16px; width:16px; background:url("' + (window.location.protocol=="https:"?"https://ssl.":"http://cdn.") +'realtidbits.com/libs/v1/FileUpload/ajax-loader.gif"); margin:0 0 0 5px; display:none; }' +
			'.echo-submit-upload-control-remove { height:20px; width:20px; background:#eee url("' + (window.location.protocol=="https:"?"https://ssl.":"http://cdn.") +'realtidbits.com/libs/v1/FileUpload/cross.png") no-repeat center center; position: absolute; top: 1px; right: 2px; border:1px solid #ccc; border-top:none; border-right: none; cursor:pointer; display: none; } ' +
			'.echo-item-body img { border:0; }' +
			'.echo-item-body .echo-item-photo {display:inline-block; }' +
			'.echo-item-body .echo-item-photo img {margin:0 5px 5px 0; border:1px solid #CCCCCC; padding:3px; background:#FFFFFF; }' +
			'.echo-item-body .echo-item-photo img:hover { border:1px solid #aeaeae; }' +
			'.echo-item-files { margin-top: 5px; }' +
			'.echo-submit-photoUploadContainer .uploadifyQueue {display:none;}' +
			'.echo-upload-form {float:left;}' +
			'.echo-upload-form input {opacity: 0; filter: alpha(opacity=0); -ms-filter: "alpha(opacity=0)"; -khtml-opacity: 0; -moz-opacity: 0;}' +
			'');
		// setting up plugin-specific variable
		plugin.set(application, "photos", [
				/*{
						"thumbnail": "http://js-kit.com/avatar/gxpA99f0jKlohF_DgthroT.png",
						"preview": "http://js-kit.com/avatar/gxpA99f0jKlohF_DgthroT.png",
						"web": "http://js-kit.com/avatar/gxpA99f0jKlohF_DgthroT.png",
						"original": "http://js-kit.com/avatar/gxpA99f0jKlohF_DgthroT.png",
						"caption": "hello"
				}*/
		]);
		plugin.set(application, "photosTotal", 0);
		var filesMax = application.config.get(plugin.config("filesMax")) || 4;
		plugin.set(application, "filesMax", filesMax);
		//console.log(application);
		
		//
		plugin.set(application, "input_id", "realtidbits-fileupload-input-" + Math.floor(Math.random()*10000001));
		
		// api url endpoint
		
		plugin.set(application, "api_rpc", window.location.protocol + '//api.realtidbits.com/libs/fileupload/upload-rpc.html');
		plugin.set(application, "api_url", window.location.protocol + '//api.realtidbits.com/upload'); //http://image-api.dnsalias.com
		plugin.set(application, "is_posting", false);
		
		// extending template and insert extra HTML to the necessary area
		plugin.extendTemplate("Submit", plugin.template, "insertAfter", "echo-submit-content");
		
		// extending "Post" button renderer
		plugin.extendRenderer("Submit", "postButton", plugin.postButtonRenderer);
		
		// subscribe to events
		plugin.listenEvents(plugin, application);
    }
});

plugin.listenEvents = function(plugin, application) {
	//
	application.subscribe("Submit.onRender", function(topic, data) {
		plugin.initUploader(application);
	});
	
	application.subscribe("Submit.onPostComplete", function(topic, data) {
		// reset switch
		plugin.set(application, "is_posting", false);
		// code to cleanup the photo-specific fields after successful post
		plugin.set(application, "photos", []);
		//
		plugin.set(application, "photosTotal", 0);
		//
		plugin.showHideBrowseButton(plugin, application);
		// clear the input text
		application.dom.get("text").iHint({
				"text": "Include a comment here...",
				"className": "echo-secondaryColor"
		})
		application.dom.get("markers").val("");
		// remove all the uploaded files
		var target = application.config.data.target;
		$(target).find(".echo-submit-upload-file").remove();
		// hide uploader
		$(target).find('.echo-submit-photoUploadContainer').hide();
		// reset upload
		// ***
	});
	//
	//plugin.subscribe(application, "Submit.onPostInit", function(topic, args) {
	application.subscribe("Submit.onPostInit", function(topic, args) {
       if (application.config.get("target").get(0) != args.target) return;
       //
		var text = args.postData.content;
		// update text with image html
		if(plugin.get(application, "photos").length == 0) {
			// no photos
		} else {
			if(text == "...") {
				text = '';
			}
			// photos
			text += '<div class="echo-item-files">';
			$.map(plugin.get(application, "photos"), function(photo) {
				if(photo != null) {
					text += plugin.postingFileOutput(photo);
				}
			});
			text += '</div>';
		};
		// set
	   args.postData.content = text;
		// custom markers
		var markers = application.config.get(plugin.config("markers"));
		if(markers) {
			var tmp = args.postData.markers.split(",");
			var markers = markers.concat(tmp);
			args.postData.markers = markers.join(',');
		}
		//
		plugin.set(application, "clear_text_before_post", false);
	});
}

plugin.addLabels({
	"attachPhoto": "+ Photo",
	"actionString": "Include a note here...",
	"noPhotosUploaded": "No files were uploaded!",
	"uploadNotComplete": "Please wait until all files have been uploaded."
});

plugin.template =
'<div class="echo-submit-photoUploadContainer">' +
		'<div class="echo-submit-uploadedPhotos"></div>' +
'</div>';

plugin.templateControl = 
'<div class="echo-submit-upload-button-container">' +
  '<form class="echo-upload-form" method="POST" target="upload_target" enctype="multipart/form-data" style="height:20px;overflow:hidden;position:relative;">' +
    '<input type="file" class="echo-upload-file-input" name="Filedata" style="position:absolute;top:0;right:0;" />' +
    '<div>' +
      '<button class="btn btn-mini bt-no-radius echo-upload-control-container-button"></button>' +
	'</div>' +
  '</form>'+
  '<div class="echo-upload-control-container-loader"></div>' +
'</div>';

plugin.initUploader = function(application) {
	//
	// plugin-specific config variables can be handled like this:
	var webRes = application.config.get(plugin.config("webRes"));
	var thumbnailRes = application.config.get(plugin.config("thumbnailRes"));
	var previewRes = application.config.get(plugin.config("previewRes"));
	var storageServer = application.config.get(plugin.config("storageServer"));
	var fileSizeMax = application.config.get(plugin.config("fileSizeMax"));
	var filesMax = plugin.get(application, "filesMax");
	var fileSizeMin = plugin.get(application, "fileSizeMin");
	// timestamp now
	var lastAlert = plugin.utils.time();
	
	var target = application.config.data.target;
	
	// add upload control to container
	$(target).find('.echo-submit-controls').prepend($(plugin.templateControl));
	$(target).find(".echo-upload-control-container-button").text(plugin.label("attachPhoto"));
	
	// add upload object
	// get elements
	var buttonElement = $(target).find(".echo-upload-control-container-button");
	var loaderElement = $(target).find(".echo-upload-control-container-loader");
	// set the progress ids array
	plugin.set(application, "progressIds", []);
	var progressIds = plugin.get(application, "progressIds");
	// init the uploader
	var btn;
	var form = $(target).find(".echo-upload-form");
	var input_file = $(target).find(".echo-upload-file-input");
	
	//input_file.trigger("click");

	function getExt(filename) {	
		var ext = filename.split('.').pop();
		if(ext == filename) return null;
		return ext.toLowerCase();
	}
	
	input_file.bind("change", function() {
		var filename = $(this).val().toLowerCase();
		var ext = getExt(filename);
		//
		var arr = ['jpg', 'jpeg', 'gif', 'png'];
		if(ext && $.inArray(ext, arr) != -1) {
			// valid file
			form.submit();
		} else {
			// invalid file
			$(this).val('');
			alert("Invalid file format, please select a valid image file.");
		}
	});
	var params = {
		"method":"easyXDM",
		"storage":storageServer,
		"image_web_w": webRes[0],
		"image_web_h": webRes[1],
		"image_preview_w": previewRes[0],
		"image_preview_h": previewRes[1],
		"image_thumbnail_w": thumbnailRes[0],
		"image_thumbnail_h": thumbnailRes[1]
	};
	var url = plugin.get(application, "api_url") + "?" + jQuery.param(params);
	//display the upload form
	form.attr("action", url);

	form.submit(function() {
		//
		Echo.Broadcast.publish("Submit.Plugins.FileUpload.onUpload", {"data": {}, "appkey": application.config.data.appkey}, application.config.data.contextId);
		//
		var id = Math.ceil(Math.random()*100000);
		//console.log(plugin.utils.time()+ " - " + lastAlert + " " + (plugin.utils.time()-lastAlert));
		if((plugin.get(application, "photosTotal")+1) > filesMax) {
			// use a 10 seconds alert reset
			if(plugin.utils.time()-lastAlert < 10) return false;
			lastAlert = plugin.utils.time();
			alert("You have reached the maximum number of files you can upload.");
			return false;
		} else {
			//
			plugin.set(application, "photosTotal", plugin.get(application, "photosTotal")+1);
			//
			progressIds.push(id);
			// show loader  
			buttonElement.hide();
			loaderElement.show();
		}
	});
	
	//
	var uploader = new easyXDM.Rpc({
		remote: plugin.get(application, "api_rpc"),
		onReady: function(){
		}
	},{
		serializer:{
			stringify: function(obj) {
				return JSON.encode(obj);
			},
			parse: function(str){
				return jQuery.parseJSON(str);
			}
		},
		local: {
			returnUploadResponse: function(response){
				input_file.val("");
				// remove this file from our progress array
				//plugin.utils.removeByElement(progressIds, id);
				var progressIds = [];
				plugin.set(application, "progressIds", []);
				//plugin.utils.removeByElement(progressIds, id);
				// if there are no more files being uploaded then hide the loader
				if(progressIds.length == 0) {
						setTimeout(function() {
								buttonElement.show();
								loaderElement.hide();
								plugin.showHideBrowseButton(plugin, application);
						}, 500);
				}
				var responseJSON = response;
				// check for success
				var success = responseJSON.success || false;
				if(success == true) {
						// TODO: get real values from responseJSON
						// add the photo to the plugin photos array
						var photos = plugin.get(application, "photos");
						var index = photos.push({
								"thumbnail": responseJSON.files[0].thumbnail,
								"preview": responseJSON.files[0].preview,
								"web": responseJSON.files[0].web,
								"original": responseJSON.files[0].url,
								"caption": ""
						});
						// append photo
						$(target).find('.echo-submit-photoUploadContainer').show();
						var photo = plugin.assemblePhoto(photos[index-1], application, index-1);
						var el_uploadPhotos = $(target).find('.echo-submit-uploadedPhotos')
						$(photo).hide().appendTo(el_uploadPhotos).slideDown();
				} else {
					if(typeof responseJSON.error != 'undefined') {
						alert(responseJSON.error)
					}
				}
			}
		}
	});
	plugin.set(application, "uploader", uploader);
	/**/
};

plugin.showHideBrowseButton = function(plugin, application) {
        //console.log(plugin.get(application, "photosTotal"));
        var filesMax = plugin.get(application, "filesMax");
        if(plugin.get(application, "photosTotal") == filesMax) {
                $(application.config.data.target).find(".echo-submit-upload-button-container").slideUp();      
        } else {
                $(application.config.data.target).find(".echo-submit-upload-button-container").slideDown();    
        }
}

plugin.utils = {};
plugin.utils.removeByElement = function(arrayName,arrayElement) {
        for(var i=0; i<arrayName.length;i++ ) { 
                if(arrayName[i]==arrayElement) {
                        arrayName.splice(i,1); 
                }
        } 
}
plugin.utils.time = function() {
        return Math.round(new Date().getTime() / 1000); 
}

// renderers are executed within the Submit form context
plugin.postButtonRenderer = function(element, dom) {
        var application = this;

        // "element" inside a renderer is a jQuery-wrapped DOM element
	var handler = plugin.get(application, "postButtonHandler");
	if (!handler) {
		handler = function(event) {
			var photos = plugin.get(application, "photos");
			var progressIds = plugin.get(application, "progressIds");
			// error handeling
			/*if (!photos.length) {
				alert(plugin.label("noPhotosUploaded"));
				event.stopImmediatePropagation();
				return false;
			} else
			*/if(progressIds.length > 0) {
				alert(plugin.label("uploadNotComplete"));
				event.stopImmediatePropagation();
				return false;
			}
			// prevent multiple clicks
			/*if(plugin.get(application, "is_posting") == true) {
				event.stopImmediatePropagation();
				return false;
			}*/
			
			// workaround
			// since the text area will fail even if you upload a photo but no text
			// because it wants text and we haven't injected it yet
			// so let's see if there is text
			// if so do nothing
			// if not add some empty text to trick it - teehee
			
			if(plugin.get(application, "photos").length != 0) {
				var inputText = dom.get("text").val();
				if(inputText == "") {
					// add lots of spaces yeehaw!
					dom.get("text").val('...');
				};
			};
			
			//
			plugin.set(application, "is_posting", true);
		};
		plugin.set(application, "postButtonHandler", handler);
    };

	// rebind post button handler
	element.unbind("click", handler).bind("click", handler);

	// call parent renderer
	application.parentRenderer("postButton", arguments);
};

plugin.postingFileOutput = function(data) {
var caption = (data.caption == "Click to edit caption" ? "" : data.caption);
return '' +
'<div class="echo-item-photo">' +
	'<a href="' + data.web + '" target="_blank">' +
		'<img src="' + data.thumbnail + '" ' +
			' alt="' + data.caption + '"' +
			' title="' + data.caption + '"' +
			' data-src-preview="' + data.preview + '" ' +
			' data-src-web="' + data.web + '" ' +
			' data-src-full="' + data.original + '" />' +
	'</a>' +
'</div>';
}

/*
<div class="echo-item-text">this is my note</div>
<div class="echo-item-files">
  <div class="echo-item-photo">
    <a href="http://example.com/web.jpg" target="_blank">
      <img src="http://example.com/thumbnail.jpg"
        alt="photo caption"
        title="photo caption"
        data-src-preview="http://example.com/preview.jpg"
        data-src-web="http://example.com/web.jpg"
        data-src-full="http://exmaple.com/original.jpg" />
    </a>
  </div>
  <div class="echo-item-photo">
    ...
  </div>
</div>
*/

plugin.assemblePhoto = function(data, application, indexInArray) {
        // return DOM element assembled based on the photo data
        //return $('<img src="' + data.url + '">');
        var caption = (data.caption != "" ? data.caption : "Click to edit caption");
        var photoElement = $(''+
        '<div class="echo-submit-upload-control-wrapper echo-submit-upload-file">' +
                '<div class="echo-submit-upload-file-container">' +
                        '<div class="echo-submit-upload-control-remove"></div>' +
                        '<img src="' + data.thumbnail + '" />' +
                '</div>' +
                '<div class="echo-submit-upload-control-caption">' + caption + '</div>' +
        '</div>');
        // add inline caption edit
        photoElement.find(".echo-submit-upload-control-caption").click(function() {
                var inputElement = $("<input type=\"text\" value=\"" + $(this).text() + "\" />");
				inputElement.keypress(function(e){
      				if(e.which == 13) {
						inputElement.blur();
					}
				});
                var that = this;
                $(this).html(""); // clear html
                $(this).append(inputElement);
                inputElement.focus(); // focus on <input>
                inputElement.select(); // select all text
                // preven clicking on <input> to fire this method again
                inputElement.click(function(e) {
                        e.stopPropagation();
                });
                // when user clicks away from <input> 
                inputElement.blur(function() {
                        var value2 = $(this).val();
                        // save
                        data.caption = value2;
                        $(that).html(value2); // clear html
                });
        });
        // remove photo
        photoElement.hover(function () {
                $(this).find(".echo-submit-upload-control-remove").show();
        }, function () {
                $(this).find(".echo-submit-upload-control-remove").hide();
        });
        photoElement.find(".echo-submit-upload-control-remove").click(function(e) {
			//
			var photos = plugin.get(application, "photos");
			photos[indexInArray] = null;
			//var file = photos.splice(indexInArray, 1);
			//file = file[0];
			photoElement.slideUp().remove();
			e.stopPropagation();
			//
			var photosTotal = plugin.get(application, "photosTotal");
			plugin.set(application, "photosTotal", photosTotal-1);
			//
			plugin.showHideBrowseButton(plugin, application);
			
			if(photosTotal-1 == 0) {
				var target = application.config.data.target;
				$(target).find('.echo-submit-photoUploadContainer').hide();
			}
			
			// cancel upload
			// ****
        });
        //
        return photoElement;
};

plugin.appendCSS = function(id, path) {
	var head = document.getElementsByTagName('head')[0];
	if (!document.getElementById(id)) {
		var link = document.createElement('link');
		link.id = id;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = path;
		link.media = 'all';
		head.appendChild(link);
	}
}

})(jQuery);
