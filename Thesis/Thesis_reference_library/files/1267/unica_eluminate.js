/*Copyright 2000-2010,Coremetrics 4.8.5 $Revision$*/if(!cGB){var cGB=true;if(!cm_ClientID){var cm_ClientID="99999999";}if(!cm_HOST){var cm_HOST="testdata.coremetrics.com/cm?";}if(!cm_ClientTS){var dt=new Date();var cm_ClientTS=dt.getTime();}if(!cm_TrackLink){var cm_TrackLink="A";}if(!cm_DelayHandlerReg){var cm_DelayHandlerReg="";}if(!cm_SkipHandlerReg){var cm_SkipHandlerReg="";}if(!cm_TrackTime){var cm_TrackTime=false;}if(!cm_TrackImpressions){var cm_TrackImpressions="RSCM";}if(!cm_SecureTags||cm_SecureTags==null){var cm_SecureTags="|2|3|";}if(!cm_FirstPartyDetect){var cm_FirstPartyDetect=false;}if(!cm_DownloadExtensions){var cm_DownloadExtensions=null;}if(!cm_UseUTF8){var cm_UseUTF8=true;}if(!cm_FormError){var cm_FormError="";}if(!cm_FormPageID){var cm_FormPageID=false;}if(cm_UseCookie==null){var cm_UseCookie=true;}if(!cm_TimeoutSecs){var cm_TimeoutSecs=15;}if(!cm_UseDOMScriptLoad){var cm_UseDOMScriptLoad=true;}if(!cm_OffsiteImpressionsEnabled){var cm_OffsiteImpressionsEnabled=false;}if(!cm_AvidHost){var cm_AvidHost="data.cmcore.com/cookie-id.js?fn=cmSetAvid";}var cm_AvidLoadTimedOut=false;if(!cm_JSFEnabled){var cm_JSFEnabled=false;}if(!cm_JSFPCookieDomain){var cm_JSFPCookieDomain=null;}if(!cm_JSFTrackClients){var cm_JSFTrackClients=true;}if(!cm_JSFPCookieMigrate){var cm_JSFPCookieMigrate=false;}if(!cm_JSFPForceMigrateCookies){var cm_JSFPForceMigrateCookies=false;}if(!cm_JSFPCookieMigrateVisitorID){var cm_JSFPCookieMigrateVisitorID="cm_mc_uid";}if(!cm_JSFPCookieMigrateSessionID){var cm_JSFPCookieMigrateSessionID="cm_mc_sid";}if(!cm_JSFPMigrationDomainWhitelist){var cm_JSFPMigrationDomainWhitelist=null;}if(!cm_JSFPMigrationDomainBlacklist){var cm_JSFPMigrationDomainBlacklist=null;}if(!cm_JSFPMigrationPathWhitelist){var cm_JSFPMigrationPathWhitelist=null;}if(!cm_JSFPMigrationOtherCookies){var cm_JSFPMigrationOtherCookies=null;}if(!cm_JSFPMigrationOtherCookiesExpireTimes){var cm_JSFPMigrationOtherCookiesExpireTimes={};}if(!cm_JSFMigrationEnabled){var cm_JSFMigrationEnabled=0;}if(!cm_JSFSessionType){var cm_JSFSessionType="I";}if(!cm_JSFSessionTimeout){var cm_JSFSessionTimeout=1800;}if(!cm_JSFCoreCookieName){var cm_JSFCoreCookieName="CoreID6";}if(!cm_JSFSpecCookieNames){var cm_JSFSpecCookieNames=[];}if(!cmUA){var cmUA={};cmUA["MSIE"]=2083;}if(!cmDefaultLimit){var cmDefaultLimit=8197;}if(cGQ==null){var cGQ=true;}if(!cGO){var cGO=1024;}if(!cGR){var cGR=600000;}if(!encodeURIComponent){var encodeURIComponent=null;}var cG8;var cG8Index;var cG6=document;var cGT;var cG7=new _cG7();cG6.cmTagCtl=cG7;var CI=cmStartTagSet;var CJ=cmSendTagSet;var cG1=0;var cG0=["vn1","vn2","st","pi","rs","ec","rf","ul"];var cmLastPageID=null;var cGA=null;var cmMigrationDisabled=0;var cmMigrationFrom1p_CM=1;var cmMigrationFrom1p_SA=2;var cmValidFlag_SessionContinue=1;var cmValidFlag_NewSession=2;var cmValidFlag_NewVisitor=4;var cmValidFlag_SessionReset=32;var cmSACookieName="sauid";var cmCore_JSFParamEnabled="cjen";var cmCore_JSFParamUserID="cjuid";var cmCore_JSFParamSessionID="cjsid";var cmCore_JSFParamValidFlag="cjvf";var cmCore_JSFParamSpecCookiesCount="cjscc";var cmCore_JSFParamSpecCookiesNames="cjscn";var cmCore_JSFParamSpecCookiesValues="cjscv";var cmSpecCookieNames="";var cmSpecCookieValues="";var cmSpecCookiesCount=0;if(!cG4){var cG4=5000;}if(!cG5){var cG5=200;}var cG2={};var cG3={};var cGM=navigator.appVersion;var cGN=navigator.userAgent;var cGS=cGN.indexOf("Opera")>=0;var cGU=cGN.indexOf("Safari")>=0;var cmT2=-1;var cmT3=-1;var cGC="";var cGD="";var cGE="";var cGF="";var cGG="";var cGH="";var cmSubmitFlag=false;var cmFormC1="submitbuttonreset";var cmFormC2="textpasswordtextarea";var cmFormC3="select-oneselect-multiple";var cGI="";var cGJ="";var cGK="";var cGL="";var chost=null;var cci=null;var _cm_CMRules={};var _cm_isNew=true;if(!cm_PartnerDataClientIDs){var cm_PartnerDataClientIDs="";}var cm_Avid;var cmCookieExpDate;var cm_AvidLoadTimer;var cm_IOEnabled=false;var cm_ATEnabled=false;CI();for(var cmSpecCookieIndex=0;cmSpecCookieIndex<cm_JSFSpecCookieNames.length;cmSpecCookieIndex++){var currSpecCookieName=cm_JSFSpecCookieNames[cmSpecCookieIndex];var currSpecCookieValue=cI(cm_JSFSpecCookieNames[cmSpecCookieIndex]);if(currSpecCookieValue==null)continue;if(currSpecCookieValue.length==0)continue;cmSpecCookieNames=cmSpecCookieNames+(cmSpecCookieNames!=""?"|":"")+escape(currSpecCookieName);cmSpecCookieValues=cmSpecCookieValues+(cmSpecCookieValues!=""?"|":"")+escape(currSpecCookieValue);cmSpecCookiesCount++;}var dt=new Date();var cmYearOffset=0;if(dt.getFullYear)cmYearOffset=dt.getFullYear();else{cmYearOffset=dt.getYear();if(cmYearOffset<1900)cmYearOffset+=1900;}dt.setYear(cmYearOffset+15);cmCookieExpDate=dt.toGMTString();if(cm_UseCookie){var pi=cI("cmRS","pi","");if(pi!="")cmLastPageID=pi;chost=cm_HOST;cm_HOST=cI("cmRS","ho",chost);cci=cm_ClientID;cm_ClientID=cI("cmRS","ci",cci);var cT3=cI("cmRS","t3","");if(cT3!=""){cGA=cT3;}var jsfpdata=cI("cmRS","cjen","");if(jsfpdata!=""){cm_JSFEnabled=true;}var cT1=cI("cmRS","t1","");if(cT1!=""&&(!cGA||cm_ClientTS - cGA<cGR)){cmAddShared("st",cT1);var ul=cI("cmRS","ul","");var rf=cI("cmRS","rf","");var cT2=cI("cmRS","t2","");var cT4=cI("cmRS","t4","");if(cm_TrackTime)cN(cT1,cT2,cT3,cT4,true,pi);var hr=cI("cmRS","hr","");if(hr!=""){var ti=cI("cmRS","lti","");if(cm_ClientTS - ti<cGR){var nm=cI("cmRS","ln","");cM(cT1,ti,nm,hr,true,pi,ul,rf);}}var cV6=cI("cmRS","ac","");var cV7=cI("cmRS","fd","");if((cV6!="")||(cV7!="")){var ti=cI("cmRS","fti","");if(cm_ClientTS - ti<cGR){var cV9=cI("cmRS","fn","");var cV0=cI("cmRS","fu","");cL(cT1,ti,cV9,cV6,cV0,cV7,true,pi,ul,rf);}}var cError=unescape(cI("cmRS","uer",""));CH(cT1,cT3,cError,true,pi);}CC("cmRS");}if(!cGS&&(cF(4)||CD(5))){cmAddNewEvent(window,"load",cY);cmAddNewEvent(window,"unload",cZ);if(cm_DelayHandlerReg.indexOf("L")==-1)window.cX("main");if(cm_DelayHandlerReg.indexOf("F")==-1)cU();}CJ(1);var _cmPartnerUtils={};_cmPartnerUtils.AT_TagQueue=[];_cmPartnerUtils.AT_PartnerCallQueue=[];_cmPartnerUtils.AT_RulesSet=false;_cmPartnerUtils.AT_NRFlagNeeded=false;_cmPartnerUtils.AT_NRFlagSet=false;}function cmLoad(){if(cm_OffsiteImpressionsEnabled){cm_Avid=cI("CMAVID");if(cm_Avid==null){_cmPartnerUtils.loadScript(C8(null)+"//"+cm_AvidHost);cm_AvidLoadTimer=setTimeout("cm_AvidLoadTimedOut=true",2000);}}var rules_HOST=cm_Production_HOST;if(cm_ATEnabled){if(!cI("CMDisabled")&&(cI("CMOptout")?cI("CMOptout").toUpperCase()!="OPT_OUT":true)&&(cI("ID")?cI("ID").toUppercase()!="OPT_OUT":true)&&(cI("CMOptout")?cI("CMOptout").toUpperCase()!="ANONYMOUS":true)){if(typeof(_cm_CMRulesLoaded)=="undefined"){var splitCIds=cm_ClientID.split(";");for(var n=0;n<splitCIds.length;n++){if(cm_PartnerDataClientIDs.indexOf(splitCIds[n])!=-1){if(cI("CorePartnerMode")=="TEST")_cmPartnerUtils.loadScript(C8(null)+'//'+rules_HOST+'/at/rules_'+splitCIds[n]+'test.js');else _cmPartnerUtils.loadScript(C8(null)+'//'+rules_HOST+'/at/rules_'+splitCIds[n]+'.js');}}cG6._cm_CMRulesLoaded=1;}}}}var cI=cI;var cE=cE;function cmStartTagSet(){if(cG8)return;cG8=[];cG8[0]=new _cm();cG8Index=1;}function cmAddShared(nm,val){if(cG8)cG8[0][nm]=val;}function cmSendTagSet(){var request;var cG8_tmp=cG8;while((request=C7(arguments[0]))!=null){c9(request,cG8_tmp[0].ci);}cG8=null;}function _cmCQ(pl,host,qs){this.pl=pl;this.hosts=host.split(",");if(qs)this.qs=qs;this.cM5=CR;}function CR(){var a=arguments;var h=a[0]?a[0]:this.hosts[0];return this.pl+"//"+h+(this.qs?this.qs:"");}function _cG7(){this.cM0={};this.uls={};this.rfs={};this.cTI=[];this.cPE=0;this.normalizeURL=c2;this.getPageID=c1;this.getPluginPageID=cmGetPluginPageID;}function cmGetPluginPageID(cVA){splitClientIDs=cm_ClientID.split(";");finalClientID=cVA;for(var n=0;n<splitClientIDs.length;n++){if(splitClientIDs[n]==cVA){finalClientID=cm_ClientID;break;}}return this.getPageID(finalClientID);}function c1(cVA){var pi=cG7.cM0[cVA];return pi?pi:"";}function CS(cVA){var ul=cG7.uls[cVA];if(!ul)ul=window.location.href;return ul?ul:"";}function CT(cVA){var rf=cG7.rfs[cVA];if(!rf)rf=cG6.referrer;return rf?rf:"";}function CP(href){var h=cGT;if(!h)h=cGT=cG7.normalizeURL(window.location.href,false);var a=href.indexOf("#");if(a>=0&&a<=h.length){var ha=h.indexOf("#");if(ha<0)ha=h.length;if(href.substring(0,a)==h.substring(0,ha))return href.substring(a);}return href;}function c2(url,isHref){if(isHref){url=CP(url);var pfx=window.location.protocol+"//"+window.location.host;if(url.indexOf(pfx)==0)url=url.substring(pfx.length);}return cD(url);}function c4(){for(var b in cmUA)if(cGM.indexOf(b)!=-1)return cmUA[b];return cmDefaultLimit;}function C0(n){if(cG7){if(cG7.cTI&&cG7.cTI[n]){cG7.cTI[n].cmLD=true;if(cG7.cTI[n].ci){cmJSFSetValidFlagValue(cmValidFlag_SessionContinue,false,cG7.cTI[n].ci);cmJSFSetSessionCookies(false,cG7.cTI[n].ci);}}cG7.cPE--;if(cG7.onResponse)cG7.onResponse(n);}window.dontExit=false;}function CN(n){if(cG7){cG7.cPE--;var img=null;if(cG7.cTI&&cG7.cTI[n]){img=cG7.cTI[n];img.cmLD=true;}if(cG7.onError&&(!img||!img.cmTO))cG7.onError(3,img);}}function c6(host,n){if(cG3)cG3[host]=true;C0(n);}function CO(n){if(cG7&&cG7.cTI&&cG7.cTI[n]&&!(cG7.cTI[n].cmLD)){var img=cG7.cTI[n];img.cmTO=img.src;if(cG7.onError)cG7.onError(4,img.cmTO);}}function c8(host){if(!cG3||cG3[host])return true;var dt=new Date();if((dt.getTime()-cG2[host])>cG4)return true;return false;}function CV(host,url,cVBH){if(!cVBH)cVBH=cm_ClientID;if((!cG2[host]||c8(host))&&(cm_OffsiteImpressionsEnabled==false||cm_Avid!=null||cm_AvidLoadTimedOut)){var img=new Image();var i=cG1;cG7.cTI[cG1++]=img;if(!cG2[host]){var dt=new Date();cG2[host]=dt.getTime();img.onload=new Function("if(c6)c6('"+host+"',"+i+");");}else{img.onload=new Function("if(C0)C0("+i+");");}img.onerror=new Function("if(CN)CN("+i+");");if(cm_OffsiteImpressionsEnabled&&(cm_Avid!=null)&&(cm_Avid!="none")){url+="&avid="+cm_Avid;}var limit=c4();if(url.length>limit){url=url.substring(0,limit-6)+"&err=O";}if(cG7.onTagSent)cG7.onTagSent(url,i);img.src=url;img.ci=cVBH;setTimeout('if(CO)CO('+i+');',cm_TimeoutSecs * 1000);}else{setTimeout('if(CV)CV("'+host+'","'+url+'","'+cVBH+'");',cG5);}}function c9(img,ci){if(cI("CMDisabled")||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="OPT_OUT":false)||(cI("ID")?cI("ID").toUpperCase()=="OPT_OUT":false))return;for(var h=0;h<img.hosts.length;h++){var url=img.cM5(img.hosts[h]);cG7.cPE++;CV(img.hosts[h],url,ci);}}function cC(){var result=null;if(!this.ul){if(this.tid=="8"||(this.tid=="9"||this.tid=="10")){this.ul=window.location.protocol+"//"+window.location.hostname;}else{this.ul=window.location.href;}}if(cG8){cG8[cG8Index++]=this;}else{var request=this.getImgSrc(arguments[0],1);c9(request,this.ci);result=request;}return result;}function cmLogError(e){}function C4(src,tgt,compact){if(!compact){if(!src.rf){if(!document.referrer)tgt.rf="";else tgt.rf=document.referrer;}else if(src!=tgt)tgt.rf=src.rf;if(!src.ul||src.ul==""||src.ul=="(none)")tgt.ul=window.location.href;else if(src!=tgt)tgt.ul=src.ul;var ul=cG7.normalizeURL(tgt.ul,false);var rf=cG7.normalizeURL(tgt.rf,false);if(ul!=""){tgt.ul=ul;}if(rf!=""){tgt.rf=rf;}}}function C5(tgt,compact){if(cm_FirstPartyDetect&&!compact){if(cI("cmRS")||cI("TestSess")){tgt.ts="Y";}else{CB("TestSess","Y");tgt.ts=cI("TestSess");}tgt.tp=cI("TestPerm");if(tgt.tp!="Y"){dt.setHours(dt.getHours()+5);CB("TestPerm","Y",dt.toGMTString());tgt.tp=cI("TestPerm");}}}function C6(tag,cV3,skipJSFParams){var qs="";if(tag.tid)qs+="tid="+tag.tid;var isPV=(tag.tid==1||(tag.pc&&tag.pc.charAt(0)=='Y'));if(!tag.lp&&isPV)tag.lp=cmLastPageID;for(var cOb in tag){if(cOb=="qs"||cOb=="tid"||cOb=="topline")continue;if(!tag[cOb]||tag[cOb]==""||tag[cOb].constructor==Function)continue;if(cV3&&cV3[cOb]&&cV3[cOb]==tag[cOb])continue;if(qs!="")qs+="&";qs+=cD(cOb)+"="+cE(cD(tag[cOb]));}if(!tag.rs&&tag.ci){if(tag.pi&&isPV)cG7.cM0[tag.ci]=tag.pi;if(tag.ul)cG7.uls[tag.ci]=tag.ul;if(tag.rf)cG7.rfs[tag.ci]=tag.rf;}if(cV3&&cm_SecureTags.indexOf("|"+tag.tid+"|")!=-1)cV3.protocol="https:";if(cm_JSFEnabled&&!skipJSFParams){cmJSFSetSessionCookies(false,tag.ci);qs+=(qs!=""?"&":"")+cmCore_JSFParamEnabled+"=1";var userIdParamValue=cI(cm_JSFCoreCookieName);if(userIdParamValue){userIdParamValue=userIdParamValue.split("&",2)[0];if(userIdParamValue=="anonymous"||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="ANONYMOUS":false)){userIdParamValue="1000000000000003";}}if(cmJSFPUseUAForUnica()){userIdParamValue=cmJSFPUnicaNoUIDValue();}qs+="&"+cmCore_JSFParamUserID+"="+(userIdParamValue!=null?userIdParamValue:"");qs+="&"+cmCore_JSFParamSessionID+"="+cmJSFGetSessionValue(tag.ci);if(cmSpecCookiesCount>0){qs+="&"+cmCore_JSFParamSpecCookiesCount+"="+cmSpecCookiesCount;qs+="&"+cmCore_JSFParamSpecCookiesNames+"="+cmSpecCookieNames;qs+="&"+cmCore_JSFParamSpecCookiesValues+"="+cmSpecCookieValues;}qs+="&"+cmCore_JSFParamValidFlag+"="+cmJSFGetValidFlagValue(tag.ci);}if(cm_PartnerDataClientIDs&&tag.tid){try{var newTag={};for(var key in tag){var val=tag[key];if(typeof(val)!="function"&&typeof(val)!="undefined")newTag[key]=val;}if(cV3){for(var key in cV3){var val=cV3[key];if(typeof(val)!="function"&&typeof(val)!="undefined")newTag[key]=val;}}newTag.calculateTopLineAndReturnSegments=tag.calculateTopLineAndReturnSegments;if(_cmPartnerUtils.AT_RulesSet){if(_cmPartnerUtils.AT_NRFlagNeeded){if(_cmPartnerUtils.AT_NRFlagSet){_cmPartnerUtils.calculateAndSendATData(newTag);}else{_cmPartnerUtils.AT_TagQueue.push(newTag);}}else{_cmPartnerUtils.calculateAndSendATData(newTag);}}else{_cmPartnerUtils.AT_TagQueue.push(newTag);}}catch(e){}}return qs;}function C8(cV3){var cm_pl=location.protocol;if(cV3&&cV3.protocol)cm_pl=cV3.protocol;if(cm_pl!="http:"&&cm_pl!="https:")cm_pl="http:";return cm_pl;}function c0(){var a=arguments;C4(this,this,a[0]);C5(this,a[0]);var cV3={};var qs=C6(this,cV3);var req=new _cmCQ(C8(cV3),cm_HOST,qs);return a[1]?req:req.cM5();}function C7(){var cV3,first,p,a,pl,lim,len,l,i,tq;if(!cG8||cG8.length<2)return null;cV3=cG8[0];first=cG8[1];cV3.ci=first.ci;for(i=1;i<cG8.length;i++){if(cV3.ci.indexOf(cG8[i].ci)==-1){cV3.ci+=";"+cG8[i].ci;}if(cm_SecureTags.indexOf("|"+cG8[i].tid+"|")!=-1)cV3.protocol="https:";}for(i=0;i<cG0.length;i++){p=cG0[i];if(!cV3[p])cV3[p]=first[p];}a=arguments;C4(first,cV3,a[0]);C5(cV3,a[0]);pl=C8(cV3);img=new _cmCQ(pl,cm_HOST);img.qs=C6(cV3);lim=c4();len=0;for(var h=0;h<img.hosts.length;h++){l=pl.length+img.hosts[h].length+img.qs.length;if(l>len)len=l;}for(i=1;i<cG8.length;i++){tq=C6(cG8[i],cV3,true);if(i>1&&len+tq.length+1>lim){for(j=1;j<cG8.length-i+1;j++)cG8[j]=cG8[j+i-1];cG8.length=cG8.length-i+1;break;}len+=tq.length+1;img.qs+="&"+tq;}if(i==cG8.length)cG8=null;return img;}function _cm(){var i,a=arguments;this.ci=cm_ClientID;for(i=0;i<a.length;i++)this[a[i]]=a[++i];this.write=cC;this.getImgSrc=c0;this.writeImg=cC;this.st=cm_ClientTS;this.vn1="4.8.5";if(cF(5.5)||!cF(0)){var ec=(cm_UseUTF8&&encodeURIComponent)||cGU?"utf-8":cG6.charset;if(!ec)ec=cG6.defaultCharset;if(!ec)ec=cG6.characterSet;this.ec=ec;}this.topline=[];}function cD(s){var z="";s=z+(!s?"":s);return s.split("'").join(z).split("\"").join(z).split("\r").join(z).split("\n").join(z);}function cE(s){var i=0,j;while(s.charAt(i)==" "&&i!=s.length)i++;j=s.length-1;while(s.charAt(j)==" "&&j!=0)j--;s=s.substring(i,j+1);if(cm_UseUTF8&&encodeURIComponent)s=encodeURIComponent(s);else{s=preEscape(s);s=escape(s);var regularExpression=new RegExp("%25u00","g");s=s.replace(regularExpression,"%u00");}s=s.split("+").join("%2B");return s;}function preEscape(str){for(var i=160;i<256;i++){var regularExpression=new RegExp(String.fromCharCode(i),"g");str=str.replace(regularExpression,"%u00"+i.toString(16));}return str;}function cF(ver){var i=cGM.indexOf("MSIE");if(i!=-1)return(parseFloat(cGM.substring(i+5))>=ver);return false;}function CD(ver){return(cGN.indexOf("Gecko")!=-1&&parseInt(cGM)>=ver);}function cI(nm,skey,cV5){var dc=cG6.cookie;var cV4=cJ(nm,dc,";");if(!skey||!cV4){if(!cV4&&cV5!=null){return cV5;}return cV4;}cV4=cJ(skey,cV4,"&");if(!cV4&&cV5!=null){return cV5;}return unescape(cV4);}function CL(){var cookies,dc,nv,i,c=0;dc=cG6.cookie;if(dc){cookies=dc.split(";");c=cookies.length;for(i=0;i<cookies.length;i++){nv=cookies[i].split("=");if(nv.length<2||nv[1]==null||nv[1]==""){c--;}}}return c;}function CB(nm,val,expires,domain){var err,len,v,dc=cG6.cookie;err=null;len=val.length+1;if(!cI(nm)){len+=nm.length;}if(len>4096)err=1;else if(dc){if(CL()>=50)err=2;}if(err){if(cG7.onError)cG7.onError(err,name);return false;}v=nm+"="+val+";path=/";if(domain)v+=";domain="+domain;if(expires)v+=";expires="+expires;cG6.cookie=v;return true;}function cmSetSubCookie(nm,skey,value,expires,domain){var currentCookieVal=cI(nm);var newCookieVal;if(!currentCookieVal){newCookieVal=skey+"="+value;}else{var sep='&';var pfx=skey+"=";var begin=currentCookieVal.indexOf(pfx);if(begin>=0){if(begin>0&&currentCookieVal.charAt(begin - 1)!=sep){begin=currentCookieVal.indexOf(sep+pfx);if(begin>=0){begin++;}}}if(begin>=0){var valueOffset=begin+skey.length+1;var end=currentCookieVal.indexOf(sep,valueOffset);if(end<0){end=currentCookieVal.length;}newCookieVal=currentCookieVal.substring(0,valueOffset)+value+currentCookieVal.substring(end);}else{newCookieVal=currentCookieVal+sep+skey+"="+value;}}CB(nm,newCookieVal,expires,domain);}function CC(nm,domain){var v=cI(nm);if(v!=null){var dt=new Date();dt.setYear(1973);var v=nm+"=;path=/;expires="+dt.toGMTString();if(domain)v+=";domain="+domain;cG6.cookie=v;}return v;}function cJ(nm,src,sep){var pfx,s,begin,end,obj=null;pfx=nm+"=";s=sep+' ';begin=src.indexOf(s+pfx);if(begin==-1){s=sep;begin=src.indexOf(s+pfx);}if(begin==-1){begin=src.indexOf(pfx);if(begin!=0){return null;}}else{begin+=s.length;}end=src.indexOf(s,begin);if(end==-1){end=src.length;}return src.substring(begin+pfx.length,end);}function cK(elt,type,handle,fName,f){if(handle){var event=handle.toString();var tempFName=fName.substring(0,fName.indexOf("("));if(event.indexOf(tempFName)==-1){if(cGU&&event.indexOf("function "+"(")==0){if(type=="onload"){fName=event.substring(event.indexOf("{"),event.length)+";"+fName+";";}else{fName=fName+";"+event.substring(event.indexOf("{"),event.length);}}else{elt["_c_"+type]=handle;if(type=="onload"){fName="if(!e)var e=null;var ret=this._c_"+type+"("+(cF(5)?"":"e")+");"+fName+";return ret;"}else{fName="if(!e)var e=null;var tempReturn=this._c_"+type+"("+(cF(5)?"":"e")+");"+fName+";return tempReturn";}}var newfunc=new Function("e",fName);return newfunc;}else{return handle;}}else{return f;}}function CG(e){var e;if(cF(4)){if(window.event){e=window.event.srcElement;}else{return null;}}else if(e){if(CD(5)){e=e.currentTarget;}else{e=e.target;}}return e;}function CU(cm,cVBH,pi,dest,ref){var ul,rf;cm.pi=pi?pi:c1(cVBH);if(cGQ){if(dest||ref){cm.ul=dest?dest:"";cm.rf=ref?ref:"";}else{ul=CS(cVBH);rf=CT(cVBH);if(cm.pi==""||ul.indexOf("cm_")>0||(rf!=""&&rf.indexOf(window.location.protocol+"//"+window.location.host)!=0)){cm.ul=ul;cm.rf=rf;}}}}function cL(t1,t3,fname,cVB,url,field,resent,pi,dest,ref){var cm=new _cm("tid","10");CU(cm,cm.ci,pi,dest,ref);cm.st=t1;cm.ti=t3;cm.fo=fname;cm.ac=cVB;cm.hr=url;cm.fi=field;if(resent)cm.rs="Y";cm.write(1);}function cM(t1,ti,name,href,resent,pi,dest,ref){var cm=new _cm("tid","8");CU(cm,cm.ci,pi,dest,ref);cm.st=t1;cm.ti=ti;cm.nm=name;cm.hr=href;var cm_crIndex=href.indexOf("cm_cr=");var cm_meIndex=href.indexOf("cm_me=");if(cm_crIndex>-1){var tempIndex=href.indexOf("&",cm_crIndex);if(tempIndex==-1){cm.cm_cr=href.substring(cm_crIndex+6);}else{cm.cm_cr=href.substring(cm_crIndex+6,tempIndex);}}if(cm_meIndex>-1){var tempIndex=href.indexOf("&",cm_meIndex);if(tempIndex==-1){cm.cm_me=href.substring(cm_meIndex+6);}else{cm.cm_me=href.substring(cm_meIndex+6,tempIndex);}}if(resent)cm.rs="Y";cm.write(1);}function cN(t1,t2,cx,t4,resent,pi){var cm=new _cm("tid","11");cm.pi=pi?pi:c1(cm.ci);cm.st=t1;cm.lc=t2;cm.lx=t4;cm.cx=cx;if(resent)cm.rs="Y";cm.write(1);}function CM(href){var n,len,a,q;if((n=href.indexOf("?"))==-1)n=href.lastIndexOf("/");if(n!=-1){len=href.indexOf("#",n);if(len==-1)len=href.length;while(n!=-1&&n<len){n=href.indexOf("cm_",n);if(n!=-1){a=href.indexOf("&",n);if(a==-1)a=len;q=href.indexOf("=",n);if(q!=-1&&q<a)this[href.substring(n,q)]=href.substring(q+1,a);n=a;}}}}function CK(href,trackSP,trackRE,trackCR,trackME){var cm,link,sp,re,cr,me;if((trackSP||trackRE||trackCR||trackME)&&href){cm=new _cm("tid","9");link=new CM(CP(href));if(trackSP){sp=cm.cm_sp_o=link.cm_sp_o;if(!sp)sp=cm.cm_sp=link.cm_sp;}if(trackRE){re=cm.cm_re_o=link.cm_re_o;if(!re)re=cm.cm_re=link.cm_re;}if(trackCR){if(href.indexOf("#")==-1){cr=cm.cm_cr=link.cm_cr;}}if(trackME){me=cm.cm_me=link.cm_me;}if(sp||re||cr||me){cm.pi=c1(cm.ci);cm.st=cm_ClientTS;if(typeof cmCheckIgnoreImpression=='function'){if(cmCheckIgnoreImpression(sp,re,cr,me)){cm.write(1);}}else{cm.write(1);}}}}function CH(t1,ti,msg,resent,pi){if(msg!=cGL){var cm=new _cm("tid","12");cm.pi=pi?pi:c1(cm.ci);cm.st=t1;cm.ti=ti;if(resent)cm.rs="Y";cm.er=msg;cm.write(1);cGL=cm_FormError;}}function cmFormBlurRecord(e){if(e.cmFormEleMemValue!=cmFormElementValue(e)&&e.cmFormEleMemValue!=null){cmFormReportInteraction(e);}e.form.cmEleValue=-1;}function cmFormElementOnclickEvent(){try{var q;var cFE=cmFormElementValue(this);if((cmFormC1.indexOf(this.type)>=0)||(this.cmFormEleMemValue!=cFE)){if(this.type=="radio"){for(q=0;q<this.form.elements.length;q++){if(this.form.elements[q].cM2==this.cM2){this.form.elements[q].cmFormEleMemValue=null;}}}this.cmFormEleMemValue=cFE;cmFormReportInteraction(this);}}catch(e){cmLogError(e);}}function cmFormElementOnfocusEvent(){try{this.form.cmEleValue=this.cM2;this.cmFormEleMemValue=cmFormElementValue(this);}catch(e){cmLogError(e);}}function cmFormElementOnblurEvent(){try{cmFormBlurRecord(this);}catch(e){cmLogError(e);}}function cmFormElementOnchangeEvent(){try{cmFormReportInteraction(this);}catch(e){cmLogError(e);}}function cmFormElementValue(e){var x;if(e.type=="checkbox")return e.checked;else if((cmFormC3.indexOf(e.type)>=0)&&e.options){var sel_val="";for(x=0;x<e.options.length;x++){if(e.options[x].selected==true)sel_val=sel_val+e.options[x].index;}return sel_val;}else if(cmFormC2.indexOf(e.type)>=0||e.type=="file"||e.type=="radio"){return e.value;}else{return null;}}function cO(cVC,cVB){var dt,url,x,cFa="";var cF=null;cVB=cVC+":"+cVB;if(cVC!=-1){if(cG6.forms[cVC]){cF=cG6.forms[cVC];var cFa=cF.attributes;url=cF.action?cF.action:cFa.action.nodeValue?cFa.action.nodeValue:cFa.getNamedItem('action').value?cFa.getNamedItem('action').value:"";}}cGD=cG6.cmTagCtl.normalizeFORM(cGD);var pgID=c1(cm_ClientID);if(cm_FormPageID&&pgID!=""){var frmAr=cGD.split(";");cGD="";for(x=0;x<frmAr.length-1;x++){cGD+=pgID.split(":").join("").split(";").join("")+"_"+frmAr[x]+";";}cm_FormPageID=false;}if(cV(url)&&(cVC!="-1"||(cVC=="-1"&&cmSubmitFlag==false))){dt=new Date();cGH=dt.getTime();cGF=cVB;cGE=cG7.normalizeURL(url,true);cL(cm_ClientTS,cGH,cGD,cGF,cGE,cGC,false);cGG=cGC;cGC="";if((cF)&&(typeof cmCustomFormSubmitHandler=='function')){cmCustomFormSubmitHandler(cF,cVB);}}else{cGF="";}}function cmFormOnresetEvent(){var x;try{cO(this.cM1,"R");}catch(e){cmLogError(e);}try{for(x=0;x<cG6.forms[this.cM1].elements.length;x++){cG6.forms[this.cM1].elements[x].cmFormEleMemValue=false;}}catch(e){cmLogError(e);}try{if(this.cQ){return this.cQ();}}catch(e){cmLogError(e);}}function cmFormOnsubmitEvent(e2){try{if(this.cmEleValue>-1){cmFormBlurRecord(this.elements[this.cmEleValue]);}}catch(e){cmLogError(e);}try{if(this.cM1>=0&&this.cmSubmitIndex==false){cmSubmitFlag=true;this.cmSubmitIndex=true;cO(this?this.cM1:-1,"S");CE();}}catch(e){cmLogError(e);}cmJSFPMigrateLink(this,"action");}function cmFormReportInteraction(e){var cmElementName=cG6.cmTagCtl.normalizeFIELDS(e.name?e.name:e.id?e.id:"");var cmTempFieldSeq=cGC+e.form.cM1+":"+e.cM2+":"+cmElementName.split(":").join("|").split(";").join("|")+";";if(cmTempFieldSeq.length<1000){cGC=cmTempFieldSeq;}}function cmFormSubmit(){cmJSFPMigrateLink(this,"action");try{if(this.cmEleValue>-1){cmFormBlurRecord(this.elements[this.cmEleValue]);}}catch(e){cmLogError(e);}try{if(this.cM1>=0&&this.cmSubmitIndex==false){cmSubmitFlag=true;this.cmSubmitIndex=true;cO(this?this.cM1:-1,"S");CE();}}catch(e){cmLogError(e);}try{this.cmSubmit();}catch(e){cmLogError(e);}}cG6.cmTagCtl.normalizeFORM=function(form){return form;};cG6.cmTagCtl.normalizeFIELDS=function(field){return field;};function cU(){if(cm_SkipHandlerReg.indexOf("F")==-1){var i,form,cV9,j,e,rdname,ei;for(i=0;i<cG6.forms.length;i++){form=cG6.forms[i];ei=0;if(!form.cM1&&!form.cmEleValue&&!form.cmSubmitIndex){form.cM1=i;form.cmEleValue=-1;form.cmSubmitIndex=false;form.radiogroup={"key":"value"};try{if(cF(5)&&!cF(8)){var cm_FA=form.attributes;cV9=cm_FA.name?cm_FA.name.nodeValue:cm_FA.id?cm_FA.id.nodeValue:"UNDEFINED";}else if(form.attributes.getNamedItem){cV9=form.attributes.getNamedItem('name').value;}else{cV9=form.name;}}catch(e){cV9="UNDEFINED";cmLogError(e);}cGD+=cV9+":"+i+";";try{form.cmSubmit=form.submit;form.submit=cmFormSubmit;}catch(e){cmLogError(e);}cmAddNewEvent(form,"submit",cmFormOnsubmitEvent);cmAddNewEvent(form,"reset",cmFormOnresetEvent);for(j=0;j<form.elements.length;j++){e=form.elements[j];if(!e.cM1&&!e.cM2&&!e.cmFormEleMemValue){e.cM1=i;e.cM2=ei;e.cmFormEleMemValue=null;ei++;if(e.type=="radio"){rdname=e.name?e.name:e.id?e.id:"";if(rdname!=""){if(form.radiogroup[rdname]){e.cM2=form.radiogroup[rdname];}else{form.radiogroup[rdname]=e.cM2;}}}if(cmFormC1.indexOf(e.type)>=0||e.type=="checkbox"||e.type=="radio"){try{cmAddNewEvent(e,"click",cmFormElementOnclickEvent);}catch(e){cmLogError(e);}}if(cmFormC2.indexOf(e.type)>=0||cmFormC3.indexOf(e.type)>=0){try{cmAddNewEvent(e,"focus",cmFormElementOnfocusEvent);cmAddNewEvent(e,"blur",cmFormElementOnblurEvent);}catch(e){cmLogError(e);}}if(e.type=="file"){try{cmAddNewEvent(e,"change",cmFormElementOnchangeEvent);}catch(e){cmLogError(e);}}}}}}}}function cV(path){if(cm_TrackLink==true||cm_TrackLink=="A")return true;else{if(cm_TrackLink=="E"&&path.indexOf("/")!=0)return true;var de;if((de=cm_DownloadExtensions)!=null){var p=path.lastIndexOf(".");if(p!=-1){var ext=path.substring(p);for(var e=0;e<de.length;e++){if(ext==de[e])return true;}}}return false;}}function cW(e){CI();var e=CG(e);if(e)C9(e);CA(1);CJ(1);CE();}function C9(e){cGI="";cGJ="";cGK="";var type=e.tagName.toUpperCase();if(type=="AREA"){cGJ=e.href?e.href:"";var p=e.parentElement?e.parentElement:e.parentNode;if(p!=null)cGI=p.name?p.name:"";}else{while(type!="A"&&type!="HTML"){if(!e.parentElement){if(e.parentNode){e=e.parentNode;}else{break;}}else{e=e.parentElement;}if(e){type=e.tagName.toUpperCase();}}if(type=="A"){cGJ=e.href?e.href:"";cGI=e.name?e.name:"";}}if(e.getAttribute){var man_cm_re=e.getAttribute("manual_cm_re");if(man_cm_re){cGJ=cGJ.split("#");cGJ[0]=cGJ[0]+((cGJ[0].indexOf("?")>-1)?"&":"?")+"cm_re="+man_cm_re;cGJ=cGJ.join("#");}var man_cm_sp=e.getAttribute("manual_cm_sp");if(man_cm_sp){cGJ=cGJ.split("#");cGJ[0]=cGJ[0]+((cGJ[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+man_cm_sp;cGJ=cGJ.join("#");}}cGJ=cG7.normalizeURL(cGJ,true);if(cV(cGJ)==true){var dt=new Date();cGK=dt.getTime();if(typeof cmCustomLinkClickHandler=='function'){cmCustomLinkClickHandler(e);}cM(cm_ClientTS,cGK,cGI,cGJ,false);}else{cGJ="";}cmJSFPMigrateLink(e,"href");}function cmAddNewEvent(obj,type,fn){if(obj.attachEvent&&(obj['e'+type+fn]===undefined)){obj['e'+type+fn]=fn;obj[type+fn]=function(){obj['e'+type+fn](window.event);};obj.attachEvent('on'+type,obj[type+fn]);}else if(obj.addEventListener){obj.addEventListener(type,fn,false);}}function cX(phase){CI();var i,lnk,imp,trackSP,trackRE,trackCR,trackME;imp=cm_TrackImpressions;trackSP=(imp.indexOf("S")!=-1);trackRE=(imp.indexOf("R")!=-1);trackCR=(imp.indexOf("C")!=-1);trackME=(imp.indexOf("C")!=-1);for(i=0;i<cG6.links.length;i++){lnk=cG6.links[i];if(cm_SkipHandlerReg.indexOf("L")==-1){cmAddNewEvent(lnk,"click",cW);}if(phase=="onload"){var tempLinkHref=lnk.href;if(lnk.getAttribute("manual_cm_re")){tempLinkHref=tempLinkHref.split("#");tempLinkHref[0]=tempLinkHref[0]+((tempLinkHref[0].indexOf("?")>-1)?"&":"?")+"cm_re="+lnk.getAttribute("manual_cm_re");tempLinkHref=tempLinkHref.join("#");}if(lnk.getAttribute("manual_cm_sp")){tempLinkHref=tempLinkHref.split("#");tempLinkHref[0]=tempLinkHref[0]+((tempLinkHref[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+lnk.getAttribute("manual_cm_sp");tempLinkHref=tempLinkHref.join("#");}if(!lnk.cmImpressionSent){CK(tempLinkHref,trackSP,trackRE,trackCR,trackME);lnk.cmImpressionSent=1;}}}CJ(1);}function cY(e){var dt=new Date();cmT2=dt.getTime();CH(cm_ClientTS,cmT2,cm_FormError,false);if(!cGS&&(cF(4)||CD(5))){window.cX("onload");cU();}cGB=null;}function cZ(e){cG3=null;CI();delay=false;for(var x=0;x<document.forms.length;x++){try{if(cG6.forms[x].cmEleValue>-1){cmFormBlurRecord(document.forms[x].elements[document.forms[x].cmEleValue]);}}catch(e){cmLogError(e);}try{if(cGC!=""){delay=true;cO(-1,"U");}}catch(e){cmLogError(e);}}CA(0);CH(cm_ClientTS,cmT3,cm_FormError,false);CJ(1);if(delay){window.dontExit=true;var d1=new Date();var d2=new Date();for(;window.dontExit&&(d2-d1<1000);){d2=new Date();}}CE();if(cm_UseCookie&&cG7.cPE==0){var pi=escape(c1(cm_ClientID));CB("cmRS","t3="+cmT3+"&pi="+pi);}if(cG7.onUnload)cG7.onUnload();if(cF(5)&&!cF(5.5)&&window.parent!=window)cG7.cTI=null;else{if(!cGU){for(var i=0;i<cG7.cTI.length;i++){cG7.cTI[i].onload=null;cG7.cTI[i].onerror=null;}}}}function CA(force){var dt=new Date();var cx=dt.getTime();if(cm_TrackTime&&(cmT3==-1||force==1||(cx-cmT3)>10000)){cN(cm_ClientTS,cmT2,cx,cGA,false);}cmT3=cx;}function CE(){if(cm_UseCookie){var cVF,cVG,pg,cVD,cVE="";cVF=cGA?"&t4="+cGA:"";cVG=(cGJ!="")?"&lti="+cGK+"&ln="+escape(cGI)+"&hr="+escape(cGJ):"";pg={};CU(pg,cm_ClientID);var jsfpdata="";if(cm_JSFEnabled){jsfpdata="&cjen=1";}cVD="&t1="+cm_ClientTS+"&t2="+cmT2+"&t3="+cmT3+cVF+cVG+"&fti="+cGH+"&fn="+escape(cGD)+"&ac="+cGF+"&fd="+escape(cGG)+"&uer="+escape(cm_FormError)+"&fu="+escape(cGE)+"&pi="+escape(pg.pi)+"&ho="+escape(cm_HOST)+"&ci="+escape(cm_ClientID);if(pg.ul&&pg.rf&&pg.ul.length+pg.rf.length<cGO)cVE="&ul="+escape(pg.ul)+"&rf="+escape(pg.rf);if(!CB("cmRS",cVD+cVE+jsfpdata))if(!CB("cmRS",cVD+jsfpdata))CB("cmRS","t3="+cmT3+"&pi="+escape(pg.pi)+jsfpdata);}}function cmSetAvid(id){clearTimeout(cm_AvidLoadTimer);if(id){cm_Avid=id;}else{cm_Avid="none";}CB("CMAVID",cm_Avid);cm_AvidLoadTimedOut=false;}function cmJSFConvertSAtoCM(value){var len=value.length;var lenSA=22;var lenCM=23;if(len<19)return null;if(value.charAt(0)!="U"&&value.charAt(0)!="u")return null;if(len<lenSA){value=value+value.substring(len -(lenSA - len),len);}var result="99";result=result+value.substring(1,lenCM - 1);return result;}function cmJSFSetSessionCookies(reset,cVBHs){if(!cm_JSFEnabled)return;var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){cmJSFSetSingleSessionCookie(reset,splitClientIDs[n]);}}function debugReadCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}return null;}function cmJSFSetSingleSessionCookie(reset,cVBH,noRecurse){if(!cm_JSFEnabled)return;if(cI("CMDisabled")||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="OPT_OUT":false)||(cI("ID")?cI("ID").toUpperCase()=="OPT_OUT":false))return;var fpCookieVal=cI(cm_JSFCoreCookieName);if(fpCookieVal==null){if(!cmJSFDoMigrateCookies()){fpCookieVal=cmJSFCreateUserId();if(cm_JSFTrackClients){fpCookieVal+="&ci="+cVBH;}CB(cm_JSFCoreCookieName,fpCookieVal,cmCookieExpDate,cm_JSFPCookieDomain);}if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,false,cVBH);cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor,true,cVBH);return;}if(cm_JSFTrackClients){var knownClientIds=cJ("ci",fpCookieVal,"&");knownClientIds=knownClientIds&&unescape(knownClientIds);if(knownClientIds){knownClientIds=knownClientIds.split(",").join("_");}if(knownClientIds&&knownClientIds.indexOf(cVBH)<0){cmSetSubCookie(cm_JSFCoreCookieName,"ci",knownClientIds+"_"+cVBH,cmCookieExpDate,cm_JSFPCookieDomain);knownClientIds=cJ("ci",fpCookieVal,"&");knownClientIds=knownClientIds&&unescape(knownClientIds);if(knownClientIds.indexOf(cVBH)>=0){if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,false,cVBH);cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor,true,cVBH);return;}}}var sessionCookieExists=(cmJSFGetSessionLoginCookieValue(cVBH)!=null);if(!sessionCookieExists){if(cmJSFCombineSessionCookies(cVBH)){sessionCookieExists=(cmJSFGetSessionLoginCookieValue(cVBH)!=null);}}if(!sessionCookieExists&&!reset){if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,true,cVBH);return;}var dt=new Date();var cmSessionTime=dt.getTime();var cmSessionExpTime=cmSessionTime+cm_JSFSessionTimeout*1000;var isSessionExpired=cmJSFIsSessionExpired(cmJSFGetSessionExpireCookieValue(cVBH));if((reset!=null&&reset==true)||isSessionExpired){var cmTimeoutStr=cmSessionTime.toString();if(cmTimeoutStr.length<10){while(cmTimeoutStr.length<10)cmTimeoutStr="0"+cmTimeoutStr;}else cmTimeoutStr=cmTimeoutStr.substring(0,10);cmJSFSetSessionLoginCookieValue(cVBH,cmTimeoutStr);if(isSessionExpired)cmJSFSetValidFlagSingleValue(cmValidFlag_SessionReset,true,cVBH);else cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,true,cVBH);if(cm_JSFSessionType=="T")cmJSFSetSessionExpiresCookieValue(cVBH,cmSessionExpTime.toString());}if(cm_JSFSessionType=="I")cmJSFSetSessionExpiresCookieValue(cVBH,cmSessionExpTime.toString());}function cmJSFIsSessionExpired(cookieExpValue){if(cookieExpValue==null)return false;var dt=new Date();if(dt.getTime()>cookieExpValue)return true;else return false;}function cmJSFCreateUserId(){if(cmJSFPUseUAForUnica()){return cmJSFPUnicaNoUIDValue();}var currDate=new Date();var rand1=Math.random();if(rand1==0)rand1=Math.random();var rand2=Math.random();if(rand2==0)rand2=Math.random();var userId=rand1.toString().substring(2,4)+rand2.toString().substring(2,12)+currDate.getTime().toString();var len=userId.length;var lenCM=23;if(len<lenCM){userId=userId+userId.substring(len -(lenCM - len),len);}if(len>lenCM){userId=userId.substring(0,lenCM);}return userId;}function cmJSFSetValidFlagValue(value,append,cVBHs){if(!cm_JSFEnabled)return;var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){cmJSFSetValidFlagSingleValue(value,append,splitClientIDs[n]);}}function cmJSFSetValidFlagSingleValue(value,append,cVBH){var validFlag=null;var validFlagValueStr=cmJSFGetSessionValidFlagCookieValue(cVBH);if(validFlagValueStr){var validFlagValue=parseInt(validFlagValueStr);if(!isNaN(validFlagValue))validFlag=validFlagValue;}if(validFlag==null)validFlag=cmValidFlag_SessionContinue;if(append){if(value==cmValidFlag_NewSession)validFlag &=~cmValidFlag_SessionReset;if(value==cmValidFlag_SessionReset)validFlag &=~cmValidFlag_NewSession;validFlag |=value;}else{validFlag=value;}validFlag |=cmValidFlag_SessionContinue;cmJSFSetSessionValidFlagCookieValue(cVBH,validFlag);}function cmJSFCreateCombinedSessionCookieName(cVBH){return cVBH+"_clogin";}function cmJSFCombineSessionCookies(cVBH){var loginValue=cI(cVBH+"_login");var expiresValue=cI(cVBH+"_expires");var validFlagValue=cI(cVBH+"_valid");if(loginValue!=null&&expiresValue!=null & validFlagValue!=null){var combinedCookieStr="l="+loginValue+"&e="+expiresValue+"&v="+validFlagValue;CB(cmJSFCreateCombinedSessionCookieName(cVBH),combinedCookieStr,null,cm_JSFPCookieDomain);CC(cVBH+"_login",cm_JSFPCookieDomain);CC(cVBH+"_expires",cm_JSFPCookieDomain);CC(cVBH+"_valid",cm_JSFPCookieDomain);return true;}return false;}function cmJSFSetSessionLoginCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"l",value,null,cm_JSFPCookieDomain);}function cmJSFSetSessionExpiresCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"e",value,null,cm_JSFPCookieDomain);}function cmJSFSetSessionValidFlagCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"v",value,null,cm_JSFPCookieDomain);}function cmJSFGetSessionLoginCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"l");}function cmJSFGetSessionExpireCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"e");}function cmJSFGetSessionValidFlagCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"v");}function cmJSFGetSessionValue(cVBHs){var value="";var delimiter="";var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){var cVBH=splitClientIDs[n];if(cVBH=="")continue;var currValue=cmJSFGetSessionLoginCookieValue(cVBH);value+=delimiter+(currValue!=null?currValue:"");if(delimiter=="")delimiter="|";}return value;}function cmJSFGetValidFlagValue(cVBHs){var value="";var delimiter="";var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){var cVBH=splitClientIDs[n];if(cVBH=="")continue;var currValue=cmJSFGetSessionValidFlagCookieValue(cVBH);value+=delimiter+(currValue!=null?currValue:"");if(delimiter=="")delimiter="|";}return value;}function cmJSFDoMigrateCookies(){if(cm_JSFMigrationEnabled==cmMigrationFrom1p_SA){if(cI(cm_JSFCoreCookieName)==null){var cmSACookieValue=cI(cmSACookieName);if(cmSACookieValue){cmSACookieValue=cmJSFConvertSAtoCM(cmSACookieValue);if(cmSACookieValue!=null){CB(cm_JSFCoreCookieName,cmSACookieValue,cmCookieExpDate,cm_JSFPCookieDomain);return true;}}}}return false;}_cm.prototype.addTP=function(){var tp=new cmTP(new cmApp());for(var o in tp){if(tp[o]==null||tp[o]==""||tp[o].toString().indexOf("function ")==0)continue;this[o]=cE(cD(tp[o]));}return this;};function cmApp(){var n=navigator,b=n.appName,c=this;if(b=="Netscape"){c.b="ns"}else if(b=="Microsoft Internet Explorer"){c.b="ie"}else{c.b=b}c.v=parseInt(n.appVersion);}function cmTP(c){var n=navigator,w=window.screen;this.jv=cmJv;if(c.b=="ns"&&c.v>=3)for(var i=0;i<n.plugins.length;i++)eval('this.np'+i+'=n.plugins['+i+'].name');if(c.v>3){if(c.v>=4&&(c.b=="ns"||c.b=="ie")){this.je=(n.javaEnabled()==true)?"y":"n";}if(c.b=="ie"){this.ce=n.cookieEnabled;this.cp=n.cpuClass;}this.sw=w.width;this.sh=w.height;this.pd=w.colorDepth;if(this.pd==0){this.pd=w.pixelDepth;}var fs=w.fontSmoothingEnabled;if(fs){this.fs=fs?"y":"n";}}var tz=new Date();if(tz.getTimezoneOffset()==0){this.tz="0";}else{this.tz=tz.getTimezoneOffset()/60;}}function cmJSFPUseUAForUnica(){var u="undefined";return((typeof(_cmAdapter)!=u)&&((typeof(NTPT_SET_IDCOOKIE)==u)||(NTPT_SET_IDCOOKIE===false)));}function cmJSFPUnicaNoUIDValue(){return "unca_no_id000000000000";}function cmJSFPMigrateCookies(visitorID,sessionIDList,otherCookieList){if(visitorID&&sessionIDList&&cm_JSFEnabled&&cm_JSFPCookieMigrate){var tempVisitor=cI(cm_JSFCoreCookieName);if(!tempVisitor||cm_JSFPForceMigrateCookies){CB(cm_JSFCoreCookieName,visitorID+(cm_JSFTrackClients?"&ci="+cm_ClientID.split(";").join(","):""),cmCookieExpDate,cm_JSFPCookieDomain);var dt=new Date();var cmSessionExpTime=(dt.getTime()+cm_JSFSessionTimeout*1000).toString();var cVAArray=cm_ClientID.split(";");for(var i=0;i<cVAArray.length;++i){if(sessionIDList[cVAArray[i]]!==undefined){cmJSFSetSessionLoginCookieValue(cVAArray[i],sessionIDList[cVAArray[i]]);cmJSFSetSessionExpiresCookieValue(cVAArray[i],cmSessionExpTime);cmJSFSetSessionValidFlagCookieValue(cVAArray[i],"1");}}}}if(cm_JSFPCookieMigrate&&cm_JSFPMigrationOtherCookies!==null){var cookieList=cm_JSFPMigrationOtherCookies.split(",");for(var j=0;j<cookieList.length;++j){if(otherCookieList[cookieList[j]]!==undefined){var tempExpires=cm_JSFPMigrationOtherCookiesExpireTimes[cookieList[j]];if(tempExpires){var dt=new Date();dt.setTime(dt.getTime()+parseInt(tempExpires));dt=dt.toGMTString();}else{var dt=null;}CB(cookieList[j],otherCookieList[cookieList[j]],dt,cm_JSFPCookieDomain);}}}}function cmJSFPMigrateLink(e,type){if(cm_JSFPCookieMigrate){var pageDomain=cm_JSFPCookieDomain;var linkDomainRE=/:\/\/([a-z0-9_\-\.]+)/i;var linkDomain=linkDomainRE.exec(e[type]);if(linkDomain){linkDomain=linkDomain[1];}if(linkDomain&&((linkDomain.indexOf(pageDomain)===-1)&&(e[type].toLowerCase().indexOf("javascript")!==0)&&((cm_JSFPMigrationDomainWhitelist!==null&&cmTextMatchList(linkDomain.toLowerCase(),cm_JSFPMigrationDomainWhitelist.split(",")))||(cm_JSFPMigrationDomainBlacklist!==null&&!(cmTextMatchList(linkDomain.toLowerCase(),cm_JSFPMigrationDomainBlacklist.split(","))))))||(cm_JSFPMigrationPathWhitelist!==null&&cmTextMatchList(e[type].toLowerCase(),cm_JSFPMigrationPathWhitelist.split(",")))){if(cm_JSFEnabled){var tempVisitorID=cI(cm_JSFCoreCookieName);if(tempVisitorID){tempVisitorID=tempVisitorID.split("&",2)[0];}var tempClientIDList=cm_ClientID.split(";");var tempSessionParameters="";for(var i=0;i<tempClientIDList.length;++i){tempSessionParameters+="&"+cm_JSFPCookieMigrateSessionID+"_"+tempClientIDList[i]+"="+cmJSFGetSessionLoginCookieValue(tempClientIDList[i]);}e[type]+=(e[type].indexOf("?")>-1?"&":"?")+cm_JSFPCookieMigrateVisitorID+"="+tempVisitorID+tempSessionParameters;}if(cm_JSFPMigrationOtherCookies!==null){var cookieList=cm_JSFPMigrationOtherCookies.split(",");var otherCookieParameters="";for(var j=0;j<cookieList.length;++j){var tempCookie=cI(cookieList[j]);if(tempCookie){otherCookieParameters+="&cm_mc_"+cookieList[j]+"="+tempCookie;}}otherCookieParameters=(e[type].indexOf("?")>-1?"&":"?")+otherCookieParameters.substring(1);e[type]+=otherCookieParameters;}}}}function cmTextMatchList(input,matchArray){for(var i=0;i<matchArray.length;++i){if(input.indexOf(matchArray[i])>-1){return true;}}return false;}/** Addtions from cmdatatagutils code in hosted eluminate ***/

