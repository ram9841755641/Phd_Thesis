function LTrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}

// Removes ending whitespaces
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}

// Removes leading and ending whitespaces
function trim( value ) {
	return LTrim(RTrim(value));
}


function validateInputField(fieldId, minLength, errorDivId, errorMessage) {
	var trimmedFieldValue = new String(trim(document.getElementById(fieldId).value));
	if(trimmedFieldValue.length < minLength) {
		
		setErrorMessage(fieldId,errorMessage);
		return false;
	} else {
		if(document.getElementById(errorDivId).innerHTML != "")
			removeErrorMessage(fieldId);
		return true;
	}
}


function validateInputFieldByCharacters(fieldId,errorMessage,errorDivId) {
   var regex = /^[a-zA-Z0-9@._-]+$/;  
   var trimmedFieldValue = trim(document.getElementById(fieldId).value); 
    if(!regex.test(trimmedFieldValue)){ 
	   setErrorMessage(fieldId,errorMessage);
	   return false;
   }
	 else {
		 if(document.getElementById(errorDivId).innerHTML != "")
			removeErrorMessage(fieldId);
		return true;
	}
}

function validateInputFieldForPasswordChange(fieldId,errorMessage,errorDivId) {
	 
	if(!validateInputFieldByCharacters(fieldId,errorMessage,errorDivId)) {
  
		document.getElementById(errorDivId).className = "alert errormsg";
		document.getElementById(errorDivId).innerHTML = errorMessage;
		document.getElementById(errorDivId).style.display = "block";
		return false;
	} else {
		 
		if(document.getElementById(errorDivId).innerHTML != "")
		{
			document.getElementById(errorDivId).innerHTML = "";
			document.getElementById(errorDivId).className = "";
			document.getElementById(errorDivId).style.display = "none";	
		}
		return true;
	}
}
function validateInputFieldForSimpleForms(fieldId, minLength, errorDivId, errorMessage) {
	var trimmedFieldValue = new String(trim(document.getElementById(fieldId).value));
	if(trimmedFieldValue.length < minLength) {
		document.getElementById(errorDivId).className = "alert errormsg";
		document.getElementById(errorDivId).innerHTML = errorMessage;
		document.getElementById(errorDivId).style.display = "block";
		return false;
	} else {
		
		if(document.getElementById(errorDivId).innerHTML != "")
		{
			document.getElementById(errorDivId).innerHTML = "";
			document.getElementById(errorDivId).className = "";
			document.getElementById(errorDivId).style.display = "none";	
		}
		return true;
	}
}

function validateActivateInputField(fieldId, minLength, errorDivId, errorMessage) {
	var trimmedFieldValue = new String(trim(document.getElementById(fieldId).value));
	var message = document.getElementById(errorDivId).innerHTML;
	if(trimmedFieldValue.length < minLength) {	
		document.getElementById(errorDivId).innerHTML = errorMessage;
		document.getElementById(errorDivId).className = "alert errormsg alertwide";
		document.getElementById(errorDivId).style.display = "block";
		return false;
	}else if(!(message == errorMessage)){
		return true;
	} 
	else {	
		document.getElementById(errorDivId).innerHTML = "";
		document.getElementById(errorDivId).className = "";
		document.getElementById(errorDivId).style.display = "none";		
		return true;
	}
}

function validateActivateInputFieldForSimpleForms(fieldId, minLength, errorDivId, errorMessage) {
	var trimmedFieldValue = new String(trim(document.getElementById(fieldId).value));
	var message = document.getElementById(errorDivId).innerHTML;
	if(trimmedFieldValue.length < minLength) {	
		document.getElementById(errorDivId).innerHTML = errorMessage;
		document.getElementById(errorDivId).className = "alert errormsg";
		document.getElementById(errorDivId).style.display = "block";
		return false;
	}else if(!(message == errorMessage)){
		return true;
	} 
	else {	
		document.getElementById(errorDivId).innerHTML = "";
		document.getElementById(errorDivId).className = "";
		document.getElementById(errorDivId).style.display = "none";	
		return true;
	}
}
function validateCustomerNumberInputField(fieldId, minLength, errorDivId, errorMessage) {
	var trimmedFieldValue = new String(trim(document.getElementById(fieldId).value));
	if(trimmedFieldValue.length < minLength) {
	
		document.getElementById(errorDivId).innerHTML = errorMessage;
		return false;
	} 
	else {
			if(document.getElementById(errorDivId).innerHTML != "")
				document.getElementById(errorDivId).innerHTML = "";
			return true;
		}
		return true;
}

function validateSelectField(fieldId, errorDivId, errorMessage) {
	if(document.getElementById(fieldId).selectedIndex==0) {
		setErrorMessage(fieldId,errorMessage);
		return false;
	} else {
		removeErrorMessage(fieldId);
		return true;
	}
}

