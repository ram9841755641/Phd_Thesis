(function() {
  // This overrides the addFig() function to do some custom functionality
  var proxied = window.addFig;
  window.addFig = function(){   
    /* run original function to do the ajax call and swap stuff out */
    proxied.apply(this, arguments);
    figWrapperEl = arguments[1]; 
    /* then replace the expansion link with a poster link */
    hrefPoster = figWrapperEl.find(".callout .callout-links a[rel='poster']").attr('href');
    if (hrefPoster.length) { 
        figWrapperEl.find("a[href*='expansion']").filter(':first').attr('href', hrefPoster);
    }  
  };
})();

$(document).ready(function() {
    // label articles with 'free full text' on toc page
    $('div.fig-inline div.callout').each(function() {

        if ($(this).find("a.poster-link").length) {
            $(this).find("ul.fig-services").remove();
        }
    
    });


});
