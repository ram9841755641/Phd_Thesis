var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		var i, dataString, dataProp;
		for (i=0;i<data.length;i++)	{
			dataString = data[i].string;
			dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1) {
					return data[i].identity;
				}
			}
			else if (dataProp) {
				return data[i].identity;
			}
		}
		return "";
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) {
			return null;
		}
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};

function debug_alert( message ) {
    //	return alert( message );
}

function MM_preloadImages() { //v3.0
  var d=document;
  if(d.images){
	  if (!d.MM_p) {
      d.MM_p=new Array();
	  }
    var i;
    var j=d.MM_p.length;
    var a=MM_preloadImages.arguments;
  for(i=0; i<a.length; i++) {
    if (a[i].indexOf("#")!=0){
      d.MM_p[j]=new Image(); d.MM_p[j++].src=a[i];
    }
  }
  }
  defineHiddenInput(0, "", null);
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr;
  for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i += 1) {
    x.src=x.oSrc;
  }
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;
  if(!d) d=document;
  if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
  }
  if(!(x=d[n])&&d.all)
    x=d.all[n];
  for (i=0;!x&&i<d.forms.length;i++)
    x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++)
    x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) {
    x=d.getElementById(n);
  }
  return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments;
  document.MM_sr=new Array();
  for (i = 0; i < (a.length - 2); i += 3 ) {
   if ((x=MM_findObj(a[i]))!=null) {
     document.MM_sr[j++]=x;
     if(!x.oSrc)
       x.oSrc=x.src;
       x.src=a[i+2];
   }
  }
}


