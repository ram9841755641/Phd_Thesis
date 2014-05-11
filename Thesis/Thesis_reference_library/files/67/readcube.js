// readcube.js
//
// Used for ReadCube integration for Legacy article pages. Developed first for
//  Nature Reviews but probably it can be used anywhere else without any
//  further changes.
//
// For reference, see:
//  http://powerplant.nature.com/wiki/display/foxtrot/ReadCube+front-end+integration
//  http://powerplant.nature.com/jira/browse/SALT-896
//
// In the Legacy Architecture, when an article has been modified and re-ripped (e.g. because it has been updated or
//  has a correction) the information of the date that the article has been modified is stored in the XML but
//  it is NOT exposed to the frontend.
//
// As part of the addition of ReadCube links in the Reviews Journals, we need the know the date of last modification,
//  as if the article has been updated we need to ping ReadCube again to make sure they retrieve the new modified
//  version of the article.
//
// There are only two possibilities of an article page being modified: an Update or a Correction. In both cases
//  the XML is modified and the article re-ripped, with the resulting article template displaying the text
//  "Updated online: 20 September 2013" or "Corrected online: 20 September 2013" for Review Journals. For Nature Journal
//  and others, a separate Corrigendum is published so the original article is intact. Therefore, we ignore the update
//  when pinging ReadCube

// This function retrieves the doi from the meta tags and searches for the Update or Correction text so it can parse
//  the date. Then it pings ReadCube by calling the url they have provided, which is the same one used in AIP.
(function($) {
	$(document).ready(function () {
		// Retrieve doi of the article from the page meta tags and remove
		//  the initial 'doi:' which is not used/allowed in the ReacCube ping URL
		var doi = $('meta[name="dc.identifier"]').attr("content").replace('doi:', '');

		// Determine if this article includes an update or a correction
		updateCorrectn = $('a[href$="#update"],a[href$="#correctn"]');
		var url = ""; // This is to get the linter to stop complaining
		if (updateCorrectn.length > 0) {
			// The article has been updated, we need to retrieve the date of the update
			var objDate = new Date(updateCorrectn.parent().text().split(": ").pop());
			var y = objDate.getFullYear();
			var m = objDate.getMonth() + 1; // In JS January is 0
			var d = objDate.getDate();
			var txtDate = '' + y +'-'+ (m<=9?'0'+m:m) +'-'+ (d<=9?'0'+d:d);

			// As the article has been updated we will ping ReadCube using the DOI and the modification date
			url = "http://content.readcube.com/ping?doi=" + doi + "&format=js&last_modified=" + txtDate;
		}
		else {
			// There is no update to the article, we will ping ReadCube just using the DOI
			url = "http://content.readcube.com/ping?doi=" + doi + "&format=js";
		}

		// By default jQuery adds a unique parameter to the url being requested so, because the url is different
		//  each time, the url ends up being requested for every page view and caching is effectively disabled.
		//  Although most probably this doesn't break the ReadCube pinging, we have no reason for not allowing
		//  the caching of the script in the browser, so we are enabling caching for this call.
		$.ajaxSetup({ cache: true });
		$.getScript(url);
		$.ajaxSetup({ cache: false });
	});
})(jQuery);