var cm_exAttr=new Array();  
var cmCheckCMEMFlag = true;
var cmAutoCopyAttributesToExtraFields = false;

var cmJv = "1.0";
if (typeof(isNaN) == "function") { cmJv = "1.1";}
if (typeof(isFinite) == "function") { cmJv = "1.2";}
if (typeof(NaN) == "number") { cmJv = "1.3";}
if (typeof(decodeURI) == "function") { cmJv = "1.5";}
if (typeof(Array.forEach) == "function") { cmJv = "1.6";}
if (typeof(Iterator) == "object") {cmJv = "1.7";}

var cmPricePattern = /[^\-0-9\.]/gi;
var cmSpacePattern = /^\s+|\s+$/gi;
var cmMMCPattern = /cm_(?:mmc|ven|cat|pla|ite)/gi;


function cmSetupCookieMigration(JSFPmigration, forceVisitorOverwrite, domainWhitelist, domainBlacklist, pathWhitelist, otherCookies, otherCookiesExpireTimes) {
	if(JSFPmigration) { cm_JSFPCookieMigrate = JSFPmigration; }
	if(forceVisitorOverwrite) { cm_JSFPForceMigrateCookies = forceVisitorOverwrite; }
	if(domainWhitelist) { cm_JSFPMigrationDomainWhitelist = domainWhitelist; }
	if(domainBlacklist) { cm_JSFPMigrationDomainBlacklist = domainBlacklist; }
	if(pathWhitelist) { cm_JSFPMigrationPathWhitelist = pathWhitelist; }
	if(otherCookies) { cm_JSFPMigrationOtherCookies = otherCookies; }
	if(otherCookiesExpireTimes) { cm_JSFPMigrationOtherCookiesExpireTimes = otherCookiesExpireTimes; }

	if (cm_JSFPCookieMigrate) {
		var tempClientIDList = cm_ClientID.split(";");
		var tempSessionID = {};
		for (var i = 0; i < tempClientIDList.length; ++i) {
			var tempValue = cmExtractParameter(cm_JSFPCookieMigrateSessionID + "_" + tempClientIDList[i], window.location.href);
				if (tempValue) {
					tempSessionID[tempClientIDList[i]] = tempValue;
				}
		}
		var otherCookies = {};
		if (cm_JSFPMigrationOtherCookies) {
			var tempOtherCookieList = cm_JSFPMigrationOtherCookies.split(",");
			for (var j = 0; j < tempOtherCookieList.length; ++j ) {
				var tempValue = cmExtractParameter("cm_mc_" + tempOtherCookieList[j], window.location.href);
				if (tempValue) {
					otherCookies[tempOtherCookieList[j]] = tempValue;
				}
			}
		}
		cmJSFPMigrateCookies(cmExtractParameter(cm_JSFPCookieMigrateVisitorID, window.location.href), tempSessionID, otherCookies);
	}
}