function moveToPageLocation (locName){
	if (locName != null && locName != "") {
		//alert("Moving to page location: "+locName);
		window.location.hash=locName;
	}
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function confirmLink(warning_txt, url_1, url_2) {

	if (confirm(warning_txt))
		return url_1;
	else
		return url_2;
}

function JavaScriptTest() {
   document.forms[0].JavaScript.value="Yes";
}

function noenter() {
	return !(window.event && (window.event.keyCode == 13));
}

function set_new_window_props() {
    var winprops;

    var win_w = parseInt(screen.width * .85);
    var win_h = parseInt(screen.height * .70);

    winprops = 'height='+ win_h +',width='+ win_w +',top=70,left=60,toolbar=yes,menubar=yes,'+
               'resizable=yes,scrollbars=yes,status=no';

	return winprops;
}

//Open new browser window
// NOTE: This won't work in IE if the winName has spaces in it.
function openBrWindow(theURL,winName,features) {
		if(typeof features !='object'){
			features=set_new_window_props();
		}

//		alert("calling window.open. winName: ("+ winName+")");
		newWindow = window.open(theURL,winName,features);
        newWindow.focus();

        return false;
}

// open a new window. not using openBrWindow because of a quirk.
function open_window (name, url, props) {
  var newwindow;
  var is_safari = navigator.userAgent.indexOf('Safari')>0;

  if (is_safari) {
      newwindow = window.open("", name, props);
      if (newwindow != null) { newwindow.close(); }
  }
//  alert("calling window.open. name: ("+ name+")");
  newwindow = window.open(url, name, props);

  if (window.focus) { newwindow.focus(); }

  return false;
}

// NOTE: This won't work in IE if the winName has spaces in it.
function open_location(theURL,winName,features) {
    if(winName.length){
    	winName=winName.replace(' ','');
    }
//    	alert("calling openBrWindow. winName: ("+ winName+")");
    return openBrWindow(theURL,winName,'');
}


function go_to_url( url ) {
    if(url.length){
    	window.location = url;
    	return true;
    } else {
    	return false;
    }
}

function open_opac(winName) {
    var theURLobject =  document.getElementById('opac');
    var theURL = theURLobject.value;
//    alert("calling openBrWindow. winName: ("+ winName+")");
    return openBrWindow(theURL,winName,'');
}

function open_ncbi(winName, theURL) {
        return openBrWindow(theURL,winName,'');
}

//for Quick Search  from home page
//If textbox has "Enter a topic search" do nothing
//If textbox is empty display "Enter a topic search"
//If textbox has a term , search it
function submit_quicksearch_go() {
   var quicksearch = document.forms[0].qs_topic.value;
   if(quicksearch.length > 0)
   {
      if(quicksearch == "Enter a topic")
      {
         return false;
      }
      else
      {
        return true;
      }
   }
   else
   {
      document.forms[0].qs_topic.value="Enter a topic";
      return false;
   }
}
// ########################################
// ------------ UPWS related  -------------
// ########################################

function winsize() {
  var h, w;
  if (document.all) {
     h = Math.round(document.body.clientHeight * (0.81));
     w = Math.round(document.body.clientWidth);
  } else {
     h = Math.round(document.height * (0.81));
     w = Math.round(document.width);
  }
  document.GeneralSearch_input_form.winh.value = h;
  document.GeneralSearch_input_form.winw.value = w;
}

//------------- summary : go to page -------------
function check_the_input(pg_num, len) {
    var flag = true;
    var val = "1234567890, ";
    for(i = 0; i < len; i++) {
        var letter = pg_num.charAt(i);
        if (val.indexOf(letter) === -1) {
        	flag = false;
        	break;
        }
    }
    return flag;
}

function process_input(pg_num, len) {
    var flag1 = 0;
    var flag2 = 0;
    var num = new String();
    for(i = 0; i < len; i++) {
        var letter = pg_num.charAt(i);
        if(letter == " ") {
            if(flag1 == 1) { flag1 = flag1 + 1; }
        }
        else if(letter == ",") {
            if(flag2 == 1) { flag2 = flag2 + 1; }
        }
        else {
            if(flag1 == 0) { flag1 = 1; }
            else if(flag1 == 2) { flag1 = 0; return false; }
            if(flag2 == 0) { flag2 = 1; }
            else if(flag2 == 3) { flag2 = 0; return false; }
            var num1 = new String(letter);
            num = num.concat(num1);
        }
    }
    return num;
}
function process_page_number(pg_num, max) {
    var len = pg_num.length;
    var error_msg = document.getElementById('pleaseEnterANumberMsg');
    if(!check_the_input(pg_num, len)) {
        alert(error_msg.value);
        return false;
    }
    pg_num = process_input(pg_num, len);
    if(pg_num <= 0) {
        alert(error_msg.value);
        return false;
    }

    return pg_num;
}

function mark_then_navigate( page_input, max ) {

  update_mark_list( 'add' );

  // could use summary_records_form.action instead of null below
  return go_to_page( page_input, max, null );
}

function go_to_page(page_input, max, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect, noAutoSubmit) {
    var pg_num = page_input.value;
    pg_num = process_page_number(pg_num, max);
    if(pg_num > 0) {
        page_input.value = pg_num;
        //always submit the records form instead of the navigation form to save checkboxes, if needed
        var paging_url = document.forms["summary_records_form"].getAttribute("paging_url");
        if (paging_url) {
	    if ( invokeAutoSubmit() ) {
		window.location = paging_url + pg_num;
	    }
	} else {
	    handle_nav( null, pg_num, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect, noAutoSubmit);
        }
    } else {
        page_input.select();
    }
    return false;
}



function confirm_new_session(url) {
	if (confirm('This will clear all your forms and inputs and start a new session. Click OK to continue.\n\n\nNote: To continue with your current session, click "New Search" link.')) {
	   location.href = url + "/new_session";
	}
}

function JQcheck_form_inputs (form, action) {
    if (check_form_inputs(form, action) && jQuery) {
    	$("#searchRunning").show();
    	$("#searchButton").hide();
    	return true;
    }
    else {
    	return false;
    }
}

function setValSaveform (source, target, form) {
    var sourceID = "#" + source;
    var sourceVal = $(sourceID).val();
    var targetID = "#" + target;
    $(targetID).val(sourceVal);
    saveForm(form);
}

function disableSearchButton () {
    if (jQuery) {
    	$(".searchRunning").show();
    	$(".searchButton").hide();
    }
}

function AFdisableSearchButton () {
    var retValue = validateAFNames(true);
	if (jQuery && retValue) {
    	$(".searchRunning").show();
    	$(".searchButton").hide();
    }
	return retValue;
}

function check_form_inputs (form, action) {
	mergeMultiSelects();
	try {
		var search_mode = document.forms[form].elements["search_mode"].value;
		var product_code = document.forms[form].elements["product"].value;
		if (action == null) {
			action = document.forms[form].elements["action"].value;
		}

		if ((search_mode == "GeneralSearch" || search_mode == "UA_GeneralSearch" ||
			search_mode == "AdvancedSearch" || search_mode == "CitedReferenceSearch") && action != "savePreferences" ) {
			var valid_inputs = false;
			var numVals = false;

			if(product_code == "INSPEC" && search_mode == "GeneralSearch") {
				numVals = parse_INSPEC_special_fields(form, action);
			}

			if(!numVals){
				valid_inputs = parse_search_inputs(form);
				//the search should work if only numbers are entered for INSPEC.
				if( !valid_inputs ){
					return false;
				}
			}
		}
		else if(search_mode == "CompoundSearch"){
			var notice = document.getElementById("input_invalid_notice");
			var invalid_input = true;
			for (i=0; i<document.forms[form].elements.length; i++) {
				var e = document.forms[form].elements[i];
				if ( (e.type == "text" || e.type == "textarea") && !(e.name == "formSimilarityMin" ||e.name == "formSimilarityMax")){
					trim_input(e);
					if(e.value.length>0){
						invalid_input = false;
						break;
					}
				}
				if (e.name == "molecule") {
					trim_input(e);
					if (e.value.length>0) {
						invalid_input = false;
						break;
					}
				}
			}
			if(invalid_input){
				if(notice != null)
					show_client_error("errorMessageDiv",notice.value);
				return false;
			}
		}
		else if(search_mode == "CitedPatentSearch" && action != "savePreferences"){
			var notice = document.getElementById("input_invalid_notice");
			var exp_notice = document.getElementById("exp_notice");
			var invalid_input = true;
			var expandFieldID = '';
			var expand = false;
			var wildcard = false;
			for (i=0; i<document.forms[form].elements.length; i++) {
				var e = document.forms[form].elements[i];
				trim_input(e);	
				if(e.value == "CX"){
					expandFieldID = "value(input" + e.id.substr(6,8) + ")";
					expand = true;
					var cx = document.getElementById(expandFieldID);
					if(cx.value.indexOf("*") >= 0 || cx.value.indexOf("?") >= 0){
						wildcard = true;
					}
				}
				if (e.type == "text" || e.type == "textarea") {
					trim_input(e);
					if(e.value.length>0){
						invalid_input = false;
					}
				}
			}
			if(wildcard && expand){
				if(exp_notice != null)
					show_client_error("errorMessageDiv",exp_notice.value);
					return false;
			}
			if(invalid_input){
				if(notice != null)
					show_client_error("errorMessageDiv",notice.value);
				return false;
			}
		} else if(search_mode == "CombineSearches"){
			// We do not need to continue if there are no sets in the search history. (Bug WOKVX-281)
			if (document.forms[form].elements["combineSets"] == null) {
				return false;
			}
		}

		document.forms[form].action.value = action;
	} catch (e) {
		return true;
	}
	if ( typeof WOKTimespan !== "undefined" ) {
	    return WOKTimespan.validateDateRange();
	}
	return true;
}

// This function is used by the radio buttons on the Advanced Search (Edit mode) to set the appropriate form variables.
function set_edit_form_inputs (formName, newAction, newReplaceSetId, newGoToLoc) {
	if (formName != null && newAction != null) {
		if (newAction == "reExecute" && newReplaceSetId == null) {
			newAction = "search";
		}
		if (newAction == "search" || newReplaceSetId == null) {
			newReplaceSetId = "";
		} 
		try {
			var action = document.forms[formName].elements["action"].value;
			document.forms[formName].action.value = newAction;
			var replaceSetId = document.forms[formName].elements["replaceSetId"].value;
			document.forms[formName].replaceSetId.value = newReplaceSetId;
			var goToLoc = document.forms[formName].elements["goToLoc"].value;
			document.forms[formName].goToLoc.value = newGoToLoc;
		} catch (e) {
			return true;
		}
	}
	return true;
}



//Function to parse the search inputs across general search
//Advanced search, cited reference search and all products search
//for invalid inputs(no input or just spaces)
function parse_search_inputs(form){
	var field_count_ele = document.forms[form].elements["fieldCount"];
	var i;
	var valid_inputs = false;
	var multi_select = false;
	var field_count = 0;
	//for Advanced search
	var search_mode = document.forms[form].elements["search_mode"].value;
	if(search_mode == "AdvancedSearch") {
		// For AdvancedSearch input value(input1) is the textarea. Fail the check if no user input there.
		field_count = 1;
	    }
	//For all other searches Including general_search,cited_reference_search, Collections search.
	else{
		field_count = field_count_ele.value;
	}
	try {
		//loop through rows
		for (i=1; i<=field_count; i++) {
			var fieldInput = document.getElementById('value(input' + i + ')');
			if (fieldInput !== null) {
			var fieldType = fieldInput.type;

			if(fieldType == "text" || fieldType == "textarea"  ){
				trim_input(fieldInput);
				//Checking for at least one valid input.
				if(!valid_inputs && fieldInput.value.length != 0)
					valid_inputs = true;
			}
			else if(fieldType == "select-multiple"){
				multi_select = true;
			}
			}
		}
	} catch (e) {
	 ;
	}
	var notice = document.getElementById("input_invalid_notice").value;
	var notice_limits = document.getElementById("input_invalid_notice_limits").value;
	var combinedNotice = notice + notice_limits;
	if(!valid_inputs && multi_select) {
	    
		show_client_error("errorMessageDiv", notice + notice_limits);
	}
	else if(!valid_inputs) {
		show_client_error("errorMessageDiv", combinedNotice);
	}
	return valid_inputs;
}

function parse_INSPEC_special_fields (form, action) {

	var field_count = document.forms[form].elements["fieldCount"].value;
	var tbl = document.getElementById('search_table');
	var i;
	var numVals=false;

	//loop through rows
	for (i=1; i<=field_count; i++) {
		var trow = document.getElementById('searchrow' + i);

		var values = "";
		var fieldSelect = document.getElementById('select' + i);
		var idx = fieldSelect.selectedIndex;
  		var id = fieldSelect.options[idx].id;
  		var val_selected = fieldSelect.value;

		//handle special parsing for numqty and chemical searches
		if(id.match("NQ_")) {
			values = parse_INSPEC_numqty_double_inputs(form, i);
		} else if (val_selected.match("CH")) {
			parse_INSPEC_chemical_input(form, i, id);
		}

		//for numqty, get the generic hidden, value(inputX),
		//clone it, change the id and name to match the row number
		//paste the new appended value inside and append the new input clone to that row

		if(values != "" && values != " ") {
			var inputX = document.getElementById('value(inputX)');
			var inputX_clone = inputX.cloneNode(true);
			inputX_clone.id = ('value(input' + i + ')');
			inputX_clone.name = ('value(input' + i + ')');
			inputX_clone.value = values;
			trow.appendChild(inputX_clone);
			numVals = true;
		}
	}
	return numVals;
}

function parse_INSPEC_numqty_double_inputs (form, rowIndex) {

	//Find the two inputs, if they have values, paste them together with a space between.
	// If only mininum value exist, put "GTE " bofore the value.
	// If only maximum value exist, put "LTE " bofore the value.
	var values = "";
	var minValue = "";
	var maxValue = "";
	var haveMinValue=false;
	var haveMaxValue=false;

	var numqty_el_1 = document.getElementById('value(double_input_1_row' + rowIndex + ')');
	trim_input(numqty_el_1);
	if(numqty_el_1 != null && numqty_el_1.value != "") {
		minValue = numqty_el_1.value;
		haveMinValue=true;
	}

	var numqty_el_2 = document.getElementById('value(double_input_2_row' + rowIndex + ')');
	trim_input(numqty_el_2);
	if(numqty_el_2 != null && numqty_el_2.value != "") {
		maxValue = numqty_el_2.value;
		haveMaxValue=true;
	}

	if ( haveMinValue==true && haveMaxValue==true) {
		values = minValue + " " + maxValue;
	}
	else if (haveMinValue==true){
		    values = "GTE " + minValue;
	}
	else if (haveMaxValue==true) {
		    values = "LTE " + maxValue;
	}

	return values;

}//end function parse_INSPEC_numqty_double_inputs

function change_select(select, selectValue )
{
//debug_alert("fn change_select is called. selectValue= "+ selectValue);
//debug_alert("get selection: "+select.length);
	var match=0;

	if (select != null) {
		for (i=0; i<select.length; i++) {
			if (select.options[i].value==selectValue) {
				select.options[i].selected = true;
				match=1;
				break;
			}
		}
	}
//debug_alert("match value is "+ match);
	return match;
}

function parse_INSPEC_chemical_input (form, rowIndex, id) {
	var values = "";

	//Get the user input and the role (from the select option id).
	//Put these two together with a backslash between into the input value.
	var chem_input = document.getElementById('value(input' + rowIndex + ')');
	if(chem_input.value != "") {
		var chem_role_array = new Array();
    	chem_role_array = id.split("_");
    	var selected_chem_role = chem_role_array[0];
    	if(selected_chem_role == "all") { return; }

    	if(!chem_input.value.match("/")){
    		 chem_input.value = chem_input.value + "/" + selected_chem_role;
    	}
    }
    return true;

}//end function parse_INSPEC_chemical_input

// ------ on Search Input page: -----
// -- automatically control selection of the radio buttons for year/week select boxes --

function select_week_button(idx) {
  if (! idx.length) idx = 0;

  document.GeneralSearch_input_form.period[idx].checked = true;
  return true;
}

function select_year_range_button(idx) {
  if (! idx.length) idx = 1;

  document.GeneralSearch_input_form.period[idx].checked = true;
  return true;
}

var CitedReferenceSearch = {

  popup_error_message: function () {
    if ( $('#searchErrorMessage #client_error_input_message').text() == getMessageById('citedReferenceSearchTooManySelections') ) {
      $('#searchErrorMessage').fadeOut();
      this.display_too_many_selections_message();
      return false;
    }
  },

  clear_all: function () {
    this.selectedCitedRecsSize = 0;
  },

  display_too_many_selections_message: function () {
    alert(getMessageById('citedReferenceSearchTooManySelections'));
  },

  finish_search: function (opts) {
	var checked = opts.checked;
    if ( null == checked ) {
      checked = true;
    }
    // 1-or-more-pages-beyond limit check (501st record check)
    var pageNumber = opts.pageNumber;
    if ( isNaN(pageNumber) || "NaN" == pageNumber ) {
      pageNumber = 1;
    }
    var pageSize = opts.pageSize;
    if ( isNaN(pageSize) || "NaN" == pageSize ) {
      pageSize = 50; // There should be a better fallback than this....
    }
    var firstRecordOfPage = ( pageNumber - 1 ) * pageSize + 1;
    var checkedCheckboxes = checked
      ? $("input:checked[name='" + opts.id + "']")
      : $("input[name='"         + opts.id + "']").not(":checked");
    
    if ( null == this.selectedCitedRecsSize ) {
      this.selectedCitedRecsSize = 0;
    }
    var CurrentPageSelection = checkedCheckboxes.length > 0? checkedCheckboxes.length : 0;

    var currentPageAlreadySelected = 0;
    var hiddenCount = document.getElementById( opts.currentPageAlreadySelected );
	if(hiddenCount != null){
		trim_input(hiddenCount);
		currentPageAlreadySelected = hiddenCount.value;
	}
	if (currentPageAlreadySelected == null) {
		currentPageAlreadySelected = 0;
	}
	
    if (this.selectedCitedRecsSize - currentPageAlreadySelected + CurrentPageSelection > opts.maxSelectedCitedRecs) {
      //alert("this.selectedCitedRecsSize=" + this.selectedCitedRecsSize + " firstRecordOfPage=" + firstRecordOfPage + " opts.maxSelectedCitedRecs=" + opts.maxSelectedCitedRecs + " checkedCheckboxes.length=" + checkedCheckboxes.length);
      this.display_too_many_selections_message();
      return false;
    }

	if ( ! this.too_many_selections(opts) ) {
      if ( invokeAutoSubmit() )
    	var retValue = submit_summary_form(opts.formAction, opts.id, opts.searchMode);
    	if (retValue == true) {
    		disableSearchButton();
    	}      
	    return retValue; 
    }
    return false;
  },
  
  check_mark_then_navigate: function (opts) {
		var checked = opts.checked;
	    if ( null == checked ) {
	      checked = true;
	    }
	    // 1-or-more-pages-beyond limit check (501st record check)
	    var pageNumber = opts.pageNumber;
	    if ( isNaN(pageNumber) || "NaN" == pageNumber ) {
	      pageNumber = 1;
	    }
	    var checkedCheckboxes = checked
	      ? $("input:checked[name='" + opts.id + "']")
	      : $("input[name='"         + opts.id + "']").not(":checked");
	    
	    if ( null == this.selectedCitedRecsSize ) {
	      this.selectedCitedRecsSize = 0;
	    }
	    var CurrentPageSelection = checkedCheckboxes.length > 0? checkedCheckboxes.length : 0;

	    var currentPageAlreadySelected = 0;
	    var hiddenCount = document.getElementById( opts.currentPageAlreadySelected );
		if(hiddenCount != null){
			trim_input(hiddenCount);
			currentPageAlreadySelected = hiddenCount.value;
		}
		if (currentPageAlreadySelected == null) {
			currentPageAlreadySelected = 0;
		}
		
	    if (this.selectedCitedRecsSize - currentPageAlreadySelected + CurrentPageSelection > opts.maxSelectedCitedRecs) {
	      //alert("this.selectedCitedRecsSize=" + this.selectedCitedRecsSize + " opts.maxSelectedCitedRecs=" + opts.maxSelectedCitedRecs + " currentPageAlreadySelected=" + currentPageAlreadySelected + " checkedCheckboxes.length=" + checkedCheckboxes.length);
	      this.display_too_many_selections_message();
	      return false;
	    }
	    else {
	    	this.selectedCitedRecsSize = this.selectedCitedRecsSize - currentPageAlreadySelected + CurrentPageSelection;
	    }

		if ( ! this.too_many_selections(opts) ) {
			mark_then_navigate(opts.pageNumber, opts.total_pages_num); 
	    }
	    return false;
  },

  select_all: function (opts) {
    var checked = opts.checked;
    if ( null == checked ) {
      checked = true;
    }
    // 1-or-more-pages-beyond limit check (501st record check)
    var pageNumber = opts.pageNumber;
    if ( isNaN(pageNumber) || "NaN" == pageNumber ) {
      pageNumber = 1;
    }
    var pageSize = opts.pageSize;
    if ( isNaN(pageSize) || "NaN" == pageSize ) {
      pageSize = 50; // There should be a better fallback than this....
    }
    var firstRecordOfPage = ( pageNumber - 1 ) * pageSize + 1;
    var checkedCheckboxes = checked
      ? $("input:checked[name='" + opts.id + "']")
      : $("input[name='"         + opts.id + "']").not(":checked");
    if ( firstRecordOfPage > opts.maxSelectedCitedRecs && checkedCheckboxes.length > 0 ) {
      this.display_too_many_selections_message();
      return false;
    }
	// General limit check
    var remainder = opts.maxSelectedCitedRecs - this.selectedCitedRecsSize;
    if ( isNaN(remainder) || "NaN" == remainder ) {
      remainder = opts.maxSelectedCitedRecs;
    }
    if ( remainder <= 0 ) {
      if ( remainder < 0 ) {
    	this.display_too_many_selections_message();
      }
      return false; // max number of records already legitimately selected
    }
    var pagingAction = opts.pagingActionPrefix + opts.maxSelectedCitedRecs; // this value is ignored by the FW
    handle_nav_no_auto_submit(opts.summaryNavForm, opts.pageNumber, pagingAction);
  },

  select_page: function (opts) {
    var checked = opts.checked;
    if ( null == checked ) {
      checked = true;
    }
    var uncheckedCheckboxes = checked
      ? $("input[name='"         + opts.id + "']").not(":checked")
      : $("input:checked[name='" + opts.id + "']");
    var uncheckedLength = uncheckedCheckboxes.length;
    var checkOrUncheck  = checked ? 1 : -1;
    var selectionLength = uncheckedLength * checkOrUncheck + this.selectedCitedRecsSize;
    if ( this.too_many_selections(opts, selectionLength) ) {
      return false;
    }
    for ( var i in uncheckedCheckboxes ) {
      if ( null != uncheckedCheckboxes[i] && null != uncheckedCheckboxes[i].id ) {
        uncheckedCheckboxes[i].checked = checked;
        this.update_selected_cited_recs_size(checked);
      }
    }
    
    // Already added to total. So update currentPageAlreadySelected
    var currentPageAlreadySelected = 0;
    var hiddenCount = document.getElementById( "currentPageAlreadySelected" );
	if(hiddenCount != null){
		trim_input(hiddenCount);
		currentPageAlreadySelected = hiddenCount.value;
		hiddenCount.value = currentPageAlreadySelected + selectionLength;
	}
	
    return false;
  },

  too_many_selections: function (opts, selectionLength) {
    if ( null == selectionLength ) {
      selectionLength = this.selectedCitedRecsSize;
    }
    if ( selectionLength > opts.maxSelectedCitedRecs ) {
      this.display_too_many_selections_message();
      return true;
    }
    return false;
  },

  update_selected_cited_recs_size: function (checked) {
    if ( null == this.selectedCitedRecsSize ) {
      this.selectedCitedRecsSize = 0;
    }
    this.selectedCitedRecsSize   += checked ? 1 : -1;
  }

}

function do_all_named_checkboxes( form, id, checked ) {

  var found = false;

  if ( form ) {

    var value = checked
//debug_alert('value is '+(value == false ? 'false' : 'true'));
    var i;

    for (i=0; i<form.elements.length; i++) {
      var e = form.elements[i];
      if (e.tagName == "INPUT" && e.type == "checkbox" &&
	  e.name == id) {
			e.checked = value;
			found = true;
      }
    }
    if(!checked){
    	var selectedRecsObj=form.selectedRecs;
    	//don't assume that "selectedRecs" is there for all pages
    	if(selectedRecsObj !=null){
    		form.selectedRecs.value=0;
    	}
    }
  }

  return found;
}

function select_named_checkboxes( list ) {

  var found = false;

  if ( typeof( list ) == 'object' ) {

    for (i=0; i<list.length; i++) {
      var e = document.getElementById( list[i] );
      if (e && e.tagName == "INPUT" && e.type == "checkbox") {

	e.checked = true;
      }
    }
  }

  return found;
}

function confirm_message(id){
	var errorMessage = getMessageById(id);
	return confirm(errorMessage);
}

function check_summary_records_form_inputs(id) {
	var f = document.summary_records_form;

	var i;
	var hasInput = false;

	for (i=0; i<f.elements.length; i++) {
		var e = f.elements[i];
		if (e.tagName == "INPUT" && e.type == "checkbox" &&
			e.name == id && e.checked)
		{
			hasInput = true;
			break;
		}
	}

	if(!hasInput){
		try{
			var selRecs = f.selectedRecs.value;
			if(selRecs>0){
				hasInput=true;
			}
		}catch(e){
			;
		}
	}

	if (!hasInput) {
		var errorMessage = getMessageById('quickOutputSelectAtLeastOneCheckbox');
		alert(errorMessage);
	}
	return hasInput;
}

function set_refine_or_exclude (form_name, refSwitch) {
	if(form_name == null){
		return false;
	}

	try
	{
		var f = document.forms[form_name];
		var excludeElement=document.forms[form_name].elements["exclude"];

		if(excludeElement != null) {
			if (refSwitch == 'exclude') {
				excludeElement.value = "exclude";
			} else {
				excludeElement.value = "";
			}
		}
		return true;		
	}
	catch (error)
	{
		return false;
	}

}

function check_refine_inputs(form1, form2) {
//debug_alert("call check_refine_inputs");
	var hasInput = check_refine_form(form1);
	if( !hasInput){
		hasInput = check_refine_form(form2);
	}

	if (!hasInput) {
		var errorMessage = document.getElementById('refineSelectAtLeastOneCheckbox').value;
		alert(errorMessage);
	}else{
		merge_input_forms(form1,form2);
	        if ( ! invokeAutoSubmit() )
			hasInput = false;
	}

	return hasInput;
}

function check_refine_form(form_name) {
	if(form_name == null){
		return false;
	}

	var f = document.forms[form_name];

	var i;
	var hasInput = false;

	var swsElement=document.getElementById('sws');
	if(swsElement !=null){
		trim_input(swsElement);
		var swsVal=swsElement.value;
		if(swsVal.length >0){
			return true;
	 	}
	}

	if(! hasInput){
		var refineSelectionElements=document.getElementsByName('refineSelection');
		if(refineSelectionElements !=null){
			for (i=0; i< refineSelectionElements.length; i++){
				var refineSelectionElement=refineSelectionElements[i];
				if(refineSelectionElement.checked){
					return true;

					break;
				}
			}
		}
	}

	return false;
}

function merge_input_forms(form1, form2) {
//debug_alert("We are going to merge forms "+form1+" and "+form2);
	if(form1 == null){
		return;
	}

	if(form2 == null){
		return;
	}

	var f1 = document.forms[form1];
	if(f1 == null){
//debug_alert (form1 +" is null");
		return;
	}

	var f2 = document.forms[form2];
	if(f2 == null){
//debug_alert (form2 +" is null");

		return;
	}

	var f2ElementsNum=f2.elements.length;

	var i;

	var wrappingDiv=document.createElement("wrappingDiv");
	wrappingDiv.style.visibility="hidden";
	f1.appendChild(wrappingDiv);

	for (i=0; i<f2ElementsNum; i++) {
		var e =f2.elements[i];

		var tagName=e.tagName;
		var type=e.type;
		var name=e.name;
		var value=e.value;

		var newE=e.cloneNode(true);
		wrappingDiv.appendChild(newE);

		if(type == "checkbox"){
			var checked=e.checked;

			var total=f1.elements.length;
			f1.elements[total-1].checked=e.checked;
		}

		var brE=document.createElement("br");
		wrappingDiv.appendChild(brE);
	}
}

function click_ra_more(){
    autoSubmitMarkedList();
  var clickRaMoreMsg = document.getElementById('clickRaMore').value;

  var hasInput=check_refine_form("refine_form");
  if(! hasInput){
	  hasInput=check_refine_form("refine_more_form");
  }

  if(hasInput){
	  return confirm(clickRaMoreMsg);
  }

  return true;
}

function addTextWithExtras(text_field_default_extras, iteration)
{
	try {

  		//add "extras" (so far only MEDLINE does this and it is for a radio group)
  		var extras = document.getElementById(text_field_default_extras);
  		var extrasclone = extras.cloneNode(true);
  		extrasclone.id = 'RadsNChecksContainer' + iteration;
  		return extrasclone;

	} catch (e) {
  	;
 	}
	return null;
}

function addSearchRow(config, imgpath, text_field_default_extras)
{
 try {
  var fcount = document.getElementById('fieldCount');
  var maxcount = document.getElementById('max_field_count');
  var notice = document.getElementById('max_field_notice').value;

  //limit the number of rows added
  if((parseInt(fcount.value) + 1) > (parseInt(maxcount.value))){
     alert(notice);
  	return false;
  }

  var tbl = document.getElementById('search_table');
  var lastRow = tbl.rows.length;
  var iteration = lastRow-1;

  var row = tbl.insertRow(iteration);
  row.id = 'searchrow' + iteration;

  //add the boolean operator
  var cell0 = row.insertCell(0);
  //cell0.align = "center";
  //cell0.vAlign = "top";
  //cell0.noWrap = "nowrap";
  cell0.className = "NEWsearchFormBoolean"
  var bool = document.getElementById('value(bool_1_2)');
  var boolclone = bool.cloneNode(true);
  boolclone.name= 'value(bool_' + (iteration-1) + '_' + (iteration) + ')';
  boolclone.id= 'value(bool_' + (iteration-1) + '_' + (iteration) + ')';
  boolclone.value ="AND";
  cell0.appendChild(boolclone);

  //add the text input
  var cell1 = row.insertCell(1);
  cell1.vAlign = "top";
  cell1.className = "NEWsearchFormEntry"
  var elcontainer = document.createElement('div');
  elcontainer.id = 'container(input' + iteration + ')';
  var el = document.getElementById('text_field_default');
  var elclone = el.cloneNode(true);
  elclone.name = 'value(input' + iteration + ')';
  elclone.id = 'value(input' + iteration + ')';
  elclone.value = "";
  elcontainer.appendChild(elclone);

  //so far, this is used for MEDLINE radio and checkbox groups, but could be used for other elements
  //in this location.
  if(text_field_default_extras != null && text_field_default_extras.length > 0) {
  	var extra_text_element = addTextWithExtras(text_field_default_extras, iteration);
  }

  //add the appropriate example text
  var example = document.getElementById('TS_example');
  var exampleclone = example.cloneNode(true);
  exampleclone.id = "example" + iteration;

  cell1.appendChild(elcontainer);
  if(extra_text_element != null) {
  	cell1.appendChild(extra_text_element);
  }
  cell1.appendChild(exampleclone);

  //add the explanatory "in" text
  var cell2 = row.insertCell(2);
  //cell2.vAlign = "top";
  //cell2.noWrap = "nowrap";
  cell2.className = "NEWsearchFormField"


  var inText = document.getElementById('in1');
  var inclone = inText.cloneNode(true);
  inclone.id = 'in' + iteration;
  cell2.appendChild(inclone);

  //add the field select dropdown
  var foo = document.getElementById('select1');
  var sa_txt = document.getElementById('sa_img_alt').value;
  var clonesel;

  //make IE happy since it cannot clone 'select's correctly
  if (navigator.appVersion.indexOf("MSIE")!=-1) {
    var ohtml          = foo.outerHTML.replace(/select1/g, "select" + iteration );
    clonesel           = document.createElement(ohtml);
  } else {
    clonesel           = foo.cloneNode(true);
  clonesel.name = 'value(select' + iteration + ')';
  clonesel.id = 'select' + iteration;
  }
  //default back to 'Topic' for all browsers
  var ihtml          = foo.innerHTML.replace(/selected/, "");
  // IE7 breaks w/o the non-breaking spaces below
  clonesel.innerHTML = "&nbsp;&nbsp;" + ihtml;
  cell2.innerHTML += "&nbsp;";
  cell2.appendChild(clonesel);
  cell2.innerHTML += "&nbsp;&nbsp;&nbsp;";

  // Safari 1.3 and 2.x set the name wrong after it is appended to cell2
  var foo2 = document.getElementById('select'+iteration);
  foo2.name = 'value(select' + iteration + ')';

  // alert('cloned select: '+clonesel.name+';'+clonesel.id+';'+clonesel.innerHTML);

  var cell3 = row.insertCell(3);
  cell3.vAlign = "top";
  cell3.align = "left";
  cell3.width = "1%";
  var saicon = document.getElementById('saicon1');
  var cloneimg;
  cloneimg = saicon.cloneNode(true);
  cloneimg.name = 'saicon' + iteration;
  cloneimg.id = 'saicon' + iteration;
  //always test with topic code: TS
  var isTopicSA = isActivateSA("TS", config);
  if (isTopicSA != '') {
    cloneimg.src = imgpath + "/sa_icon.gif";
	cloneimg.width = 18;
	cloneimg.title = sa_txt;
	cloneimg.className = "NEWsaIcon";
  } else {
	cloneimg.src = imgpath + "/spacer.gif";
	cloneimg.width = 0;
	cloneimg.title = null;
	cloneimg.className = "NEWsaIcon-hidden";
  }
  cell3.appendChild(cloneimg);

  var cell4 = row.insertCell(4);
  var sahid1 = document.getElementById('value(hidInput1)');
  var sahid2 = document.getElementById('value(hidShowIcon1)');
  var clonehid0, clonehid1, clonehid2;
  clonehid1 = sahid1.cloneNode(true);
  clonehid2 = sahid2.cloneNode(true);
  clonehid1.name = 'value(hidInput' + iteration + ')';
  clonehid1.id = 'value(hidInput' + iteration + ')';
  clonehid2.name = 'value(hidShowIcon' + iteration + ')';
  clonehid2.id = 'value(hidShowIcon' + iteration + ')';
  clonehid1.value = isTopicSA;
  if (isTopicSA != '') {
	clonehid2.value = "1";
  } else {
	clonehid2.value = "0";
  }
  cell4.appendChild(clonehid1);
  cell4.appendChild(clonehid2);

  fcount.value = parseInt(fcount.value) + 1;
 } catch (e) {
  ;
 }
 return null;
}

function searchFieldChanged(fieldselect,imgpath,config)
{
  try {
  	var fieldnum = (fieldselect.id).substring(6);
  	var input_element = document.getElementById("value(input" + fieldnum + ")");

  	//handle search limits
  	var idx = fieldselect.selectedIndex;
  	var id = fieldselect.options[idx].id;
	var val = fieldselect.value;
	var switch_element_id = "";

	if(id == val + "_" + "search_limit") {
		switch_element_id = val + "Drop";
		swapSearchElements(fieldnum, val, switch_element_id, null);
	} else if (id.match("double_inputs")) {
		switch_element_id = "double_input";
		swapSearchElements(fieldnum, val, switch_element_id, null);
	} else if (id.match("radio_group")) {
		//special additions for MEDLINE. Other prods may have something similar in the future.
		switch_element_id = val + "Radios";
		swapSearchElements(fieldnum, val, switch_element_id, null);
	} else if (id.match("checkbox_group")) {
		//special additions for MEDLINE. Other prods may have something similar in the future.
		switch_element_id = val + "Checks";
		swapSearchElements(fieldnum, val, switch_element_id, null);
	} else {
		if(input_element != null) {

			if ( (input_element.type == "select-multiple") || (input_element.type == "select-one")) {
				switch_element_id = "text_field_default";
				swapSearchElements(fieldnum, val, switch_element_id, null);
			}
		} else {
				switch_element_id = "text_field_default";
				swapSearchElements(fieldnum, val, switch_element_id, null);
		}
	}

	//special checks and radios for MEDLINE. Other products may use them later.
	//Always clear out the container for these if we are switching to a search field or a limit or
	//anything other than a check or radio group.
	if( (!switch_element_id.match("Checks")) && (!switch_element_id.match("Radios")) ) {
		var special_group_container = document.getElementById("RadsNChecksContainer" + fieldnum);
		if(special_group_container != null) {
			special_group_container.innerHTML = "";
		}
	}

    swapExample(val, fieldnum);

	defineHiddenInput(fieldnum,imgpath, config);
  } catch (e) {
   ;
  }
}

function swapExample(field_name, fieldnum)
{
//debug_alert("fn swapExample is called.");
	var newexample = document.getElementById(field_name + "_example");
	var oldexample = document.getElementById("example" + fieldnum);
	if(field_name=="CW")
	{

		var divtext=document.getElementById('newdiv');
		oldexample.innerHTML = newexample.innerHTML+divtext.innerHTML;

	} else
	{
		oldexample.innerHTML = newexample.innerHTML;
	}

}

function swapSearchElements(rownum, val, switch_element_id, selected)
{
	if(switch_element_id.match("double_input")) {
		//special handling here
		swapWithDoubleInputs(rownum, switch_element_id, "", "");
		return false;
	}

	if( (switch_element_id.match("Radios")) || (switch_element_id.match("Checks")) ) {
		//special handling here
		addRadsNChecksGroup(rownum, switch_element_id, "", "");
		//after adding the radio or check element, we must also swap the input container
		switch_element_id = "text_field_default";
	}

	var sf_drop_hidden = document.getElementById(switch_element_id);
	var sf_drop_clone = sf_drop_hidden.cloneNode(true);
	sf_drop_clone.name = "value(input" + rownum + ")";
	sf_drop_clone.id = "value(input" + rownum + ")";
	//alert("sf drop clone id: " + sf_drop_clone.id);

	// Get IE to select the first value in a limits select box
	if((selected == null) && (switch_element_id.match(val + "Drop"))) {
		sf_drop_clone.selectedIndex = 0;
	// If we have a selected value (or a comma separated list), reselect it/them
	} else if (selected != null) {
		selectMultiSelects(sf_drop_clone, selected);
	}

	var input_container = document.getElementById("container(input" + rownum + ")");
	input_container.innerHTML = "";
	input_container.appendChild(sf_drop_clone);

	return true;
}

function swapWithDoubleInputs(rownum, switch_element_id, input1, input2)
{
//debug_alert("fn swapWithDoubleInputs is called.");
	var sf_doubles_hidden_1 = document.getElementById(switch_element_id + "_" + 1);
	var sf_doubles_clone_1 = sf_doubles_hidden_1.cloneNode(true);
	sf_doubles_clone_1.name = "value(" + switch_element_id + "_" + 1 + "_row" + rownum + ")";
	sf_doubles_clone_1.id = "value(" + switch_element_id + "_" + 1 + "_row" + rownum + ")";
  	sf_doubles_clone_1.value=input1;

  	var toText = document.getElementById('to_el');
  	var to_el_clone = toText.cloneNode(true);
  	to_el_clone.id = 'to_el' + rownum;

	var sf_doubles_hidden_2 = document.getElementById(switch_element_id + "_" + 2);
	var sf_doubles_clone_2 = sf_doubles_hidden_2.cloneNode(true);
	sf_doubles_clone_2.name = "value(" +  switch_element_id + "_" + 2 + "_row" + rownum + ")";
	sf_doubles_clone_2.id = "value(" + switch_element_id + "_" + 2 + "_row" + rownum + ")";
	sf_doubles_clone_2.value=input2;

	var input_container = document.getElementById("container(input" + rownum + ")");
	input_container.innerHTML = "";
	input_container.appendChild(sf_doubles_clone_1);
	input_container.appendChild(to_el_clone);
	input_container.appendChild(sf_doubles_clone_2);
}


//new func for MEDLINE. New addition to the General Search for mesh mapping
//This func adds this control to the page following the same paradigm as above functions:
//copy from a hidden control on the page and paste in the proper location after renaming for the row number.
function addRadsNChecksGroup(rownum, switch_element_id, input1, input2)
{
	var radsNchecks_hidden = document.getElementById(switch_element_id);
	var radsNchecks_clone = radsNchecks_hidden.cloneNode(true);
	radsNchecks_clone.id = switch_element_id + rownum;

	var radsNchecks_container = document.getElementById("RadsNChecksContainer" + rownum);
	radsNchecks_container.innerHTML = "";
	radsNchecks_container.innerHTML = radsNchecks_clone.innerHTML;
}

function toggle_limit_settings(value)
{
  try {
     if (value=="show") {
          document.getElementById('showLimits').style.display = "block";
          document.getElementById('currentSettings').style.display = "none";
	      document.getElementById('hideLimitsLabel').style.display = "block";
          document.getElementById('changeLimitsLabel').style.display = "none";
          document.getElementById('limitStatus').value = 'expanded';
     }
     else {
          document.getElementById('showLimits').style.display = "none";
          document.getElementById('currentSettings').style.display = "block";
          document.getElementById('hideLimitsLabel').style.display = "none";
          document.getElementById('changeLimitsLabel').style.display = "block";
		  document.getElementById('limitStatus').value = 'collapsed';
     }
   } catch (e) {
     ;
   }
}

function more_hide(id)
{
	el = document.getElementById(id);
	if (el.style.display == 'none')
	{
		el.style.display = '';
		el = document.getElementById('more'+id);
		el.innerHTML = '[hide]';
	} else {
		el.style.display = 'none';
		el = document.getElementById('more'+id);
		el.innerHTML = '[more]';
	}
}

function toggleRefineResultsPanel(showSrc, hideSrc, showClass, hideClass,
                                  alt_text_hide, alt_text_show,
				  title_text_hide, title_text_show) {

	var field = 'refine_panel';
	var td_name = 'summary_left_td';
	var tr  = document.getElementById(field);
	var td  = document.getElementById(td_name);
	var img = document.getElementById(field + "_img");


	if (tr.style.display == 'none') {
		img.src = showSrc;
		img.alt = alt_text_hide;
		img.title = title_text_hide;
		tr.style.display = '';
		if ( td && showClass != null ) {
			td.className=showClass;
		}
		ra_showRefinePanel(field);
	} else {
		img.src = hideSrc;
		img.alt = alt_text_show;
		img.title = title_text_show;
		tr.style.display = 'none';
		if ( td && hideClass != null ) {
			td.className=hideClass;
		}
		ra_hideRefinePanel(field);
	}

}

function check_all(list) {

    if(typeof list != 'object') {
        return false;
    }

    var len = list.length;

    if (typeof len == 'undefined') {
        list.checked = true;
        return false;
    }

    for(i = 0; i < len; i++) {
        list[i].checked = true;
    }
    return false;
}


//initial use is for deleting search history sets.
//could be used for other situations of this kind.
function list_selected_checks (list) {
	if(typeof list != 'object') {
        return false;
    }

    var len = list.length;
    var selectedSets = new Array();

    if (typeof len == 'undefined') {
        len = 1;
    }

    for(i = 0; i < len; i++) {
        if(list[i].checked == true) {
        	selectedSets.push(list[i].value);
        }
    }

    return selectedSets;
}

function toggleDAISCheckboxInputs( elemId ) {
	
	var field = document.getElementsByName('selectedId');
	if (document.getElementById(elemId).checked == 1) {
		
		for (i = 0; i < field.length; i++) {
			field[i].checked = true ;
		}
		
	} else {

		for (i = 0; i < field.length; i++) {
			field[i].checked = false ;
		}
	}
}


function verifyDAISRecordCount( currentRecordCount, elemId) {

	var authorUTCountElement = document.getElementById("AuthorUTCount");
	var existingRecordCount = authorUTCountElement.value;
	
	if (existingRecordCount.length == 0) {
		existingRecordCount = 0;
	}
	
	var selectedCheckBox = document.getElementById(elemId);
	var noOfSelectedUTs = 0;

	if (selectedCheckBox.checked) {

		noOfSelectedUTs = eval(existingRecordCount) + currentRecordCount

	} else {

		noOfSelectedUTs = eval(existingRecordCount) - currentRecordCount

	} 
	
	if (noOfSelectedUTs < 0 ) {
		noOfSelectedUTs = 0
	}
	
	authorUTCountElement.value = noOfSelectedUTs;
}


function submit_form( form ) {
  // if ( form )  {
//debug_alert('gotta form');
  //   form.submit();
  // }
  // else {
  //for( var i=0;i<document.forms["summary_records_form"].elements.length;i++){
  	//if(document.forms["summary_records_form"].elements[i].type == 'hidden')
	  //	alert(document.forms["summary_records_form"].elements[i].name+": "+
  		//		document.forms["summary_records_form"].elements[i].value);
  //}
  document.forms["summary_records_form"].submit();
  // }
  return true;
}

//Added this new function for the Data correction form updates fo Wok 5.3
function submit_corrections_form(form, url ) {
 var form = document.forms['correction_form'];
 form.setAttribute("target", "DataCorrectionForm");

 window.open('', 'DataCorrectionForm', '');
 form.submit();
  return true;
}

function submit_summary_form( form_action, id, search_mode, doAutoSubmit ) {

  var checked = true;
  if ( id && id.length > 0 ) {
      checked = check_summary_records_form_inputs( id );
//debug_alert("got back checked="+checked);
  }

  if ( checked == true && doAutoSubmit )
	  checked = invokeAutoSubmit();

  if ( checked == true ) {
      // form containing summary recs
      var summary_records_form = document.forms["summary_records_form"];

//debug_alert("got a form? "+(summary_records_form?"yes":"no"));

    if ( search_mode && search_mode.length > 0 ) {
	  summary_records_form.elements["search_mode"].value = search_mode;
    }
      // NOTE: this will fail on IE if a form element named "action" exists
      //   quick fix: remove the form element & add ?action=xxx to the
      //              form action string
      //document.forms["summary_records_form"].action = form_action;
      summary_records_form.action = form_action;

//debug_alert("set form action: "+ summary_records_form.getAttribute("action"));
  }
//debug_alert("returning with "+checked);

  if ( checked == true ) {
      if ( checked == true )
	  mergeMultiSelects();
  }

  return checked;
}

function get_url_components( form ) {
  var qid_src = form.elements["qid"];
  if ( qid_src == null ) {
    qid_src = form.elements["parentQid"];
  }
  var qid = qid_src.value;
  var sid = form.SID.value;
  var product = form.product.value;
  var mode = form.search_mode.value;

  var parms = "qid="  + qid + "&SID=" + sid + "&product=" + product +
    "&search_mode=" + mode;

  return parms;
}

function submit_go_to_page(page_input, max, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect) {
    var pg_num = page_input.value;
    pg_num = process_page_number(pg_num, max);
    if(pg_num > 0) {
        page_input.value = pg_num;
        //always submit the records form instead of the navigation form to save checkboxes, if needed
		submit_handle_nav( null, pg_num, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect);
    }
    else {
        page_input.select();
    }
	return false;
}

function submit_handle_nav(summary_nav_form, page_number, paging_action, browserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizeSelect) {
//debug_alert('in submit_handle_nav');
	mergeMultiSelects();

//debug_alert('did merging');
	// form containing summary recs
	var summary_records_form = document.forms["summary_records_form"];

	if ( summary_nav_form ) {
	  var page_element = summary_nav_form.elements.page;
	  page_element.value = page_number;
//debug_alert('got form & set page '+page_number);
	}

	//save the page element from the navigation form into the results form as a hidden value.
	//change the action to something that will handle navigation
	//submit the results form instead of the nav form that called this method.
	//this is done so that elements on the results, such as checkboxes can be retained and used.
	document.forms["summary_records_form"].elements["page"].value = page_number;
//debug_alert('we just set page.value to '+page_number);
//debug_alert('and it is '+document.forms["summary_records_form"].elements["page"].value );
	if ( paging_action && paging_action.length > 0 ) {
//05_28_08	  document.forms["summary_records_form"].action = paging_action;
		document.forms["summary_records_form"].setAttribute("action",paging_action);
//		if (action_att)
//		{
//debug_alert('action att obtained ' + action_att);
//		action_att.value=paging_action;
//		}

//debug_alert('set paging action '+paging_action);
	} else {
	  document.forms["summary_records_form"].elements["redirect_url"].value =
		document.forms["summary_records_form"].getAttribute("paging_url") +
		page_number;
//debug_alert('setting redirect url for page '+page_number);
	}

	if (browserBackLink != null ){
	    var location= browserBackLink + page_number;
//	    var location= browserBackLink + lastPage;
	    if (sortAction !=null) {
	     	location += "&action=" + sortAction;
	     	if (sortSelect  !=null ) {
	     	   		location += "&sortBy=" + sortSelect;
	     	 }
	    }
	 if (pageSizeAction !=null) {
	     	location += "&action=" + pageSizeAction;
	     	if (pageSizeSelect  !=null ) {
	     	   		location += "&pageSize=" + pageSizeSelect;
	     	 }
			if (showFirstPage !=null) {
	     	   		location += "&showFirstPage=" + showFirstPage;
					document.forms["summary_records_form"].elements.showFirstPage.value="1";
	     	 }
	    }

	document.forms["summary_records_form"].submit();
//debug_alert("location:" + window.location);
	return false;
    }  else {
	document.forms["summary_records_form"].submit();
//debug_alert("window location:" + window.location);
	return false;
    }
}

function handle_nav(summary_nav_form, page_number, paging_action, browserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizeSelect, noAutoSubmit) {
//debug_alert('in handle nav');
	mergeMultiSelects();

//debug_alert('did merging');
	// form containing summary recs
	var summary_records_form = document.forms["summary_records_form"];

	if ( summary_nav_form ) {
	  var page_element = summary_nav_form.elements.page;
	  page_element.value = page_number;
//debug_alert('got form & set page '+page_number);
	}

	//save the page element from the navigation form into the results form as a hidden value.
	//change the action to something that will handle navigation
	//submit the results form instead of the nav form that called this method.
	//this is done so that elements on the results, such as checkboxes can be retained and used.
	var page = summary_records_form.elements["page"];
	if ( page ) {
		page.value = page_number;
	} else {
		var pageElement = document.createElement("input");
		pageElement.setAttribute("type", "hidden");
		pageElement.setAttribute("name", "page");
		pageElement.setAttribute("value", page_number);
		document.getElementById("summary_records_form").appendChild(pageElement);
	}
//debug_alert('we just set page.value to '+page_number);
//debug_alert('and it is '+document.forms["summary_records_form"].elements["page"].value );
	if ( paging_action && paging_action.length > 0 ) {
//05_28_08	  document.forms["summary_records_form"].action = paging_action;
		summary_records_form.setAttribute("action",paging_action);
//		if (action_att)
//		{
//debug_alert('action att obtained ' + action_att);
//		action_att.value=paging_action;
//		}

//debug_alert('set paging action '+paging_action);
	} else {
          var redirect_url = summary_records_form.elements["redirect_url"];
	  if ( redirect_url ) {
		redirect_url.value =
			summary_records_form.getAttribute("paging_url") +
					page_number;
	  } else {
			var redirectUrl = document.createElement("input");
			redirectUrl.setAttribute("type", "hidden");
			redirectUrl.setAttribute("name", "redirect_url");
			redirectUrl.setAttribute("value", document.forms["summary_records_form"].getAttribute("paging_url")
					? document.forms["summary_records_form"].getAttribute("paging_url") + page_number
					: page_number);
			document.getElementById("summary_records_form").appendChild(redirectUrl);
		}
//debug_alert('setting redirect url for page '+page_number);
	}

	if (browserBackLink != null ){
	    var location= browserBackLink + page_number;
//	    var location= browserBackLink + lastPage;
	    if (sortAction !=null) {
	     	location += "&action=" + sortAction;
	     	if (sortSelect  !=null ) {
	     	   		location += "&sortBy=" + sortSelect;
	     	 }
	    }

	    if (pageSizeAction !=null) {
	     	location += "&action=" + pageSizeAction;
	     	if (pageSizeSelect  !=null ) {
	     	   		location += "&pageSize=" + pageSizeSelect;
	     	 }
		 if (showFirstPage !=null) {
	     	 	location += "&showFirstPage=" + showFirstPage;
			summary_records_form.elements.showFirstPage.value="1";
	     	 }
	    }

	if ( noAutoSubmit || invokeAutoSubmit() )
	    window.location = location;
        //document.forms["summary_records_form"].submit();
        //debug_alert("locaion:" + window.location);
	    return false;
    }  else {
        if ( summary_records_form.count_new_items_marked ) {
        	if ( summary_records_form.count_new_items_marked == 0 ) {
        		disable_auto_submit();
        	}
        } else {
        	disable_auto_submit();
        }

	    summary_records_form.submit();

        //debug_alert("window locaion:" + window.location);
	    return false;
    }


}//end function handle_nav


function handle_nav_no_auto_submit(summary_nav_form, page_number,
				   paging_action, browserBackLink, lastPage,
				   sortAction, sortSelect, showFirstPage,
				   pageSizeAction, pageSizeSelect) {
    return handle_nav( summary_nav_form, page_number, paging_action,
		       browserBackLink, lastPage, sortAction, sortSelect,
		       showFirstPage, pageSizeAction, pageSizeSelect, true);
}


function handle_sort(summary_sort_form, page_number, browserBackLink, lastPage, action, sortSelect, showFirstPage) {
	if (browserBackLink != null ){
	    var location= browserBackLink + lastPage;
//debug_alert("Location 1:" + location);

	    if (action !=null) {
	     	location +=  "&action=" + action;
//debug_alert("Location 2:" + location);
	     	if (sortSelect  != null) {
	     	   		location  += "&sortBy=" + sortSelect;
			if (showFirstPage !=null) {
	     	   		location += "&showFirstPage=" + showFirstPage;
	     	 }
//debug_alert("Location 3:" + location);
		   }
	    }


//debug_alert("Final location:" + location);
	    if (summary_sort_form != null) {
//debug_alert("submit the form and update window location");
//			summary_sort_form.submit();
		}
		if ( invokeAutoSubmit() )
		    window.location = location;
//debug_alert("Final window locaion:" + window.location);
		return false;
    }  else {
	    if (summary_sort_form != null) {
//debug_alert("submit the form directly");
			summary_sort_form.submit();
		} else {
//debug_alert("No form to submit");
		}
	}
	return false;

}


// This function is used on the Cited References Summary Page
function do_RR_action ( search ) {

    // Form containing 'Related Record' button and hidden element: all_summary_IDs
    var cited_references_form = document.forms["summary_records_form"];

    // Pass the all_summary_IDs to Related Records Page
    var path = "Related.do?";

    // Complete URL for Related Records Action
    var url = path + search;

    // Replace form action with URL
    cited_references_form.action = url;

    window.location = url;
//    return true;
    return false;

}

//call RAMore.do action with required params
//currently only used by the RA sort
function do_RAMore_sort_action ( sort_select, search_params ) {

    //set the selected sort as a hidden value and submit the form with the params sent.
    var refine_more_form = document.forms["refine_more_form"];
    var more_sort_hidden = refine_more_form.elements["more_sort_order"];

    if(sort_select.value == "alpha") {
    	more_sort_hidden.value = "alpha";
    } else {
    	more_sort_hidden.value = "default";
    }

    // Pass the all_summary_IDs to Related Records Page
    var path = "RAMore.do?";

    // Complete URL
    var url = path + search_params;

    // Replace form action with URL
    //06_05_08 refine_more_form.action = url;
    window.location=url + "&more_sort_order=" + sort_select.value ;
    return true;
}

function update_signin_and_quick_output(format, redirect_url, return_url) {
	// First take care of quick output
	update_quick_output(format);

	// Now save data and signin
	//alert("update_signin_and_quick_output: format: "+format+"   redirect_url="+redirect_url);

	// form containing top 'Print', 'Email', etc. buttons plus summary recs
	var form = document.forms["summary_records_form"];

	// Full Record Page
    if (form == null) {
    	//alert("update_signin_and_quick_output: no summary form (full record) ");
    	form = document.forms["full_record_form"];

    	form.elements["next_mode"].value = form.elements["mode"].value;
    	form.elements["mode"].value = "saveDataAndSignIn";
    	//alert("update_signin_and_quick_output: next_mode: "+form.elements["next_mode"].value + "   mode: "+form.elements["mode"].value);
    	if (return_url != null) {
    		redirect_url += "&rurl="+return_url;
    	}
    	form.elements["redirect_url"].value = redirect_url;

    // Summary Page
    } else {
    	// form containing summary records
    	var mode = form.elements["mode"].value;
    	form.elements["next_mode"].value = mode;
    	form.elements["mode"].value = "saveDataAndSignIn";
    	if (return_url != null) {
    		redirect_url += "&rurl="+return_url;
    	}
    	form.elements["redirect_url"].value = redirect_url;
    	//alert("update_signin_and_quick_output: next_mode: "+form.elements["next_mode"].value + " mode: "+form.elements["mode"].value);

    	// Now change form containing the bottom quick output widgets
    	form = document.forms["output_form"];
    	if (form != null) {
    		form.elements["next_mode"].value = mode;
    		form.elements["mode"].value = "saveDataAndSignIn";
    		form.elements["redirect_url"].value = redirect_url;
    		//alert("update_signin_and_quick_output: (output_form) setting next_mode: "+form.elements["next_mode"].value+ " mode: "+form.elements["mode"].value);
    	} else {
    		//alert("update_signin_and_quick_output: no summary output form");
    	}
    }

}

function update_quick_output(format) {
	// form containing top 'Print', 'Email', etc. buttons plus summary recs
	var summary_records_form = document.forms["summary_records_form"];

	// form containing the bottom quick output widgets
	var output_form = document.forms["output_form"];

	// get all selected records on page
	var selectedIdsArray = new Array();

    var dont_populate_summary_records_form = document.getElementById("dont_populate_summary_records_form");

	// Summary Page
    if (summary_records_form != null) {
    	//alert("update_quick_output: (summary) format: "+format);

	    if (summary_records_form.marked_list_candidates != null)
	    {
	    	//alert("update_quick_output: marked_list_candidates: "+summary_records_form.marked_list_candidates);
	    	summary_records_form.mode.value = "outputService";
			output_form.mode.value = "outputService";
	    	var allSummaryIdsArray = new Array();

	        try {
		        // BUG:600,601,619 : for single record summary page and single record selection.
	        	// summary_records_form.marked_list_candidates.length turns to be undefined when
	        	// there is only record in the summary page. The following condition
	        	// checks for single record and whether its selected or not before sumitted.
		        if( summary_records_form.marked_list_candidates.type == "checkbox") {
		        	var val = summary_records_form.marked_list_candidates.value;
		        	if(summary_records_form.marked_list_candidates.checked == true) {
			      	        selectedIdsArray.push(val);
			        }
			        allSummaryIdsArray.push(val);
		        }
		        else{
			        for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
		      		    var val = summary_records_form.marked_list_candidates[i].value;
			    	    if(summary_records_form.marked_list_candidates[i].checked == true) {
			      	        selectedIdsArray.push(val);
			            }
			            allSummaryIdsArray.push(val);
			        }
				}

		        // 2nd radio button means send all records on page to mark list
		       if (output_form.record_select_type[1].checked == true) {
		    	   selectedIdsArray = allSummaryIdsArray;
		       }
	        } catch (e) {
	         ;
	        }

		    var fields = "";

	        try  {
			    if (output_form.qo_fields.type == "hidden") {
			    	// Authors, Title, Source plus Abstract
			    	var abstractBox = document.forms["output_form"].elements["abstract"].checked;
			    	if (abstractBox == true) {
			    		fields = "BibAbs";
			    	}
			    	// Authors, Title, Source
			    	else {
			    		fields = "Bib";
			    	}
			    } else if (output_form.qo_fields[0].checked == true) {
			    	// Authors, Title, Source plus Abstract
			    	var abstractBox = document.forms["output_form"].elements["abstract"].checked;
			    	//if (output_form.abstract.checked == true) {
			    	if (abstractBox == true) {
			    		fields = "BibAbs";
			    	}
			    	// Authors, Title, Source
			    	else {
			    		fields = "Bib";
			    	}
			    }
			    else if (output_form.qo_fields[1].checked == true) {
			    	// Full Record plus Cited Reference
			    	// Fix for Bug #1339.
			    	if (output_form.citedref != null && output_form.citedref.checked == true) {
			    		fields = "Full";
			    	}
			    	// Full Record
			    	else {
			    		fields = "FullNoCitRef";
			    	}
			    }
	        } catch (e) {
	          // use try/catch to continue execution leaving fields as undefined, in case of exception.

	        }

		    // Copy values to hidden elements in both forms for submission
		    document.forms["output_form"].elements["selectedIds"].value  = selectedIdsArray.join(";");
			document.forms["output_form"].elements["format"].value = format;
			document.forms["output_form"].elements["fields"].value = fields;

	        // no need to create and copy variables to summary records form if we do not have
	        // quick output buttons on that form.
	        if (dont_populate_summary_records_form == null) {
		        document.forms["summary_records_form"].elements["selectedIds"].value = selectedIdsArray.join(";");
	    		document.forms["summary_records_form"].elements["format"].value = format;
			    document.forms["summary_records_form"].elements["fields"].value = fields;

			    // Add value from the bottom form's 'Step 1' radio selections
			    // (select, all, range) to hidden in top form
			    for (var i=0; i < output_form.record_select_type.length; i++)	{
	   			    if (output_form.record_select_type[i].checked) {
			          document.forms["summary_records_form"].elements["record_select_type"].value =
			      	    output_form.record_select_type[i].value;
	      		    }
	   		    }

				try {	// in the event we dont have a output_form as in cited ref pages
	   		    // Add value from the bottom form's 'Step 3' save options
			    // (text, html, reference, etc.) to hidden in top form
			    document.forms["summary_records_form"].elements["mark_to"].value =
				    document.forms["output_form"].elements["mark_to"].value;

			    document.forms["summary_records_form"].elements["mark_from"].value =
				    document.forms["output_form"].elements["mark_from"].value;
				} catch (e) {

	        	}
	        }
		}
	}
	// Full record page
	else {
		//alert("update_quick_output: (full_record) format: "+format);
      var full_record_form = document.forms["full_record_form"];
	  var fields = "";

	    if (full_record_form.qo_fields[0].checked == true) {
	    	// Authors, Title, Source plus Abstract
	    	var abstractBox = document.forms["full_record_form"].elements["abstract"].checked;
	    	//if (full_record_form.abstract.checked == true) {
	    	if (abstractBox == true) {
	    		fields = "BibAbs";
	    	}
	    	// Authors, Title, Source
	    	else {
	    		fields = "Bib";
	    	}
	    }
	    else if (full_record_form.qo_fields[1].checked == true) {
		    // BugNo: 1432 display of Citedreferences on fullrecord page.
	      	if (full_record_form.citedref != null && full_record_form.citedref.checked == true) {
		    	fields = "Full";
	    	}
	    	else {
	    		fields = "FullNoCitRef";
	    	}
	    }
		document.forms["full_record_form"].elements["format"].value = format;
		document.forms["full_record_form"].elements["fields"].value = fields;

	}
}//end update_quick_output


