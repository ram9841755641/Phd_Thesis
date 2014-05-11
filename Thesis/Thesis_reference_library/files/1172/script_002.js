/**	function to restruct search */
function searchRestrict(aForm, aField, aValue, replace)
{
    if (replace) {
        removeRestrictionsOfInput(aForm, aField);
    }
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = aField;
    input.value = aValue;
    aForm.startPage.value = "";
    aForm = $(aForm);
    aForm.appendChild(input);
    aForm.submit();
}

function searchRestrictDate(aForm, yearValue, monthValue, dayValue) {

    handleFormInput(aForm, "AfterYear", yearValue);
    handleFormInput(aForm, "AfterMonth",monthValue);
    handleFormInput(aForm, "AfterDay", dayValue);
    handleFormInput(aForm, "BeforeYear", "");
    handleFormInput(aForm, "BeforeMonth", "");
    handleFormInput(aForm, "BeforeDay", "");
    aForm.startPage.value = "";
    if (!aForm.pubDateRange.value) aForm.pubDateRange.value = 'epubDateRange';
    aForm = $(aForm);

    aForm.submit();
}

function handleFormInput(aForm, aField, aValue) {
    var input = aForm[aField];
    if (typeof input == 'undefined' || input == null) {
        var inputElmt = document.createElement("input");
        inputElmt.type = "hidden";
        inputElmt.name = aField;
        inputElmt.value = aValue;
        aForm.appendChild(inputElmt);
        return;
    } else if (typeof input.length != 'undefined') {
        // we should never reach this point...
        // there should only be one input for each date filtering input
        var x = input.length;
        for (var i = 0; i < x; i++) {
            input[i].value = aValue;
        }
        return;
    } else {
        input.value = aValue;
        return;
    }
}

function removeAllRestrictions(aForm)
{
    for (i = 1; i < arguments.length; i++) {
        removeRestrictionsOfInput(aForm, arguments[i]);
    }
    aForm.submit();
}

function removeAllRestrictionsForDate(aForm) {
    removeRestrictionsOfInput(aForm, "AfterYear");
    removeRestrictionsOfInput(aForm, "AfterMonth");
    removeRestrictionsOfInput(aForm, "AfterDay");

    removeRestrictionsOfInput(aForm, "BeforeYear");
    removeRestrictionsOfInput(aForm, "BeforeMonth");
    removeRestrictionsOfInput(aForm, "BeforeDay");

    aForm.submit();
}

function removeRestrictionsOfInput(aForm, aField) {
    var input = aForm[aField];
    if (typeof input == 'undefined' || input == null) {
        return 0;
    }
    if (typeof input.length != 'undefined') {
        var i;
        for (i = 0; i < input.length; i++) {
            input[i].value = '';
        }
        return input.length;
    } else {
        input.value = '';
        input.parentNode.removeChild(input);
        return 1;
    }
}

function removeRestrict(aForm, aField, aValue)
{
    var input = aForm[aField];
    if (typeof input.length != 'undefined') {
        var i;
        for (i = 0; i < input.length; i++) {
            var inputLowerCase = input[i].value.toLocaleLowerCase();
            var aValueLowerCase = aValue.toLowerCase();
            if (inputLowerCase == aValueLowerCase) {
                input[i].value = '';
            }
        }
    } else if (input.value.toLowerCase() == aValue.toLowerCase()) {
        input.value = '';
    }
    aForm.submit();
}

function removeAuthor(aForm, idx)
{
    var input = aForm['author' + idx];
    if (typeof input != 'undefined') {
        input.parentNode.removeChild(input);
        var authors = "";
        $$('input.author-item').each(function(author) {
            if (author && author.value && author.value.length) {
                if (authors.length) {
                    authors += " and "
                }
                authors += author.value;
            }
        });
        aForm['author'].value = authors;
    }
    aForm.submit();
}

function setInput(aForm, aField, aValue)
{
    var input = aForm[aField];
    if (typeof input == 'undefined' || input == null) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = aField;
        aForm = $(aForm);
        aForm.appendChild(input);
    }
    if (typeof input.length != 'undefined') {
        var i;
        for (i = 0; i < input.length; i++) {
            input[i].value = aValue;
        }
    } else {
        input.value = aValue;
    }
}

function setInputAndSubmit(aForm, aField, aValue)
{
    setInput(aForm, aField, aValue);
    getFormInput(aForm.name, 'startPage').value="";
    var serializedString = Form.serialize(aForm);
    resetHiddenFields(aForm);
    window.location = "/action/doSearch?" + serializedString;
}

function resetHiddenFields(form) {
    var elements = form.elements;
    for(var i=0; i < elements.length; i++) {
        if(elements[i].type.toLowerCase() == "hidden" &&
           (elements[i].name == "target" || elements[i].name == "targetTab" || elements[i].name == "targetStory")) {
            elements[i].value="";
        }
    }
}

