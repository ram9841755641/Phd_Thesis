var com = com || {};
com.nature = com.nature || {};

com.nature.ArticleSetup = (function($) {

	var ArticleSetup = function() {
		this.highlighter = null;
	};

	ArticleSetup.prototype = {	
		initHighlighting: function() {
			this.highlighter = new com.nature.Highlighter();
			this.highlighter = $.extend(this.highlighter, new com.nature.Broadcaster());
			this.highlighter.init();	
			// this.highlighter.subscribe('toggle', this.PageManager.trackHighlighting, this.PageManager);
		}
	};	
	return ArticleSetup;

})(jQuery);