function disable_auto_submit() {
	// form containing summary recs and checkboxes
	var markForm = document.forms["mark_records_form"];
	if ( markForm ) {
		markForm.setAttribute("url", null);
	}
	return true;
}


function auto_submit_markedlist( redirect_url ) {

  // form containing summary recs and checkboxes
  var summary_records_form = document.forms["summary_records_form"];
  var count_new_items_marked = 0;

  if ( summary_records_form ) {
	//Making sure AutoSubmit to honor the currently selected records on the page.
	mark_selected_records_onpage('add');

	if ( redirect_url && redirect_url.length > 0 ) {
	  //summary_records_form.elements["redirect_url"].value = redirect_url;
	  var redirectUrlObj= summary_records_form.elements["redirect_url"];
	  if(redirectUrlObj !=null){
	  	redirectUrlObj.value=redirect_url;
	  }

//debug_alert('setting redirect url');
	  // summary_records_form.submit();
	} else {
		// This works even for undefined, empty, null, nonnumeric, or NaN values.
		count_new_items_marked = summary_records_form.count_new_items_marked.value;
		if (count_new_items_marked > 0) {
	  		postAsyncForm( 'summary_records_form', 'auto_submit_url' );
		}
	}
  }
  // just in case
  disable_auto_submit();

  return false;
}

