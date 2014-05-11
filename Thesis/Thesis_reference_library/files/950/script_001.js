// Commonly used functions that depends on layout of _style2 template
window.getSize=function() {
  if (typeof(window.innerWidth)=='number') return {width:window.innerWidth, height: window.innerHeight}
  if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) return {width:document.documentElement.clientWidth, height: document.documentElement.clientHeight}
  if (document.body && (document.body.clientWidth || document.body.clientHeight)) return {width:document.body.clientWidth, height: document.body.clientHeight}
  return {width:0,height:0}
}
var resizeTimer;
function doResize() {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer=setTimeout("contentResize( )", 100);
  return true;
}
function doResizeHeight() {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer=setTimeout("heightResize( )", 100);
  return true;
}

var minContentWidth = 450;
var minContentHeight = 530;
var contentHorizontalMargins = (document.all) ? 375 : 389;
var contentVerticalMargins = 0;
var resizeAgain=true;
var isGecko = navigator.userAgent.toLowerCase().indexOf("gecko") + 1; // 0~false
function contentResize() {
  var ws=window.getSize();
  var h=ws.height
  var w=ws.width
  if(w && h) {
    h -= contentVerticalMargins;
    if (h<minContentHeight) h = minContentHeight;
    w -= contentHorizontalMargins;
    if (w<minContentWidth) w = minContentWidth;
    var contentElement = document.getElementById('Content');
    if (!contentElement) return true;
    var style=contentElement.style;
    style.height=h+"px";
    style.width=w+"px";
    if (document.getElementsByTagName) {
        style=document.getElementsByTagName('body').item(0).style;
        style.height=h+"px";
    }
    if (resizeAgain) {
      resizeAgain=false;
      setTimeout("contentResize()", 50);
    } else {
      resizeAgain=true;   // for next run
      if (location.hash) {
        if (isGecko) {
          location.hash = location.hash; // scroll to anchor, IE doesn't need it, Opera is broken
        } else if (document.anchors) {                // may help browsers with anchors collection support (Opera...)
          var anchor = document.anchors[location.hash];
          if (anchor && anchor.scrollIntoView) anchor.scrollIntoView();
        }
      }
    }
  }
  return true;
}
function heightResize() {
  var ws=window.getSize();
  var h=ws.height
  if(h) {
    h -= contentVerticalMargins;
    if (h<minContentHeight) h = minContentHeight;
    var style=document.getElementById('Content').style;
    style.height=h+"px";
    if (document.getElementsByTagName) {
        style=document.getElementsByTagName('body').item(0).style;
        style.height=h+"px";
    }
    if (resizeAgain) {
      resizeAgain=false;
      setTimeout("heightResize()", 50);
    } else {
      resizeAgain=true;   // for next run
      if (location.hash) {
        if (isGecko) {
          location.hash = location.hash; // scroll to anchor, IE doesn't need it, Opera is broken
        } else if (document.anchors) {                // may help browsers with anchors collection support (Opera...)
          var anchor = document.anchors[location.hash];
          if (anchor && anchor.scrollIntoView) anchor.scrollIntoView();
        }
      }
    }
  }
  return true;
}

/* Function to load images.
 *	note: make this empty method so that
 * 1) mininize code changes; 2) for future integration; 3) easier to take the feature back
 */

/* function that will be called from document.onload event
 * main event handling, for all pages */
function preload() {
	load();
}

/* function that will be called from document.onload event
 * override this function to do individual onload event */
function load()
{
}

/* Function to show help page */
function popupHelp(url)
{
    /* Do not popup new window if link target is set to _self */
    var theEvent = window.event || arguments.callee.caller.arguments[0];
    if (theEvent) {
        var link = theEvent.srcElement || theEvent.target;
        if (link && link.target == '_self') {
            window.location = url;
            return false;
        }
    }

	popupHelp550(url);
}

