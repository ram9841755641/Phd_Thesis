var mmsLayers = function () {

    var close = document.createElement('div');
    close.className = "closeLayer";
    close.innerHTML = "&#160;"

    //style inputs that don't get styled on page load
    $('.borders').mmsApplyBorders();
    $('input:submit').mmsReplaceButtonWithDiv();

    $("div#layer").children(":first").children(":first").before(close);

    $(".closeLayer").click(function() {
               $.mmsToggleLayer(0);
               return false;
       });

     $(".closeLayerRedirect").click(function() {
               $.mmsToggleLayer(0);
               window.location = this.href;
               return false;
     });


    $("form[@class=layerForm]").submit( function () {

        var action = $("form[@class=layerForm]").attr("action");
        var formData = $("form[@class=layerForm]").serialize();
        var toPost = formData + "&submit=" + $(this).find("input[@name=submit]").val() + "&layerDisplay=inline";

        // errors are returned as JSON by the JSP. Otherwise, we submit the form and let natural action take it's course.
        // however in some cases the JSP response will not be an error but should be displayed inline. we test this by checking to see if the layer div has class inline (see above)
        // so first try to perform ajax request as json to catch errors.
        // if that fails,

            $.ajax({
            type: "POST",
            url: action,
            data: toPost,
            dataType: "json",
            success: function(data){
                   var appMsg = data.msg.app;
                   if(appMsg == "error") {
                        $("#formResponse").html(data.msg.user);
                        $("#formResponse").addClass("errorMessage");
                   }
            },
            error: function(xhr, desc, e) {
                //alert("Failed to submit: " + desc + "xhr: " + xhr + "e:" + e);
                resubmit(action,toPost);
            }
          });

//        $("form[@class=layerForm]").unbind();
//        $("form[@class=layerForm]").submit();
          return false;
    });

    function resubmit(action,toPost) {
            $.ajax({
            type: "POST",
            url: action,
            data: toPost,
            dataType: "html",
            success: function(data){
                 $("div#layer").parent().html(data);
            },
            error: function(xhr, desc, e) {
                alert("Failed to submit: " + desc + "xhr: " + xhr + "e:" + e);
            }
          });

    }
};

/** Survey and Promo Layer handling
 */