function auto_submit_checkboxes( redirect_url ) {
  // form containing summary recs and checkboxes
  var summary_records_form = document.forms["summary_records_form"];
//debug_alert('In auto_submit_checkboxes');

  if ( summary_records_form ) {
//debug_alert('Calling postAsyncForm');
	postAsyncCheckboxForm( 'summary_records_form', 'auto_submit_url' );
  }

  return false;
}

// Update the marked list for quick output
function update_mark_list(format) {

	// form containing top 'Print','Add to MarkedList' 'Email', etc. buttons plus summary recs
	var summary_records_form = document.forms["summary_records_form"];

	var mark_id = null;
	if(summary_records_form != null)
		mark_id=summary_records_form.mark_id;

	// form containing the bottom quick output widgets
	var output_form = document.forms["output_form"];

	// get all selected records on page
	var selectedIdsArray = new Array();

    // Summary Page
    if(summary_records_form != null) {

	    if (mark_id != null && (mark_id.value == 'RXN' || mark_id.value == 'CPD')) {
			var selected_range=0;

			if (format == "add_page") {
			   for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
			       summary_records_form.marked_list_candidates[i].checked = true;
			   }
			   format = "add";
			}

			for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
				if(summary_records_form.marked_list_candidates[i].checked == true){
					var val = summary_records_form.marked_list_candidates[i].value;
					selectedIdsArray.push(val);
				}
			}
			summary_records_form.selectedIds.value = selectedIdsArray.join(";");
			selected_range = selectedIdsArray.length;

			summary_records_form.mode.value = "addToMark";
			summary_records_form.count_new_items_marked.value = selected_range;

		}
		else if (summary_records_form.marked_list_candidates != null)
	    {

	    	//new code for usage reporting
			var selected_range=0;

			if (format == "add_page") {
			   for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
			       summary_records_form.marked_list_candidates[i].checked = true;
			   }
			   format = "add";
			}

	    	if (output_form.record_select_type[0].checked == true) {
	    	   mark_selected_records_onpage(format);
	    	   return;
	        }
	        else if (output_form.record_select_type[1].checked == true) {
		    	for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
					var val = summary_records_form.marked_list_candidates[i].value;
					selectedIdsArray.push(val);
				}

			    // Copy values to hidden elements in both forms for submission
			    output_form.selectedIds.value  = selectedIdsArray.join(";");
				summary_records_form.selectedIds.value = selectedIdsArray.join(";");
				selected_range = selectedIdsArray.length;
			}
	        else if (output_form.record_select_type[2].checked == true) {
				summary_records_form.mark_to.value =output_form.mark_to.value;
				summary_records_form.mark_from.value =output_form.mark_from.value;

				selected_range = summary_records_form.mark_to.value - summary_records_form.mark_from.value + 1;
			}

			if(format == "add") {
				output_form.mode.value = "addToMark";
				summary_records_form.mode.value = "addToMark";
			}
			// code for usage reporting
			output_form.count_new_items_marked.value = selected_range;
			summary_records_form.count_new_items_marked.value = selected_range;
			// Add value from the bottom form's 'Step 1' radio selections
			// (select, all, range) to hidden in top form
			for (var i=1; i < output_form.record_select_type.length; i++)	{
	 			if (output_form.record_select_type[i].checked) {
		        	summary_records_form.record_select_type.value =output_form.record_select_type[i].value;
	     		}
			}
		}
	}
	// Full record page
	else {
      	var full_record_form = document.forms["full_record_form"];

		if(format == "add") {
    		document.forms["full_record_form"].elements["mode"].value = "addToMark";
    		document.forms["full_record_form"].elements["count_new_items_marked"].value = "1";
    	}
	}
}

function get_named_inputs( input_name ) {

  var results = new Array();
  var summary_records_form = document.forms["summary_records_form"];

  if (summary_records_form != null &&
	  summary_records_form.elements[input_name] != null)
    {
      var type = summary_records_form.elements[input_name].type;
      if ( type == "hidden" || type == "checkbox" ) {
		results[0] = summary_records_form.elements[input_name];
	  } else {
		results = summary_records_form.elements[input_name];
	  }
	}

  return results;
}

function get_markedlist_checkboxes() {

  var results = new Array();
  var summary_records_form = document.forms["summary_records_form"];

  if (summary_records_form != null &&
	  summary_records_form.marked_list_candidates != null)
    {
// BUG:600,601,619 : for single record summary page and single record selection.
// summary_records_form.marked_list_candidates.length turns to be undefined when
// there is only record in the summary page. The following condition
// checks for single record and whether its selected or not before sumitted.
	  if( summary_records_form.marked_list_candidates.type == "checkbox") {
		results[0] = summary_records_form.marked_list_candidates;
	  } else {
		results = summary_records_form.marked_list_candidates;
	  }
	}

  return results;
}