/* Function to open up a new browser window, without a navigation bar */
function newWindow(url)
{
    var new_window;
    var windowProperties;
    windowProperties = "width=750,height=700,top=30,left=230,toolbar=0,menubar=0,resizable=1,scrollbars=yes";
    if(new_window==null) {
       new_window = window.open(url,null,windowProperties);
    } else {
       new_window.document.replace(url);
    }
}

function goTo( url ) {
    window.location.href = url;
}

// for use like <a href="xxx" onClick="return parentWindowGoTo(this.href);">xxx</a>
function parentWindowGoTo(url, closeSelf) {
	if (self.opener != null) {
		self.opener.location = url;
		self.opener.focus();
	} else {
		self.location = url;
	}
	if(closeSelf) self.close();
	return false;
}

/* Function to go to selected item in drop down menu */
function GoTo(sel, targetstr)
{
  var index = sel.selectedIndex;
  if (sel.options[index].value != '') {
	 if (targetstr == 'blank') {
	   window.open(sel.options[index].value, 'win1');
	 } else {
	   var frameobj;
	   if ((frameobj = eval(targetstr)) != null)
		 frameobj.location = sel.options[index].value;
	 }
  }
}


////
///	search related
//

/**	function to show next search page */
function searchNextResultPage(aForm, aOffset)
{
    var startPage=null;

    for(var i=0; i < aForm.elements.length; i++) {
        if(aForm.elements[i].name == 'startPage') {
            startPage=aForm.elements[i];
            break;
        }
    }

    if(startPage != null) {
	    startPage.value = eval(startPage.value) + aOffset;
	    aForm.submit();
    }
}


/**	function to submit search form with first page */
function searchShowFirstPage(aForm, aCheckSort)
{
	if (aCheckSort) {
        var sortBy=getFormInput(aForm.name, 'sortBy');

        if (sortBy.defaultChecked == sortBy.checked) {
			return;
		}
	}

    getFormInput(aForm.name, 'startPage').value=0;
	aForm.submit();
}

/**	function to change sort option */
function searchResultOrderBy(aForm, aSort)
{
	aForm.sortBy.value = aSort;
	aForm.submit();
}

/**	function to restruct search */
function searchRestrict(aForm, aField, aValue) 
{
	var clause = "[" + aField + ": \"" + aValue + "\"]";
	var all = aForm.all.value;
	if (all.length == 0) {
		all = clause;
	} else {
		all = "(" + all + ") AND " + clause;
	}
	aForm.all.value = all;
	aForm.submit();
}

/**	invoke when a search result form is being submitted */
function onResultSearchFormSubmit(aForm)
{
	if (aForm.searchText &&
		aForm.searchText.value) {
		aForm.startPage.value = 0;
	}
	aForm.submit();
}


/**	modify current search query */
function onModifySearchClick(aForm)
{
	var elmts = aForm.elements;
	for (var i=0; i<elmts.length; i++) {
		if (elmts[i].name == "action") {
			elmts[i].value = "modifySearch";
			aForm.submit();
			return;
		}
	}
	alert("cannot find form: " + aForm.name);
}


/**	user changes search history */
function onChangeSearchHistory(aForm)
{
	var index = aForm.history.selectedIndex;
	if (index > 0)
		window.location = aForm.history.options[index].value;
}


/**	user clicks "Mark or unmark all items" checkbox */
function onClickMarkAll(aForm, aNamePrefix)
{
    if (aForm instanceof String) aForm = document.forms[aForm];
    if (! aNamePrefix) {
		aNamePrefix = "";
	}

    var markall;

    try {
        markall = aForm.markall.checked;
    }
    catch(err) { // markall might not be in the form
        markall = $('markall').checked;
    }

	markAllCheckboxes(aForm, aNamePrefix, markall);
}


function submitArticles(aForm, action, errorMessage) {
	submitMultiArticles(aForm, action, false, errorMessage);
}

