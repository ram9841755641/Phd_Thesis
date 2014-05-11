
$(document).ready(function(){
	$(".expander a").hover(
			function(){
				var tabId = $(this).attr("id");
				thissubtab = $("#"+tabId+"SubTab").show();
				thisoffset = $(this).offset();
				thissubtab.css("left",thisoffset.left);
				thissubtab.css("top",thisoffset.top + 20);
				if(document.getElementById(tabId+"SubTab")){
					document.getElementById(tabId+"SubTab").style.display = 'block';
				}
			},
			function(){
				var tabId = $(this).attr("id");
				$("#"+tabId+"SubTab").hide();
			});
	$(".globalsubtab").hover(
			function(){
				$(this).show();
			},
			function(){
				$(this).hide();
			});

	$("#login_link").click(function() { 
		$("#floating_login_form").show();	
		return false;
	});								   
	$("#close_login").click(function() { 
		$("#floating_login_form").hide();
		$("#loginError").innerHTML="";
	});
	checkForLoginError();
	checkForMissingTabs();
});

function checkForLoginError() {
	if (document.getElementById('login_link')) {
		if (document.getElementById('loginError').innerHTML != '') {
			document.getElementById('floating_login_form').style.right = '0pt';
			$("#floating_login_form").show();	
		}
	}
}

function checkForMissingTabs(){
	
	if($('#newArticles').length == 0){
		$("#forAuthorsSubTab").css("left","185px");
		$("#journalInfoSubTab").css("left","290px");
		$("#changeJournalSubTab").css("left","560px");
		$("#CellPressSubTab").css("left","680px");

		if($('#journalInfoSubTab').length == 0){
			$("#changeJournalSubTab").css("left","420px");
			$("#CellPressSubTab").css("left","540px");
		}

		if($('#forAuthorsSubTab').length == 0){
			$("#journalInfoSubTab").css("left","195px");
			$("#changeJournalSubTab").css("left","460px");
			$("#CellPressSubTab").css("left","585px");
		}	
		
		if(($('#journalInfoSubTab').length == 0) && ($('#forAuthorsSubTab').length == 0)){
			$("#changeJournalSubTab").css("left","320px");
			$("#CellPressSubTab").css("left","445px");
		}
	} else {
		
		if($('#journalInfoSubTab').length == 0){
			$("#changeJournalSubTab").css("left","505px");
			$("#CellPressSubTab").css("left","630px");
		}

		if($('#forAuthorsSubTab').length == 0){
			$("#journalInfoSubTab").css("left","285px");
			$("#changeJournalSubTab").css("left","555px");
			$("#CellPressSubTab").css("left","675px");

			if($('#journalInfoSubTab').length == 0){
				$("#changeJournalSubTab").css("left","412px");
				$("#CellPressSubTab").css("left","535px");
			}
		}
	}
}