// Prepare for request to update marked list indicators
function update_markedlist_indicators( mlForm ) {

  if ( ! mlForm )
	return false;

  var candidateForm = null;
  var formName = mlForm.getAttribute('records_form_name');

  if ( formName && formName.length > 0 ) {

	candidateForm = document.forms[formName];
  } else {
	candidateForm = document.forms["summary_records_form"];
	if ( ! candidateForm )
	  candidateForm = document.forms["full_record_form"];
  }
  var candidates = new Array();
  if ( candidateForm ) {
//06_05_08	var candidates = new Array();
	var markId = candidateForm.elements["mark_id"];
	if ( markId ) {
		mlForm.elements["mark_id"].value = markId.value;
		var allCandidates = get_named_inputs('ml_indicator_candidates');
		if ( allCandidates.length > 0 ) {
			for ( var i = 0; i < allCandidates.length; ++i ) {
				candidates.push( allCandidates[i].value );
			}
			// unset allCandidates?
			//alert(" candidates= "+candidates.toString());
		} else {
			var currIdx = null;
			var startRec = mlForm.elements["startRec"];
			if ( startRec ) {
	  			currIdx = startRec.value;
			}
			if ( currIdx == null ) {
		  		currIdx = 1;
			}

			var allCheckboxes = get_markedlist_checkboxes();
			if ( allCheckboxes.length > 0 ) {
 			    var indicator, name;

				for ( var i = 0; i < allCheckboxes.length; ++i, ++currIdx ) {
				    name = "ml_indicator_" + currIdx;
					indicator = document.getElementById( name );
	//if ( indicator )
	//alert('indicator '+name+' is '+indicator+' and has:"'+indicator.innerHTML+'"');
	//else
	//alert('indicator '+name+' is null');

					if ( indicator == null || indicator.innerHTML.length == 0 ) {
					   candidates.push( allCheckboxes[i].value );
					   candidates.push( currIdx );
					}
				}
			} else {
			    // full record, most likely
			    //  this could be extended to handle multiple records by
			    //    splitting "selected" on ';' and iterating as is done
			    //    above for allCheckboxes
			    var selected = candidateForm.elements["selectedIds"];
				if ( selected ) {
				  // alert('trying with selected '+selected.value);
				   candidates.push( selected.value );
				   candidates.push( currIdx );
				}
			}
		}
		mlForm.elements["candidates"].value = candidates.join(";");
	}
  }

  return ( candidates.length > 0 );
}

// Update the marked list for quick output
function mark_selected_records_onpage(format){

	var summary_records_form = document.forms["summary_records_form"];
	var output_form = document.forms["output_form"];

	// get all selected records on page
	var selectedIdsArray = new Array();
	var mark_id = null;
	if(summary_records_form != null)
		mark_id=summary_records_form.mark_id;

	if(summary_records_form != null && mark_id != null && (mark_id.value == 'RXN' || mark_id.value == 'CPD')) {
		//output_form is not available in WOS-CHEM StructureSearch summary results page.
		output_form = summary_records_form;
	}

	if (summary_records_form != null) {

		if(format == "add") {
				output_form.mode.value = "addToMark";
				summary_records_form.mode.value = "addToMark";
		}

		if (summary_records_form.marked_list_candidates != null)
    	{
	     try {
		     // BUG:600,601,619 : for single record summary page and single record selection.
		     // summary_records_form.marked_list_candidates.length turns to be undefined when
		     // there is only record in the summary page. The following condition
		     // checks for single record and whether its selected or not before sumitted.
		     if( summary_records_form.marked_list_candidates.type == "checkbox") {
		      	var val = summary_records_form.marked_list_candidates.value;
		      	if(summary_records_form.marked_list_candidates.checked == true) {
		     	    selectedIdsArray.push(val);
		       }
		     }
		     else{
		       for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
					var val = summary_records_form.marked_list_candidates[i].value;
					if(summary_records_form.marked_list_candidates[i].checked == true) {
					    selectedIdsArray.push(val);
					}
		       }
			 }
	     } catch (e) {
	      ;
	     }

	    // Copy values to hidden elements in both forms for submission
	    try {
		    output_form.selectedIds.value  = selectedIdsArray.join(";");
			summary_records_form.selectedIds.value = selectedIdsArray.join(";");

			//WOS-CHEM Structure Summary does not have the summary_output form.
			if(mark_id != null && mark_id.value != 'RXN' && mark_id.value != 'CPD')
		    	summary_records_form.record_select_type.value = output_form.record_select_type[0].value;
			output_form.count_new_items_marked.value = selectedIdsArray.length;
			summary_records_form.count_new_items_marked.value = selectedIdsArray.length;
		} catch (e) {
		 ;
		}
		}
	}
}

// validate input for quick output
function check_qo_input() {
    if (!check_output_range()) {
        //if there is an error, clear input from the boxes
        var output_form = document.forms["output_form"];

    //8.26.2009 CS - For now, I am commenting these two out because NPD would not like us to ever
    //clear these boxes. However, since we have had navigation issues in the past from failing to clear them,
    //I wanted to leave the code here temporarily until we are sure this won't happen again.

        //output_form.elements["markFrom"].value = "";
        //output_form.elements["markTo"].value = "";
        return false;
    }

    return true;
}

function check_ml_input() {
	if (!check_output_range("marked_list")) {
	    //if there is an error, clear input from the boxes
        var output_form = document.forms["output_form"];

    //8.26.2009 CS - For now, I am commenting these two out because NPD would not like us to ever
    //clear these boxes. However, since we have had navigation issues in the past from failing to clear them,
    //I wanted to leave the code here temporarily until we are sure this won't happen again.

        //output_form.elements["markFrom"].value = "";
        //output_form.elements["markTo"].value = "";
    	return false;
  	}

	return true;
}

var MARKED_LIST_MAX_RECORDS = 5000;
var QUICK_OUTPUT_MAX_RECORDS = 500;
var QUICK_OUTPUT_HIGHEST_RECORDS = 100000;
var CURRENT_NUM_MARKED_LIST_RECORDS = 0;
var FINAL_DISPLAY_RESULTS_COUNT = 0;
var EIDS_MAX_ORDER_RECORDS = 35;

// check if from and to values for the range are valid. If not display the appropriate
// message.
function check_output_range(format) {

	// Get form containing top 'Print','Add to MarkedList' 'Email', etc. buttons plus summary recs
	var summary_records_form = document.forms["summary_records_form"];
	// Summary page with no checkboxes (bug 1828)
	if (summary_records_form != null && summary_records_form.marked_list_candidates == null && summary_records_form.elements["service_mode"].value != 'CitedRefList-outputService'){
			//alert("Quick Output features are not available for this page.");
			var errorMessage = getMessageById("quickOutputNotAvailable");
			alert(errorMessage);
			return false;
		}

    var mark_from =  document.forms["output_form"].elements["markFrom"].value;
    var mark_to =  document.forms["output_form"].elements["markTo"].value;
    mark_from = (mark_from).replace(/^\s*|\s*$/g,'');
    mark_to = (mark_to).replace(/^\s*|\s*$/g,'');

    //first make sure both boxes are populated
    if (mark_from == "" || mark_to == "") {
        var range_null_error =  getMessageById("quickOutputNullInARange");
        alert(range_null_error);
        return false;
    }

    //make sure we have positive integers, no special characters
    if(!isPosInteger(mark_from) || !isPosInteger(mark_to)) {
        var range_specialchar_error =  getMessageById("range_specialchar_error");
		alert (range_specialchar_error);
        return false;
    }

    //make sure range is in the right numerical order
    // Condition logic changed due to FF error when from_to > 9. Dan Eisenstein 08/25/09
    if ( (mark_to - mark_from) < 0 ) {
        var range_notsequential_error = getMessageById("range_notsequential_error");
        alert (range_notsequential_error);
        return false;
    }

    //make sure numbers entered are in the set
    var result_count;
    var resultId = document.getElementById("trueFinalResultCount");
    if (resultId == null) {
        resultId = document.getElementById('hitCount.top');
    }
    if (resultId != null) {
    	result_count = resultId.innerHTML.toString();
        if ( null == result_count || "" === result_count ) {
    		result_count=resultId.value;
    	}
    }

    if (result_count == null) {
    	result_count =  CURRENT_NUM_MARKED_LIST_RECORDS;
    }

    if(result_count != null) {
    	result_count = result_count.replace(",", "");
        result_count = parseInt(result_count);
        var range_notinset_error =  getMessageById("range_notinset_error");

        //8.26.2009 CS - At this point, we know we have integers in the correct numerical order, so
        //it was requested that if we try to mark beyond the range, as long as we started marking within the
        //range, we would allow that, and the ML would only mark what it could,
        //so I'm taking out the mark_to > result_count condition for this error message.
        if ( (mark_to == 0) || (mark_from == 0) || (mark_from > result_count)) {
            alert(range_notinset_error);
            return false;
        }
    }

    //mark limit
    var range_morethan_maxrec_error;
    var range_morethan_highestrec_error = getMessageById("qo_range_morethan_highestrec_error");
    var max_record_limit;
    var highest_record = QUICK_OUTPUT_HIGHEST_RECORDS;
    if (format == "marked_list") {
        range_morethan_maxrec_error =  getMessageById("ml_range_morethan_maxrec_error");
        max_record_limit = MARKED_LIST_MAX_RECORDS;
    } else {
        range_morethan_maxrec_error =  getMessageById("qo_range_morethan_maxrec_error");
        max_record_limit = QUICK_OUTPUT_MAX_RECORDS;
    }

    if ( (mark_to - mark_from + 1) > max_record_limit) {
        alert(range_morethan_maxrec_error);
        return false;
    }
    if ( (parseInt(mark_to)) > parseInt(highest_record)) {
    	alert(range_morethan_highestrec_error);
    	return false;
	}
	return true;
}

function isPosInteger(testInt) {
    testInt = testInt.toString();
    if(isNaN(testInt)) {
        return false;
    }
    for (var i = 0; i < testInt.length; i++) {
        var oneChar = testInt.charAt(i);
        if (oneChar < "0" || oneChar > "9") {
            return false;
        }
    }
    return true;
}

function set_output_range_option() {
     var record_select_type_range = document.getElementById("record_select_type_range");
     record_select_type_range.checked = true;
     return true;
}

function open_cwc_location(theURL,winName) {
     var win_w = parseInt(screen.width * .85);
     var win_h = parseInt(screen.height * .70);
     winprops = 'height='+win_h+',width='+win_w+',top=70,left=60,directories=yes,location=yes,'+
                'menubar=yes,resizable=yes,scrollbars=yes,status=yes,toolbar=yes';
     newwindow=window.open(theURL, winName, winprops);
     if (window.focus) {newwindow.focus()}
     return false;
}

function handle_nav_final_counts_MovedToAsyncJS(final_hit_count, final_page_count) {

	//declare spans to be changed
	var recs_count_top = document.getElementById('hitCount.top');
	var page_count_top = document.getElementById('pageCount.top');
	var recs_count_bottom = document.getElementById('hitCount.bottom');
	var page_count_bottom = document.getElementById('pageCount.bottom');

	//replace all the ...'s with real values, if needed. Clear it and replace it.
	if (recs_count_top.innerHTML.match(/\.\.\./)) {
			recs_count_top.innerHTML = "";
			recs_count_top.innerHTML = final_hit_count;
	}


	if (page_count_top.innerHTML.match(/\.\.\./)) {
			page_count_top.innerHTML = "";
			page_count_top.innerHTML = final_page_count;
	}


	if (recs_count_bottom.innerHTML.match(/\.\.\./)) {
			recs_count_bottom.innerHTML = "";
			recs_count_bottom.innerHTML = final_hit_count;
	}


	if (page_count_bottom.innerHTML.match(/\.\.\./)) {
			page_count_bottom.innerHTML = "";
			page_count_bottom.innerHTML = final_page_count;
	}

}//end function handle_nav_final_counts

// Function to handle multiple options in a search box
// Params: 1) Selected extended option
//         2) Default option
//		   3) Element ID to toggle
function updateExtendedOption(selectE, defaultE, elemID){
	if (document.getElementById(elemID).value == selectE) {
		document.getElementById(elemID).value = defaultE;
	}
	else {
		document.getElementById(elemID).value = selectE;
	}
}


function initMultiSelectDelimiter() {
	var multiSelectDelimiter = '### ';
	// Dan Eisenstein - 07/23/2010 - This condition is not required under WOK5X
	// Fixed part of WOKVX-6618.
	//if (document.forms[0].product.value=="MEDLINE") {
	//	multiSelectDelimiter = ';;';
	//}
	return multiSelectDelimiter;
}


// Function to select values in a multiselect box
// Params: 1) Select box object
//         2) String of selected values, delimited by '### '
function selectMultiSelects(select, selected) {
	var multiSelectDelimiter = initMultiSelectDelimiter();

	var anymatch = 0;

	if (selected.length > 0) {
		select.options[0].selected = false;
		var selects = selected.split(multiSelectDelimiter);
		for (i=0; i<select.length; i++) {
			var match = false;
			for (j=0; j<selects.length; j++) {
				if (select.options[i].value == selects[j]) {
					anymatch = 1;
					match = true;
				}
			}
			if (match == true) {
			  select.options[i].selected = true;
			}
			else {
				select.options[i].selected = false;
			}
    	}
  	}

  	if (anymatch == 0) {
		select.options[0].selected = true;
		for (i=1; i<select.length; i++) {
			select.options[i].selected = false;
		}	
  	}
}

// remove unwanted starting and trailing spaces of the input textbox.
function trim_input (val) {
	if(val != null)
		val.value = val.value.replace (/^\s+|\s+$/g, '');
}

function hideClientError (layer) {
	if ( typeof layer === "undefined" ) {
		layer = "errorMessageDiv";
	}
	var clientError = document.getElementById(layer);
	if ( clientError ) {
		document.getElementById("client_error_input_message").innerHTML = "";
		if ( clientError.style.display === "block" ) {
			clientError.style.display = "none";
		}
	}
}

//To display the hidden client error messages
function show_client_error(layer,notice) {
    var client_error = document.getElementById(layer);
    if(client_error != null){
	    var display_msg = document.getElementById('client_error_input_message');

		if(client_error.style.display == "none") {
		  display_msg.innerHTML=notice;
		  client_error.style.display='block';
		}
		else{
			display_msg.innerHTML=notice;
		}
	}
    else {
    	// fall back
    	alert(notice);
    }
    return false;
  }

//	Function to combine the selected options in a multi-select box into
//	a single (option[0]) value to be submitted to the server.  This
//	method will check all forms and process all multi-select selects.
//  This method is called from other javascript funcitons that assist in
//  form submittion (search forms, page navigation forms, etc)
function mergeMultiSelects() {
	var multiSelectDelimiter = initMultiSelectDelimiter();

	// Loop through all forms
	for(i=0; i<document.forms.length; i++) {
		var form = document.forms[i];

		// Loop through form elements
		for(j=0; j<form.elements.length; j++) {
			// We only care about multiselect boxes
			if (form.elements[j].type == "select-multiple") {
				var select = form.elements[j];
				var selected = '';

				// Loop through all options in this multi-select box
				for(k=0; k<select.options.length; k++) {
					// If this option is selected, add it to our single string
					if (select.options[k].selected == true) {
						if (selected.length > 0) {
							selected = selected + multiSelectDelimiter + select.options[k].value;
						} else {
							selected = select.options[k].value;
						}
						// Now unselect it
						select.options[k].selected = false;
					}
				}

				// Re-select the first option, and set the value to our delimited string
				select.options[0].value = selected;
				select.options[0].selected = true;
			}
		}
	}
}

//a more generic way of trimming a string
function _trim (str) {
	if(str == null){
		return str;
	}

	var s1 = str.replace (/^\s+|\s+$/g, '');

	return s1;
}


function hide_show(id, status){
	 document.getElementById(id).style.display = status;
}

function is_enter_key (event) {
  var charCode = (event.charCode) ? event.charCode :
        ((event.which) ? event.which : event.keyCode);
  return (charCode == 13 || charCode == 3 );
}

function submit_on_enter (format, objevent) {

  if (! objevent) objevent = event;

  var charcode = objevent.which;
  if (! charcode)
      charcode = objevent.keyCode;

  var is_safari = navigator.userAgent.indexOf('Safari')>0;
  if (is_safari && charcode == 3) charcode = 13;

  if (charcode == 13) {
  	disable_auto_submit();
  	update_mark_list(format);
  	if(check_ml_input()){
	  	document.forms["output_form"].submit();
	  	return false;
  	}
  }
  return true;
}

function submit_ML (format, objevent) {

	  if (! objevent) objevent = event;

	  var charcode = objevent.which;
	  if (! charcode)
	      charcode = objevent.keyCode;

	  var is_safari = navigator.userAgent.indexOf('Safari')>0;
	  if (is_safari && charcode == 3) charcode = 13;

	  if (charcode == 13) {
  		return mark_records(getOutputForm());
	  }
	  return true;
	}

