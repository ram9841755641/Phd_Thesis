$(document).ready(function() {
    $('#content-block .fulltext-view div.contributors:last').after('<div id="article-navigation" class="art-nav collapsible"><span>Navigate This Article</span></a></div>');
    $('#cb-art-nav ol').clone().appendTo('#article-navigation');

setupCollapsibles();

// moving the auth aff expand link
  $("p.affiliation-list-reveal").prependTo("div.contributors:first");
});

function setupCollapsibles() {
	// sites can override this if they want to target different elements

	prepCollapsibles("div.fulltext-view div.collapsible");
	prepCollapsibles("div.content-box div.collapsible");
}