function validateEmailField(emailAddressDivId, errorDivId, errorMessage) {
	var trimmedFieldValue = new String(trim(document.getElementById(emailAddressDivId).value));
	var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var regex = new RegExp(emailReg);
	var valid = regex.test(trimmedFieldValue);
	if(valid) {
		if(document.getElementById(errorDivId).innerHTML != "")
			removeErrorMessage(emailAddressDivId,errorMessage);
	} else {
		setErrorMessage(emailAddressDivId,errorMessage);
	}
	return valid;
}

function validateEmailFieldForSimpleForms(emailAddressDivId, errorDivId, errorMessage) {
	var trimmedFieldValue = new String(trim(document.getElementById(emailAddressDivId).value));
	var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var regex = new RegExp(emailReg);
	var valid = regex.test(trimmedFieldValue);

	if(valid) {
			if(document.getElementById(errorDivId).innerHTML != ""){
					document.getElementById(errorDivId).innerHTML = "";
					document.getElementById(errorDivId).className = "";
					document.getElementById(errorDivId).style.display = "none";
			}
		} else {
			document.getElementById(errorDivId).innerHTML = errorMessage;			
			document.getElementById(errorDivId).className = "alert errormsg";
			document.getElementById(errorDivId).style.display = "block";
		}
	return valid;
}

function validateUserName() {
	return validateInputField('registrationUsername', 6, 'registrationUsername_error', 'Please enter a User Name that is at least 6 characters long.');
}

function validatePassword() {
	return validateInputField('registrationPassword', 6, 'registrationPassword_error', 'Please enter a Password that is at least 6 characters long.');
}

function validateConfirmPassword() {
	if(document.getElementById('registrationPassword').value != document.getElementById('confirmPassword').value) {
		document.getElementById('confirmPassword_error').innerHTML = "Please ensure the Passwords match.";
		return false;
	} else {
		document.getElementById('confirmPassword_error').innerHTML = "";
		return true;
	}	
}

function doCitationDownload()
{
	var url = "about:blank";
    var windowOptions = "width=680,height=480,innerWidth=680,innerHeight=480,top=0,left=50,screenX=0,screenY=0,scrollbars=yes,resizable=yes,toolbar=yes,status=yes";   	
	//var windowOptions = "width=700,height=500,left=150,top=150,screenX=150,screenY=150,resizable=yes,scrollbars=no";
	var form = document.forms["citationExportForm"];
	var popWin = window.open(url,"ExportCitations",windowOptions);
    popWin.focus();
    form.target = "ExportCitations";
    form.submit();
	return true;
}

function getElementsByClassName(strClass, strTag, objContElm) {
  strTag = strTag || "*";
  objContElm = objContElm || document;
  var objColl = objContElm.getElementsByTagName(strTag);
  if (!objColl.length &&  strTag == "*" &&  objContElm.all) objColl = objContElm.all;
  var arr = new Array();
  var delim = strClass.indexOf('|') != -1  ? '|' : ' ';
  var arrClass = strClass.split(delim);
  for (var i = 0, j = objColl.length; i < j; i++) {
    var arrObjClass = objColl[i].className.split(' ');
    if (delim == ' ' && arrClass.length > arrObjClass.length) continue;
    var c = 0;
    comparisonLoop:
    for (var k = 0, l = arrObjClass.length; k < l; k++) {
      for (var m = 0, n = arrClass.length; m < n; m++) {
        if (arrClass[m] == arrObjClass[k]) c++;
        if (( delim == '|' && c == 1) || (delim == ' ' && c == arrClass.length)) {
          arr.push(objColl[i]);
          break comparisonLoop;
        }
      }
    }
  }
  return arr;
}

function onLoadOfFullText(cont)
{
// To cover IE 5.0's lack of the push method
Array.prototype.push = function(value) {
  this[this.length] = value;
}
//var cont = document.getElementById('main_content');

if(!is_safari){
var crosslinks = getElementsByClassName('ja50-ce-cross-ref','a', cont);
for(i=0;i<crosslinks.length;i++){
	
	crosslinks[i].onmouseover=function(){
		this.parentNode.style.position = "static";		
		this.style.position = "relative";		
		myname = this.getAttribute('name');
		if(myname.indexOf('bib') !=-1){
			refid = myname.replace('back-','');
			var newdiv = document.createElement('div');
			newdiv.setAttribute('id', refid+'box');
			newdiv.setAttribute('class', 'inlineref');
			newdiv.style.position = "absolute";
			newdiv.style.width = "24em";
			newdiv.style.padding = "5px";
			newdiv.style.color = "#333";
			newdiv.style.height = "auto";
			if(document.getElementById('fulltext_body').className=='outline_closed'){
				newdiv.style.left = "-10px";
			}
			else {
				newdiv.style.left = "-12em";
			}
			newdiv.style.zIndex = "999999999";
			newdiv.style.fontSize = ".9em";
			newdiv.style.textDecoration = "none";
			newdiv.style.top = "20px";
			newdiv.style.background = "#efefef";
			newdiv.style.border = "2px solid #005587";
			newdiv.style.display = "block";
			reftest = document.getElementById(refid).innerHTML;
			reftest =  reftest.replace(/<a href[^>]*>[\s\S]+<\/a>/ig,"");
			newdiv.innerHTML = reftest;
			this.appendChild(newdiv);
				}
			}

	crosslinks[i].onmouseout=function(){
		this.style.position = "static";		
		myname = this.getAttribute('name');
		if(myname.indexOf('bib') !=-1){
			refid = myname.replace('back-','');
		    var oNodeToRemove = document.getElementById(refid+'box');
		    if(oNodeToRemove)
		    oNodeToRemove.parentNode.removeChild(oNodeToRemove);
		}
	}
	}
}
}
function refresh()
{
	var sURL = unescape(window.location.pathname);
    window.location.href = sURL;
}
function reloadWithParam(paramName , paramValue)
{
	var sURL = unescape(window.location.pathname);
	sURL = sURL + '?' +paramName +'=' + paramValue;
    window.location.href = sURL;
}