function check_chem_editions(skip_input_field,action)
{
	var invalid_rgroup_exactmatch_message = document.getElementById("invalid_rgroup_exactmatch_error").value;
	var incomplete_structure_message = document.getElementById("incomplete_structure_error").value;
	var invalid_substructure_message = document.getElementById("invalid_substructure_error").value;
	var invalid_exactmatch_message = document.getElementById("invalid_exactmatch_error").value;
	var undefined_rgroup_message = document.getElementById("undefined_rgroup_error").value;
	var rgroup_unsupported_message = document.getElementById("rgroup_unsupported_error").value;
	var substructure=true;
	
	var no_chem_editions_selected_message = document.getElementById("editions_not_selected_error").value;
	var no_ccr_or_ic_message = document.getElementById("no_ccr_or_ic_error").value;
	var no_ccr_message = document.getElementById("no_ccr_error").value;
	var notice = document.getElementById("input_invalid_notice").value;

	var structure_search_form = document.forms["WOS_StructureSearch_input_form"];
	var editions = structure_search_form;
	var invalid_input=true;

	var ncpdfields=0;
	var nrxnfields=0;

	structure_search_form.action.value = action;
	var ccrInputSelector = "[name='WOS_StructureSearch_input_form'] :input[type=checkbox][value='CCR']";
	var icInputSelector  = "[name='WOS_StructureSearch_input_form'] :input[type=checkbox][value='IC' ]";
	var ccrInput         = $(ccrInputSelector);
	var icInput          = $(icInputSelector);
	var ccrImplicit      = null == ccrInput;
	var icImplicit       = null == icInput;
	var ccrChecked    = false;
	var icChecked     = false;
	if ( !ccrImplicit ) {
		ccrChecked = $(ccrInputSelector + "[checked=true]").size() > 0;
	}
	if ( !icImplicit  ) {
		icChecked  = $(icInputSelector  + "[checked=true]").size() > 0;
	}

	if ( !icChecked && !ccrChecked ) {
		if (skip_input_field == "yes") {
			//	alert(no_chem_editions_selected_message);
			show_client_error("errorMessageDiv", no_chem_editions_selected_message);
		}
		else {
			//	alert(no_ccr_or_ic_message);
			show_client_error("errorMessageDiv", no_ccr_or_ic_message);
		}
		//return true;
		return false;
	}

	for (i=0; i<structure_search_form.elements.length; i++) {
		var e = structure_search_form.elements[i];

		if ( e.name == "granularity" ){ 
			if( e.value == "substructure" )substructure=e.checked;
		}
		else if ( e.name == "ISRXNQRY" ){ 
			trim_input(e);
			
			if(e.value == "$RXN")nrxnfields += 1;
			else if(e.value == "A") ncpdfields += 1;
			else if(e.value == "$MDL") ncpdfields += 1;
		}
		else if ( e.type == "text" || e.type == "textarea"){
			trim_input(e);
			if(e.value.length>0){
				if(e.name.substring(0,5) == "COMP_" )ncpdfields += 1;
				else if (e.name.substring(0,2) == "RX") {
					nrxnfields += 1;
				}
			}
		}
		else if ( e.type == "checkbox" ) {
			if ( e.name == "RXREFLUX") {
				if(e.checked == true ) nrxnfields += 1;
			} 
		}
		else if ( e.type == "select-one" && e.name == "RXATMOSPHERE"){
			if(e.value.length>0) nrxnfields += 1;
		}
	}

	if(ncpdfields == 0){
		if(nrxnfields == 0){ 
			//		alert(notice);
			show_client_error("errorMessageDiv",notice);
			return false;
		} 
	}

	if ( !ccrChecked && nrxnfields > 0 ) {
		show_client_error("errorMessageDiv", no_ccr_message);
		return false;
	}
	
	// Structure Drawing validation
	var molfile=document.getElementById('molfile').value;
	var rxnqry=molfile.substring(0, 10).replace(/^\s+|\s+$/g, '');
		
	if(molfile.indexOf("M  V30 BEGIN CTAB") <= -1 ) {

	if(rxnqry.indexOf("$RXN") > -1 ){
		var lpos = molfile.indexOf("$MOL")

		if(lpos < 0){
			show_client_error("errorMessageDiv", incomplete_structure_message);
			return false;
		}

		var irct=parseInt(molfile.substring(lpos-6, lpos-4) );
		var iprd=parseInt(molfile.substring(lpos-3, lpos-1) );

		if(irct*iprd == 0 && !substructure){
			show_client_error("errorMessageDiv", invalid_exactmatch_message);
			return false;
		}
		else{
			var molpos = molfile.indexOf("$MOL"); 
			for(j=0; j<irct+iprd; j++){

				var molend = molfile.indexOf("M  END", molpos);
				var msize = molend - molpos; 

				if(msize<80 && substructure){
					show_client_error("errorMessageDiv", invalid_substructure_message);
					return false;
				}

				molpos = molfile.indexOf("$MOL", molend );
			}
		}
			
		var RRpos = molfile.indexOf("M  RGP");
		if(RRpos > 0){
			show_client_error("errorMessageDiv", rgroup_unsupported_message);
			return false;
		}
	}
	else if(rxnqry.indexOf("ACL") > -1 ){
		var molpos = molfile.indexOf("M  END");
		if(molpos<80 && substructure){
			show_client_error("errorMessageDiv", invalid_substructure_message);
			return false;
		}	
		
		var RRpos = molfile.indexOf("M  RGP");
		if(RRpos > 0){
			show_client_error("errorMessageDiv", undefined_rgroup_message);
			return false;
		}
	}
	else if(rxnqry.indexOf("$MDL") > -1 ){
		if(!substructure){
			show_client_error("errorMessageDiv", invalid_exactmatch_message);
			return false;
		}	
		var rgppos = molfile.indexOf("$RGP");
		while(rgppos<molfile.length && rgppos>-1){
			var rgpend = molfile.indexOf("$END RGP", rgppos);

			if(rgpend - rgppos < 15){
				show_client_error("errorMessageDiv", undefined_rgroup_message);
				return false;
			}
			rgppos = molfile.indexOf("$RGP", rgpend);
		}
	}

	}

	if ( typeof WOKTimespan !== "undefined" ) {
	    return WOKTimespan.validateDateRange();
	}
    return true;
}

function inlinewrap(obj_name)
{
	BrowserDetect.init();
	var span = document.getElementById(obj_name);
	if (BrowserDetect.browser == "Explorer") {
		var temp = span.innerHTML;
		span.innerHTML = "";
		span.innerHTML = '<div style="inline;">' + temp + "</div>";
	}
	span.style.display="inline";
	return true;
}

function check_plugin(url){
	var ISI_plugin_installed=plugin_check(url);
	var plugin_param="";
	if(!ISI_plugin_installed)
	{
		plugin_param="&ISIPlugin=false";
	}
	window.location=url+plugin_param;
	return true;
}

function prepare_window_location(window_location) {
//	alert("Assigning window location:" + window_location);
		 return go_to_url(window_location);
//		 return false;
}
//////////Follwoing function is used for right click /////////////////////////////////
function IsAllowedRightClick(o){
   //Business Logic is here
  var allowedLinks=document.getElementsByName("LinksAreAllowedRightClick");
  for (i=0;i<allowedLinks.length;i++) {
       if(o.href.indexOf(allowedLinks[i].value)>(-1)){
          if(o.href.indexOf('&cacheurlFromRightClick=no')<=(-1)){//this is make assure the param only added once
             o.href=o.href+'&cacheurlFromRightClick=no';
          }
          //Only for the link which has been rightclicked,this click handler is added for remove cacheurlFromRightClick
	  /****  clean up!
	  if(navigator.appName.indexOf("Microsoft Internet Explorer")>(-1)){
	          addEvent(o, "click",CLHandlerRmCFRC(o));
	  }
	  if(navigator.appName.indexOf("Netscape")>(-1)){
	          o.setAttribute("onclick","javascript:return RmCacheurlFromRightClick(this);");
          }
	  *****/
	  addEvent( o, "click",
		    function() { return RmCacheurlFromRightClick(o); } );
          return true;
       }
  }
  return false;
}
//this function will be revoked for the link which has been rightclicked before
function RmCacheurlFromRightClick(o){
    /*** clean up
  if(o.href.indexOf('&cacheurlFromRightClick=no')>(-1)){//If there is a right click on this link
     o.href=o.href.replace('&cacheurlFromRightClick=no','');
  }
    *****/
    var newHref = o.href.replace('&cacheurlFromRightClick=no','');
    //alert( "have "+newHref.length+" and "+o.href.length+" ("+newHref+")" );
    if ( newHref.length != o.href.length )
	o.href = newHref;

  return true;
}



function addEvent(obj, eventType, fn)
{
	if (obj.addEventListener)
	{
		obj.addEventListener(eventType, fn, false);
		return true;
	}
	else if (obj.attachEvent)
	{
		var r = obj.attachEvent("on" + eventType, fn);
		return r;
	}
	else
	{
		return false;
	}
}

function getAutoSubmitFunctionName( form ) {

    if ( form == null ) {    	
    	form = getRecordsForm();
    }
    var af;
    if(form!=null) { 
	af = form.getAttribute('auto_submit_function');
	}
    if (typeof af == 'undefined') {
    	af = autoSubmit;    	
    }
    
    return eval(af);
}

function autoSubmit() {
    var form = getRecordsForm();
    postAsyncCheckboxForm( form.id, "auto_submit_url" );
    return true;
}

function autoSubmitMarkedList() {
  var markForm = document.forms[ "mark_records_form" ];
  var checkboxForm = getRecordsForm();
  if ( markForm && checkboxForm ) {
    return mark_selected_records( checkboxForm, true );
  }
  return true;
}

function autoSubmitSelected() {
  var checkboxForm = getRecordsForm();
  if ( checkboxForm ) {
    setSelectedForForm( checkboxForm );
  }
  return autoSubmit();
}

function autoSubmitSelectedAndMarked() {
  return (autoSubmitSelected() && autoSubmitMarkedList());
}

function disableAutoSubmit( form ) {
    if ( ! form )
	form = getRecordsForm();

    if ( form ) {
	var autoFunction = getAutoSubmitFunctionName( form );
	// now, redefine the auto submit function to do nothing
	eval( autoFunction + ' = function() { return true; };' );
    }
    return true;
}

function invokeAutoSubmit( form ) {
    if ( ! form )
	form = getRecordsForm();

    if ( form ) {
	var autoFunction = getAutoSubmitFunctionName( form );
	//alert("will do autosubmit");
	
        if ( typeof(autoFunction) === 'function' )
	    return autoFunction();
    }

    return true;
}

function processPageLinks(singleLinkName) {
	if (singleLinkName==undefined){
	    var tester = function( form, link ) { return false; };
	    var form = getRecordsForm();
	    var autoFunction = getAutoSubmitFunctionName( form );
	    if ( form ) {
		//alert("will do autosubmit");
	
		var testerName = form.getAttribute("enable_auto_submit_function");
		if ( testerName != null && tester.length > 0 )
		    tester = eval(testerName);
		else
	            tester = function( form, link ) {
			var rc = true;
			if ( link.getAttribute( "no_auto_submit" ) )
			    rc = false;
			return rc;
		    };
	    }
	
	    for (var i=0;i<document.links.length;i++) {
			var link = document.links[i];
			if (link.getAttribute("hasAutoSubmit")){
				return true;
			}
			if(navigator.appName.indexOf("Microsoft Internet Explorer")>(-1)){
			    addEvent(link, "contextmenu",CTHandler(link));
			}
		
			if(navigator.appName.indexOf("Netscape")>(-1)){
			    link.setAttribute("oncontextmenu",
					      "javascript:return IsAllowedRightClick(this);");
			}
			// handle auto-submit (generically)
			if ( link.protocol != "javascript:" && link.hash == "" &&
			     tester( form, link ) ) {
			    var onclickFunc = link.onclick;
			    if ( onclickFunc == null ) { 
				link.onclick = autoFunction;
			    } 
			    else 
			    {
				    var callableOnclickFunc = eval(onclickFunc);
					link.onclick = function() {
				    var rc = callableOnclickFunc();
				    if ( rc ) {
					rc = autoFunction();
				    }
				    return rc;
				    };
			    }
			}
			link.setAttribute("hasAutoSubmit",true);
	    }
	} //end if singleLink
	else
	{
		var singleLink = document.getElementById(singleLinkName);
		if (singleLink.getAttribute("hasAutoSubmit")){
			return true;
		}
		if(navigator.appName.indexOf("Microsoft Internet Explorer")>(-1)){
		    addEvent(singleLink, "contextmenu",CTHandler(link));
		}
	
		if(navigator.appName.indexOf("Netscape")>(-1)){
			singleLink.setAttribute("oncontextmenu",
				      "javascript:return IsAllowedRightClick(this);");
		}
	
		// handle auto-submit (generically)
		if ( link.protocol != "javascript:" && link.hash == "" &&
		     tester( form, singleLink ) ) {
		    var onclickFunc = singleLink.onclick;
		    if ( onclickFunc == null ) { 
		    	singleLink.onclick = autoFunction;
		    } 
		    else 
		    {
			    var callableOnclickFunc = eval(onclickFunc);
			    singleLink.onclick = function() {
			    var rc = callableOnclickFunc();
			    if ( rc ) {
				rc = autoFunction();
			    }
			    return rc;
			    };
		    }
		}
		link.setAttribute("hasAutoSubmit",true);
	} // end else singleLink
}

function processPageInputButtons() {

    var tester = function( form, link ) { return false; };
    var form = getRecordsForm();
    var autoFunction = getAutoSubmitFunctionName( form );
    if ( form ) {
	//alert("will do autosubmit");

	var testerName = form.getAttribute("enable_auto_submit_function");
	if ( testerName != null && tester.length > 0 )
	    tester = eval(testerName);
	else
            tester = function( form, object ) {
		var rc = true;
		if ( object.getAttribute( "no_auto_submit" ) )
		    rc = false;
		return rc;
	    };
    }

	    var fIdx;
	    var i;
    for (fIdx=0;fIdx<document.forms.length;fIdx++) {
	var thisForm = document.forms[fIdx];
    for (i=0;i<thisForm.elements.length;i++) {
	var element = thisForm.elements[i];

	// handle auto-submit (generically)
	if ( element.type == "button" && tester( form, element ) ) {

	    var onclickFunc = element.onclick;
	    if ( onclickFunc == null ) { // should we handle != null???
		element.onclick = autoFunction;
		//alert(element.onclick);
	    } else {
		//debug_alert("handling element with onclick: " + element.name + "(" + element.id + "); " +onclickFunc);

	        var callableOnclickFunc = eval(onclickFunc);
		element.onclick = function() {
		    var rc = callableOnclickFunc();
		    if ( rc ) {
			rc = autoFunction();
		    }
		    return rc;
		};
	    }
	}
    }
    }
}


function displayProd(key){
	var span =  document.getElementById("editions_" + key);
	span.style.display="inline";
	var spanMore =  document.getElementById("editions_more_" + key);
	spanMore.style.display="none";
	var spanHide =  document.getElementById("editions_hide_" + key);
	spanHide.style.display="inline";
}

function undisplayProd(key){
	var span =  document.getElementById("editions_" + key);
	span.style.display="none";
	var spanMore =  document.getElementById("editions_more_" + key);
	spanMore.style.display="inline";
	var spanHide =  document.getElementById("editions_hide_" + key);
	spanHide.style.display="none";
}

// Generic handling of hide/show a span or div
function toggleDisplay(action, name){

    var style = (action == "show") ? "block" : "none";
    var span;

    try {
	span = document.getElementById(name);
	span.style.display = style;

	span = document.getElementById(name + "_hide");
	span.style.display = style;

	span = document.getElementById(name + "_show");
	/* Bug# 2945 Fix: style changes to "block" previously it is "inline". -->*/
	span.style.display = (style == "none") ? "block" : "none";
    } catch ( errMsg ) {
	alert( "toggleDisplay: failure! -- " + errMsg );
	return false;
    }
}


function CTHandler(o)
{
	return function(){return IsAllowedRightClick(o);}
}

function CLHandlerRmCFRC(o)
{
	return function(){return RmCacheurlFromRightClick(o);}
}
//////////ABOVE function is used for right click /////////////////////////////////


function toggleCollapsedList(item, statusInput, formName, inputName, inputIdType, listPrefix, listSuffix) {
    var obj = document.getElementById(item);
    var status = document.getElementById(statusInput);
    var collapsedList = "";
    //alert("item: "+item);
    //alert("statusInput: "+statusInput);
    //alert("formName: "+formName);
    //alert("inputName: "+inputName);
    //alert("inputIdType: "+inputIdType);
    //alert("status.value: "+status.value);

    if (obj.style.display == "none") {
    	
	    // Get list of editions
    	var candidateForm = document.forms[formName];
    	var namedInputs = getNamedFormInputs( candidateForm, inputName );
    	//alert("namedInputs.length: "+namedInputs.length);
    	         	
    	// Get list of checked editions
    	//var selectedInputs = getCheckedFormInputs( candidateForm, inputName );
        //alert("selectedInputs.length: "+selectedInputs.length);
    	
    	// Loop thru all inputs and construct string of full names contained in hidden spans.
		  for (i=0; i<namedInputs.length; i++) {
			  
			// Only consider inputs of the ID type requested.
			  if (namedInputs[i].id == inputIdType) { 
				  
				// If NO inputs are checked, treat as if EVERY one is checked.
				  if (namedInputs[i].checked == true) {

    				  //alert("namedInputs["+i+"].value: "+namedInputs[i].value);
    				  var itemName = getMessageById(namedInputs[i].value); 
    				  //alert("itemName: "+itemName);
    				  if (collapsedList != "") {
    					  collapsedList = collapsedList + "; ";
    				  }
    				  collapsedList = collapsedList + itemName;
				  }
			  }
		  }
		  
		  // If NO inputs were checked, re-loop treating as if EVERY one is checked.
		  if (collapsedList == "") {
			  
		      // Loop thru all inputs and construct string of full names contained in hidden spans.
			  for (i=0; i<namedInputs.length; i++) {
				  
				// Only consider inputs of the ID type requested.
				  if (namedInputs[i].id == inputIdType) { 
					  
					  // If they are checkboxes, then check them all (just for clarity).
					  if (namedInputs[i].type == "checkbox") {
						  namedInputs[i].checked = true;
					  }
    				  //alert("namedInputs["+i+"].value 2: "+namedInputs[i].value);
    				  var itemName = getMessageById(namedInputs[i].value); 
    				  //alert("itemName 2: "+itemName);
    				  if (collapsedList != "") {
    					  collapsedList = collapsedList + "; ";
    				  }
    				  collapsedList = collapsedList + itemName;
				  }
			  }
		  }

		// If string isn't empty, add specified prefix and/or suffix.
    	if (collapsedList != "") {
        	if ((listPrefix != null) && (listPrefix != "")) {
        		collapsedList = listPrefix + " " + collapsedList;
        	}       
	        if ((listSuffix != null) && (listSuffix != "")) {
	        	collapsedList = collapsedList + " " + listSuffix;
	        }
        }
        
        //alert("collapsedList: "+collapsedList);
        obj.innerHTML = collapsedList;
        
        // Expand and change the image to minus sign
        obj.style.display = "inline";
        status.value = "display:inline";
    }
    else {
        // Collapse and change the image to plus sign
        obj.style.display = "none";
        status.value = "display: none";
    }   
    return true;
}