/**	submit form instantly */
function onSearchRadioClick(aRadio)
{
	document.forms['frmSearch'].submit();
}


/**	when user clicks suggested search query */
function submitSuggestedSearch(aQuery)
{
	var frm = document.forms['frmSearch'];
	frm.prevSearch.value = aQuery.replace(/\+/g, "%2B");
	frm.submit();
}


/**	in submission of journal search */
function onSubmitJournalSearch()
{
	var url = "/action/doSearch?action=search";

	var elmts = document.frmJournalSearch.elements;
	var prevSearch = "";
	for (var i=0; i<elmts.length; i++)
	{
		var name = elmts[i].name;
		var value = elmts[i].value;
		if (value == "")
			continue;

		if (name.indexOf("field") == -1) {
			url += ("&" + name + "=" + value);
//		} else if (name == "volyearfield") {
//			if (prevSearch.length > 0)
//				prevSearch += "%20and%20";
//			prevSearch +=
//				"%2B(" + _toQueryTerm("journalvolumefield", value) +
//				"+" +
//				_toQueryTerm("journalpublicationyearfield", value) +
//				")";
		} else {
			if (prevSearch.length > 0)
				prevSearch += "+";
			prevSearch += _toQueryTerm(name, value);
		}
	}

	url += ("&prevSearch=" + escape(prevSearch));
	window.location = url;
}


