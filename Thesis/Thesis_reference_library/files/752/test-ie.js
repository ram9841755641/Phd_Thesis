$(document).ready(function() {        
	var isIE6 = $.browser.msie && $.browser.version < 7;
	var isIE7 = $.browser.msie && $.browser.version == 7;
	var isIE8 = $.browser.msie && $.browser.version == 8;

	if (isIE6) { 
		$('html').addClass('ie6 oldie');
        }
	if (isIE7) { 
		$('html').addClass('ie7 oldie');
        }
	if (isIE8) { 
		$('html').addClass('ie8 oldie');
        }
});
