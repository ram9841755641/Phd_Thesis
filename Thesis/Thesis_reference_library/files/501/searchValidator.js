function validateSearch() {
	var valid = true;
	if (!validateSearchVolumeBox()) valid=false;
	if (!validateSearchPageBox()) valid=false;
	if (!validateSearchVolumeBox() && !validateSearchPageBox()){
		document.getElementById("searchError").innerHTML = "Please enter a number in the volume and page fields.";
	 	valid=false;
	}	
	if(document.getElementById("search_terms").value=="" && document.getElementById("search_volume").value=="" && document.getElementById("search_page").value==""){
		document.getElementById("searchError").innerHTML = "Please enter a search term.";
		valid=false;
	}
    return valid;		
}

function validateSearchPageBox() {
	if(isNaN(document.getElementById("search_page").value)){
		document.getElementById("searchError").innerHTML = "Please enter a number in the page field.";
		return false;
	}	
	return true;
	
}


function validateSearchVolumeBox() {
	if(isNaN(document.getElementById("search_volume").value)){
		document.getElementById("searchError").innerHTML = "Please enter a number in the volume field.";
		return false;
	}	
	return true;
}


function validateSearchTerms(){
	if(document.getElementById("searchTerms").value=="" && document.getElementById("searchVolume").value=="" && document.getElementById("searchStartPage").value=="" && document.getElementById("searchAuthor").value=="" &&
	 document.getElementById("searchIssue").value=="" && document.getElementById("searchTitleAbstract").value=="" && document.getElementById("searchAffiliation").value==""){
	 	document.getElementById("searchError").className = "alert errormsg";
		document.getElementById("searchError").innerHTML = "Please enter the search term.";
		return false;
	 }
	 return true;
}

function validateSearchDOI(){
	if(document.getElementById("searchDOI").value==""){
	 	document.getElementById("searchError").className = "alert errormsg";
		document.getElementById("searchError").innerHTML = "Please enter the search term.";
		return false;
	 }
	 return true;
}