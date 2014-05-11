//TODO: update these function names to be prefixed with ListContainerControlBase_

function initializeCheckboxes() {
    if (getSelectedItemsField() != null) {
        var selectedIds = getSelectedItemsField().value.split(";");

        for (var i = 0; i < selectedIds.length; i++) {
            var checkbox = $get(selectedIds[i]);
            if (checkbox != null) {
                checkbox.checked = true;
            }
        }
        if (selectedIds.length > 1) {
            disabledItemListActionControl(false);
        }
        else {
            disabledItemListActionControl(true);
        }
    }
}

function checkChanged(obj, id) {
    updateSelectedItems(id, obj.checked);
}

function updateSelectedItems(id, addToList) {
    var selectedItemsField = getSelectedItemsField();
    var selectedItemsList = selectedItemsField.value;

    if (addToList) {
        selectedItemsList += id + ";";
    }
    else {
        selectedItemsList = selectedItemsList.replace(id + ";", "");
    }

    selectedItemsField.value = selectedItemsList;
    if (selectedItemsField.value == '') {
        disabledItemListActionControl(true);
        //if user clicks select all and manually deselect all check box then need to change its state.
        setSelectAll(true);
    }
    else {
        disabledItemListActionControl(false);
        //if user clicks deselect all and manually select all check box then need to change its state.
        setSelectAll(false);
    }
}

function disabledItemListActionControl(isDisabled) {    
    var containerTop = getListActionsContainerTop();
    if (containerTop != null) {
        setControlsStatus(containerTop, isDisabled);
    }

    var containerBottom = getListActionsContainerBottom();
    if (containerBottom != null) {
        setControlsStatus(containerBottom, isDisabled);
    }
}

function setControlsStatus(control, isDisabled) 
{
    if (null != control) 
    {                
        var div;        
        var i;
        
        var divCollection = control.getElementsByTagName('div');  
              
        for (i = 0; i < divCollection.length; i++)         
        {
            if(divCollection[i].id == 'btnToolbarActions')
            {
                div = divCollection[i];
            }
        }

        if (isDisabled) 
        {
            if (div != null && div.className == 'ej-toolbar-btn ej-toolbar-btn-actions') 
            {
                div.className = "ej-toolbar-btn ej-toolbar-btn-actions ej-toolbar-btn-disabled";
                hideMenu(div, 'toolbarActionsMenu');
            }
        }
        else 
        {
            if (div != null && div.className == 'ej-toolbar-btn ej-toolbar-btn-actions ej-toolbar-btn-disabled') 
            {
                div.className = "ej-toolbar-btn ej-toolbar-btn-actions";
            }
        }
    }
}

function addToMyCollectionsLinkClicked(linkId) {
    getSelectedItemsField().value = "";
    SetCheckBoxState(false);

    getSelectedItemsField().value = linkId;
}

function shareChannelLinkClicked(linkId) {
    getSelectedItemsField().value = "";
    getSelectedItemsField().value = linkId;
}

function SelectCheckBox(obj) {
    var chkSelectTop = document.getElementById('chkSelectTop');
    var chkSelectBottom = document.getElementById('chkSelectBottom');

    if (obj.id == "chkSelectTop") {
        chkSelectTop = obj;
        chkSelectBottom.checked = obj.checked;
    }
    if (obj.id == "chkSelectBottom") {
        chkSelectBottom = obj;
        chkSelectTop.checked = obj.checked;
    }

    var setCheckBoxes = false;

    if (chkSelectTop != null) {
        if (chkSelectTop.checked) {
            setCheckBoxes = true;
        }
        else {
            setCheckBoxes = false;
            getSelectedItemsField().value = "";
        }
    }
    else if (chkSelectBottom != null) {
        if (chkSelectBottom.checked) {
            setCheckBoxes = true;
        }
        else {
            setCheckBoxes = false;
            getSelectedItemsField().value = "";
        }
    }
    SetCheckBoxState(setCheckBoxes);
}

function SetCheckBoxState(select) {
    var list = getCheckBoxListContainer();
    if (list != null) {
        var checkboxlist = list.getElementsByTagName('input');
        var i;
        for (i = 0; i < checkboxlist.length; i++) {
            if (checkboxlist[i].type == 'checkbox' && checkboxlist[i].checked != select) {
                checkboxlist[i].checked = select;
                checkboxlist[i].onclick();
            }
        }
    }
}
// return true if all check box are selected.
function AllCheckBoxState() {
    var returnValue = true;

    var list = getCheckBoxListContainer();
    if (list != null) {
        var checkboxlist = list.getElementsByTagName('input');
        var i;
        for (i = 0; i < checkboxlist.length; i++) {
            if (checkboxlist[i].type == 'checkbox' && !checkboxlist[i].checked) {
                returnValue = false;
                break;
            }
        }
    }
    return returnValue;
}

function setSelectAll(state) {

    var chkSelectTop = document.getElementById('chkSelectTop');
    var chkSelectBottom = document.getElementById('chkSelectBottom');

    if (state == false && AllCheckBoxState()) {
        if (chkSelectTop != null) {
            chkSelectTop.checked = true;
        }
        if (chkSelectBottom != null) {
            chkSelectBottom.checked = true;
        }
    }
    else {
        if (chkSelectTop != null) {
            chkSelectTop.checked = false;
        }
        if (chkSelectBottom != null) {
            chkSelectBottom.checked = false;
        }
    }
}

/*Toolbar functions*/

function pageSizeChanged(pageSize) {
    if (pageSize != "") {
        __doPostBack("pageSizeChanged", pageSize);
    }
}

function sortBySelectionChanged(sortOption) {
    if (sortOption != "") {
        __doPostBack("sortBySelectionChanged", sortOption);
    }
}

