$(document).ready( function() {
	var oa_span = '<span class="oa-view-right">&nbsp;Free</span>';
	
	// add text free after abstract view
	if ($('a[rel="view-abstract"]').length != 0) {
		// abstract view is NOT selected
		$('a[rel="view-abstract"]').after(oa_span);
	}
	else if ( $('.abstract-view-link .variant-indicator').length != 0 ) {
		// abstract view is selected
		$('.abstract-view-link .variant-indicator').after(oa_span);
	}

	// if open access article. create and place a new span and delete the old one
	if ($('.oa-view') != 0) {
		// get the next object after the oa-view class which will be the view element
		view_obj = $('.oa-view').next();
		view_obj.after(oa_span);
		$('.oa-view').remove();
	}
});
