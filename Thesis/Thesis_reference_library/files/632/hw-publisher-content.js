$(document).ready(function() {
$("#content-block span.bio-sep").prepend('<h2>AUTHOR BIOS</h2>');
$("#content-block span.bio-sep").attr('id', 'author-bios');
var authbios = $("div.fulltext-view span.bio-sep");
if (authbios.length) {
    $("#col-2 #cb-art-nav ol").append('<li><a href="#author-bios">AUTHOR BIOS</a></li>');
}

// headless content abstract separation

var mbioUrl = "mbio.asm.org";
if (location.hostname == mbioUrl){
//do nothing if this is mbio
} else if ($("#sec-1 h2").length ){
//do nothing, because there's already an h2 there
//unless there is a paragraph right after abstract, which means this is funky old content
$("div#abstract-1").next("p").before("<div class='emptySection'></div>");
} else {
//headless content!  
    $("<div class='emptySection'></div>").insertAfter("#abstract-1");
    $("#sec-1 div.section-nav").css("display","none");
}


//$("#content-block h2").wrapInner('span');

//to left justify for qTr-PCR
//	var citation = $("div.subsection h3").text();
//        if (citation.search("qRT-PCR") > -1)   {
//	    $("div.subsection p#p-23").css("text-align", "left"); 
//	}

    //disable the footnote triangle
    //$("#content-block div.article.fulltext-view div.fn-group div.section-nav a").attr("href", "")
    //$("#content-block div.article.fulltext-view h1#article-title-1 a sup").hide();

        tabwidth = $("div.table-expansion table").outerWidth() + "px";
	$("div.table-caption").css("width", tabwidth); 

	$('.sub-article .contributors').each(function() {
		if ($(this).children('ol.affiliation-list').length == '' && $(this).children('p.affiliation-list-reveal')) {
			$(this).children('p.affiliation-list-reveal').hide();
		}
	});

});
