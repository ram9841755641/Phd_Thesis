/**
 * Copyright 2011 The Thomson Reuters Corporation. All rights reserved.
 */

/**
 *
 * @author Yansheng Xue
 * @since  Oct 2011
 */

// Copied from function go_to_page in Common.js with modification for Author Finder.
function af_go_to_page (page_input, max, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect, noAutoSubmit) {
    var pg_num = page_input.value;
    pg_num = process_page_number(pg_num, max);
    if(pg_num > 0) {
        page_input.value = pg_num;
        //always submit the records form instead of the navigation form to save checkboxes, if needed
        var paging_url = document.forms["summary_records_form"].getAttribute("paging_url");
        if (paging_url) {
            var form = document.forms["summary_records_form"];
            // TODO: Check if checked status of any check box changes.
            // Call invokeAutoSubmit only when changes happen.
        	if ( invokeAutoSubmit(form) )
		    window.location = paging_url + pg_num;
		}
		else {
	        handle_nav( null, pg_num, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect, noAutoSubmit);
		}
    }
    else {
        page_input.select();
    }
	return false;
}

// Uncheck "Select Page" check box. Uncheck all Set check boxes.
// Set input clear_all = yes. Set input selectedIdsCount = 0.
// And then submit the form to remove all selected ids in session.
// Parameter elemId ---  id of "Select Page" check box.
// Parameter checkboxName --- id of Set check box.
function clearDAISCheckboxes(elemId, checkboxName) {

	if (document.getElementById(elemId).checked) {
		document.getElementById(elemId).checked = false;
	}
	
	var boxes = document.getElementsByName(checkboxName);
	for (i = 0; i < boxes.length; i++) {
		boxes[i].checked = false ;
	}

	// form is going to be submitted.
	var submit_form = document.forms["summary_records_form"];
	submit_form.clear_all.value = "yes";
	submit_form.selectedIdsCount.value = 0;
	invokeAutoSubmit(submit_form);
	submit_form.clear_all.value = "no";
	return false;
}

// if currently selected ids count or previous selected ids count 
// is great than 0, submit summary_records_form.
function daisy_mc_submit() {
	var form = document.forms["summary_records_form"];
	var error_msg = document.getElementById('selectAtLeastOneDAISYSet');
	var selectedIdsCount = document.getElementById('selectedIdsCount');	
	var selectedIdsCountInPage = 0;
	var selectedIdArray = getNamedFormInputs(form, "selectedId");

	for( var i=0; i<selectedIdArray.length; i++){
	    if(selectedIdArray[i].checked == true) {
	    	selectedIdsCountInPage++;
        }
    }

    if (selectedIdsCountInPage > 0 || selectedIdsCount.value > 0) {
    	if ( invokeAutoSubmit(form) ) {
    		form.submit;
    	}
    }
    else {
        alert(error_msg.value);
        return false;
    }
    return true;
}

// It write final hit count and page count to author finder set summary page.
function af_handle_nav_final_counts(final_hit_count, final_page_count) {

	//declare spans to be changed
	var recs_count_top = document.getElementById('hitCount.top');
	var page_count_top = document.getElementById('pageCount.top');
	var recs_count_bottom = document.getElementById('hitCount.bottom');
	var page_count_bottom = document.getElementById('pageCount.bottom');
	
	if (final_hit_count.length >0) {
	recs_count_top.innerHTML = final_hit_count;
	}

	if(page_count_top) {
	page_count_top.innerHTML = final_page_count;
	}

    if (final_hit_count.length >0) {
	recs_count_bottom.innerHTML = final_hit_count;
    }

	if (page_count_bottom) {
	page_count_bottom.innerHTML = final_page_count;
	}
}//end function af_handle_nav_final_counts

//jumps to the desired target with the specified id
function jumpToTarget(targetID) {
	  var targetPos = $(targetID).offset();
	  window.scrollTo(0, targetPos.top);
}

// The function is used for output selected records, which are identified 
// by selected dais_id and UTs, to RID.
function af_outputRIDRecords(form, url, rurl) {

	var outputForm = document.forms["claim_pub_form"];
	
	if (url && rurl) {
		url = url + "&rurl=" + encodeURIComponent(rurl);
	}
	
	af_output_records(form, outputForm, url, null, certifyPublicationsForRID);
	return false;
}

