/*
 * CSHL-maintained JavaScript support file for Genes and Development
 */





/* all the code below supports the column contract */


var gViewportW = 0;
var gDockedBoxLeft = 515;
var gDockedBoxNoColsLeft = 950;
var gColExpandDocked = false;
var gHeaderScrollPos = 0;
var gSuppressColExpand = true;

$(document).ready(function() {
//$("ul.tower-ads")
//    .appendTo("#ads3");
	var artSupRules = [
		//'', '$(#article-supplemental)'
		'', '$(#col-3 #sidebar-global-nav)'
	];
        $("#cb-art-cat a") 
   .each(function() 
   {  
	this.href = "#";
        //this.removeAttr("href");
$(this).removeAttr('href');
     
   });
	if (!(getSiteOption("suppressDockedNav") == true)) {
		
		setupDockBlock(3, 'docked-nav3', 'dockblock', artSupRules);
		
	}
	//setupDockBlock(3, 'docked-art-sup', 'docked-nav', artSupRules);

	
});





