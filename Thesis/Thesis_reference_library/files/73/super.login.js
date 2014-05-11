// [FOX-5248] Adding webtrends tracking to login pages across anture.com, to  
// track when users login and when users login and select to be "remembered"
// similar code can be found in aip/myaccount/site.js

(function($) {
    $(document).ready(function () {
    	// 2 forms are used for logins across nature.com
		$("#form-login, #news-landing-form").submit(function() {
			var	_sourceProduct = $("meta[name='WT.cg_n']"),
				_productPage = _sourceProduct.attr("content"),
				args = [];

			if ($('#pws, #save-password').is(':checked')) {
				args.push("WT.action");
    			args.push("login_remember_me");
			} else {
				args.push("WT.action");
    			args.push("login_without_remember_me");
			}
			args.push("WT.source");
    		args.push(_productPage);
			args.push("WT.dl");
			args.push("1");
			args.push("WT.ndl");
			args.push("1");
			// alert(args.join('\n'));
			_tag.dcsMultiTrack.apply(_tag, args);
		});

	});
})(jQuery);