function updateCheckBoxes(controllingInput, inputName) {
    var inputs = document.getElementsByName(inputName);
    for (i = 0; i < inputs.length; i++) {
        inputs[i].checked = controllingInput.checked;
    }
}

function submitSaveSearch(form) {
    form = $(form);
    var map = form.serialize(true);
    map['ajax'] = 'true';
    map['perform'] = 'true';
    new Ajax.Request('/action/doSaveSearch', {
        method: 'get',
        parameters: map,
        onFailure: function() {
            alert("Unable to save search.")
        },
        onSuccess: function(transport) {
            var result = transport.responseText;
            var redirectPrefix = "redirectTo:";
            var i = result.indexOf(redirectPrefix);
            if (result == 'ok') {
                saveSearch('finalize');
            } else if (i >= 0) {
                var redirectTo = result.substring(redirectPrefix.length);
                window.location = redirectTo;
            } else {
                alert("Unable to save search. Reason: " + result)
            }
        }
      }
    );
}

function fixArticleLinks(onPageTitlePattern) {
    $$("#links li[class~='onPage']").each(function(elem) {
        $(elem).removeClassName('onPage');
    });
    $$("#links li a[title*='"+onPageTitlePattern+"']").each(function(elem) {
        $($(elem).parentNode).addClassName('onPage');
    });

}

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

/**	function to show next search page */
function searchNextResultPageBooks(aForm, aOffset)
{
    var startPage=null;

    var select = document.getElementById("bookYear");
    if(select != null){
        var index = select.selectedIndex;
        var selectedValue = select.options[index].value;

        var beforeYear = document.getElementById("beforeYear");
        beforeYear.value = selectedValue;
    }



    for(var i=0; i < aForm.elements.length; i++) {
        if(aForm.elements[i].name == 'startPageYear') {
            startPage=aForm.elements[i];
            break;
        }
        if(aForm.elements[i].name == 'startPageSponsors') {
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

function searchResultPage(aForm, page, aSubject)
{
    getFormInput(aForm.name, 'startPage').value= page;
	aForm.submit();
}

function searchResultPageByFormId(aForm, page, aSubject)
{
    getFormIdInput(aForm.id, 'startPage').value= page;
	aForm.submit();
}

function getFormIdInput(formId, inputName)
{
    var form=getFormById(formId);

    for(var i=0; i < form.elements.length; i++) {
        if(form.elements[i].name == inputName)
            return form.elements[i];
    }

    return null;
}

function getFormById(id)
{
    for(var i=0; i < document.forms.length; i++) {
        if(document.forms[i].id == id)
            return document.forms[i];
    }

    return null;
}

function searchResultPageBooks(aForm, page, aSubject)
{
    var select = document.getElementById("bookYear");
    if(select != null){
        var index = select.selectedIndex;
        var selectedValue = select.options[index].value;

        var beforeYear = document.getElementById("beforeYear");
        beforeYear.value = selectedValue;
    }
    
    getFormInput(aForm.name, 'startPageSponsors').value = page;
	aForm.submit();
}

function searchNextResultPageInSubject(aForm, aOffset, aSubject)
{
	var x = eval(aForm.startPage.value) + aOffset;
	aForm.startPage.value = x;
	aForm.submit();
}

function searchSponsorPage(aForm)
{
    getFormInput(aForm.name, 'startPageSponsors').value = 0;
    aForm.submit();

}

// update the year/volume dropdown in cover art gallery, when decade drop down changes
function displayCorrectYVItem(aSelect, jCode) {
    var value = aSelect.value;
    var url = '/action/showCoverGallery?journalCode=' + jCode + '&ajax=true&year=' + value;
    var parentNode = $('parentYearVolumeSelect');
    var width = Element.getWidth('cenVolumes');
    Element.remove('cenVolumes');
    parentNode.insert('<select id="cenVolumes" name="year"><option value="">Loading...</option></select>');
    $('cenVolumes').style.width = width + "px";
    new Ajax.Request(url, {
        method: 'get',
        onSuccess: function(transport) {
            var jsonData = transport.responseText.evalJSON();
            if(jsonData != '') {
                //set correct labels in year/volume select
                var labels = jsonData.labels;
                var orderedKeys = jsonData.orderedKeys;
                if(labels != '' && orderedKeys){
                    Element.remove('cenVolumes');
                    //start building year/volume select with new values
                    var resultText = "<select id='cenVolumes' name='year'>";
                    for(var i = 0; i < orderedKeys.length; i++) {
                        var currKey = orderedKeys[i];
                        var selected = (i == orderedKeys.length -1);
                        resultText += "<option value='" + currKey + "'" + (selected ? " selected" : "") + ">" + labels[currKey] + "</option>";
                    }
                    resultText += "</select>";
                    parentNode.insert(resultText);
                }
            }
        }
    });
}
