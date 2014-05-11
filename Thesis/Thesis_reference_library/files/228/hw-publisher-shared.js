gSiteOptions.suppressDockedSearchNav = false;

$(document).ready(function() {
	$(".article .teaser").prepend('<h2>Capsule</h2>');
});

$(window).load(function() {
	//add class to col-3 if there's a spanned box
	if ($('#col-2 div.col-span').length) {
	$('#col-2,#col-3').addClass("spanned");
	//add placeholder div to col-3, set height same as spanning div
	$('#col-3.spanned').prepend('<div class="col-span-holder"></div>');
	var boxheight = $($("#col-2 >  div.col-span")[0]).height();
	$('#col-3 div.col-span-holder').css("height",boxheight);
	};
});
