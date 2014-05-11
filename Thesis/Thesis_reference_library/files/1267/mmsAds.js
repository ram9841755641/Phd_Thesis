//Refresh ads in page, default is all ads, or optionally specify a comma-separated list of formats
$.mmsRefreshAds = function(formats) {
    if (CM8AjaxRefresh) {
        CM8AjaxRefresh(formats || getMmsAdFormats(), CM8Profile,
            function(userData, finishedRequestId, placeHolders) {
                for (var i = 0; i < placeHolders.length; i++) {
                    var placeHolderData = placeHolders[i];

                    // Hook to the <DIV ID=”CM8ShowAd”> on which the ad is shown.
                    var div = placeHolderData.element;

                    // Hook to the ID of the shown banner ad.
                    // If no banner was available – then this is "null".
                    if (!placeHolderData.ad_id)
                        hideTopWrapperIfWithoutSibling(div);
                }
            });
    }
};

$(window).load(function() {
    if (typeof preparePhFormat == 'undefined') preparePhFormat = function() {
    };

    $('.NO_CM8').each(function(){hideTopWrapperIfWithoutSibling(this)});

    var adFormats = getMmsAdFormatsOnPage();
    if (adFormats) {
        $.mmsRefreshAds(adFormats);    
    }
});

//hide the top most wrapper with no siblings (with the exception of "adLabel")
function hideTopWrapperIfWithoutSibling(tag) {
    $(tag).parents().each(function() {
        var p = $(this);
        var prev = p.prev();
        var x = prev.hasClass("adLabel") ? 1 : 0;
        if (p.siblings().length > x) {
            p.hide();
            if (x == 1) prev.hide();
            return false; //exit the loop once Top most wrapper is found and hidden
        }
    });
}

function getMmsAdFormats() {
    return 'Topbanner,MedRectangle,MultipleOptions,MicroTrends,MicroTools,Sponsortext';
}

function getMmsAdFormatsOnPage(collection) {
    var adFormats = [];
    (collection || $('.CM8')).each(function() {
        if (this.title) {
            adFormats.push(this.title);
        } else if (this.CM8Format) {
            adFormats.push(this.CM8Format);
        }
    });
    return (adFormats.length) ? adFormats.join(",") : "";
}