function archivelist() {

       // if the user clicks on an anchor link within a top-level list item in ul#article_outline_list_archive,
       // make the child UL be class 'open' 
       archivepanel = document.getElementById('article_outline_list_archive');
       mylinks = archivepanel.getElementsByTagName('A');
       for (var i=0; i<mylinks.length; i++){
               // only call this function if it's a top level link
               if(mylinks[i].parentNode.parentNode.id=='article_outline_list_archive'){
                mylinks[i].onclick = function(){
                       if(this.parentNode.className=='open'){
                        this.parentNode.className='closed';
                        }
                       else {
                               this.parentNode.className='open';
                       }
                       return false;
                 }
         }
   } 
}

function jumpLinks(){
		var outline = document.getElementById('article_outline_list');
		if(outline){
		var jumplinks = outline.getElementsByTagName('A');
		for(i=0;i<jumplinks.length;i++){			
			mylinks = jumplinks[i].parentNode.getElementsByTagName('UL');
			// skip if there are no lists below this
			if(mylinks.length==0){
				jumplinks[i].parentNode.className = 'nochildren';
				continue;				
				}
			// skip if this tag is not a top-level descendent of the holding list
			if(jumplinks[i].parentNode.parentNode.getAttribute('id') !='article_outline_list')
				continue;
			jumplinks[i].onclick=function(){
			if(this.parentNode.className=='open')
				this.parentNode.className='closed';
			else
				this.parentNode.className='open';
			}
		}
		}
	}
	




    // convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();
    var appVer = navigator.appVersion.toLowerCase();

    // *** BROWSER VERSION ***

    var is_minor = parseFloat(appVer);
    var is_major = parseInt(is_minor);

    var is_opera = (agt.indexOf("opera") != -1);
    var is_opera2 = (agt.indexOf("opera 2") != -1 || agt.indexOf("opera/2") != -1);
    var is_opera3 = (agt.indexOf("opera 3") != -1 || agt.indexOf("opera/3") != -1);
    var is_opera4 = (agt.indexOf("opera 4") != -1 || agt.indexOf("opera/4") != -1);
    var is_opera5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
    var is_opera6 = (agt.indexOf("opera 6") != -1 || agt.indexOf("opera/6") != -1); // 020128- abk
    var is_opera7 = (agt.indexOf("opera 7") != -1 || agt.indexOf("opera/7") != -1); // 021205- dmr
    var is_opera8 = (agt.indexOf("opera 8") != -1 || agt.indexOf("opera/8") != -1); // 09-19-2006 jonw 
    var is_opera9 = (agt.indexOf("opera 9") != -1 || agt.indexOf("opera/9") != -1); // 09-19-2006 jonw

    var is_opera5up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4);
    var is_opera6up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4 && !is_opera5); // new020128
    var is_opera7up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4 && !is_opera5 && !is_opera6); // new021205 -- dmr
    var is_opera8up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4 && !is_opera5 && !is_opera6 && !is_opera7); // 09-19-2006 - jonw
    var is_opera9up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4 && !is_opera5 && !is_opera6 && !is_opera7 &&!is_opera8); // 09-19-2006 - jonw

    // Note: On IE, start of appVersion return 3 or 4
    // which supposedly is the version of Netscape it is compatible with.
    // So we look for the real version further on in the string
    // And on Mac IE5+, we look for is_minor in the ua; since 
    // it appears to be more accurate than appVersion - 06/17/2004

    var is_mac = (agt.indexOf("mac")!=-1);
    var iePos  = appVer.indexOf('msie');
    if (iePos !=-1) {
       if(is_mac) {
           var iePos = agt.indexOf('msie');
           is_minor = parseFloat(agt.substring(iePos+5,agt.indexOf(';',iePos)));
       }
       else is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)));
       is_major = parseInt(is_minor);
    }

    // ditto Konqueror
                                      
    var is_konq = false;
    var kqPos   = agt.indexOf('konqueror');
    if (kqPos !=-1) {                 
       is_konq  = true;
       is_minor = parseFloat(agt.substring(kqPos+10,agt.indexOf(';',kqPos)));
       is_major = parseInt(is_minor);
    }                                 

    var is_getElementById   = (document.getElementById) ? "true" : "false"; // 001121-abk
    var is_getElementsByTagName = (document.getElementsByTagName) ? "true" : "false"; // 001127-abk
    var is_documentElement = (document.documentElement) ? "true" : "false"; // 001121-abk

    var is_safari = ((agt.indexOf('safari')!=-1)&&(agt.indexOf('mac')!=-1))?true:false;
    var is_khtml  = (is_safari || is_konq);

    var is_gecko = ((!is_khtml)&&(navigator.product)&&(navigator.product.toLowerCase()=="gecko"))?true:false;
    var is_gver  = 0;
    if (is_gecko) is_gver=navigator.productSub;

    var is_fb = ((agt.indexOf('mozilla/5')!=-1) && (agt.indexOf('spoofer')==-1) &&
                 (agt.indexOf('compatible')==-1) && (agt.indexOf('opera')==-1)  &&
                 (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)     &&
                 (is_gecko) && (navigator.vendor=="Firebird"));
    var is_fx = ((agt.indexOf('mozilla/5')!=-1) && (agt.indexOf('spoofer')==-1) &&
                 (agt.indexOf('compatible')==-1) && (agt.indexOf('opera')==-1)  &&
                 (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)     &&
                 (is_gecko) && ((navigator.vendor=="Firefox")||(agt.indexOf('firefox')!=-1)));
    var is_moz   = ((agt.indexOf('mozilla/5')!=-1) && (agt.indexOf('spoofer')==-1) &&
                    (agt.indexOf('compatible')==-1) && (agt.indexOf('opera')==-1)  &&
                    (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)     &&
                    (is_gecko) && (!is_fb) && (!is_fx) &&
                    ((navigator.vendor=="")||(navigator.vendor=="Mozilla")||(navigator.vendor=="Debian")));
    if ((is_moz)||(is_fb)||(is_fx)) {  // 032504 - dmr
       var is_moz_ver = (navigator.vendorSub)?navigator.vendorSub:0;
       if(is_fx&&!is_moz_ver) {
           is_moz_ver = agt.indexOf('firefox/');
           is_moz_ver = agt.substring(is_moz_ver+8);
           is_moz_ver = parseFloat(is_moz_ver);
       }
       if(!(is_moz_ver)) {
           is_moz_ver = agt.indexOf('rv:');
           is_moz_ver = agt.substring(is_moz_ver+3);
           is_paren   = is_moz_ver.indexOf(')');
           is_moz_ver = is_moz_ver.substring(0,is_paren);
       }
       is_minor = is_moz_ver;
       is_major = parseInt(is_moz_ver);
    }
   var is_fb_ver = is_moz_ver;
   var is_fx_ver = is_moz_ver;

    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)
                && (!is_khtml) && (!(is_moz)) && (!is_fb) && (!is_fx));

    // Netscape6 is mozilla/5 + Netscape6/6.0!!!
    // Mozilla/5.0 (Windows; U; Win98; en-US; m18) Gecko/20001108 Netscape6/6.0
    // Changed this to use navigator.vendor/vendorSub - dmr 060502   
    // var nav6Pos = agt.indexOf('netscape6');
    // if (nav6Pos !=-1) {
    if ((navigator.vendor)&&
        ((navigator.vendor=="Netscape6")||(navigator.vendor=="Netscape"))&&
        (is_nav)) {
       is_major = parseInt(navigator.vendorSub);
       // here we need is_minor as a valid float for testing. We'll
       // revert to the actual content before printing the result. 
       is_minor = parseFloat(navigator.vendorSub);
    }

    var is_nav2 = (is_nav && (is_major == 2));
    var is_nav3 = (is_nav && (is_major == 3));
    var is_nav4 = (is_nav && (is_major == 4));
    var is_nav4up = (is_nav && is_minor >= 4);  // changed to is_minor for
                                                // consistency - dmr, 011001
    var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) ||
                          (agt.indexOf("; nav") != -1)) );

    var is_nav6   = (is_nav && is_major==6);    // new 010118 mhp
    var is_nav6up = (is_nav && is_minor >= 6); // new 010118 mhp

    var is_nav5   = (is_nav && is_major == 5 && !is_nav6); // checked for ns6
    var is_nav5up = (is_nav && is_minor >= 5);

    var is_nav7   = (is_nav && is_major == 7);
    var is_nav7up = (is_nav && is_minor >= 7);

    var is_nav8   = (is_nav && is_major == 8);
    var is_nav8up = (is_nav && is_minor >= 8);

    var is_ie   = ((iePos!=-1) && (!is_opera) && (!is_khtml));
    var is_ie3  = (is_ie && (is_major < 4));

    var is_ie4   = (is_ie && is_major == 4);
    var is_ie4up = (is_ie && is_minor >= 4);
    var is_ie5   = (is_ie && is_major == 5);
    var is_ie5up = (is_ie && is_minor >= 5);
    
    var is_ie5_5  = (is_ie && (agt.indexOf("msie 5.5") !=-1)); // 020128 new - abk
    var is_ie5_5up =(is_ie && is_minor >= 5.5);                // 020128 new - abk
	
    var is_ie6   = (is_ie && is_major == 6);
    var is_ie6up = (is_ie && is_minor >= 6);

    var is_ie7   = (is_ie && is_major == 7);
    var is_ie7up = (is_ie && is_minor >= 7);