function toggleCollapsedListTimespan(item, statusInput, formName, inputName, listPrefix, listSuffix) {
    var obj = document.getElementById(item);
    var status = document.getElementById(statusInput);
    var collapsedList = "";
    //alert("item: "+item);
    //alert("statusInput: "+statusInput);
    //alert("formName: "+formName);
    //alert("inputName: "+inputName);
    //alert("status.value: "+status.value);
      
    if (obj.style.display == "none") {
    	
	    // Get list of "checked" editions
    	var candidateForm = document.forms[formName];
        var selectedValues = getCheckedFormValues( candidateForm, inputName );
        //var selectedValues = new Array();
        //selectedValues.push("SCI");
        //alert("selectedValues.length: "+selectedValues.length);
  	    //alert("selectedValues[0]: "+selectedValues[0]);
  	    switch ( selectedValues[0] ) {
  	    	case "Range Selection":
  	    		var oSelectOne = candidateForm.elements['range'];
  		    	var index = oSelectOne.selectedIndex;
  		    	//alert("index: "+index);
  		    	var selectedOptionText = oSelectOne.options[index].text;
  		    	//alert("selectedOptionText: "+selectedOptionText);
  		    	collapsedList = collapsedList + selectedOptionText;
  	    		break;

  	    	case "Date Range":
  	    		if ( typeof WOKTimespan !== "undefined" ) {
  	    			collapsedList = collapsedList + WOKTimespan.collapsedListTimespan();
  	    		}
  	    		break;

  	    	case "Year Range":
  	    		var oSelectOne = candidateForm.elements['startYear'];
  		    	var index = oSelectOne.selectedIndex;
  		    	//alert("index 1: "+index);
  		    	var selectedOptionText = oSelectOne.options[index].text;
  		    	//alert("selectedOptionText 1: "+selectedOptionText);
  	  	    	collapsedList = collapsedList + selectedOptionText;

	    		oSelectOne = candidateForm.elements['endYear'];
	    		index = oSelectOne.selectedIndex;
	    		//alert("index 2: "+index);
	    		selectedOptionText = oSelectOne.options[index].text;
	    		//alert("selectedOptionText 2: "+selectedOptionText);
	    		if (selectedOptionText != "") {
		    		if (collapsedList != "") {
						  collapsedList = collapsedList + "-";
					}
		    		collapsedList = collapsedList + selectedOptionText;
	    		}
  	    		break;
  	    		
  	    	case "Since":
  	    		// TODO: Retrieve entered since date.
  	    		var sinceDate = "";
  		    	collapsedList = collapsedList + "Since " + sinceDate;
  	    		break;
  	    	}	
       
        if (collapsedList != "") {
        	if ((listPrefix != null) && (listPrefix != "")) {
        		collapsedList = listPrefix + " " + collapsedList;
        	}       
	        if (selectedValues[0] !== "Date Range" && (listSuffix != null) && (listSuffix != "")) {
	        	collapsedList = collapsedList + " " + listSuffix;
	        }
        }
        
        //alert("collapsedList: "+collapsedList);
        obj.innerHTML = collapsedList;
        
        // Expand and change the image to minus sign
        obj.style.display = "inline";
        status.value = "display:inline";
    }
    else {
        // Collapse and change the image to plus sign
        obj.style.display = "none";
        status.value = "display: none";
    } 
    return true;
}

function collapseExpandItem(item, icon, statusInput, images_url) {
    var obj = document.getElementById(item);
    // The object to collapse or expand

    var e_alt = document.getElementById("expand_alt").value;
    var e_title = document.getElementById("expand_title").value;
    var c_alt = document.getElementById("collapse_alt").value;
    var c_title = document.getElementById("collapse_title").value;

    var image = document.getElementById(icon);
    // The plus sign or minus sign to trigger the collapse-expand

    var status = document.getElementById(statusInput);
    // The hidden field to hold the collapse-expand status for persistence

    if (obj.style.display == "none") {
        // Expand and change the image to minus sign
        obj.style.display = "block";
        image.src = images_url + "/collapse.gif";
        image.alt = document.getElementById("collapse_alt").value;
        image.title = document.getElementById("collapse_title").value;
        status.value = "display: block";
    }
    else {
        // Collapse and change the image to plus sign
        obj.style.display = "none";
        image.src = images_url + "/expand.gif";
        image.alt = document.getElementById("expand_alt").value;
        image.title = document.getElementById("expand_title").value;
        status.value = "display: none";
    }
}

function collapseExpandItemList(itemList, icon, statusInput, images_url) {
    var delimiter = ",";
    var items = itemList.split(delimiter);
    var image = document.getElementById(icon);
    // The plus sign or minus sign to trigger the collapse-expand

    var e_alt = document.getElementById("expand_alt").value;
    var e_title = document.getElementById("expand_title").value;
    var c_alt = document.getElementById("collapse_alt").value;
    var c_title = document.getElementById("collapse_title").value;

    var status = document.getElementById(statusInput);
    // The hidden field to hold the collapse-expand status for persistence

    if (image == null || status == null) {
        return false;
    }

    var obj = null;
    for (i=0; i<items.length; i++) {
        obj = document.getElementById(items[i]);
        // The object to collapse or expand

        if (obj == null) {
            continue;
        }

        if (obj.style.display == "none") {
            // Expand and change the image to minus sign
            obj.style.display = "";
            if (i == 0) {
                image.src = images_url + "/collapse.gif";
                image.alt = c_alt;
                image.title = c_title;
                status.value = "display: block";
            }
        }
        else {
            // Collpase and change the image to plus sign
            obj.style.display = "none";
            if (i == 0) {
                image.src = images_url + "/expand.gif";
                image.alt = e_alt;
                image.title = e_title;
                status.value = "display: none";
            }
        }
    }
    return true;
}

function mark_records_by_range( rangeStart, rangeEnd, validate ) {
    var markForm = document.forms["mark_records_form"];

    if(!markForm) { return false; }

    var from = markForm.elements["mark_from"];
    var to = markForm.elements["mark_to"];

    if ( !(from && to) ) { return false; }

    //we only need to validate user input. If the user selects
    //"all records on page", we don't want to validate.
    var valid = true;
    if(validate) {
        valid = check_ml_input();
    }

    if(!valid) { return false; }

    from.value = rangeStart;
    to.value = rangeEnd;
    markForm.submit();

    return false;
}

//Updated for WOKVX-8697 autosubmit code update.
function mark_selected_records( checkboxForm, isAsync ) {
  var markForm = document.forms["mark_records_form"];
  var checkedRecs = 0;
  var rc = false;

  if ( markForm ) {

      var selectedIds = markForm.elements["selectedIds"];

      checkedRecs = setSelected( selectedIds, checkboxForm );

      if ( checkedRecs > 0 ) {
	  if ( isAsync ) {
	      rc = submitAsyncForm( markForm, null, handleErrorMessageDataPopUp);
	  } else
	      markForm.submit();
      } else {
          if(!isAsync) {
              var errorMessage =
		  getMessageById('quickOutputSelectAtLeastOneCheckbox');
              alert(errorMessage);
          } else
	      rc = true;

      }
  }

  return rc;
}


function setSelected(target, candidateForm, checkboxName, delimiter) {
  if ( ! delimiter || delimiter.length < 1 )
    delimiter = ";";
  if ( ! checkboxName || checkboxName.length < 1 )
    checkboxName = "marked_list_candidates";

  var result = -1;

  var targetForm = ( target != null ) ? target.form : null;

  if ( targetForm == null )
    return result;

  var formName = targetForm.getAttribute('records_form_name');

  if ( candidateForm == null ) {
      candidateForm = getRecordsForm( formName );
      if ( ! candidateForm )
		  candidateForm = targetForm;
  }

  var selectedValues = getCheckedFormValues( candidateForm, checkboxName );

  if ( selectedValues.length > 0 )
    target.value = selectedValues.join( delimiter );

  return selectedValues.length;
}

// If there are multiple inputs with the specified name, this returns all of them. (in which case "type" will be "undefined")
// If there is only one, it puts it into the first/only element of the array.
function getNamedFormInputs( form, inputName ) {

  var results = new Array();

 if (form != null && (typeof form.elements !='undefined') && form.elements[inputName] != null ) {
      var type = form.elements[inputName].type;
      switch ( type ) {
	      case "hidden":
	      case "checkbox":
	      case "radio":
			  results[0] = form.elements[inputName];
			  break;
	      default:
		  	  results = form.elements[inputName];
      }
  }

  return results;
}

function getCheckedFormInputsOrValues( form, inputName, valuesOnly ) {

    if ( valuesOnly == null )
		valuesOnly = false;

    var selected = new Array();
    var candidates = getNamedFormInputs( form, inputName );
    //alert("candidates: "+candidates);
    if ( candidates.length > 0 ) {
		for ( var i = 0; i < candidates.length; ++i ) {
			
		    if ( candidates[i].checked == true ) {

				var input = candidates[i];
				selected.push( valuesOnly ? input.value : input );
		    }
		}
    }

    return selected;
}

function getCheckedFormInputs( form, inputName ) {

    return getCheckedFormInputsOrValues( form, inputName, false );
}

function getCheckedFormValues( form, inputName ) {

    return getCheckedFormInputsOrValues( form, inputName, true );
}

/*** not needed yet
MARK_TYPE {
  SELECTED : 0,
  PAGE : 1,
  RANGE : 2,
  ALL : 3
}
***/

var RECORDS_MAX = 500000;

function getRecordsForm( formName ) {

    var candidateForm = null;
    var candidateFormJQ = null;

    if ( formName && formName.length > 0 ) {
		candidateForm = document.forms[formName];
    }
    if ( ! candidateForm ) {
    	if ( typeof(jQuery) == 'function' ) {
    		candidateFormJQ = $('form[name="records_form"]');
    		if ( !candidateFormJQ.size() ) {
    			candidateFormJQ = $('form[name="summary_records_form"]');
    			if ( !candidateFormJQ.size() ) {
					candidateFormJQ = $('form[name="full_record_form"]');
					if ( !candidateFormJQ.size() ) {
						return null;
					}
				}
			}
			candidateForm = candidateFormJQ.get(0);
    	} else {
    		candidateForm = document.getElementsByName("records_form");
    		if ( candidateForm.length === 0 ) {
    			candidateForm = document.getElementsByName("summary_records_form");
    			if ( candidateForm.length === 0 ) {
    				candidateForm = document.getElementsByName("full_record_form");
    				if ( candidateForm.length === 0 ) {
    					return null;
    				}
    			}
    		}
    	}
    }

    return candidateForm;
}

function mark_records( inputForm, markType ) {

  if ( inputForm != null ) {

      var recordsForm = getRecordsForm();
      if ( recordsForm == null )
	  	  recordsForm = inputForm;

	  // var markType = MARK_TYPE.SELECTED;
	  var option = markType;
	  if (option == null) {
		  var checked = getCheckedFormValues( inputForm, "value(record_select_type)" );
	
		  if ( checked.length > 0 ) {
		      // we expect only 1, so take first one
		      option = checked[0];
		  }
	  }
	  
      switch ( option ) {
	    case 'allrecord':
	    case 'pagerecords':
	      var inputs = getNamedFormInputs( inputForm, "marked_list_candidates" );
	      var length = inputs.length;

	      if ( length < 1 ) {

			inputs = getNamedFormInputs( recordsForm, "marked_list_candidates" );
			length = inputs.length;
	      }
	      if ( length > 0 ) {
			var start = inputs[0].value;
			var end = inputs[length - 1].value;
			mark_records_by_range( start, end, false );
	      }
	      if ( length == 0) {
			  var errorMessage = getMessageById('quickOutputSelectAtLeastOneCheckbox');
	          alert(errorMessage);
		  }
	      break;
	    case 'range':
	      var from = inputForm.elements["markFrom"];
	      var to = inputForm.elements["markTo"];
	      if ( from && to ) {
	        var fromValue = trimString( from.value );
	        var toValue = trimString( to.value );
			mark_records_by_range( fromValue, toValue, true );
	      }
	      break;
	    case 'allrecords':
	      mark_records_by_range( 1, RECORDS_MAX, false );
	      break;
            case 'pagerecordsByValue':
		var checked = checkAllByName();
		if ( checked < 1 )
		    break;
		// else fall through
	    case 'selrecord':
	    case 'selrecords':
	    default:
	      mark_selected_records( recordsForm );
    }
  }

  return false;
}

function trimString( string ) {

  if ( string.length ) {
      string = string.replace( /^\s\s*/, '' );

      var whiteSpace = /\s/;
      var i = string.length;

	  while ( whiteSpace.test(string.charAt(--i)) ) ;

      return string.slice(0, i + 1);
  }
  return "";
}

function fillTodayDateById() {
  	//populate and format the date value to be written to the field.
	var today = new Date();
	var month = new String(today.getMonth() + 1);
	var day = new String(today.getDate());
	var year = today.getFullYear();
	if (month.length == 1) {
		month = "0"+month;
	}
	if (day.length == 1) {
		day = "0"+day;
	}
  	var formattedDate = year+"-"+month+"-"+day;
  	//get the field passed to us to populate
  	var since = document.getElementById("since");
  	if (!since || since.value.length < 1 )
  		since.value = formattedDate;
}

function getMessageById( id ) {

  var message;
  var element = document.getElementById( id );

  if ( element.tagName == "input" )
    message = element.value;
  else
    message = element.innerHTML;

  return trimString( message );
}

function resetOptionsToDefaults( inputForm, checkboxName ) {

  if ( ! checkboxName || checkboxName.length < 1 ) {
    checkboxName = "fields";
  }

  var checkboxes = getNamedFormInputs( inputForm, checkboxName );
  for ( var i = 0; i < checkboxes.length; ++i ) {
    if (checkboxes[i].getAttribute("default") == "default") {
        checkboxes[i].checked = true;
    } else {
        checkboxes[i].checked = false;
    }
  }
  inputForm.elements["value(select_All)"].checked = false;
  saveForm(inputForm.id);
  return false;
}

function checkAllByName( inputForm, checkboxName ) {

  if ( ! inputForm )
      inputForm = getRecordsForm();
  if ( ! checkboxName || checkboxName.length < 1 ) {
    checkboxName = "marked_list_candidates";
  }

  var checked = 0;

  var checkboxes = getNamedFormInputs( inputForm, checkboxName );
  for ( var i = 0; i < checkboxes.length; ++i ) {
      ++checked;
      checkboxes[i].checked = true;
  }
  return checked;
}

function checkOrUncheckAllByName( inputForm, checkboxName ) {

	  if ( ! inputForm )
	      inputForm = getRecordsForm();
	  if ( ! checkboxName || checkboxName.length < 1 ) {
	    checkboxName = "marked_list_candidates";
	  }

	  var checked = 0;
	  var isChecked = inputForm.elements["select_All"].checked;
	 
	  var checkboxes = getNamedFormInputs( inputForm, checkboxName );
	  for ( var i = 0; i < checkboxes.length; ++i ) {
	      ++checked;
	      checkboxes[i].checked = isChecked;
	  }
	  return checked;
	}

function toggleCheckBoxesByName( formName, checkboxName, toggler ) {

	  var inputForm = document.forms[ formName ];
	  if ( ! inputForm )
	      inputForm = getRecordsForm();
	  if ( ! checkboxName || checkboxName.length < 1 ) {
	    checkboxName = "marked_list_candidates";
	  }

	  var checked = 0;
	  var isChecked = inputForm.elements[toggler].checked;
      //alert("checked=" + isChecked);	 
	  var checkboxes = getNamedFormInputs( inputForm, checkboxName );
	  for ( var i = 0; i < checkboxes.length; ++i ) {
	      ++checked;
	      checkboxes[i].checked = isChecked;
	  }
	  saveForm( formName );
	  return checked;
}

// With a given id, this function will return the associated string. 
function confirmationMessage( id ) {
	var msg = null;
	if ( id ) {
		msg = getMessageById(id);
	}
	if ( msg && msg.length > 0 )
		return confirm( msg );

	return false;
}

//Changes the action of the current output form with the specified URL
//Fixed WOKVX-11287 by addind the rurl parameter to the outputform action
function changeFormActionForSaveToRID(input, url, rurl) {
	var outputForm = getOutputForm();
	if ( input && outputForm ) {

	      var inputForm = input.form;

	      if ( inputForm ) {
		  var formName = inputForm.getAttribute('input_form_name');

		  var form = document.forms[ formName ];

		  if ( form )
		      inputForm = form;
	      }

	      var foundFilters = setFilters( inputForm, outputForm );

	      outputForm.elements[ "format" ].value = input.name;

	      var recordsForm = getRecordsForm();
	      if ( recordsForm == null )
		  	  recordsForm = inputForm;

	      var option = "";
	      var checked = getCheckedFormValues( inputForm, "value(record_select_type)" );

	      if ( checked.length > 0 ) {
			  // we expect only 1, so take first one
			  option = checked[0];
	      }
	      if( option =='range') {
	    	  var valid = true;
	    	  valid = check_qo_input();
	    	    if(!valid) { return false; }

	      }
	}
	if (outputForm && url) {
		outputForm.action = url + "&rurl=" + encodeURIComponent(rurl);
	}
	return true;
}

// Asks the user to certify that the records that he/she would like to add to his/her RID
// publication list are his/her own.
function certifyPublicationsForRID() {
      var accept = confirmationMessage('quickOutputCertifyPublicationsForRID');
      return accept;
}

// Called when clicking on the "Save to ResearcherID" button
// Fixed WOKVX-11287 by adding the rurl parameter to the url 
function outputRIDRecords(form, url, rurl) {
	var outputForm = getOutputForm();
	
	if (outputForm && outputForm.colName.value == "DIIDW") {
		outputForm.mode.value = "outputServiceForSaveToRID";
	}
	
	if (url && rurl) {
		url = url + "&rurl=" + encodeURIComponent(rurl);
	}
	
	output_records(form, outputForm, url, null, certifyPublicationsForRID);
	return false;
}

function output_records_by_range( rangeStart, rangeEnd, validate, url, presubmitFunction ) {
  	var outputForm = document.forms["output_form"];

    if(!outputForm) { return false; }

    var from = outputForm.elements["mark_from"];
    var to = outputForm.elements["mark_to"];

    if ( !(from && to) ) { return false; }

    //we only need to validate user input. If the user selects
    //"all records on page", we don't want to validate.
    var valid = true;
    if(validate) {
        valid = check_qo_input();
    }

    if(!valid) { return false; }
    
    var submit = true;
	if ( presubmitFunction ) {
		submit = presubmitFunction( outputForm );
	}
	if ( submit == true ) {
		if (outputForm && url) {
			outputForm.action = url;
		}
	    from.value = rangeStart;
	    to.value = rangeEnd;
	    if ( invokeAutoSubmit() )
	        outputForm.submit();
	}
    return false;
}