(function($) {
    $.mmsLayers = {
        // config will be extended later with rules an layouts
        config: {
            baseCookieDomain: location.hostname,
            rules: [],
            layouts: {}
        }
    };

    //Look through the layer rules for matches (in priority order)
    $.mmsLayers.processRules = function(data) {

        var showLayers=$("#showLayers").val();
        if(showLayers=="true"){
            //Check how many pages have been shown on this visit
            var counter = $.cookie('Layer Counter') || 0;
            //session cookie that determines if any of the layers is already viewed
            var sessionCookie="Layer Viewed";
            //launch layer ad
            var firstAd= $("#firstAd").val();
            //promo layer ad
            var secondAd=$("#secondAd").val();
            var rulePassed=false;


            //Update the count
            $.mmsLayers.setP3P();
            $.cookie('Layer Counter', ++counter, { domain: data.baseCookieDomain, path: '/' });

            //Loop through rules
            $.each(data.rules, function(i, rule) {

                if (!($.mmsViews.currentLayer && $.mmsViews.currentLayer.visible) && !$.cookie(sessionCookie) && rule.enabled && !rulePassed ) {
                    //check for marketing lauch layer
                    if (i == 0 && $.mmsLayers.showOnPage(rule, counter) && !$.cookie(rule.cookieName) && firstAd.length > 0) {
                        $.mmsLayers.showLayerAd(firstAd,rule.styleClass);
                        $.mmsLayers.setCookie(rule);
                        $.mmsLayers.setSessionCookie(sessionCookie);
                        return false;
                    } else  if (i == 1 && $.mmsLayers.showOnPage(rule, counter) && !$.cookie(rule.cookieName) && secondAd.length > 0) { //Check for promo layer
                        $.mmsLayers.showLayerAd(secondAd,rule.styleClass);
                        $.mmsLayers.setCookie(rule);
                        $.mmsLayers.setSessionCookie(sessionCookie);
                        // thisAd should be set as global variable in N-ad-promoLayer-1 placeholder
                        $.mmsEvent('layer-promo-shown', typeof thisAd == "undefined" ? {} : {promoAd:thisAd});
                        return false;
                    } else if (i == 2 && $.mmsLayers.showOnPage(rule, counter)) { //check Iperceptions layer
                        //Invoke Iperceptions script
                    	var iPerceptionsSrc = "http://ipinvite.iperceptions.com/Invitations/Javascripts/ip_Layer_invitation_624.js";
                    	if ("https:" == location.protocol) {
                    		iPerceptionsSrc = iPerceptionsSrc.replace(/http:/, 'https:');
                    	}
                    	if (rule.test) {
                    		iPerceptionsSrc = iPerceptionsSrc.replace(/\.js$/, '_DEV.js');
                    	}                    	
                        var iScript = $('<script type="text/javascript" defer="defer" src="' + iPerceptionsSrc + '"></script>');
                        $.mmsRegisterEvents(iScript);
                        iScript.appendTo('body');
                        return false;
                     }
                }
            });

            //Setup Firebug tests - type forceLayer(0) into the console to show the
            //first layer, forceLayer(1) for the second etc.
            window.forceLayer = function(i) {
                var rule = data.rules[i - 1];
                $.mmsLayers.showLayer(data.layouts[rule.layout], rule.iframeUrl,rule.styleClass);
            };
        }      
    };

    $.mmsLayers.showOnPage = function(rule, pageCount) {
    	return (rule && (rule.showOnPage == undefined || rule.showOnPage == pageCount));
    }
    
    //Test a rule and show the layer if appropriate
    //Returns true if the layer was shown
    $.mmsLayers.testRule = function(rule, layout, i) {
        //        var pattern = new RegExp(rule.pattern);
        //        var url = window.location.href;

        $.mmsLayers.showLayer(layout, rule.iframeUrl,rule.styleClass);
        $.mmsLayers.setCookie(rule);

        if (pattern.test(url)) {
            //        if (rule.enabled ){
            $.mmsLayers.showLayer(layout, rule.iframeUrl,rule.styleClass);
            $.mmsLayers.setCookie(rule);

            //Make this layer not show up again for a specified period
            //            $.cookie(rule.group, 'viewed',
            //            {path: '/', expires: rule.frequency, domain: $.mmsLayers.config.baseCookieDomain});
            return true;
        }
        else
            return false;
    };

    //Show the layer
    $.mmsLayers.showLayer = function(layout, iframeUrl,styleClass) {
        //Replace the {iframeUrl} placeholder in the layout with the actual url
        var layer = "<div class='newContent'>" + layout.replace('{iframeUrl}', iframeUrl) + "</div>";
        $.mmsViews.renderLayer(layer, "iframeLayer "+styleClass);
    };

    //Show the layerAd
    $.mmsLayers.showLayerAd = function(adContent,styleClass) {
        //Replace the {iframeUrl} placeholder in the layout with the actual url
        var layer = "<div class='newContent'>" + adContent + "</div>";
        $.mmsViews.renderLayer(layer, "iframeLayer "+styleClass);
    };

    //Set the cookie
    $.mmsLayers.setCookie= function(rule){
        $.mmsLayers.setP3P();
        //Make this layer not show up again for a specified period
            $.cookie(rule.cookieName, 'viewed',
            {path: '/', expires: rule.frequency, domain: $.mmsLayers.config.baseCookieDomain});        
    }

    //Set a session cookie
    $.mmsLayers.setSessionCookie= function(cookieName){
        $.mmsLayers.setP3P();
        //Set a cookie that expires with session expiration
            $.cookie(cookieName, 'viewed',
            {path: '/',expires:null , domain: $.mmsLayers.config.baseCookieDomain});        
    }

    $.mmsLayers.setP3P = function() {
        if ($("head meta[http-equiv='P3P']").length === 0) $('head').append("<meta http-equiv='P3P' content='CP=\"NOI DSP ADM OUR IND OTC\"'>");
    }

    //On page load
    $(function() {
        //Get the layer rules and process them
        $.mmsLayers.processRules($.mmsLayers.config);
    });

})(jQuery);
function submitCommentForm(theForm) {
    var theFormName = theForm.attr("name");
    var action = theForm.attr("action");
    var formData = theForm.serialize();
    var submitValue = theForm.find("input[name='submit']").val();
    var isEmptyString = submitValue == " ";
    if (isEmptyString) submitValue = "submit";
    var toPost = formData + "&submit=" + submitValue + "&layerDisplay=inline";

    $('#processingDiv').text("Processing...");
    //theForm.find("input[name='submit']").disabled = true;
    theForm.find("input[name='submit']").attr({'disabled': 'true'});
    $.ajax({
        type: "POST",
        url: action,
        data: toPost,
        dataType: "html",
        success: function(data){
            $("#" + theFormName).html(data);
        },
        error: function(xhr, desc, e) {
            alert("Failed to submit: " + desc + "xhr: " + xhr + "e:" + e);
            resubmit(action,toPost);
        }
    });

    //        $("form[@class=layerForm]").unbind();
    //        $("form[@class=layerForm]").submit();
    return false;
}

function resubmit(action,toPost) {
            $.ajax({
            type: "POST",
            url: action,
            data: toPost,
            dataType: "html",
            success: function(data){
                 $("div#layer").parent().html(data);
            },
            error: function(xhr, desc, e) {
                alert("Failed to submit: " + desc + "xhr: " + xhr + "e:" + e);
            }
          });

    }