// KNOWN BUG: On AOL4, returns false if IE3 is embedded browser
    // or if this is the first browser window opened.  Thus the
    // variables is_aol, is_aol3, and is_aol4 aren't 100% reliable.

    var is_aol   = (agt.indexOf("aol") != -1);
    var is_aol3  = (is_aol && is_ie3);
    var is_aol4  = (is_aol && is_ie4);
    var is_aol5  = (agt.indexOf("aol 5") != -1);
    var is_aol6  = (agt.indexOf("aol 6") != -1);
    var is_aol7  = ((agt.indexOf("aol 7")!=-1) || (agt.indexOf("aol7")!=-1));
    var is_aol8  = ((agt.indexOf("aol 8")!=-1) || (agt.indexOf("aol8")!=-1));

    var is_webtv = (agt.indexOf("webtv") != -1);
    
    // new 020128 - abk
    
    var is_TVNavigator = ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1)); 
    var is_AOLTV = is_TVNavigator;

    var is_hotjava = (agt.indexOf("hotjava") != -1);
    var is_hotjava3 = (is_hotjava && (is_major == 3));
    var is_hotjava3up = (is_hotjava && (is_major >= 3));

    // end new
	
    // *** JAVASCRIPT VERSION CHECK ***
    // Useful to workaround Nav3 bug in which Nav3
    // loads <SCRIPT LANGUAGE="JavaScript1.2">.
    // updated 020131 by dragle
    var is_js;
    if (is_nav2 || is_ie3) is_js = 1.0;
    else if (is_nav3) is_js = 1.1;
    else if ((is_opera5)||(is_opera6)) is_js = 1.3; // 020214 - dmr
    else if (is_opera7up) is_js = 1.5; // 031010 - dmr
    else if (is_khtml) is_js = 1.5;   // 030110 - dmr
    else if (is_opera) is_js = 1.1;
    else if ((is_nav4 && (is_minor <= 4.05)) || is_ie4) is_js = 1.2;
    else if ((is_nav4 && (is_minor > 4.05)) || is_ie5) is_js = 1.3;
    else if (is_nav5 && !(is_nav6)) is_js = 1.4;
    else if (is_hotjava3up) is_js = 1.4; // new 020128 - abk
    else if (is_nav6up) is_js = 1.5;

    // NOTE: In the future, update this code when newer versions of JS
    // are released. For now, we try to provide some upward compatibility
    // so that future versions of Nav and IE will show they are at
    // *least* JS 1.x capable. Always check for JS version compatibility
    // with > or >=.

    else if (is_nav && (is_major > 5)) is_js = 1.4;
    else if (is_ie && (is_major > 5)) is_js = 1.3;
    else if (is_moz) is_js = 1.5;
    else if (is_fb||is_fx) is_js = 1.5; // 032504 - dmr
    
    // what about ie6 and ie6up for js version? abk
    
    // HACK: no idea for other browsers; always check for JS version 
    // with > or >=
    else is_js = 0.0;
    // HACK FOR IE5 MAC = js vers = 1.4 (if put inside if/else jumps out at 1.3)
    if ((agt.indexOf("mac")!=-1) && is_ie5up) is_js = 1.4; // 020128 - abk
    
    // Done with is_minor testing; revert to real for N6/7
    if (is_nav6up) {
       is_minor = navigator.vendorSub;
    }

    // *** PLATFORM ***
    var is_win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
    // NOTE: On Opera 3.0, the userAgent string includes "Windows 95/NT4" on all
    //        Win32, so you can't distinguish between Win95 and WinNT.
    var is_win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));

    // is this a 16 bit compiled version?
    var is_win16 = ((agt.indexOf("win16")!=-1) ||
               (agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) ||
               (agt.indexOf("windows 16-bit")!=-1) );

    var is_win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
                    (agt.indexOf("windows 16-bit")!=-1));
	
	var is_winme = ((agt.indexOf("win 9x 4.90")!=-1));    // new 020128 - abk
    var is_win2k = ((agt.indexOf("windows nt 5.0")!=-1) || (agt.indexOf("windows 2000")!=-1)); // 020214 - dmr
    var is_winxp = ((agt.indexOf("windows nt 5.1")!=-1) || (agt.indexOf("windows xp")!=-1)); // 020214 - dmr

    // NOTE: Reliable detection of Win98 may not be possible. It appears that:
    //       - On Nav 4.x and before you'll get plain "Windows" in userAgent.
    //       - On Mercury client, the 32-bit version will return "Win98", but
    //         the 16-bit version running on Win98 will still return "Win95".
    var is_win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
    var is_winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
    var is_win32 = (is_win95 || is_winnt || is_win98 ||
                    ((is_major >= 4) && (navigator.platform == "Win32")) ||
                    (agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));

    var is_os2   = ((agt.indexOf("os/2")!=-1) ||
                    (navigator.appVersion.indexOf("OS/2")!=-1) ||
                    (agt.indexOf("ibm-webexplorer")!=-1));

    var is_mac    = (agt.indexOf("mac")!=-1);
    if (is_mac) { is_win = !is_mac; } // dmr - 06/20/2002
    var is_mac68k = (is_mac && ((agt.indexOf("68k")!=-1) ||
                               (agt.indexOf("68000")!=-1)));
    var is_macppc = (is_mac && ((agt.indexOf("ppc")!=-1) ||
                                (agt.indexOf("powerpc")!=-1)));
    var is_macosx = (is_mac && (agt.indexOf("os x")!=-1));

    var is_sun   = (agt.indexOf("sunos")!=-1);
    var is_sun4  = (agt.indexOf("sunos 4")!=-1);
    var is_sun5  = (agt.indexOf("sunos 5")!=-1);
    var is_suni86= (is_sun && (agt.indexOf("i86")!=-1));
    var is_irix  = (agt.indexOf("irix") !=-1);    // SGI
    var is_irix5 = (agt.indexOf("irix 5") !=-1);
    var is_irix6 = ((agt.indexOf("irix 6") !=-1) || (agt.indexOf("irix6") !=-1));
    var is_hpux  = (agt.indexOf("hp-ux")!=-1);
    var is_hpux9 = (is_hpux && (agt.indexOf("09.")!=-1));
    var is_hpux10= (is_hpux && (agt.indexOf("10.")!=-1));
    var is_aix   = (agt.indexOf("aix") !=-1);      // IBM
    var is_aix1  = (agt.indexOf("aix 1") !=-1);
    var is_aix2  = (agt.indexOf("aix 2") !=-1);
    var is_aix3  = (agt.indexOf("aix 3") !=-1);
    var is_aix4  = (agt.indexOf("aix 4") !=-1);
    var is_linux = (agt.indexOf("inux")!=-1);
    var is_sco   = (agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1);
    var is_unixware = (agt.indexOf("unix_system_v")!=-1);
    var is_mpras    = (agt.indexOf("ncr")!=-1);
    var is_reliant  = (agt.indexOf("reliantunix")!=-1);
    var is_dec   = ((agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1) ||
           (agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1) ||
           (agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1));
    var is_sinix = (agt.indexOf("sinix")!=-1);
    var is_freebsd = (agt.indexOf("freebsd")!=-1);
    var is_bsd = (agt.indexOf("bsd")!=-1);
    var is_unix  = ((agt.indexOf("x11")!=-1) || is_sun || is_irix || is_hpux ||
                 is_sco ||is_unixware || is_mpras || is_reliant ||
                 is_dec || is_sinix || is_aix || is_linux || is_bsd || is_freebsd);

    var is_vms   = ((agt.indexOf("vax")!=-1) || (agt.indexOf("openvms")!=-1));
