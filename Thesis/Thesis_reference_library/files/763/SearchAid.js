function redirect_page(redirectUrl) {
//Redirect and display URL in parent frame
	//top.location.target = "_parent";
	parent.location = redirectUrl;
}

function openBrWindow(theURL,winName,features) { 
//Open new browser window
	newWindow = window.open(theURL,winName,features);
	newWindow.focus();
}

// display Help in new window

// NOTE:  This function was copied from PageSubmit.js
//         Any changes here should also be made there probably
function show_help(url) {
    var winprops;
    var newwindow;
    var winName = 'Help';
    var win_w = parseInt(screen.width * .85);
    var win_h = parseInt(screen.height * .70);

    winprops = 'height='+ win_h +',width='+ win_w +',top=70,left=60,toolbar=yes, menubar=yes,'+ 'resizable=yes,scrollbars=yes,status=no';
    newwindow = window.open(url, winName, winprops);

    if (window.focus) { newwindow.focus(); }

    return false;
}


//
// Following functions are called from UA application sides (SA clients) - cchen
//
function defineHiddenInput(checkNum, imgpath, config) {
	var num1, num2
	if (checkNum == 0) {
		num1 = 1;
		num2 = 9999;
	} else {
		num1 = num2 = checkNum;
	}
	for (i = num1; i <= num2; ++i) {
  		var opSelect = document.getElementById("select" + i);
  		if (opSelect != null) {
  			var val = opSelect.options[opSelect.selectedIndex].value;
  			var hidSelect = document.getElementById("value(hidInput" + i + ")");
  			var hidShow = document.getElementById("value(hidShowIcon" + i + ")");
  			var label=document.getElementById(val).value;
  			var labelAlt=document.getElementById(val+"_alt").value;
  			var saicon = document.getElementById("saicon" + i);
  			//if (saicon == null) {
  				//saicon = document.createElement(new Image());
  				//saicon = new Image();
  				//saicon.id = saicon.name = "saicon" + i;
				//hidSelect = new Hidden();
				//hidSelect.id = hidSelect.name = "value(hidInput" + i + ")";
//alert("New Hidden name:" + hidSelect.name + ", id:" + hidSelect.id);
  			//}
  			if (config != null) {
	  			var hidVal = isActivateSA(val, config);
  				var yesno = (hidVal == "") ? "0" : "1";
  				hidSelect.value = hidVal;
				hidShow.value = yesno;
			}
			if (checkNum != 0) {
				if (yesno == '1') {
					//saicon.style="width:0; visibility:hidden;";
					saicon.className = "NEWSearchAidText";
					saicon.innerHTML=label;
					saicon.alt=labelAlt;
					saicon.title=labelAlt;
					//saicon.onclick = eval("invokeRemoteSA_gen(this, 'saicon')");				
				} else {
					//saicon.style="width:18; visibility:visibility;";
					//saicon.src = imgpath + "/spacer.gif";			
					//saicon.width = 0;
					//saicon.title = null;
					saicon.className = "NEWSearchAidText_hidden";
					saicon.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					saicon.alt=labelAlt;
					saicon.title=labelAlt;
					//saicon.onclick = eval("invokeRemoteSA_gen(null, '')");				
				}
			}
  		} else
  			break;
  	}
}
  	
function isActivateSA(SAcode, config) {
	var initString = dataExchange(config, "name", "value", SAcode);
//alert("isActivateSA:"+SAcode + " returns[" + initString + "]");
	return initString;	
}

function createSAaction(product, passback, sid, urlpath, saType, request, num, saMode) {
    //if (request == 'OG') {
    	//saMode = "saJavaService";
    //}
    if (product == 'WOS' || product == 'UA') {
        saMode = "saJavaService";
    }
    //Begin : added for DRCI
    else if (request == 'AU' || request =='GP' || request == 'SO' || request == 'DE' || request == 'CAU' || request == 'CW') { 
		saMode = "saJavaService";
    }
    //End : added for DRCI 

    if ( ! saMode ) saMode = "saService";
    var pos = passback.indexOf("???");
    var len = passback.length;
    passback = passback.substring(0, pos) + num + passback.substring(pos+3, len);
    var action= urlpath + "/OutboundService.do?action=go&mode=" + saMode + "&product=" + product + "&saType=" + saType + "&passback=" + passback + "&sa_mode=" + product + "&RQ=" + request + "&SID=" + sid + "&TS=" + getTSlimit();

    return action;
}


function invokeRemoteSA_gen(iconField, iconbasename, saMode) {
//alert("iconField=" + iconField + ", iconbasename=" + iconbasename);
	if (iconField == null) return;
	var num = iconField.id.substring(iconbasename.length, iconField.id.length);
	var request = document.getElementById("value(hidInput" + num + ")").value;
	var params = document.getElementById("sa_params").value;
	var param = params.split("|");
	var saType = dataExchange(param[4], "value", "type", request);
	if (! saMode && saType == "termList" && param[0] == "DIIDW") {
		saMode = dataExchange(param[4], "value", "mode", request);
	}
	
	var action= createSAaction( param[0], param[1], param[2], param[3], saType, request, num, saMode );

	window.location=action;
}