var cmNormalizeBlackList, cmNormalizeWhiteList = null;

function cmSetupNormalization(blacklist, whitelist, altFunction) {
	if (blacklist) {
		cmNormalizeBlackList = blacklist;
	}
	if (whitelist) {
		cmNormalizeWhiteList = whitelist;
	}
	if (altFunction) {
		if (document.cmTagCtl != null) {
			document.cmTagCtl.normalizeURL = altFunction;
		}
	}
}

function cmSetupOther(configObject) {
	for (var x in configObject) {
		window[x] = configObject[x];
	}
}

// Set the currency code value to be used by shop5, shop9, and order tags
function cmSetCurrencyCode(currencyCode) {
	cm_currencyCode = currencyCode;
}

function cmSetFirstPartyIDs(permID, sessionID) {
	cm_JSFPCookieMigrate = true;
	cm_JSFPForceMigrateCookies = true;
	var tempClientIDList = cm_ClientID.split(";");
	var tempSessionID = {};
	for (var i = 0; i < tempClientIDList.length; ++i) {
		tempSessionID[tempClientIDList[i]] = sessionID;
	}

	cmJSFPMigrateCookies(permID, tempSessionID, null);
}
// TAG GENERATING FUNCTIONS


function cmCreateManualImpressionTag(pageID, trackSP, trackRE, trackCR, trackME) {
		if (!pageID) {
			pageID = c1(cm_ClientID);
		}
		cmMakeTag(["tid","9","pi",pageID,"cm_sp",trackSP,"cm_re",trackRE,"cm_cr",trackCR,"cm_me",trackME,"st",cm_ClientTS]);
}