/**	helper method in onSubmitJournalSearch() */
function _toQueryTerm(aField, aValue)
{
	var myValue = aValue.replace(/\"/g, '');
	var hasSpc = false;
	for (var i=aValue.length-1; i>=0; i--) {
		if (aValue.charAt(i) == ' ') {
			hasSpc = true;
			break;
		}
	}
	if (hasSpc)
		myValue = '\"' + myValue + '\"';
	return ("%2B" + aField + "%3A" + myValue)
}


function checkElement(aForm, aName, aValue)
{
	var elmts = aForm.elements;
	for (var i=elmts.length-1; i>=0; i=i-1)
	{
		if ((elmts[i].name == aName) &&
			(elmts[i].value == aValue))
		{
			elmts[i].checked = true;
			return;
		}
	}
}

function checkSearchInput(aForm)
{
	if (aForm.searchText.value == "Enter Keywords") {
		alert("Please enter search terms");
	} else {
		aForm.submit();
	}
}

function checkValue(value, errorValue, errorMessage) {
     if (value == errorValue) {
         alert(errorMessage);
         return false;
     }
     return true;
}

////
///	for save search
//

function searchSavePopup(aForm)
{
	var access = aForm.access;
	if (access && access.value!='nofilter') {
		if (! confirm("Save Search will not include your Access Rights criteria, do you want to continue?")) {
			return;
		}
	}
	
	var url = "/action/doSaveSearch";
	var new_window;
	var windowProperties;
	windowProperties = "width=550,height=250,toolbar=0,menubar=0,resizable=1,scrollbars=yes";
	if(new_window==null) {
	   new_window = window.open(url,null,windowProperties);
	} else {
	   new_window.document.replace(url);
	}
}

function getSaveSearchNameObject(aForm)
{
	var obj;
	if (! document.all) {
		var arr = aForm.elements;
		for (var i=0; (! obj) && (i<arr.length); i++) {
			if (arr[i].name == "saveSearchName") {
				obj = arr[i];
			}
		}
	} else {
		obj = document.all.saveSearchName;
	}
	return obj;
}


function performSaveSearch(aForm, aIsFAJ)
{
	var sltAlert = aForm.searchalert;
	if (aIsFAJ && (sltAlert.selectedIndex>0)) {
		alert("Sorry, e-mail alert for journals with \n" +
				"full access rights is not available.");
		return;
	}

	var elmts = aForm.elements;
	for (var i=0; i<elmts.length; i++) {
		if (elmts[i].name == "action") {
			elmts[i].value = "save";
			aForm.submit();
			return;
		}
	}
	alert("form not found: " + aForm.name);
}


function resetField(aField, aDefaultText, aColor)
{
	if (aField.value == aDefaultText) {
		aField.value = "";
	}
	aField.style.color = aColor;
}
//for ecomm2
function submitIfValid(){
    var x = document.getElementById("journalCode");
    var hasJournal = x.value != "";
    if (hasJournal && hasSubcriberType() && hasSubscriptionType()){ x.form.submit();}
}
function submitIfTypes(){
    if (hasSubcriberType() && hasSubscriptionType()) $("ecommerceForm").submit();
}
function submitIfSubscriber(){
    if (hasSubcriberType()) $("ecommerceForm").submit();
}
function submitIfSubscriptionType(){
    if (hasSubscriptionType()) $("ecommerceForm").submit();
}
function hasSubcriberType(){
    return isChecked($("individual")) || isChecked($("institution"));
}
function hasSubscriptionType(){
    return $("electronic").checked || $("print").checked || $("combo").checked;
}
/** to please IE6 for hidden input ellements**/
function isChecked(y){
    return y && (y.type == "hidden" || y.checked)
}
function changedCountry(element) {
    var options = jQuery("#stateOptions");
    var visibleBlock = options.children('#state' + jQuery(element).val());
    var visibleId = visibleBlock && visibleBlock.length ? visibleBlock[0].id : 'stateTxt';
    options.children().each(function (index, block) {
        var blockId = block.id;
        var input;
        block = jQuery(block);
        if (blockId == visibleId) {
            block.show();
            input = block.find('.input').eq(0);
            if (input.hasClass("required-but-hidden")) {
                input.addClass("required");
                input.removeClass("required-but-hidden");
            }
            input.attr("name",'state');
        } else {
            block.hide();
            input = block.find('.input').eq(0);
            if (input.hasClass("required")) {
                input.removeClass("required");
                input.addClass("required-but-hidden");
            }
            input.attr("name",'stateHidden');
        }
    });
}
//end of ecomm2

function toggleList(heading, list)
{
    if(heading.className.match('.*expanded')) {
        if (typeof jQuery != 'undefined') {
            jQuery('#' + list).css('display', 'none');
        } else {
            $(list).style.display='none';
        }
        heading.className='loiListHeading collapsed';
    }
    else {
        if (typeof jQuery != 'undefined') {
            jQuery('#' + list).css('display', 'block');
        } else {
            $(list).style.display='block';
        }
        heading.className='loiListHeading expanded';
    }
}

function submitArticles(aForm,action) {
    var hasMarked = false;
    var elmts = aForm.elements;
    for (var i = 0; i < elmts.length; i++) {
        if ((elmts[i].name == "doi") &&
            (elmts[i].type == "checkbox") &&
            (elmts[i].checked)) {
            hasMarked = true;
            break;
        }
    }

    if (!hasMarked) {

        alert("Please check at least one article.");
        return;

    }

    for (var i = 0; i < elmts.length; i++) {
        if ((elmts[i].name == "doi") &&
            (elmts[i].type != "checkbox")) {
            elmts[i].name = "xdoi";
        }
    }
    aForm.action = action;
    aForm.method = "post";
    aForm.submit();
    return false;
}

function checkCollectionPublication(event) {
    var newValue = new String(document.getElementById("categoryId").value);

    if(newValue.indexOf("collection") != -1) {
        var collectionCode = newValue.split("-")[1];

        document.getElementById("frmQuickSearch").setAttribute("action", "/topic/" + collectionCode + "?allowEmptyTermQuery=true");
    } else {
        document.getElementById("frmQuickSearch").setAttribute("action", "/action/doSearch");
    }
}

function doSaveSearch(event) {
    document.getElementById("frmSearch").setAttribute("action", "/action/doUpdateAlertSettings");
    document.getElementById("frmSearch").submit();
}