function output_selected_records( checkboxForm, outputForm, url, presubmitFunction ) {

    if ( outputForm == null )
    	outputForm = document.forms[ "output_form" ];

  	var checkedRecs = 0;
  	if ( outputForm ) {
  		
	    var selectedIds = outputForm.elements["selectedIds"];
      	checkedRecs = setSelected( selectedIds, checkboxForm );

      	if ( checkedRecs > 0 ) {
      		var submit = true;
      		if ( presubmitFunction ) {
      			submit = presubmitFunction( outputForm );
      		}
      		if ( submit == true ) {
      			if (outputForm && url) {
      				outputForm.action = url;
      			}
	      		disable_auto_submit();
				outputForm.submit();
      		}
      	} else {
            var errorMessage = getMessageById('quickOutputSelectAtLeastOneCheckbox');
            alert(errorMessage);
        }
  	}
  	return false;
}

function FIELDS() { return "fields"; };

function setFilters( inputForm, outputForm, defaultToAll ) {

    var found = false;

    if ( inputForm == null )
		return found;

    if ( defaultToAll == null )
	defaultToAll = true;

    if ( outputForm == null )
		outputForm = getOutputForm();

    var filters = outputForm.elements[ "filters" ];

    if ( filters == null )
		return found;

    // look for checked checkboxes
    var numFilters = setSelected( filters, inputForm, "fields", " " );

    if ( numFilters == 0 && defaultToAll ) {
		var fields = getNamedFormInputs( inputForm, "fields" );

		if ( fields.length == 0 ) {
		    // try for selection

		    fields = getCheckedFormInputs( inputForm, "fields_selection" );   	
		    if ( fields != null && fields.length != 0) {
				found = true;
				var values = fields[0].value;

				var optName = fields[0].id + "_option";
				var options = getCheckedFormInputs( inputForm, optName );

				if ( options ) {
				    for ( var i = 0; i < options.length; ++i )
					values += " " + options[i].value;
				}
				filters.value = values;
		    }
		}
    } else
		found = true;

    return found;
}

function getOutputForm( formName ) {

    var candidateForm = null;

    if ( formName && formName.length > 0 ) {
		candidateForm = document.forms[formName];
    }
    if ( ! candidateForm ) {
		candidateForm = document.forms["output_form"];
		if ( ! candidateForm ) {
		    candidateForm = getRecordsForm();
		}
    }

    return candidateForm;
}

var MAX_OUTPUT_RECORDS = 500;

function prepareAllRecordsOnPageForOutput( inputs ) {
	var i;
	var allIds = new Array();
	for ( i = 0; i < inputs.length; i++ ) {
		allIds.push(inputs[i].value);
	}
	if(document.forms["output_form"].elements["product"].value != "DIIDW") {
	  document.forms["output_form"].elements["selectedIds"].value = allIds.join(";");
	}
	if(document.forms["output_form"].elements["totalMarked"]) {
		document.forms["output_form"].elements["totalMarked"].value = inputs.length;
	}
	if(document.forms["summary_records_form"].elements["product"].value != "DIIDW") {
	   document.forms["summary_records_form"].elements["selectedIds"].value = allIds.join(";");
	}
	if(document.forms["summary_records_form"].elements["totalMarked"]) {
	  document.forms["summary_records_form"].elements["totalMarked"].value = inputs.length;
	}
}

function output_records( input, outputForm, url, orderType, presubmitFunction ) {

  if ( outputForm == null ) {
      outputForm = getOutputForm();
  }

  if ( input && outputForm ) {

      var inputForm = input.form;

      if ( inputForm ) {
	  var formName = inputForm.getAttribute('input_form_name');

	  var form = document.forms[ formName ];

	  if ( form )
	      inputForm = form;
      }

      var foundFilters = setFilters( inputForm, outputForm );

      outputForm.elements[ "format" ].value = input.name;

      var recordsForm = getRecordsForm();
      if ( recordsForm == null )
	  	  recordsForm = inputForm;

      var option = "";
      var checked = getCheckedFormValues( inputForm, "value(record_select_type)" );

      if ( checked.length > 0 ) {
		  // we expect only 1, so take first one
		  option = checked[0];
      }
	
      //Once tests are validated for ranges and other options, disable autosubmit
      switch ( option ) {
	      case 'allrecord':
	      case 'pagerecords':
			  var checkboxName = "marked_list_candidates";
			  var inputs = getNamedFormInputs( inputForm, checkboxName );
			  var length = inputs.length;

			  if ( length < 1 ) {

			      inputs = getNamedFormInputs( recordsForm, checkboxName );
			      length = inputs.length;
			      prepareAllRecordsOnPageForOutput(inputs);
			  }
			  if ( length > 0 ) {
			      var start = inputs[0].value;
			      var end = inputs[length - 1].value;
			      prepareAllRecordsOnPageForOutput(inputs);
				  output_records_by_range( start, end, false, url, presubmitFunction );
			  }
			  if ( length == 0) {
				  var errorMessage = getMessageById('quickOutputSelectAtLeastOneCheckbox');
		          alert(errorMessage);
		          do_output = false;
			  }
			  break;
	      case 'range':
			  var from = inputForm.elements["markFrom"];
			  var to = inputForm.elements["markTo"];
			  var fromValueString;
			  var toValueString;
			  var eids_max_recs_limit = EIDS_MAX_RECORDS;
			  if ( from && to ) {
				  fromValueString = trimString( from.value );
				  toValueString = trimString( to.value );
				  var numRecs = parseInt(toValueString) - parseInt(fromValueString) + 1;
				  if ( (numRecs > eids_max_recs_limit ) && (orderType == 'EIDS') )	{
				    	allrecs_morethan_maxrec_eids_notice =  getMessageById("ml_eids_morethan_maxrec_output_notice");
				        alert(allrecs_morethan_maxrec_eids_notice);        
				    }
				  else {
					  output_records_by_range( fromValueString, toValueString, true, url, presubmitFunction );
				  }
			  }
			  
			  break;
		  case 'allrecords':
			    var current_num_ml_recs = CURRENT_NUM_MARKED_LIST_RECORDS;
		        var qo_max_record_limit = QUICK_OUTPUT_MAX_RECORDS;
		        var eids_max_recs_limit = EIDS_MAX_RECORDS;
		        
		        var do_output = true;
			    if ( current_num_ml_recs > qo_max_record_limit) {
			        allrecs_morethan_maxrec_output_notice =  getMessageById("ml_allrecs_morethan_maxrec_output_notice");
			        //do_output = confirm(allrecs_morethan_maxrec_output_notice);
			        alert(allrecs_morethan_maxrec_output_notice);
					do_output = true;
			    }
			    
			    if ( (current_num_ml_recs > eids_max_recs_limit ) && (orderType == 'EIDS') )	{
			    	allrecs_morethan_maxrec_eids_notice =  getMessageById("ml_eids_morethan_maxrec_output_notice");
			        alert(allrecs_morethan_maxrec_eids_notice);
			        do_output = false;
			    }
			    
			    if (do_output) {
			    	if (current_num_ml_recs > MAX_OUTPUT_RECORDS) {
			    		output_records_by_range( 1, MAX_OUTPUT_RECORDS, false, url, presubmitFunction );
			    	}
			    	else {
			    		output_records_by_range( 1, current_num_ml_recs, false, url, presubmitFunction );
			    	}
	        	}
			  break;
              case 'pagerecordsByValue':
		  var checked = checkAllByName();
		  if ( checked < 1 )
		      break;
		  // else fall through
	      case 'selrecord':
	      case 'selrecords':
	      default:
			  output_selected_records( recordsForm, outputForm, url, presubmitFunction );
      }
  }
  return false;
}

//Added below two functions for bug fix: 1010.

function quick_summary_output(output_form)
{
	if (document.output_form.fields_selection[0].checked == true) {
		document.output_form.fullrec_fields_option.checked = false;

	} else if (document.output_form.fields_selection[1].checked == true) {
		document.output_form.bib_fields_option.checked = false;
	}
}

function quick_fullrecord_output(records_form)
{
	if (document.records_form.fields_selection[0].checked == true) {
		document.records_form.fullrec_fields_option.checked = false;

	} else if (document.records_form.fields_selection[1].checked == true) {
		document.records_form.bib_fields_option.checked = false;
	}
}

function isEnterEvent( objevent ) {

  if (! objevent)
      objevent = event;

  var charcode = objevent.which;
  if (! charcode)
      charcode = objevent.keyCode;

  var is_safari = navigator.userAgent.indexOf('Safari')>0;
  if (is_safari && charcode == 3)
      charcode = 13;

      return (charcode == 13);
}

function setSelectedForForm( form ) {
  var rc = true;
  if ( form ) {
    var selectedIds = form.elements['selectedIds'];
    var target = 'isickref';
    var numSet = setSelected( selectedIds, form, target );
  }
  return true;
}

function saveFormPreferences( form ) {

  if ( form ) {
      return submitAsyncForm( form, "savePreferencesUrl" );
  }
  return false;
}

function saveMarkedListPreferences( form ) {
  var rc = false;
  if ( ! form )
      form = getOutputForm();

  if ( setFilters( form, null, false ) ) 
      return saveFormPreferences( form );

  return rc;
}

function setOtherPageSelectedRecCount( totalSelected, checkboxName, formName ) {
    var count;

    var input = document.getElementById( "selectedRecs" );
    if ( input ) {
	if ( totalSelected == null )
	    count = 0;
	else {
	    if ( ! checkboxName )
		checkboxName = "isickref";

	    var form = getRecordsForm( formName );
	    var checked = getCheckedFormValues( form, checkboxName );

	    count = totalSelected - checked.length;
	}
	input.value = count;
    }

    return count;
}
function numberMatch() {
	
	var re = new RegExp("\\w-\\d{4}-\\d{4}");
    var textValue = document.getElementById('value(input3)').value;
    /*check entered value is Empty if not then check for expression match
      if expression match fails display expression match error message
    */
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('author.search.error.fullName').style.display = 'none';
    document.getElementById('author.search.invalidQuery').style.display = 'none';
    
    if (textValue == null || textValue.length == 0) {
    	if (document.getElementById('errorMessage').style.display == 'none') {                       
    		document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('author.search.reasearchId.validation').style.display = 'block';
        }
    } else if (textValue.match(re)) {
    	document.getElementById('RID').value = textValue;
    	document.getElementById('WOS_AuthorSearch_input_form').submit();
    } else {
    	if (document.getElementById('errorMessage').style.display == 'none') {
    		document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('author.search.reasearchIdFormat').style.display = 'block';
        }
    }              
}

function validateAuthorName() {

	var authorName = null;

	var firstInitialRegEx = new RegExp("[@%&*#!$\\d]");
	var lastNameRegEx1 = new RegExp("[@%&#!\\d]");
	var lastNameRegEx2 = new RegExp("\\*[a-zA-Z]?");
	var lastNameRegEx3 = new RegExp("\\$[a-zA-Z]?");
	
	var lastName = document.getElementById('value(input1)').value;
    var firstInitial = document.getElementById('value(input2)').value;
    var exactMatch = document.getElementById('exactMatch').checked;
	
	document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('author.search.reasearchIdFormat').style.display = 'none';
    document.getElementById('author.search.reasearchId.validation').style.display = 'none';
    if (lastName == null || lastName.length == 0) {
    	document.getElementById('author.search.invalidQuery').style.display = 'none';
    	document.getElementById('errorMessage').style.display = 'block';
    	document.getElementById('author.search.error.fullName').style.display = 'block';
    	checkForErrorSpans();
    } else if ( firstInitial == null || firstInitial.length == 0 || firstInitial == ' ') {
    	document.getElementById('author.search.invalidQuery').style.display = 'none';
    	document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('author.search.error.fullName').style.display = 'block';
		checkForErrorSpans();
    } else if ( firstInitial.match(firstInitialRegEx) ) {
    	document.getElementById('author.search.error.fullName').style.display = 'none';
    	document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('author.search.invalidQuery').style.display = 'block';
		checkForErrorSpans();
    } else if ( lastName.match(lastNameRegEx1)) {
    	document.getElementById('author.search.error.fullName').style.display = 'none';
    	document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('author.search.invalidQuery').style.display = 'block';
		checkForErrorSpans();
    } else if ( lastName.match(lastNameRegEx2) && exactMatch == true) {
    	document.getElementById('author.search.error.fullName').style.display = 'none';
    	document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('author.search.invalidQuery').style.display = 'block';
		checkForErrorSpans();
    } else if ( lastName.match(lastNameRegEx3) && exactMatch == true) {
    	document.getElementById('author.search.error.fullName').style.display = 'none';
    	document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('author.search.invalidQuery').style.display = 'block';
		checkForErrorSpans();
    } else {   
    	authorName = lastName+" "+firstInitial;
        // Surround term with single quotes if term == boolean operators 'and' or 'or'. 
    	if (lastName.toUpperCase() == 'OR' || lastName.toUpperCase() == 'AND' || lastName.toUpperCase() == 'NOT' || lastName.toUpperCase() == 'SAME' ) {
        	authorName = "\""+authorName+"\"";
        } 
        	
        document.getElementById('authorName').value = authorName;
        document.getElementById('WOS_AuthorSearch_input_form').submit();
		checkForErrorSpans();
    }
}

function clearAuthorSearchFields(pType) {
	document.getElementById('value(input1)').value="";
	document.getElementById('value(input2)').value="";
	checkForErrorSpans();
	saveForm('WOS_AuthorSearch_input_form');
}

function checkForErrorSpans() {

	if (document.getElementById('searchErrorMessage')!= null && document.getElementById('searchErrorMessage').style.display == "") {
		document.getElementById('searchErrorMessage').style.display = 'none';
    } else if (document.getElementById('searchErrorMessageDiv')!= null && document.getElementById('searchErrorMessageDiv').style.display == "") {
    		document.getElementById('searchErrorMessageDiv').style.display = 'none';
    } else if (document.getElementById('noRecordsDiv')!= null && document.getElementById('noRecordsDiv').style.display == "") {
    		document.getElementById('noRecordsDiv').style.display = 'none';
    } else {
    	
    }
}

function check_author_variant_inputs(form) {

	var i;
	var hasInput = false;
	
	var authorVariantSelectionElements = document.getElementsByName('radiobutton');
	if (authorVariantSelectionElements != null) {
		for (i = 0; i < authorVariantSelectionElements.length; i++) {
			var authorVariantSelectionElement = authorVariantSelectionElements[i];
			if (authorVariantSelectionElement.checked) {
				hasInput = true;
				break;
			}
		}
	}
	
	if (!hasInput) {
		var errorMessage = document.getElementById('refineSelectAtLeastOneRadioButton').value;
		alert(errorMessage);
	}

	return hasInput;
}

function setAuthorVariantName(radioObj){
	
	var radioLength = radioObj.length;
	if (typeof radioLength == 'undefined') {
		document.forms['author_variant_more_form'].authorName.value = radioObj.value;
		return radioObj.value;
	}
	
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			document.forms['author_variant_more_form'].authorName.value = radioObj[i].value;
			return radioObj[i].value;
		}
	}
	return "";
}

function authorEnterFunction(event) {
	if (event && event.keyCode == 13) {
		validateAuthorName();
		
	} else {
		return false; 
	}		  
}

/*--------------- For wos-chem numerical fields ---------------*/
function toggleInputDisplay(item1, item2, operatorInput) {
    var obj1 = document.getElementById(item1);
    var obj2 = document.getElementById(item2);
    
    if(operatorInput == "between"){
    	obj1.style.display = 'inline';
    	obj2.style.display = 'inline';
    }
    else{
    	obj1.value = '';
    	obj1.style.display = 'none';
    	obj2.style.display = 'none';
    }	
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 58 && charCode > 44 && charCode != 47))
       return true;
    else if (charCode == 8)return true;

    return false;
}
/*--------------- For wos-chem numerical fields ---------------*/



function check_email(form) {
	
		
	var email_to = $('#' + form.id + ' input[name="emailAddress"]').val();
	
	var re = /^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/;
	var emailTos = new String(email_to);
	var emailTo = emailTos.split(';');
	if(emailTo.length == 1 ) {
		emailTo = emailTos.split(',');
	}

	
	var toEbox = document.getElementById('emailAddress_error');
	toEbox.style.display = 'none';
	
	for(i=0; i < emailTo.length; i++) {

		emailTo[i] = emailTo[i].replace(/\s/g, "");
          
		if (!emailTo[i].match(re) ||(emailTo[i].length ==0 && i ==0)) {
			toEbox.style.display = 'block';
			return false;
		} 
	}
	var str = emailTo.join(",");
	form.emailAddress.value = str;
	
	return true;	
}

function swapCheckboxLabel(checkboxvar, labelId, uncheckedText, checkedText) {
	//Swaps the text on a label associated with a checkbox
	//Used to make dynamic labels for JAWS
	//To call this include the following in the checkbox:
	//onclick="swapCheckboxLabel(this, 'labelId', 'uncheckedText', 'checkedText');"
	var labelvar = document.getElementById(labelId);
	if(!checkboxvar.checked) {
		labelvar.innerHTML = uncheckedText;
	}
	else {
		labelvar.innerHTML = checkedText;
	}
}

/*--------------- this should always be last in the script ---------------*/
addEvent(window, "load", function(){
	processPageLinks();
	    //	processPageInputButtons();
    });
	
function proxyAddToPubList_submit(){
    var form = document.forms["ProxyClaimForm"];
    var error_msg = document.getElementById('no.radio.button.selected');
    var Radios = getNamedFormInputs(form, 'rid_steamID');
    var len = Radios.length;
    if (typeof len == 'undefined') {
        len = 1;
    }
    var atleastOneRadioChecked = false;
    for(i = 0; i < len; i++) {
        if(Radios[i].checked == true) {
        	atleastOneRadioChecked = true;
        }
    }
    
    if (atleastOneRadioChecked) {
    	form.submit;
    }
    else {
    		alert(error_msg.value);
    		return false;
    }
    return true;
}
	
	