function cmCreateManualLinkClickTag(href,name,pageID) {	
	if (window.cmCreateLinkTag == null && window.cM !== null) {
		var cmCreateLinkTag = cM;
	}
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		href=cG7.normalizeURL(href,true);
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID);
	}
}

// manual PageviewTag for off site page tagging.  Allows client to supply URL and Referring URL
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL, attributes, searchString, searchResults, extraFields) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL,"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateElementTag(elementID, elementCategory, attributes) {
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"cmAttributes",attributes]);
}

// included for backwards compatibility
function cmCreatePageElementTag(elementID, elementCategory, pageID, pageCategoryID, elementLocation, attributes) {
	cmCreateElementTag(elementID,elementCategory,attributes);
}

// included for backwards compatibility
var cmCreateProductElementTag = cmCreatePageElementTag;

// Creates a Conversion Event tag
//
// eventID			: required. Conversion event ID
// actionType		: required. 1=conversion initiation, 2=conversion completion
// categoryID		: optional. Category for the event
// points			: optional. Point value to assign to conversion.
// attibutes		: optional. Explore attributes
function cmCreateConversionEventTag(eventID, actionType, categoryID, points,attributes, extraFields) {
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}


// Creates a Tech Props tag.
// pageID		: required. Page ID to set on this Pageview tag
function cmCreateTechPropsTag(pageID, categoryID, attributes, extraFields) {
	cmMakeTag(["tid","6","pi",pageID,"cg",categoryID,"pc","Y","cmAttributes",attributes,"cmExtraFields",extraFields]);
}