//The function is used for output selected records, which are identified 
//by selected dais_id and UTs, to RID.
function af_output_records( input, outputForm, url, orderType, presubmitFunction ) {

	if ( outputForm == null ) {
	    outputForm = getOutputForm();
	}

	if ( input && outputForm ) {
		// get selected ids saved.
		autoSubmit();
	    var inputForm = input.form;

	    if ( inputForm ) {
		    var formName = inputForm.getAttribute('input_form_name');

		    var form = document.forms[ formName ];

		    if ( form ) inputForm = form;

	        var recordsForm = getRecordsForm();
	        if ( recordsForm == null )
		  	    recordsForm = inputForm;


	        var error_msg = document.getElementById('selectAtLeastOneDAISYSet');
	        var selectedIdsCount = document.getElementById('selectedIdsCount');	
	        var selectedIdsCountInPage = 0;
	        var selectedIdArray = getNamedFormInputs(recordsForm, "selectedId");
	        var preSelectedIdInCurrentPageArray = getNamedFormInputs(recordsForm, "preSelectedId");
	        var preSelectedIds = recordsForm.elements["preSelectedIds"];
	        var preSelectedIdsStr = preSelectedIds.value;
	        var preSelectedIdsArray = null;
	        if (selectedIdsCount.value > 1) {
	        	preSelectedIdsArray = preSelectedIdsStr.split(" ");
	        	preSelectedIdsStr = preSelectedIdsArray.join(";");
	        } else if (selectedIdsCount.value == 1){
	        	preSelectedIdsStr = preSelectedIds.value;
	        }
	        
	        var selectedIdsInCurrentPage = new String();
		
	        for( var i=0; i<selectedIdArray.length; i++){
	        	if(selectedIdArray[i].checked == true) {
	        		if (selectedIdsInCurrentPage.length > 0) {
	        			selectedIdsInCurrentPage += ";" + selectedIdArray[i].value;
	        			selectedIdsCountInPage++;
	        		} else {
	        			selectedIdsInCurrentPage += selectedIdArray[i].value;
		        		selectedIdsCountInPage++;
	        		}
	        	}
	        }
	        
	        if (preSelectedIdInCurrentPageArray.length > 0) {
	        	for( var i=0; i<preSelectedIdInCurrentPageArray.length; i++){
	        		// remove preSelectedIds in current page from preSelectedIdsStr.
        			if(preSelectedIdsStr.indexOf(";") != -1) {
        			   preSelectedIdsStr = preSelectedIdsStr.replace(preSelectedIdInCurrentPageArray[i].value+";", "");
        			   selectedIdsCount--;
        			}
        			else {
	        			   preSelectedIdsStr = preSelectedIdsStr.replace(preSelectedIdInCurrentPageArray[i].value+" ", "");
	        			   selectedIdsCount--;
        		    }
	        	}
	        }
	        
	        var allSelectedIds = new String();
	        if (preSelectedIdsStr.length > 1 )
	        	allSelectedIds = preSelectedIdsStr + selectedIdsInCurrentPage;
	        else {
	        	allSelectedIds = selectedIdsInCurrentPage;
	        }
			
			if (allSelectedIds.indexOf(" ") != -1) {
				var allSelectedIdsArray = allSelectedIds.split(" ");
				allSelectedIds = allSelectedIdsArray.join(";");
			}
			
	        outputForm.elements["selectedIds"].value = allSelectedIds;
	        if (selectedIdsCountInPage > 0 || selectedIdsCount.value > 0) {
	        	submit = presubmitFunction( outputForm );
	        	if ( submit == true ) {
		        	if (outputForm && url) {
		        		outputForm.action = url;
		        	}
		        	outputForm.submit();
	        	}
	        }
	        else {
	        	alert(error_msg.value);
	        	return false;
	        }	      
	    }
	}
	return false;
}

