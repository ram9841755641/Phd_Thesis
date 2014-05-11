// resize image containers based on size of images
runOnLoad(function() {
	$("div.image-full").each(function(i){
		var imageWidth = $(this).find("img").width();
		$(this).css("width", (imageWidth));
		$(this).css({ "margin-left" : "auto", "margin-right" : "auto" });
	});

	$("div.image-legend").each(function(i){
		var imageWidth = $(this).find("img").width();
		$(this).css("width", (imageWidth + 10));
		$(this).find("img").css("margin-top", "5px");
	});
});

(function($) {
    $(document).ready(function () {
        $("body:not('.js-enabled')").addClass("js-enabled");
			
			/* changing compound spans to links if javascript is present */
		    $("span[class^='nc-compound-']").each(function() {
				$(this).replaceWith("<a href=\"#\" class=\""+ $(this).attr('class') +"\" title=\"Click on compound name to show more options\">" + $(this).html() + "</a>");
			});

			/* --------------------------------------------------*/
			/* highlight the compounds */
			/* --------------------------------------------------*/
			$("a.show-comp").toggle(
			  function () {
			    $(".compound").addClass("hilite");
				$(this).html('Hide compounds');
				return false;
			  },
			  function () {
			    $(".compound").removeClass("hilite");
				$(this).html('Show compounds');
				return false;
			  }
			);

			/* --------------------------------------------------*/
			/* popup compound links */
			/* --------------------------------------------------*/
			
			var currentComp;
			var compShowing = false;
			var compLinksHeight;
			var cX;
			var cY;
				
			function showCompLinks(element) {

				currentComp = $(element).attr('class'); 
				$("div[class$=" + currentComp + "]").css({display: 'block', position: 'absolute', left: cX+10, top: cY});
			
				var compTitleWidth = $("h5[class$=" + currentComp + "]").width();
				if (compTitleWidth < 200) {
					$("div[class$=" + currentComp + "]").css({width: '14em'});
				}
				else { 
					var compLinksTotalWidth = compTitleWidth+50;
					$("div[class$=" + currentComp + "]").css({width: compLinksTotalWidth});
				}
				
				viewportWidth=($(window).width()); 
				viewportHeight=($(window).height()); 
				compLinksWidth = $("div[class$=" + currentComp + "]").width();
				
				/* if the popup is outside the viewport in any way, then bring it back in*/
				if ((compLinksWidth+cX+10) > (viewportWidth-20)) {
					$("div[class$=" + currentComp + "]").css({left: (viewportWidth-compLinksWidth), top: cY});
				}
			}
			
			function hideCompLinks(theComp) {
				$("div[class$=" + theComp + "]").css({width: 'auto'});
				$("div[class$=" + theComp + "]").css({display: 'none'});
			}
			
			// show/hide compound links 
        	$(".compound a[class^='nc-compound-']").click(function(e) {
				cX=e.pageX;
				cY=e.pageY;
				if (!compShowing) {
					showCompLinks(this);
					compShowing = true;
					return false;
				}
				// popup a new compound if clicked on and one is already open
				else if (compShowing && ($(this).attr('class')!=currentComp)) {
					hideCompLinks(currentComp);
					showCompLinks(this);
					return false;
				}
				else {
					hideCompLinks(currentComp);
					compShowing = false;
					return false;
				}
			});
			
			// close the compound links popup if user clicks on the close button
			$("a[class='close']").click(function() {
				hideCompLinks(currentComp);
				compShowing = false;
				return false;
			});
			
			// close the compound links popup if the user clicks outside it.
			$('body').click(function (e) {
				
				if (compShowing) {
					var compBoxPos = $("div[class$=" + currentComp + "]").offset();
					var checkWidth =  $("div[class$=" + currentComp + "]").width();
					var checkHeight =  $("div[class$=" + currentComp + "]").height();
					if ((e.pageX > compBoxPos.left) && (e.pageX < (compBoxPos.left+checkWidth)) && (e.pageY > compBoxPos.top) && (e.pageY < (compBoxPos.top+checkHeight))) {
						return;
					}
					else {
						hideCompLinks(currentComp);
						compShowing = false;
					}
				}
			 });


			
    });
}) (jQuery);