// Creates a Pageview tag with the given Page ID
//
// pageID	: required. Page ID to set on this Pageview tag
// categoryID	: optional. Category ID to set on this Pageview tag
// searchString	: optional. Internal search string entered by user to reach this page.
// searchResults : optional.  Total numeric search results count.
function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults, attributes, extraFields) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

// Creates a Pageview tag with the default value for Page ID. 
function cmCreateDefaultPageviewTag(categoryID) {
	cmCreatePageviewTag(cmGetDefaultPageID(), categoryID);
}

// Creates a Productview Tag
// Also creates a Pageview Tag by setting pc="Y"
// Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
//
// productID	: required. Product ID to set on this Productview tag
// productName	: required. Product Name to set on this Productview tag
// categoryID	: optional. Category ID to set on this Productview tag 
// searchString	: optional. Internal search string entered by user to reach this Product Detail page. Only usable if pc="Y".
// searchResults : optional.  Total numeric search results count. Only usable if pc="Y".
function cmCreateProductviewTag(productID, productName, categoryID, attributes, cm_vc) {
	cmMakeTag(["tid","5","pi",c1(cm_ClientID) ? c1(cm_ClientID) : "Product: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","N","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

// Variables and Arrays to support Lineitem Aggregation
var __sArray = [];
var __sRefArray = [];
var __sSkuArray = [];
var __sRefSkuArray = [];
var __skuString = "";

// Internal shop aggregation function.  Do not call this function directly
function cmAddShop(__v) {
	var __v2 = __v.concat();

	var tempArrayIndex = __sRefArray[__v[1] + "|" + __v[9]+ "|" + __v[11] + "|" + __v[13]];
	if (typeof(tempArrayIndex) !== "undefined") {
		var tempArrayPosition = __sArray[tempArrayIndex];
		if (tempArrayPosition) {
			var __oQ = tempArrayPosition[5];
			var __oP = tempArrayPosition[7];
			var tempNewQuantity = __v[5];
			__v[5] = parseInt(__oQ) + parseInt(__v[5]);
			__v[7] = (((__v[7]*tempNewQuantity)+(__oP*__oQ))/__v[5]);
			__sArray[tempArrayIndex] = __v;
		}
	} 
	else {
		__sRefArray[__v[1] + "|" + __v[9]+ "|" + __v[11] + "|" + __v[13]] = __sArray.length;
		__sArray[__sArray.length] = __v;
	}

	var tempArrayIndex2 = __sRefSkuArray[__v2[1]];
	if (typeof(tempArrayIndex2) !== "undefined") {
		var tempArrayPosition2 = __sSkuArray[tempArrayIndex2];
		if (tempArrayPosition2) {
			var __oQ = tempArrayPosition2[5];
			var __oP = tempArrayPosition2[7];
			var tempNewQuantity = __v2[5];
			__v2[5] = parseInt(__oQ) + parseInt(__v2[5]);
			__v2[7] = (((__v2[7]*tempNewQuantity)+(__oP*__oQ))/__v2[5]);
			__sSkuArray[tempArrayIndex2] = __v2;
		}
	}
	else {
		__sRefSkuArray[__v2[1]] = __sSkuArray.length;
		__sSkuArray[__sSkuArray.length] = __v2;
	}
}

function cmDisplayShops() {
	var i;
	for (i = 0; i < __sArray.length; ++i) {
		cmMakeTag(__sArray[i]);
	}
	__sArray = [];
	__sRefArray = [];
	__skuString = cmCalcSKUString();
}

//include for legacy purposes
var cmDisplayShop5s = cmDisplayShop9s = cmDisplayShops;

// needed to calculate OSK string for Order tag
function cmCalcSKUString() {
	var skuString = "";
	for(var i = 0;i < __sSkuArray.length; i++) {
		var temp = __sSkuArray[i];
		skuString += "|" + temp[1] + "|" + temp[7] + "|" + temp[5] + "|";
	}
	__sSkuArray = [];
	__sRefSkuArray = [];
	return skuString;
}


// Creates a Shop tag with Action 5 (Shopping Cart)
//
// productID	: required. Product ID to set on this Shop tag
// quantity	: required. Quantity to set on this Shop tag
// productPrice	: required. Price of one unit of this product
// categoryID	: optional. Category to set on this Shop tag
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, attributes, extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
}

// Creates a Shop tag with Action 9 (Order Receipt / Confirmed)
//
// productID	: required. Product ID to set on this Shop tag
// productName	: required. Product Name to set on this Shop tag
// quantity	: required. Quantity to set on this Shop tag
// productPrice	: required. Price of one unit of this product
// customerID	: required. ID of customer making the purchase
// orderID	: required. ID of order this lineitem belongs to
// orderTotal	: required. Total price of order this lineitem belongs to
// categoryID	: optional. Category to set on this Shop tag
function cmCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, attributes, extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N"]);
}

// Creates an Order tag
//
// orderID			: required. Order ID of this order
// orderTotal		: required. Total of this order (minus tax and shipping)
// orderShipping	: required. Shipping charge for this order
// customerID		: required. Customer ID that placed this order
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,attributes,extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    orderShipping = orderShipping.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");	
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

// Creates a Registration tag and/or a Newsletter tag
//
// customerID		: required for Registration. ID of Customer to register.
// customerEmail	: required for Newsletters. Optional for Registration.
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, customerCountry, attributes) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"cmAttributes",attributes]);
}