// additional checks, abk
	var is_anchors = (document.anchors) ? "true":"false";
	var is_regexp = (window.RegExp) ? "true":"false";
	var is_option = (window.Option) ? "true":"false";
	var is_all = (document.all) ? "true":"false";
// cookies - 990624 - abk
	document.cookie = "cookies=true";
	var is_cookie = (document.cookie) ? "true" : "false";
	var is_images = (document.images) ? "true":"false";
	var is_layers = (document.layers) ? "true":"false"; // gecko m7 bug?
// new doc obj tests 990624-abk
	var is_forms = (document.forms) ? "true" : "false";
	var is_links = (document.links) ? "true" : "false";
	var is_frames = (window.frames) ? "true" : "false";
	var is_screen = (window.screen) ? "true" : "false";

// java
	var is_java = (navigator.javaEnabled());

// Flash checking code adapted from Doc JavaScript information; 
// see http://webref.com/js/column84/2.html

   var is_Flash        = false;
   var is_FlashVersion = 0;

   if ((is_nav||is_opera||is_moz||is_fb||is_fx||is_safari)||
       (is_mac&&is_ie5up)) {
      var plugin = (navigator.mimeTypes && 
                    navigator.mimeTypes["application/x-shockwave-flash"] &&
                    navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) ?
                    navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
//      if (plugin) {
      if (plugin&&plugin.description) {
         is_Flash = true;
         is_FlashVersion = parseInt(plugin.description.substring(plugin.description.indexOf(".")-1));
      }
   }

   if (is_win&&is_ie4up)
   {
      document.write(
         '<scr' + 'ipt language=VBScript>' + '\n' +
         'Dim hasPlayer, playerversion' + '\n' +
         'hasPlayer = false' + '\n' +
         'playerversion = 10' + '\n' +
         'Do While playerversion > 0' + '\n' +
            'On Error Resume Next' + '\n' +
            'hasPlayer = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & playerversion)))' + '\n' +
            'If hasPlayer = true Then Exit Do' + '\n' +
            'playerversion = playerversion - 1' + '\n' +
         'Loop' + '\n' +
         'is_FlashVersion = playerversion' + '\n' +
         'is_Flash = hasPlayer' + '\n' +
         '<\/sc' + 'ript>'
      );
   }
   
   function showRSSFeedPopUp(){
   var url = "/AJHG/Rss Feed";
    var windowOptions = "width=680,height=480,innerWidth=680,innerHeight=480,top=0,left=50,screenX=0,screenY=0,scrollbars=yes,resizable=yes,toolbar=yes,status=yes";   	
	//var windowOptions = "width=700,height=500,left=150,top=150,screenX=150,screenY=150,resizable=yes,scrollbars=no";
	var popWin = window.open(url,"Rss Feed",windowOptions);
    popWin.focus();
	return true;
   }
   
    
