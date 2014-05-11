var com = com || {};
com.nature = com.nature || {};

com.nature.ArticleSetup = (function($) {
	
	var ArticleSetup = function() {
		this.isAbstract = $('meta[name="abstract"]').attr('content') == 'yes';
		this.PageManager = com.nature.PageManager;
		this.highlighter = null;
	};
	ArticleSetup.prototype = {
		initSlideshow: function(){
			$('div.carosello').each(function() {
				var slideshow = new com.nature.slideshow.Inline($(this));
			});
		},

		// Code below taken from /view/scripts/global.ArticleSetup.js 
		initBookmarking: function() {
			var pm = this.PageManager; 	
			var $tbl = $('#toggle-bookmarking-links');
			if ($tbl.length) {
				var popup = new com.nature.Popup($tbl, $('#bookmarking-links').addClass('bookmarking-popup'), {
					hasArrow: false,
					position: 'below'
				});
				popup.title('Bookmark &amp; Share');
				popup = $.extend(popup, new com.nature.Broadcaster());
				popup.init();
				popup.subscribe('open', pm.trackSharePopup, pm);
			}
		}
	};



	/* subsection expand/collapse */
	$('.sub-section-heading').linkify();
	
	$('.sub-section-heading').parent().addClass('collapsed');
	$('.sub-section-heading a').addClass('sub-title');
	
	$(".sub-section-heading a").click(function() {
		if ($(this).parent().parent().hasClass('collapsed')) {
			$(this).parent().parent().removeClass('collapsed');
			$(this).parent().parent().addClass('expanded');
			return false;
			
		}
		if ($(this).parent().parent().hasClass('expanded')) {
			$(this).parent().parent().removeClass('expanded');
			$(this).parent().parent().addClass('collapsed');
			return false;
			
		}
	});
	
	return ArticleSetup;
})(jQuery);