//To add a new Author variant row
function addAFSearchRow(tableID)
{
	try {
	
	  var fcount = document.getElementById('fieldCount');
	  var maxcount = document.getElementById('max_field_count');
	  var notice = document.getElementById('max_field_notice').value;
	
	  //limit the number of rows added
	  if((parseInt(fcount.value) + 1) > (parseInt(maxcount.value) + 1)){
	     alert(notice);
	     return false;
	  }
	  var table = document.getElementById(tableID); 
	  var rowCount = table.rows.length;
	  var startRow = rowCount - 3;
	  var iteration = parseInt(fcount.value) - 1;
	  
	  // spacing row 
	  var spacingRow = table.insertRow(startRow);
	  var spacingCell = spacingRow.insertCell(0);
	  spacingCell.innerHTML = '&nbsp;';
	  
	  // row 1
	  var row0 = table.insertRow(startRow + 1);
	  var spacingCell0 = row0.insertCell(0);
	  spacingCell0.innerHTML = '&nbsp;';
	  
	  //add the labels
	  var cell = row0.insertCell(1);
	  var lastNameSearchText = document.getElementById('lastNameSearchText');
	  var lastNameSearchTextClone = lastNameSearchText.cloneNode(true);
	  cell.appendChild(lastNameSearchTextClone);
	  
	  var cell0 = row0.insertCell(2);
	  var initialsSearchText = document.getElementById('initialsSearchText');
	  var initialsSearchTextClone = initialsSearchText.cloneNode(true);
	  cell0.appendChild(initialsSearchTextClone);
	  
	  var spacingCell1 = row0.insertCell(3);
	  spacingCell1.innerHTML = '&nbsp;';
	  
	  // row 2
	  var row1 = table.insertRow(startRow + 2);
	  
	  // last name text box
	  var spacingCell2 = row1.insertCell(0);
	  spacingCell2.className = 'AuthorFinderSearchesText';
	  spacingCell2.vAlign = "center";
	  spacingCell2.innerHTML = '<b>OR</b>';
	  var cell1 = row1.insertCell(1);
	  var lastNameSearch = document.getElementById('lastName_0');
	  var element1 = lastNameSearch.cloneNode(true);
	  element1.id = "lastName_" + iteration;
	  element1.name = "lastName_" + iteration;
	  element1.value = "";
	  cell1.appendChild(element1);
	  
	  // initials text box
	  var cell2 = row1.insertCell(2); 
	  var initialsSearch = document.getElementById('initial_0');
	  var element2 = initialsSearch.cloneNode(true);
	  element2.id = "initial_" + iteration;
	  element2.name = "initial_" + iteration;
	  element2.value = "";
	  cell2.appendChild(element2);
	  
	  // exact  matches checkbox
	  var cell3 = row1.insertCell(3);
	  var exactMatchesContainer = $(".ExactMatchesContainer").first();
	  var newExactMatchesContainer = exactMatchesContainer.clone();
	  var element3 = newExactMatchesContainer.find('input:hidden[name=exactMatch_0]');
	  element3.attr('id', 'exactMatch_' + iteration);
	  element3.attr('name', 'exactMatch_' + iteration);
	  element3.attr('value', '');
	  var element4 = newExactMatchesContainer.find('input:checkbox[name=actual_exactMatch_0]');
	  element4.attr('id', 'actual_exactMatch_' + iteration);
	  element4.attr('name', 'actual_exactMatch_' + iteration);
	  element4.attr('checked', false);
	  cell3.appendChild(newExactMatchesContainer[0]);
	   
	  // row 3
	  var row2 = table.insertRow(startRow + 3);
	  var spacingCell3 = row2.insertCell(0);
	  spacingCell3.innerHTML = '&nbsp;';
	  
	  // example 1
	  var cell4 = row2.insertCell(1);
	  var example1 = document.getElementById('example1');
	  var element5 = example1.cloneNode(true);
	  cell4.appendChild(element5);
	  
	  // example 2
	  var cell5 = row2.insertCell(2);
	  var example2 = document.getElementById('example2');
	  var element6 = example2.cloneNode(true);
	  cell5.appendChild(element6);
	  
	  var spacingCell4 = row2.insertCell(3);
	  spacingCell4.innerHTML = '&nbsp;';

	  fcount.value = parseInt(fcount.value) + 1;
	} catch (e) {
	  ;
	}
	return null;
}

