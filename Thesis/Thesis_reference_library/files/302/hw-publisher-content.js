/* RUP content page additional js */
$(document).ready(function() {
	var sidebarRefs = $("#cb-art-ref li#sidebar-refs");
	var contentRefs = $("div.article div.section.ref-list .cit-list");
	if (sidebarRefs.length && contentRefs.length) {
		sidebarRefs.empty().append(contentRefs.clone());
	}
});

function addEntrezLinks(xhtmlData) {
	var entrezDiv = $("#cb-entrez-links-placeholder");
	if (xhtmlData) {
		updateCBItem(entrezDiv, '<div id="cb-entrez-links-placeholder">' + xhtmlData + '</div>',true);
		fixColHeights(3);
	}
	else {
		updateCBItem(entrezDiv, '<div id="cb-entrez-links-placeholder">No PubMed Database Information</div>',false);
	}
}


$(document).ready(function() {
	handleauthExtra();

  var capImage = $("div.article div.graphic div.graphic-inline img"), 
    capText = $("div.article div.graphic div.graphic-caption"); 

  /* use onload of image event for webkit based browsers (chrome, safari) */
  if (jQuery.browser.safari || jQuery.browser.chrome) {
    $(capImage).load(function() {
      adjustCaption();
    });
  }
  else {
    adjustCaption();
  }

  function adjustCaption() {

    /* if both image and caption are present and defined get and re-set the caption width if required */
    if(typeof(capImage) != undefined && typeof(capText) != undefined) {
      var widthImage = capImage.width(),
        widthText = capText.width();

      /* caption max-width is defined in CSS */
      if(widthImage > 100 && widthImage < widthText) capText.css('width', widthImage);
    }
  }

  
});


function handleauthExtra() {
	var authExtraMatch = getSiteOption('authExtraMatch','div.article div.contributors ol.contributor-list li div.contrib-inline');	
	var authExtra = (authExtraMatch != undefined) ? $(authExtraMatch) : '';
	var parentItem = authExtra.parents("li").eq(0);
	if (authExtra.length) {

	var expandStr = getSiteOption('authExpandString', null);
		if (expandStr == null) {
			expandStr = getSiteOption('expandString', '+');
		}
		var contractStr = getSiteOption('authContractString', null);
		if (contractStr == null) {
			contractStr = getSiteOption('contractString', '-');
		}
		var extraP = '<span class="affiliation-list-reveal affil-extra"><a href="#" class="view-more">' + expandStr + '</a> Correspondence</span>';
		/* add auth affil show/hide p */
		var contribLists = $("div.article div.contributors ol.contributor-list");
		if (contribLists.length) {
			contribLists.after(extraP);
		}
		
	
		/* hide author affiliations until requested */
		if (authExtra.length) {
			authExtra.each(
				function (i) {
					modClass(authExtra.eq(i),'hideaffil','showaffil');
				}
			);
		}
		$("div.article div.contributors span.affil-extra a.view-more").click(
			function(e) {
				var allViewMores = $("div.article div.contributors span.affil-extra a.view-more");
				var authExtras = $(authExtraMatch);
				if ($(this).text() == contractStr) {
					/* hide the affil list */
					allViewMores.empty().append(expandStr);
					authExtras.each(
						function(i) {
							modClass(authExtras.eq(i),'hideaffil','showaffil');
							modClass(parentItem.eq(i),"hide-auth-extra","show-auth-extra");
						}
					);
				}
				else {
					allViewMores.empty().append(contractStr);
					authExtras.each(
						function(i) {
							modClass(authExtras.eq(i),'showaffil','hideaffil');
							modClass(parentItem.eq(i),"show-auth-extra","hide-auth-extra");
						}
					);
				}
				fixColHeights(1);
				e.preventDefault();
			}
		);
		/* show author affiliations when affil link is selected */
		$("div.article div.contributors ol.contributor-list a[href^='#aff']").click(
			function(e) {
				$("div.article div.contributors p. affil-extra a.view-more").each(
					function() {
						if ($(this).text() == expandStr) {
							$(this).empty().append(contractStr);
							var authExtras = $(authExtraMatch);
							if (authExtras.length) {
								authExtras.each(
									function(i) {
										modClass(authExtras.eq(i),'showaffil','hideaffil');
										modClass(parentItem.eq(i),"","");
									}
								);
							}
							fixColHeights(1);
						}
					}
				);
			}
		);
		fixColHeights(1);	}
		
}

$(document).ready(function() {
// opening Googlescholar link in a new win
var fragment = '&link_type=GOOGLESCHOLAR';
$('#cb-art-cited').find('a').filter(function(i) {
    return $(this).attr('href').indexOf(fragment) > -1
}).attr("target", "_blank");
});
