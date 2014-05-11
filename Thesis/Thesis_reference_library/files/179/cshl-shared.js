$(document).ready(function() {

	/* override views for popupabs */
	setTimeout("setpopviews(1)", 25);
	
});

function setpopviews(count) {
	if ((gSiteOptions == undefined) && (count < 10)) {
		var nextCall = "setpopviews(" + (count+1) + ")";
		setTimeout(nextCall, 25);
	}
	else {
		gSiteOptions.popupViews = ['abstract','extract','excerpt'];
	}
}
