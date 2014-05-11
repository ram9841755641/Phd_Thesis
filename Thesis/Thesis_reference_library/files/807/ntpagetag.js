/* IBM Unica Page Tagging Script v2.3.0
 *
 * Licensed Materials - Property of IBM (c) Copyright IBM Corporation 2004,2011.
 * U.S. Government Users Restricted Rights: Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var NTPT_IMGSRC = 'http://pt000185.unica.com/ntpagetag.gif';

var NTPT_FLDS = new Object();
NTPT_FLDS.lc = true; // Document location
NTPT_FLDS.rf = true; // Document referrer
NTPT_FLDS.rs = true; // User's screen resolution
NTPT_FLDS.cd = true; // User's color depth
NTPT_FLDS.ln = true; // Browser language
NTPT_FLDS.tz = true; // User's timezone
NTPT_FLDS.jv = true; // Browser's Java support
NTPT_FLDS.ck = true; // Cookies

var NTPT_MAXTAGWAIT = 0.5; // Max delay (secs) on link-tags and submit-tags

// Optional variables:
var NTPT_HTTPSIMGSRC = 'https://pt000185.unica.com/ntpagetag.gif';
var NTPT_GLBLREFTOP = false;
var NTPT_SET_IDCOOKIE = true;
var NTPT_IDCOOKIE_NAME = 'UnicaID';

// Variables that will need to be modified on a per-site basis
var NTPT_GLBLEXTRA = 'site=nejm';
var NTPT_IDCOOKIE_DOMAIN = '.nejm.org';

// NTPT_GLBLCOOKIES can be used to pass other cookie values to NetInsight through the page tag
var NTPT_GLBLCOOKIES = [ ];

// Coremetrics adapter variables
var NTPT_CM_CLIENTID = "90388113";
/*** END OF USER-CONFIGURABLE VARIABLES ***/
(function(){var o=document,s=window,i9="undefined",Fr="string",A=null,k=true,C=false;function Q(value){return((typeof(value)===Fr)&&(value!==""));};function i_(w){return(encodeURIComponent?encodeURIComponent(w):escape(w));};function WL(w){return(decodeURIComponent?decodeURIComponent(w):unescape(w));};function M(X,w,yH,VU){var G="",e;G=X+'='+i_(w)+";";if(VU){G+=" domain="+VU+";";}if(yH>0){e=new Date();e.setTime(e.getTime()+(yH*1000));G+=" expires="+e.toGMTString()+";";}G+=" path=/";o.cookie=G;};function U(X){var N,t,S,G;if(Q(X)){N=X+"=";G=o.cookie;if(G.length>0){S=Oq(N,G,0);if(S!==-1){S+=N.length;t=G.indexOf(";",S);if(t===-1){t=G.length;}return WL(G.substring(S,t));};};}return A;};function Oq(N,G,T8){var S=G.indexOf(N,T8);if(S<0){return-1;}else if((S===0)||((S>1)&&(G.substring(S-2,S)==="; "))){return S;}return Oq(N,G,(S+1));};function GW(gS){var eG="",H;for(H in gS){if(Q(gS[H])){if(eG!==""){eG+=";";}eG+=H+"="+gS[H];};}return eG;};function a2(L){var oZ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';if(L<62){return oZ.charAt(L);}return(a2(Math.floor(L/62))+oZ.charAt(L%62));};function W6(){var Dg="",R_=new Date(),Xp;for(Xp=0;Xp<11;Xp+=1){Dg+=a2(Math.round(Math.random()*61));}return(Dg+"-"+a2(R_.getTime()));};function cN(m,YX){return(m+(((m==='')||((YX==='')||(YX.substring(0,1)==='&')))?'':'&')+YX);};function wF(){var AP=new Date();return(AP.getTime()+'.'+Math.floor(Math.random()*1000));};function h(N8,Pi){return(typeof(s[N8])!==i9)?s[N8]:Pi;};(function(){var v="NTPT_",Tj=h(v+"GLBLCOOKIES",A),AB=h(v+"PGCOOKIES",A),FI=h(v+"SET_IDCOOKIE",C),P=h(v+"IDCOOKIE_NAME","SaneID"),JE=h(v+"IDCOOKIE_DOMAIN",A),Kv=h(v+"IDCOOKIE_EXPIRE",155520000),Nt=h(v+"SET_SESSION_COOKIE",C),VJ=h(v+"SESSION_COOKIE_NAME","NetInsightSessionID"),Zg=h(v+"SESSION_COOKIE_DOMAIN",A),Gg=h(v+"HTTPSIMGSRC",""),oF=h(v+"PGREFTOP",h(v+"GLBLREFTOP",C)),SC=h(v+"NOINITIALTAG",C),um=h(v+"MAXTAGWAIT",1.0),Qc=h(v+"CMTAGS_ONLY",C),Ku=h(v+"CM_CLIENTID",A),l3=h(v+"CM_HOST","udata.coremetrics.com"),Vh=h(v+"CM_HOSTEDLIB","libs.coremetrics.com/unica_eluminate.js"),Zq=[],qo=NTPT_IMGSRC,q=NTPT_FLDS,_=A,a=A,d=A,c=[],p={},F=new Array(10),O;for(O=0;O<F.length;O+=1){F[O]=A;}function r(X,Bj){if(typeof(Bj)!==i9){c[X]=Bj.toString();}};function rH(X){c[X]='';};function v0(z){var mc,bE,pN;if(Q(z)){mc=z.split('&');for(pN=0;pN<mc.length;pN+=1){bE=mc[pN].split('=');if(bE.length===2){r(bE[0],WL(bE[1]));};};}};function Tm(z){var NG='',H;v0(h(v+'GLBLEXTRA',''));if(!a){v0(h(v+'PGEXTRA',''));}v0(z);for(H in c){if(Q(c[H])){NG=cN(NG,H+'='+i_(c[H]));};}return NG;};function GQ(){var H;p.c=[];for(H in c){if(Q(c[H])){p.c[H]=c[H];};}};function xw(){var H;c=[];for(H in p.c){if(Q(p.c[H])){c[H]=p.c[H];};}};function nU(i,f,Y){if(F[i]!==A){F[i].onload=f;F[i].onerror=f;F[i].onabort=f;}return setTimeout(f,(Y*1000));};function wO(j,I){if(Qc){return;}if(!Q(j)){return;}O=((O+1)%F.length);if(F[O]===A){F[O]=new Image(1,1);}F[O].src=j+'?'+I;};function HY(z){var j,I;if((Gg!=='')&&(o.location.protocol==='https:')){j=Gg;}else{j=qo;}I=Tm(z);wO(j,I);Zq.push(of(c));xw();};function zP(z){r('ets',wF());HY(z);return k;};function gy(){if(uE){clearTimeout(uE);uE=A;}if(a){var SK=a;a=A;if(SK.href){s.location.href=SK.href;};}};function cK(hP,z,Y){var b;if(!hP||!hP.href){return k;}if(a){return C;}a=hP;if(q.lc){r('lc',hP.href);}if(q.rf){if(!oF||!top||!top.document){r('rf',o.location);};}zP(z);if(Y){b=Y;}else{b=um;}b=uY(b);if(b>0&&(a.target==""||a.target==s.name)){uE=nU(O,function(){gy();},b);return C;}a=A;return k;};function FM(){if(_){clearTimeout(_);_=A;}if(d){var _w=d;d=A;_w.submit();_w.onsubmit=_w.vF;}};function uY(b){if(Qc&&(b>0)){return 0.2;}return b;};function eJ(Z,z,Y){var b;if(!Z||!Z.submit){return k;}if(d){return C;}d=Z;zP(z);if(Y){b=Y;}else{b=um;}b=uY(b);if(b>0){Z.vF=Z.onsubmit;Z.onsubmit=A;_=nU(O,function(){FM();},b);return C;}d=A;return k;};function _p(){var Yg;if(oF&&top&&top.document){Yg=top.document.referrer;}else{Yg=o.referrer;}r('rf',Yg);};function jG(){var J;if(navigator.language){J=navigator.language;}else if(navigator.userLanguage){J=navigator.userLanguage;}else{J='';}if(J.length>2){J=J.substring(0,2);}J=J.toLowerCase();r('ln',J);};function PL(){var D,AP=new Date(),g=AP.getTimezoneOffset(),R;D='GMT';if(g!==0){if(g>0){D+=' -';}else{D+=' +';}g=Math.abs(g);R=Math.floor(g/60);g-=R*60;if(R<10){D+='0';}D+=R+':';if(g<10){D+='0';}D+=g;}r('tz',D);};function YN(){var W=[],fA=C,ub='ck',B,G,K,H;r('js','1');r('ts',wF());if(q.lc){r('lc',o.location);}if(q.rf){_p();}if(self.screen){if(q.rs){r('rs',self.screen.width+'x'+self.screen.height);}if(q.cd){r('cd',self.screen.colorDepth);};}if(q.ln){jG();}if(q.tz){PL();}if(q.jv){r('jv',navigator.javaEnabled()?'1':'0');}if(Nt&&!U(VJ)){M(VJ,1,0,Zg);if(q.iv&&U(VJ)){r('iv','1');};}if(q.ck){if(Tj){for(B=0;B<Tj.length;B+=1){W[Tj[B]]="";};}if(AB){for(B=0;B<AB.length;B+=1){W[AB[B]]="";};}for(H in W){if(typeof(W[H])===Fr){G=U(H);if(G){W[H]=G;};};}if(FI){G=U(P);if(G){W[P]=G;fA=k;};}K=GW(W);if(K!==""){r(ub,K);};}GQ();if(!SC){HY('');}rH('iv');GQ();if(FI&&!fA){G=U(P);if(!G){G=W6();M(P,G,Kv,JE);if(q.ck&&U(P)){W[P]=G;K=GW(W);if(K!==""){r(ub,K);GQ();};};};}};function Vk(X,w){var m,B2,B,rp;m=o.location.search.substring(1);rp=X+"="+w;B2=m.split("&");for(B=0;B<B2.length;B+=1){if(B2[B]===rp){return k;};}return C;};function HD(){var Dw=h(v+"EM_COOKIE_PREFIX","NetInsightEM"),fw=Dw+"Session",cz=Dw,O4=h(v+"EM_COOKIE_TIMEOUT",1800),p7="emsgpcat",On="1",YO="1";if(U(fw)||U(cz)||Vk(p7,On)){M(fw,YO,0,JE);M(cz,YO,O4,JE);r(p7,On);return k;}return C;};function xH(){return(q.gsme?HD():k);};function RU(){if(Q(Ku)){s.NTPT_SET_IDCOOKIE=FI;s._cmAdapter={tagQueue:Zq,cm_ClientID:Ku,cm_HOST:l3};try{var h0=o.getElementsByTagName("head");var lo=(h0&&(h0.length>0))?h0[0]:o.body;if(lo){var T=o.createElement("script");T.language="Javascript";T.type="text/javascript";T.src=o.location.protocol+"//"+Vh;lo.appendChild(T);}}catch(bu){};}};function of(Cb){var wC={};for(var oQ in Cb){var TQ=Cb[oQ];if(Q(TQ)){wC[oQ]=""+TQ;};}return wC;};if(xH()){s.ntptAddPair=function(l,V){return r(l,V);};s.ntptDropPair=function(l){return rH(l);};s.ntptEventTag=function(l){return zP(l);};s.ntptLinkTag=function(l,V,rS){return cK(l,V,rS);};s.ntptSubmitTag=function(l,V,rS){return eJ(l,V,rS);};YN();RU();}else{s.ntptAddPair=s.ntptDropPair=s.ntptEventTag=s.ntptLinkTag=s.ntptSubmitTag=function(){return k;};}}());}());


function unicaFunctions(command, args) {
	if (null == args) {
		return;
	}
	var tmpargs = args.split(",");
	if (command == "ntptEventTag") {
		(0 == tmpargs[0].length) ? ntptEventTag() : ntptEventTag(tmpargs[0]);
	}
	else if (command == "ntptAddPair") {
		if ( 2 != tmpargs.length ) {
			return;
		}
		else {
			ntptAddPair(tmpargs[0], tmpargs[1]);
		}
	}
	else if (command == "ntptDropPair") {
		if ( 1 != tmpargs.length ) {
			return;
		}
		else {
			ntptDropPair(tmpargs[0]);
		}
	}
} 