function validateCardNumber(cardNumber) {
	validateInputField(cardNumber, 1, cardNumber+'_error', 'Please enter your Card Number.');
	var cardNumberReg = /^[0-9]{13,19}/;
	var regex = new RegExp(cardNumberReg);
	var element = document.getElementById(cardNumber);
	if(!regex.test(element.value)) {
		setErrorMessage(cardNumber,"Please enter a valid Card Number.");
		return false;
	}
	else {
		removeErrorMessage(cardNumber);
		return true;
	}		
}

function validateCardExpiry(errorFieldId) {
	if (document.yourInformationForm.cardExpiryDateMonth.selectedIndex == 0 ||document.yourInformationForm.cardExpiryDateYear.selectedIndex == 0) {
		setErrorMessage(errorFieldId,'Please select your card Expiration Date');
		return false;
	} else if (isExpriationDateInValid(document.yourInformationForm.cardExpiryDateYear.options[document.yourInformationForm.cardExpiryDateYear.selectedIndex].value,document.yourInformationForm.cardExpiryDateMonth.options[document.yourInformationForm.cardExpiryDateMonth.selectedIndex].value)){
		setErrorMessage(errorFieldId,'Please check your card Expiration Date');
		return false;
	} else {
		removeErrorMessage(errorFieldId);	
		return true;
	}
}

