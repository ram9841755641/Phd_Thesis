// JavaScript Document

function hideLeftPanel(divId){
	$("#"+divId).hide();
	$("#hideLeft").hide();
	$("#showLeft").show();
}

function showLeftPanel(divId){
	$("#"+divId).show();
	$("#hideLeft").show();
	$("#showLeft").hide();
}

function toggleNameContent(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_nameVariant').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_right.gif";
		document.getElementById('SubjectCategory_Sa').style.display = "none";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_nameVariant').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_down.gif";
		document.getElementById('SubjectCategory_Sa').style.display = "block";
	} 
	
}

function toggleNameContentInst(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_Inst').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_down.gif";
		document.getElementById('SubjectCategory_Inb').style.display = "block";
	}
	else if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_Inst').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_right.gif";
		document.getElementById('SubjectCategory_Inb').style.display = "none";
	} 
	
}


function toggleNameContent1(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_pubYear').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_down.gif";
		document.getElementById('SubjectCategory_Pub').style.display = "block";

	}
	else if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_pubYear').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_right.gif";
		document.getElementById('SubjectCategory_Pub').style.display = "none";

	} 
	
}

function toggleNameContent2(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_cunTerr').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_right.gif";
		document.getElementById('SubjectCategory_Cob').style.display = "none";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_cunTerr').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_down.gif";
		document.getElementById('SubjectCategory_Cob').style.display = "block";
	} 
	
}


function toggleNameContentst(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_st').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_right.gif";
		document.getElementById('SubjectCategory_Stb').style.display = "none";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_st').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/arrow_down.gif";
		document.getElementById('SubjectCategory_Stb').style.display = "block";
	} 
	
}



function toggleNameContentlki(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_lki').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_lki').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	} 
	
}

function toggleNameContenttt(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_tt').src = "http://wokresources-int.acad.isinet.com/WOKRS52B1_1/images/expand1.gif";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_tt').src = "http://wokresources-int.acad.isinet.com/WOKRS52B1_1/images/collapse1.gif";
	} 
	
}


function toggleNameContentlki1(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_lki1').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_lki1').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	} 
	
}

function toggleNameContenttt1(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_tt1').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/expand.gif";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_tt1').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/collapse.gif";
	} 
	
}

function toggleNameContentlki2(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_lki2').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_lki2').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	} 
	
}

function toggleNameContenttt2(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_tt2').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/expand.gif";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_tt2').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/collapse.gif";
	} 
	
}

function toggleNameContentlki3(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_lki3').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_lki3').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	} 
	
}

function toggleNameContenttt3(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_tt3').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/expand.gif";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_tt3').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/collapse.gif";
	} 
	
}


function toggleNameContentlki4(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_lki4').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_lki4').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/graduation_icon.jpg";
	} 
	
}

function toggleNameContenttt4(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_tt4').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/expand.gif";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_tt4').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/collapse.gif";
	} 
	
}

function toggleNameContentVa(divId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById('SubjectCategory_Va').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/expand.gif";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById('SubjectCategory_Va').src = "http://wokresources-int.acad.isinet.com/WOKRS52A9/images/collapse.gif";
	} 
	
}

function toggleTitleNameContent(divId,subId){
	var managerid = document.getElementById(divId).style.display;
	if (managerid == "block") {
		document.getElementById(divId).style.display = "none";
		document.getElementById(subId).src = "http://wokresources-int.acad.isinet.com/WOKRS52B1_1/images/expand1.gif";
	}
	else if (managerid == "none") {
		document.getElementById(divId).style.display = "block";
		document.getElementById(subId).src = "http://wokresources-int.acad.isinet.com/WOKRS52B1_1/images/collapse1.gif";
	} 
	
}