// This function expand domains that have reserch areas checked.
function triggerDomainExpand(){
	$('table#domainsAreas a.expander').click(function(){
	    $(this).data('expanded') == 1 ? collapse($(this)) : expand($(this));
	});
	$('table#domainsAreas input#toggleAll').change(function(){
		if ($(this).prop('checked')){
			$('table#domainsAreas tr.domain-holder input:checkbox').prop('checked',true);
			$('table#domainsAreas tr.area-row input:checkbox').prop('checked',true);
		} else {
			$('table#domainsAreas tr.domain-holder input:checkbox').prop('checked',false);
			$('table#domainsAreas tr.area-row input:checkbox').prop('checked',false);
		}
	});
	$('table#domainsAreas input.domain').change(function(){
		var next = $(this).closest('tr').next('tr');
		if ($(this).prop('checked')){
			while (next.hasClass('area-row')){
				next.find('input.area').prop('checked',true);
				next = next.next('tr');
			}
		} else {
			while (next.hasClass('area-row')){
				next.find('input.area').prop('checked',false);
				next = next.next('tr');
			}
		}
		if ($('table#domainsAreas input.domain').filter(':not(:checked)').length){
			$('table#domainsAreas input#toggleAll').prop('checked',false);
		} else {
			$('table#domainsAreas input#toggleAll').prop('checked',true);
		}
	});
	$('table#domainsAreas input.area').change(function(){
		var allAreas = true;
		var domain = $(this).closest('tr').prev();
		while (!domain.hasClass('domain-holder')) domain = domain.prev();
		var next = domain.next();
		while (next.hasClass('area-row')){
			allAreas &= next.find('input.area:not(:checked)').length == 0;
			if (!allAreas) break;
			next = next.next('tr');
		}

		if (allAreas) domain.find('input.domain').prop('checked',true);
		else domain.find('input.domain').prop('checked',false);
		
		if ($('table#domainsAreas input.domain:not(:checked)').length) $('table#domainsAreas input#toggleAll').prop('checked',false);
		else $('table#domainsAreas input#toggleAll').prop('checked',true);
	});
	
	$('table#domainsAreas input.area:checked').closest('tr').each(function(){
		var domain = $(this).closest('tr').prev();
		while (!domain.hasClass('domain-holder')) domain = domain.prev();
		expand(domain.find('a.expander'));
	});
}

// copies whether or not the "actual_exactMatches" checkbox input is checked into the value of the "exactMatches" hidden input 
function copyInputValue(inputToCopy) {
	var copyInputId = inputToCopy.id.substring(7); // get the name of the copy input id
	var copyInput = document.getElementById(copyInputId);
	if(copyInput != null) {
		copyInput.value = inputToCopy.checked;	
	}
	return false;
}

//Expand Research Areas in Author Finder wizard.
function expand(target){
	target.data('expanded',1);
	var altText = document.getElementById('collapse.img.alt.txt').value;
	var next = target.closest('tr').next('tr');
	while (next.hasClass('area-row')){
		next.show();
		next = next.next('tr');
	}
	target = target.children('img');
    target.attr('src', target.attr('src').replace('expand.gif','collapse.gif'));
    target.attr('alt', altText);
    target.attr('title', altText);
}

// Collape Research Areas in Author Finder wizard.
function collapse(target){
    target.data('expanded',0);
    var altText = document.getElementById('expand.img.alt.txt').value;
	var next = target.closest('tr').next('tr');
	while (next.hasClass('area-row')){
		next.hide();
		next = next.next('tr');
	}
    target = target.children('img');
    target.attr('src', target.attr('src').replace('collapse.gif','expand.gif'));
    target.attr('alt', altText);
    target.attr('title', altText);
}

// Check if arry "a" contains "obj".
function af_contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].value == obj) {
            return true;
        }
    }
    return false;
}

// If a checkbox is changed, the function will also change all of the checkboxes with the same value.
function updateCheckboxes(checkbox) {
	var val = checkbox.value;
	$('input[value$="' + val + '"]').each(function(){
		$(this).attr('checked', checkbox.checked);
	});
}

//Processing after DOM ready.
$(document).ready(function() {
    triggerDomainExpand();
});