function invokeRemoteSA_ref(product, num, passback, sid, hidname, config, urlpath, saMode ) {
    var hidctrl = document.getElementById(hidname);
   	var sacode = hidctrl.value;	    
   	var saType = dataExchange(config, "name", "type", sacode);
   	
   	if (! saMode && saType == "termList" && product == "DIIDW" ) {
		saMode = dataExchange(config, "name", "mode", sacode);
	}
   	
    var request = isActivateSA(sacode, config);
//alert(sacode + " got " + request);
	var action= createSAaction( product, passback, sid, urlpath, saType, request, num, saMode );

    window.location=action;
}

    function invokeRemoteSA_NoDBLimit(product, num, passback, sid, hidname, config, urlpath, saMode) {
	var hidctrl = document.getElementById(hidname);
   	var sacode = hidctrl.value;
	var saType = dataExchange(config, "name", "type", sacode);
	if (! saMode && saType == "termList" && product == "DIIDW") {
		saMode = dataExchange(config, "name", "mode", sacode);
	}
	
    var request = isActivateSA(sacode, config);
    //alert("sacode:"+sacode + ":request:" + request+ ":satype:"+saType);
    var action= createSAaction( product, passback, sid, urlpath, saType, request, num, saMode );

    window.location=action;
}

    function invokeRemoteSA_adv(product, num, passback, sid, sacode, config, urlpath, saMode) {
//alert(config);
    var request = isActivateSA(sacode, config);
	var saType = dataExchange(config, "name", "type", sacode);
//alert(sacode + " got " + request);
	
	if (! saMode && saType == "termList" && product == "DIIDW") {
		saMode = dataExchange(config, "name", "mode", sacode);
	}
	
    var pos = passback.indexOf("--");
    var len = passback.length;
    passback = passback.substring(0, pos) + sacode + passback.substring(pos+2, len);

    var action= createSAaction( product, passback, sid, urlpath, saType, request, num, saMode );
//alert(action);        
    if(top.frames.length != 0)
    {
    	top.location = action;
    }
    else
   	{
    	window.location = action;
    }
}

function dataExchange(config, fromField, toField, value) {
	var entries = config.split(",");
	var ret = "";
	var found = "0";
	fromField += "=";
	toField += "=";
	for (var i = 0; i < entries.length && found == "0"; i++) {
		if (entries[i].indexOf(fromField+value) > -1) {
			var pos1 = entries[i].indexOf(toField);
			var pos2 = entries[i].indexOf(";", pos1);
			if (pos2 == -1) {
				pos2 = entries[i].length;
				pos3 = entries[i].indexOf("]");
				if (pos3 > -1) pos2 = pos3;
			}
			ret = entries[i].substring(pos1+toField.length, pos2);
			found = "1";
		}
	}	
	return ret;
}

function getTSlimit() {
	var isPeriod;
	var retval = "";
	try {
		// There are two "period" radio buttons in WOK 4 silo and WOK 5. 
		// When second "period" radio button checked use srartYear and endYear
		// WCI is disabled in both WOK 4 and WOK 5. "edition" causes problem for WOK 5 ALLDB.
		//if (document.forms[0].period == null || document.forms[0].period.checked)
		//	isPeriod = true;
		//else 
		//	isPeriod = document.forms[0].period[0].checked;
		
		if (document.forms[0].period == null || document.forms[0].period[0].checked)
		    isPeriod = true;
		else
			isPeriod = false;
		if (isPeriod) {
			var idx = document.forms[0].range.selectedIndex;
			//retval = document.forms[0].range[idx].text;
			retval = document.forms[0].range[idx].value;	//it is now the key of listbox returned instead of its value		
		} else {
			var idx1 = document.forms[0].startYear.selectedIndex;
			var idx2 = document.forms[0].endYear.selectedIndex;
			retval = document.forms[0].startYear[idx1].value + "-" + document.forms[0].endYear[idx2].value;		
		}
	}
	catch(err)
	{ return 'ALL'; }
	return retval;
}

//JUR additions...
function set_checkbox(reqparam) {
  // function to set all checkboxes as marked
  var frm = document.forms[0];
  var checked;
  if (reqparam == 1) {
     checked = true;
  }
  else {
     checked = false;
  }
  for (var c = 0; c < frm.elements.length; c++)
  {
    if (frm.elements[c].type == 'checkbox')
      frm.elements[c].checked = checked;
  }
}

function reset_checkbox() {
  // function to reset the user selection on current page
  var frm = document.forms[0];
  for (var c = 0; c < frm.elements.length; c++)
  {
    if (frm.elements[c].type == 'checkbox') {
      var s = frm.elements[c].value;
      if ((s.substring(0,3)) == '0_0') {
	 frm.elements[c].checked = false;
      }
      else {
	 frm.elements[c].checked = true;
      }
    }
  }
}