function isExpriationDateInValid(year, month) {
	var currentDate = new Date();
	if(year > currentDate.getFullYear()) {
		return false;
	}
	if(year == currentDate.getFullYear()) {
		if( (month-1) >= currentDate.getMonth())
		{
			return false;
		}
	}
	return true;
}

function checkAll(scope) {
	boxes = scope.getElementsByTagName('input');
	if(!document.getElementById('search_all').checked){
		for(var i=0;i<boxes.length;i++) {
			boxes[i].checked=false;
		}										
	}
	else {
		for(var i=0;i<boxes.length;i++) {
			if(boxes[i].name != 'journalS'){
				boxes[i].checked=true;
			}else{
				boxes[i].checked=false;
			}
		}					
	}
}

function checkAllSubscribed(scope, userCurrentSubscriptionList) {
		boxes = scope.getElementsByTagName('input');
		if(!document.getElementById('search_subscribed').checked){
			for(var i=0;i<boxes.length;i++) {
				boxes[i].checked=false;
			}										
		}
		else {
			var user_Current_Subscription_Array=userCurrentSubscriptionList.split("$");
			for(var i=0;i<boxes.length;i++) {
				if(boxes[i].name != 'journalS'){
					boxes[i].checked=false;
				}else{
					boxes[i].checked=true;
				}
			}	

			for(var i=0;i<user_Current_Subscription_Array.length;i++) {									
					var element_Id = getJournalCheckBoxName(user_Current_Subscription_Array[i]);
					document.getElementById(element_Id).checked=true;
			}					
		}
}

function getJournalCheckBoxName(journal){
	journal = journal.toLowerCase();
	if(journal =="cell"){
		return "search_Cell";
	}else if (journal=="cancer cell"){
		return "search_ccell";
	}else if (journal=="cell host & microbe"){
		return "search_chom";
	}else if (journal=="cell metabolism"){
		return "search_cmet";
	}else if (journal=="cell stem cell"){
		return "search_stem";
	}else if (journal=="chemistry & biology"){
		return "search_chbiol";
	}else if (journal=="current biology"){
		return "search_curbio";
	}else if (journal=="developmental cell"){
		return "search_dcell";
	}else if (journal=="immunity"){
		return "search_immuni";
	}else if (journal=="molecular cell"){
		return "search_molcel";
	}else if (journal=="neuron"){
		return "search_neuron";
	}else if (journal=="structure"){
		return "search_foldes";
	}else if (journal=="cell reports"){
		return "search_cell-reports";
	}
}