// DEPRECATED - Creates an error tag
function cmCreateErrorTag(pageID, categoryID) {
	cmMakeTag(["tid","404","pi",pageID,"cg",categoryID,"pc","Y"]);
}

// creates a custom tag
function cmCreateCustomTag(lineNumber, extraFields) {
	cmMakeTag(["tid","7","li",lineNumber,"cmExtraFields",extraFields]);
}

// Internal tag function, DO NOT CALL DIRECTLY
function cmMakeTag(__v) {
	var cm = new _cm("vn2", "e4.0");
	var i;
	for (i = 0; i < __v.length; i += 2) {
		var _n = __v[i];
		var _v = __v[i + 1];
		cm[_n] = _v;
	}
	
	// add a random number for cache-busting
	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	cm.rnd = stamp;
	
	// if this is a TechProps tag, call addTP
	if (cm.tid == "6") {
		cm.addTP();
		//UPDATE: use cmSetCookie function instead
		document.cookie = "cmTPSet=Y; path=/";
	}

	// if this is the first pageview in the session, convert it to a TechProps tag
	if (cm.tid == "1") {
		if (cI("cmTPSet") != 'Y') {
			cm.tid = "6";
			cm.pc = "Y";
			cm.addTP();
			//UPDATE: use cmSetCookie function instead
			document.cookie = "cmTPSet=Y; path=/";
		}
	}

	// for backwards compatibility with clients using cmCustom libraries and the old cm_exAttr variable.
	if (cm.cm_exAttr) {
		cm.cmAttributes = cm.cm_exAttr.join("-_-");
		cm.cm_exAttr = null;
	}

	// process attribute and extrafield strings into correct tag parameters
	var cmAttributesMap = {"1": "pv_a","2":"rg","3":"o_a","4":"s_a","5":"pr_a","6":"pv_a","14":"c_a","15":"e_a"};
	var cmExtraFieldsMap = {"1": "pv","2":"rg","3":"or","4":"sx","5":"pr","6":"pv","7":"ps","14":"cx"};
	if (cm.cmAttributes) {
		var tempArray = cm.cmAttributes.split("-_-");
		var name = cmAttributesMap[cm.tid];
		for (i=0;i<tempArray.length;++i){
			cm[name + (i + 1)] = tempArray[i];
		}
		cm.cmAttributes = null;
	}
	if (cm.cmExtraFields) {
		var tempArray = cm.cmExtraFields.split("-_-");
		var name = cmExtraFieldsMap[cm.tid];
		for (i=0;i<tempArray.length;++i){
			cm[name + (i + 1)] = tempArray[i];
		}
		cm.cmExtraFields = null;
	}

	if (cmAutoCopyAttributesToExtraFields) {
		if ((cm.tid != '2') && (cm.tid != '15')) {
		    for (var i = 1; i <= 15; ++i) {
				if (!(cm[cmExtraFieldsMap[cm.tid] + "" + i])) {
					cm[cmExtraFieldsMap[cm.tid] + "" + i] = cm[cmAttributesMap[cm.tid] + "" + i];
				}
		    }
		}
	}
	
	// make sure we have a pageID value for pageview or tags that count as pageview
	if ((cm.pi == null) && ((cm.pc == "Y") || (cm.tid == "1"))) {
		cm.pi = cmGetDefaultPageID();
	}

	// try to get referrer from parent frameset
	try{
		if (parent.cm_ref != null) {
			cm.rf = parent.cm_ref;
			if (cm.pc == "Y") {
				parent.cm_ref = document.URL;
			}
		}
	
		// if parent had mmc variables and this is the first pageview, add mmc to this url
		if(parent.cm_set_mmc) {
			cm.ul = document.location.href + 
					((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
					parent.cm_mmc_params; 
			if (cm.pc == "Y") {
				parent.cm_ref = cm.ul;
				parent.cm_set_mmc = false;
			}
		}
	}
	catch(err){
		// most likely failed due to browser security restrictions, so do nothing
	}

	// Set the destination and referring URL parameters if not already set
	if (cm.ul == null) {
		cm.ul = cG7.normalizeURL(window.location.href, false);
	}
	if (cm.rf == null) {
		cm.rf = cG7.normalizeURL(document.referrer, false);
	}

	// convert MMC parameters to lowercase
	cm.ul = cm.ul.replace(cmMMCPattern,function(p){return p.toLowerCase();});
	cm.rf = cm.rf.replace(cmMMCPattern,function(p){return p.toLowerCase();});

	//check for manual_cm_mmc parameter and attach to URL if mmc parameter not already in URL
	if ((this.manual_cm_mmc) && (cm.ul.indexOf("cm_mmc") == -1) && (cm.ul.indexOf("cm_ven") == -1)) {
		cm.ul = cm.ul + ((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + "cm_mmc=" + this.manual_cm_mmc;
	}

	// check for cm_em or cm_lm parameter and add registration tag to tagset if necessary
	if (cmCheckCMEMFlag){
		cmStartTagSet();
	}
    cm.writeImg();
	if (cmCheckCMEMFlag) {
		cmCheckCMEMFlag = false;	
		cmCheckCMEM();
		cmSendTagSet();		
	}

	// call IO function if IO enabled
	if (typeof cm_ted_io == 'function') {
		if(cm_IOEnabled) {
			cm_ted_io(cm);
		}
	}
}

// HELPER FUNCTIONS -----------------------------------------------------------


// Creates an acceptable default Page ID value to use for Pageview tags.
// The default Page ID is based on the URL, and consists of the path and
// filename (without the protocol, domain and query string).
// 
// example:
// returns "x/y/MyPage.asp" for the URL http://www.mysite.com/x/y/MyPage.asp
function cmGetDefaultPageID() { 
	var pageName = window.location.pathname; 

	// eliminates everything after "?" (for Opera browswers)
	var tempIndex1 = pageName.indexOf("?");
	if (tempIndex1 != -1) {
		pageName = pageName.substr(0, tempIndex1);
	}
	// eliminates everything after "#" (for Opera browswers)
	var tempIndex2 = pageName.indexOf("#");
	if (tempIndex2 != -1) {
		pageName = pageName.substr(0, tempIndex2);
	}
	// eliminates everything after ";"
	var tempIndex3 = pageName.indexOf(";");
	if (tempIndex3 != -1) {
		pageName = pageName.substr(0, tempIndex3);
	}

	var slashPos = pageName.lastIndexOf("/");
	if (slashPos == pageName.length - 1) {
		pageName = pageName + "default";
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1,pageName.length);
	}

	return(pageName); 
} 

// returns the index of paramter within inString or -1 if not found
function cmIndexOfParameter (parameter, inString) {
	return inString.indexOf(parameter);
}

// expects inString to be a correctly formatted URI, returns value of parameter or null if parameter is not present
function cmExtractParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return null;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	var middle = s.indexOf("=", begin);
	return s.substring(middle + 1, end).split("#",1).join("");
}

// expects inString to be a correctly formatted URI, returns URI with parameter name and value removed
function cmRemoveParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return inString;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var start = (begin - 1);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	if (s.substring(start, begin) == "?") {    // retain leading "?"
		start = (start + 1);
		end = (end + 1);
	}
	return s.substring(0, start) + s.substring(end, s.length);
}

// returns meta tag value or null if not present
function cmGetMetaTag(mn){ 
  //UPDATE: store meta tags in array and lookup in Array just in case this function gets called more than once
  var m = document.getElementsBytagName('meta'); 
  for(var i in m){ 
   if(m[i].name == mn){ 
     return m[i].content; 
   } 
  }
  return null;
}

// checks for cm_em or cm_lm parameter and creates registration tag if present
function cmCheckCMEM() {
	if (cmIndexOfParameter("cm_em",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_em",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
	if (cmIndexOfParameter("cm_lm",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_lm",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}		
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
	var newURL = url;

	var cmTempNormalizeBlackList = cmNormalizeBlackList;
	var cmTempNormalizeWhiteList = cmNormalizeWhiteList;

	if (cmTempNormalizeBlackList) {
		if (isHref) {
			cmTempNormalizeBlackList = cmTempNormalizeBlackList.split("-_-")[0].split(",");
		}
		else {
			if (cmTempNormalizeBlackList.split("-_-")[1]) {
				cmTempNormalizeBlackList = cmTempNormalizeBlackList.split("-_-")[1].split(",");
			}
			else {
				cmTempNormalizeBlackList = null;
			}
		}
	}

	if (cmTempNormalizeWhiteList) {
		if (isHref) {
			cmTempNormalizeWhiteList = cmTempNormalizeWhiteList.split("-_-")[0].split(",");
		}
		else {
			if (cmTempNormalizeWhiteList.split("-_-")[1]) {
				cmTempNormalizeWhiteList = cmTempNormalizeWhiteList.split("-_-")[1].split(",");
			}
			else {
				cmTempNormalizeWhiteList = null;
			}	
		}
	}
	
	var paramString, params;
	var paramIndex = newURL.indexOf("?");
	var keepParams = new Array();

	if ((paramIndex > 0) && (cmTempNormalizeBlackList || cmTempNormalizeWhiteList)) {
		paramString = newURL.substring(paramIndex+1);
		newURL = newURL.substring(0, paramIndex);
		params = paramString.split("&");

		if (cmTempNormalizeBlackList) {
			for(var i=0; i<params.length; i++) {
				goodParam = true;
				for(var j=0; j<cmTempNormalizeBlackList.length; j++) {
					if (params[i].toLowerCase().indexOf(cmTempNormalizeBlackList[j].toLowerCase() + "=") == 0) {
						goodParam = false;
					}
				}
				if(goodParam == true) {
					keepParams[keepParams.length] = params[i];
				}
			}
		}

		if (cmTempNormalizeWhiteList) {
			for(var i=0; i<params.length; i++) {
				goodParam = false;
				for(var j=0; j<cmTempNormalizeWhiteList.length; j++) {
					if (params[i].toLowerCase().indexOf(cmTempNormalizeWhiteList[j].toLowerCase() + "=") == 0) {
						goodParam = true;
					}
				}
				if(goodParam == true) {
					keepParams[keepParams.length] = params[i];
				}
			}
		}
	
		newURL += "?" + keepParams.join("&");
	}
 
	if (defaultNormalize != null) {
		newURL = defaultNormalize(newURL, isHref);
	}

	return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}

// hash function to support shop aggregation with attributes
function cm_hex_sha1(s)    { if(s) {return cm_rstr2hex(cm_rstr_sha1(cm_str2rstr_utf8(s))); } else { return null; }}

// internal support functions for hashing, do not call directly
function cm_rstr_sha1(s)
{
  return cm_binb2rstr(cm_binb_sha1(cm_rstr2binb(s), s.length * 8));
}

function cm_rstr2hex(input)
{
  var hex_tab = 0 ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

function cm_str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    // Decode utf-16 surrogate pairs
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    // Encode output as utf-8
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

function cm_rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

function cm_binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

function cm_binb_sha1(x, len)
{
  // append padding
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = cm_bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = cm_safe_add(cm_safe_add(cm_bit_rol(a, 5), cm_sha1_ft(j, b, c, d)),
                       cm_safe_add(cm_safe_add(e, w[j]), cm_sha1_kt(j)));
      e = d;
      d = c;
      c = cm_bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = cm_safe_add(a, olda);
    b = cm_safe_add(b, oldb);
    c = cm_safe_add(c, oldc);
    d = cm_safe_add(d, oldd);
    e = cm_safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

function cm_sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

function cm_sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

function cm_safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function cm_bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}


/**** IO code removed **/

// asyncronous tag queue
function cmExecuteTagQueue() {
	var i = window.cmTagQueue;
	if (i) {
		var f = (i.constructor == Array);
		if (!f) { return };
		for (var x = 0; x < i.length; ++x) {
			window[i[x][0]].apply(window,i[x].slice(1));
		}
	}
	return true;
}

cmExecuteTagQueue();
/*** Unica Adapter Code ***/if(typeof(_cmAdapter)!="undefined"){if(_cmAdapter.cm_ClientID){cm_ClientID=_cmAdapter.cm_ClientID;}if(_cmAdapter.cm_HOST){cm_HOST=_cmAdapter.cm_HOST+"/cm?";}cm_JSFEnabled=true;if(_cmAdapter.tagQueue){_cmAdapter.tagQueue.push=function(unicaValues){function getUnicaVar(n){if(typeof(window[n])!="undefined"){return window[n];}return null;}function getUnicaArray(n){var array=getUnicaVar(n);if(!array){array=[];}return array;}function PCTracker(){this.toSendYes=false;}PCTracker.prototype.getPC=function(){if(this.toSendYes){this.toSendYes=false;return "Y";}return null;};PCTracker.prototype.sendYes=function(){this.toSendYes=true;};function splitUnicaRetail(retailString){var i,item,items,elements=retailString.split(";"),elementsPerItem=3,result=[];items=Math.floor(elements.length / elementsPerItem);for(i=0;i<items;i++){item=[];for(var j=0;j<elementsPerItem;j++){item.push(elements[(i * elementsPerItem)+j ]);}result.push(item);}return result;}function isLinkTag(lc){return(lc&&(lc!=document.location.href));}function getCustomerID(data){var configCID=getUnicaVar("NTPT_CM_CID"),paramName=getUnicaVar("NTPT_CM_CID_PARAM"),un=data["un"],paramCID=null;if(paramName){paramCID=data[ paramName ];}return(configCID?configCID:(paramCID?paramCID:(un?un:"unca_no_cd")));}function addSharedParams(data){var knownParams="|cd|ets|ev|iv|js|jv|lc|ln|pv|rf|rs|rta|rtc|rti|rtr|rtt|rtv|sc|ts|tz|";for(var key in data){if((typeof(data[ key ])==="string")&&(knownParams.indexOf("|"+key+"|")==-1)){cmAddShared("unca_"+key,data[ key ]);}}}function getProductName(productID){return "Product:"+productID;}function getCleanPrice(price){return price.toString().replace(cmPricePattern,"");}function getCleanProductID(productID){return productID.toString().replace(cmSpacePattern,"");}function cleanCurrencyCode(){if((typeof(cm_currencyCode)=="undefined")||(!cm_currencyCode)){cm_currencyCode="";}}function getPageIDForProduct(productName){return c1(cm_ClientID)?c1(cm_ClientID):productName;}function inArray(value,array){for(var i=0;i<array.length;i++){if(array[ i ]===value){return true;}}return false;}function createProductViewTag(rtv,pc){var products=rtv.split(";");for(var i=0;i<products.length;++i){cmMakeTag([ "tid","5","pi",getPageIDForProduct(),"pr",products[ i ],"pm",getProductName(products[ i ]),"pc",pc.getPC()]);}}function createShop5Tags(type,value,pc){var i,items,item,productID;cmAddShared("cc",cm_currencyCode);items=splitUnicaRetail(value);for(i=0;i<items.length;i++){item=items[ i ];productID=getCleanProductID(item[0]);cmAddShop([ "pr",productID,"pm",getProductName(productID),"qt",item[ 1 ],"bp",getCleanPrice(item[2]),"at","5","tid","4","pc",pc.getPC(),"uncasa",type ]);}}function createElementTag(evName){cmMakeTag([ "tid","15","eid",evName,"ecat","unca_event" ]);}function createShop9AndOrderTags(rtc,rti,rtt,customerID,pc){var i,item,itemValue,productID,orderTotal=0.0,rttValue=0,orderShipping=0,shippingItems=getUnicaArray("NTPT_CM_RTC_SHIPPING_ITEMS"),ignoreItems=getUnicaArray("NTPT_CM_RTC_IGNORE_ITEMS"),shopElements=[];cmAddShared("cc",cm_currencyCode);checkouts=splitUnicaRetail(rtc);for(i=0;i<checkouts.length;i++){item=checkouts[ i ];itemValue=parseInt(item[1])* parseFloat(item[2]);if(inArray(item[0],shippingItems)){orderShipping+=itemValue;}else if(!inArray(item[0],ignoreItems)){orderTotal+=itemValue;shopElements.push(item);}}if((orderShipping==0)&&rtt){rttValue=parseFloat(rtt);if(rttValue>orderTotal){orderShipping=rttValue - orderTotal;}}orderTotal=getCleanPrice(orderTotal);if(!rti){rti="unca_no_on"+new Date().getTime();}for(i=0;i<shopElements.length;i++){item=shopElements[i];productID=getCleanProductID(item[0]);cmAddShop([ "pr",productID,"pm",getProductName(productID),"qt",item[ 1 ],"bp",getCleanPrice(item[2]),"cd",customerID,"on",rti,"tr",orderTotal,"at","9","tid","4","pc",pc.getPC()]);}cmDisplayShops();cmMakeTag([ "tid","3","osk",cmCalcSKUString(),"on",rti,"tr",orderTotal,"sg",orderShipping,"cd",customerID ]);}function createPageViewTag(augmentvisit){cmMakeTag([ "tid","1","uncavst",(augmentvisit?"true":null)]);}function getPageIDForLink(lc){var tempIndex,slashPos,pageName=lc;tempIndex=pageName.indexOf("://");if(tempIndex!=-1){pageName=pageName.substr(tempIndex+3);}tempIndex=pageName.indexOf(window.location.host);if(tempIndex!=-1){pageName=pageName.substr(tempIndex);}else{tempIndex=pageName.indexOf(window.location.hostname);if(tempIndex!=-1){pageName=pageName.substr(tempIndex);}}tempIndex=pageName.indexOf("?");if(tempIndex!=-1){pageName=pageName.substr(0,tempIndex);}tempIndex=pageName.indexOf("#");if(tempIndex!=-1){pageName=pageName.substr(0,tempIndex);}tempIndex=pageName.indexOf(";");if(tempIndex!=-1){pageName=pageName.substr(0,tempIndex);}slashPos=pageName.lastIndexOf("/");if(slashPos==pageName.length - 1){pageName=pageName+"default";}while(pageName.indexOf("/")==0){pageName=pageName.substr(1);}return(pageName);}function createLinkPageViewTag(lc,rf,augmentvisit){cmMakeTag([ "tid","1","ul",lc,"rf",rf,"pi",getPageIDForLink(lc),"uncaexturl","true" ]);}var pctrk=new PCTracker(),augmentvisit=(unicaValues[ "pv" ]=="0");cmStartTagSet();addSharedParams(unicaValues);if(unicaValues[ "ev" ]){createElementTag(unicaValues[ "ev" ]);}else{if(isLinkTag(unicaValues[ "lc" ])){createLinkPageViewTag(unicaValues[ "lc" ],unicaValues[ "rf" ],augmentvisit);}else if(!augmentvisit&&(unicaValues[ "rtv" ]||unicaValues[ "rta" ]||unicaValues[ "rtr" ]||unicaValues[ "rtc" ])){pctrk.sendYes();}else{createPageViewTag(augmentvisit);}}if(unicaValues[ "rtv" ]){createProductViewTag(unicaValues[ "rtv" ],pctrk);}cleanCurrencyCode();if(unicaValues[ "rta" ]||unicaValues[ "rtr" ]){if(unicaValues[ "rta" ]){createShop5Tags("rta",unicaValues[ "rta" ],pctrk);}if(unicaValues[ "rtr" ]){createShop5Tags("rtr",unicaValues[ "rtr" ],pctrk);}cmDisplayShops();}if(unicaValues[ "rtc" ]){createShop9AndOrderTags(unicaValues[ "rtc" ],unicaValues[ "rti" ],unicaValues[ "rtt" ],getCustomerID(unicaValues),pctrk);}cmSendTagSet();};while(_cmAdapter.tagQueue.length){_cmAdapter.tagQueue.push(_cmAdapter.tagQueue.shift());}}}