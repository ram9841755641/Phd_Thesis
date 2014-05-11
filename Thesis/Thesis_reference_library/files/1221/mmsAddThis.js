/* Begin AddThis Scripts */
var addthis_config = {
	pubid: 'ra-4ddfaaf00b1e6fbf',
	services_exclude: 'print',
	services_compact: 'facebook, delicious, twitter, digg, linkedin, reddit, citeulike, connotea, more',
	ui_delay: 0,
	ui_header_color: "#333333",
	ui_header_background: "#FDFCE7",
	ui_cobrand: 'NEJM.org',
	data_track_clickback: true
}
var addthis_share = {
	url_transforms : {
		shorten: {
			facebook: 'bitly',
			delicious: 'bitly',
			twitter: 'bitly',
			digg: 'bitly',
			linkedin: 'bitly',
			reddit: 'bitly'
		}
	},
	shorteners : {
		bitly : {
			login: 'nejm',
			apiKey: 'R_644f2c9aae1c9bcb164b6f24392c94f4'
		}
	}
}

function closeEventHandler(evt) {
	/*-- Begin Hiding Promo --*/
	// Add a hide class to the addThis container since the "promo" shows up automatically
	$("#at15s").addClass("athide");
	// Hide giant transparent layer that prevents mouseover
	$("#at16lb").addClass("athide");
	/*-- End Hiding Promo --*/
}
function shareEventHandler(evt) {
	if (evt.type == 'addthis.menu.share') {
		/*-- Begin NetInsight Event Tagging --*/
		// Get AddThis service code (Example: twitter, facebook, etc)
		// List of Service Codes: http://www.addthis.com/services/list
		var serviceCode = (evt.data.service);
		var doi = $("meta[name=evt-doiPage]").attr("content") || "";
		
		// Call NetInsight (name, params)
		$.mmsEvent('zone-tools-share-service-click',{
			'service': serviceCode, 
			'doi': doi
		});
		//alert ("Service Code: [" + serviceCode + "]    Doi: [" + doi + "]");
		/*-- Begin NetInsight Event Tagging --*/
	}
}

/* Document Ready */
jQuery(function($){
	$("a.addthis_button").hover(function(){
		// Remove the hide class to addThis container on rollover
		$("#at15s").removeClass("athide");
	});
	
	$.getScript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4ddfaaf00b1e6fbf&domready=1',
	function(){
		addthis.init(); //callback function for script loading
		// Listen to AddThis event
		addthis.addEventListener('addthis.menu.close', closeEventHandler);
		addthis.addEventListener("addthis.menu.share", shareEventHandler);
	});
});
/* End AddThis Scripts */