function exportImagesToPowerPoint() {
    if (getSelectedItemsField().value != '') {
        __doPostBack("exportImagesToPowerPoint", getSelectedItemsField().value);
    }
}

function showHideActionsMenu(currentObj, targetObj) {
    if (currentObj.className == "ej-toolbar-btn ej-toolbar-btn-actions ej-toolbar-btn-disabled") {
        return;
    }
    else {
        showHideMenu(currentObj, targetObj);
    }
}


/*==================== Item View Action Starts =====================*/

//Document.Ready() does not work after postback in some cases.This is a problem with partial postback.
//The DOM isn't reloaded and so the document ready function won't be hit again. In order 
//to achieve such functionality we need to assign a partial postback handler.
$(document).ready(function () {
    Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(lccb_InitializeControls);    
});

//handle document click event
$(document).click(function (e) {

    //Hide the toolbar-menu-list if clicked on any menu item or outside it
    var myTarget = "ej-toolbar-btn-arrow";
    var clicked = e.target.className;

    if (myTarget != '') {
        if (myTarget != clicked) {
            $("ul[class ='ej-toolbar-menu-list']").parent().hide();
        }
    }


});


//This function is responsible to show or hide the view menus
function showHideMenu(currentObj, targetObj) {

    var menuItemsDiv = $(currentObj).next("div[id='" + targetObj + "']");

    if ($(menuItemsDiv).attr("style").toLowerCase().indexOf('block') > 0) {
        $(menuItemsDiv).attr("style", "display:none;");
    }
    else {
        //before showing any menu item close all other opened menu items lists
        $(".ej-toolbar-menu-list").parent("div[style:contains('block')]").hide();
        //show menu items of clicked menu
        $(menuItemsDiv).attr("style", "display:block;");
    }
}

//This function is responsible to show or hide the view menus
function hideMenu(currentObj, targetObj) {

    var menuItemsDiv = $(currentObj).next("div[id='" + targetObj + "']");

    if ($(menuItemsDiv).attr("style").toLowerCase().indexOf('block') > 0) {
        $(menuItemsDiv).attr("style", "display:none;");
    }    
}

function setSelectedMenuItemStyle(menuItemText, menuParentDivID) {
    
    //Clear already applied style on menu item
    $("div[id=" + menuParentDivID + "]").find(".ej-toolbar-menu-list li").attr("class", "");

    //Set selected menu style to current item
    $("div[id=" + menuParentDivID + "]").find(".ej-toolbar-menu-list li:contains('" + menuItemText + "')").attr("class", "ej-toolbar-menu-selected");
                                        
}

//It performs the view action selected by user
function performViewAction(currentViewState) {

    setSelectedMenuItemStyle(currentViewState, 'viewMenu');

    //Depending upon selected menu item invoke respective methods
    switch (currentViewState) {
        case "Title":
            showTitle();
            break;
        case "Citation":
            showCitation();
            break;
        case "Abstract":
            showAbstract();
            break;
    }

    //save current state of dropdwon  
    $("#hiddenDisplayItemView").val(currentViewState);

}

//Show article abstract section
function showAbstract() {
    showCitation();
    $("#checkBoxListContainer").find(".ej-article-actions-abstract-show a").each(
        function (index) {
            $(this).click();
        }
        );
}

//Hide article abstract section
function hideAbstract() {
    $("#checkBoxListContainer").find(".ej-article-actions-abstract-hide a").each(
        function (index) {
            $(this).click();
        }
        );

}

//Show citation section
function showCitation() {
    //hide abstract
    hideAbstract();
    //show citation
    //Details of each JQuery selector used here :
    // 1. #ej-featured-article-thumb-text - Normal Article, Podcast
    // 2. #ej-article-indicators-video-thumb - Image, Video
    // 3. table[class*='ej-article-img-details-table-fluid'] - Issue, Supplement, BlogPost
    // 4. table[id*='tblMagnifiedArticleBody'] - Magnified Article view
    $("#checkBoxListContainer").find("#ej-featured-article-thumb-text, #ej-article-indicators-video-thumb, table[id*='tblMagnifiedArticleBody'], table[class*='ej-article-img-details-table-fluid']").each(
        function (index) {
            $(this).attr("style", "display:block;");
        }
        );
}

//Hide citation section
function hideCitation() {
    $("#checkBoxListContainer").find("#ej-featured-article-thumb-text, #ej-article-indicators-video-thumb, table[id*='tblMagnifiedArticleBody'], table[class*='ej-article-img-details-table-fluid']").each(
        function (index) {
            $(this).attr("style", "display:none;");
        }
        );
}

//Show Title
function showTitle() {
    hideAbstract();
    hideCitation();
}


/*==================== Item View Action Ends =====================*/

function lccb_InitializeControls() {
    //Fetch the current state of view dropdown
    var currentItemViewState = $("#hiddenDisplayItemView").val();
    if (currentItemViewState && currentItemViewState.length > 0) {
        performViewAction(currentItemViewState);
    }

    //Fetch the current page size
    var currentPageSize = $("#hiddenPageSize").val();
    if (currentPageSize && currentPageSize.length > 0) {
        setSelectedMenuItemStyle(currentPageSize, 'showMenu');
    }

    //Fetch the current sort order
    var currentSortBy = $("#hiddenSortBy").val();
    if (currentSortBy && currentSortBy.length > 0) {

        //Clear already applied style on menu item
        $("div[id='toolbarSortMenu']").find(".ej-toolbar-menu-list li").attr("class", "");

        //Set selected menu style to current item
        $("div[id='toolbarSortMenu']").find(".ej-toolbar-menu-list li[sortorder='" + currentSortBy + "']").attr("class", "ej-toolbar-menu-selected");
    }
}