function unCheckAll(checkbox){
					if(!checkbox.checked && document.getElementById('search_all').checked){
					document.getElementById('search_all').checked = false;
					}
				}

bookmark_ie6_startList = function() {
if (document.all&&document.getElementById) {
 if(document.getElementById("bookmark_this")){
	
bookmark = document.getElementById("bookmark_this");
var bookmark_list = document.getElementById("bookmark_list");
 bookmark.onmouseover = function() {
		
		
		bookmark_list.style.display="block";
		
			
 }
 bookmark.onmouseout = function() {
	bookmark_list.style.display="none";
 }
 }
 }

}
window.onload=bookmark_ie6_startList;	

function showContentWhenIE6() {
	document.getElementById('contentWhenJSisOnForIE6Browser').style.display='block';
}

function processCreditCard(){
	if (validateCardNumber('cardNumber') && validateCardExpiry('cardExpiryDate')) {
		startIframeTimer();
		showSirRequestProgressIndicator();
		var sirRequestForm = getSirRequestForm();
		populateSirRequestFields(sirRequestForm);
		sirRequestForm.submit();
	}
}




var pciIframeTimer;

var PCI_IFRAME_TIMEOUT_MS = 40000;

function startIframeTimer() {
	pciIframeTimer = setTimeout("checkPciStatusAndReportError()", PCI_IFRAME_TIMEOUT_MS);
}

function checkPciStatusAndReportError() {
	if (!(isPciRequestCompleteFormReadyAndSubmitInProgress())) {
		logSirTimeout();
		clearIframe();
		hideProgressIndicatorAndShowErrorMessage();
	}
}

function clearIframe() {
	document.getElementById('ccsecureiframe').src = '';
}
	
function isPciRequestCompleteFormReadyAndSubmitInProgress() {
	return document.getElementById('continueWebflowField').name=='_eventId_continue';
}

function hideProgressIndicatorAndShowErrorMessage() {
	document.getElementById('processIndicator').style.display = 'none';
	document.getElementById('sirResponseErrorDiv').style.display = 'block';
	document.getElementById('sirResponseErrorDiv').scrollIntoView(true);
}
	
function getSirRequestForm() {
	var iframeEl = document.getElementById('ccsecureiframe');
    if (iframeEl.contentDocument ) { 
    	return iframeEl.contentDocument.getElementById('sirRequest');
    } else {
		return iframeEl.contentWindow.document.getElementById('sirRequest');
	} 
}

function populateSirRequestFields(sirRequestForm) {
	var year = document.yourInformationForm.cardExpiryDateYear.options[document.yourInformationForm.cardExpiryDateYear.selectedIndex].value;
	var month = document.yourInformationForm.cardExpiryDateMonth.options[document.yourInformationForm.cardExpiryDateMonth.selectedIndex].value;
	var lastDayOfMonth = daysInMonth(month,year);
	var dateForSir = month + "/" + lastDayOfMonth + "/" + year;
    sirRequestForm.secure_I_C_1.value  = dateForSir + "_" + document.getElementById("cardNumber").value;
    sirRequestForm.domainUserid.value  = document.getElementById("userId").value;
}

function daysInMonth(month,year) {
	var dd = new Date(year, month, 0);
	return dd.getDate();
}

function showSirRequestProgressIndicator() {
	$(".registerform").append("<div class='progressIndicator' id='processIndicator'>PLEASE WAIT...</div>");
    document.getElementById('processIndicator').style.top = (findPos(document.getElementById('btn_ecom_cont'))[1]) + "px";
    document.getElementById('processIndicator').style.left = (findPos(document.getElementById('btn_ecom_cont'))[0]-5) + "px";
    document.getElementById('processIndicator').style.display = 'block';
	document.getElementById('btn_ecom_cont').style.visibility='hidden';
}

function jobAdsScript(advertUri){
	var ord = Math.random()*10000000000000000;
	document.write('<script type="text/javascript" src="https://ad.doubleclick.net/adj/' + advertUri +';pos=top;tile=2;sz=180x300;ord=' + ord + '?"><\/script>');		
}

function findPos(obj){
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft
        curtop = obj.offsetTop;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
            if (obj.tagName == 'DIV') {
                curtop -= obj.scrollTop;
            }
        }
    }
    return [curleft, curtop];
}

// SIR timeout logger (AJAX/DWR)
function logSirTimeout() {
 	SirTimeoutLogger.logSirTimeout(document.getElementById("userId").value, PCI_IFRAME_TIMEOUT_MS);
}
