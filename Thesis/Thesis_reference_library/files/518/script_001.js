/* Function to show help page */
function popupHelp(url)
{
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

function onSubscribeSearchFeed(aForm)
{
	var elmts = aForm.elements;
	for (var i=0; i<elmts.length; i++) {
		if (elmts[i].name == 'action') {
			elmts[i].value = "searchFeed";
			props = "width=800,height=350,toolbar=0,location=1,menubar=1,resizable=1,scrollbars=yes";
			win = window.open('', 'feed', props);
			win.focus();
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
function onClickMarkAll(aForm)
{
	var markall = aForm.markall.checked;
	markAllCheckboxes(aForm, "", markall);
}


function submitArticles(aForm, action) {
	submitMultiArticles(aForm, action, false);
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


/**	when user clicks suggested search query */
function submitSuggestedSearch(aQuery)
{
	var frm = document.forms['frmSearch'];
	frm.prevSearch.value = aQuery.replace(/\+/g, "%2B");
	frm.submit();
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

function showhide(parentId, childId, imgLinks){
    if (document.getElementById){
        var obj = document.getElementById(parentId);
        var children = obj.childNodes;
        for(var i = 0; i < children.length; i++) {
            var child = children.item(i);
            if(child.id == childId)
            {
                if (child.style.display == "none"){
                    child.style.display = "block";
                } else {
                    child.style.display = "none";
                }
            }
            if (child.id == imgLinks) {
                var grandChildren = child.childNodes;
                for (var j = 0; j < grandChildren.length; j++) {
                    var child2 = grandChildren.item(j);
                    if (child2.id == 'collapseImage') {
                        if (child2.style.display == "none") {
                            child2.style.display="";
                        } else {
                            child2.style.cssText = 'display:none';
                        }
                    }
                    if (child2.id == 'expandImage') {
                        if (child2.style.display == "none") {                            
                              child2.style.display="";
                        } else {
                            child2.style.cssText = 'display:none';
                        }
                    }
                }
            }
        }
    }
}

function suggest(aQuery) {
	var frm = document.forms['frmSearch'];
	frm.prevSearch.value = aQuery;
	frm.submit();
}

function searchChangeResultsPerPage(aForm) {
    var dropdown = document.getElementById('nh')
    var nh=getFormInput(aForm.name, 'nh');
    nh.value = dropdown[dropdown.selectedIndex].value;

    aForm.submit();
}

var currentPopup = null;



function popup(anchorElemOrID, popupID, event) {
    if (currentPopup) currentPopup.hide();
    currentPopup = $(popupID);
    var anchor = $(anchorElemOrID);
    if (anchor && currentPopup) {
        currentPopup.style.visibility = 'visible';
        currentPopup.show();    // show first, so the dimmensions calculation is somewhat better
        var viewPortDim = document.viewport.getDimensions();
        var aViewPortPos = anchor.viewportOffset();
        var aPagePos = anchor.positionedOffset();
        var aDim = anchor.getDimensions();
        var popupDim = currentPopup.getDimensions();
        var x = aPagePos.left;
        var d = viewPortDim.width - aPagePos.left - popupDim.width;
        if (d < 0) x += d;
        var y = aPagePos.top + (aViewPortPos.top < viewPortDim.height / 2 ? aDim.height : -popupDim.height);
        if (y < 0) {
            y = 0; // reset to top of the relative position
        }
        currentPopup.style.position = 'absolute';
        currentPopup.style.top = y + "px";
        currentPopup.style.left = x + "px";
    }
    stopEvent(event);
}

function closePopup(event) {
    if (currentPopup && !(event && Position.within(currentPopup, Event.pointerX(event), Event.pointerY(event)))) {
        currentPopup.hide();
    }
}

function stopEvent(event) {
    var e = event || window.event;
    if (e) Event.stop(e);
}
// hide popup or write code that will reposition it correctly after resize
if (typeof Event != 'undefined' && Event.observe) Event.observe(window, "resize", closePopup);

function glossaryClick(sLink,event) {
    var element = event.target || event.srcElement;
    if (!element.popupId) element.popupId = sLink.match(/termId=([^&]+)/)[1];
    if ($(element.popupId)) popup(element, element.popupId, event);
    else if (!element.popupRequested) {
        element.popupRequested = true;
        new Ajax.Request(sLink, {
            onSuccess: function(transport) {
                new Insertion.Bottom(document.body, "<div class='helpPopup' id='" + element.popupId + "'>" + transport.responseText + "</div>");
                popup(element, element.popupId, event);
            }
        });
    }

    Event.stop(event);

    if(currentPopup == null){
        Event.observe(document, 'click', function(event) {
            closePopup(event);
        });
    }
    return false;
}