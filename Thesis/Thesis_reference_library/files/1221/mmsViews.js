$.mmsViews = {};

//Register layer and popups on links and forms
$.mmsViews.registerViewTypes = function(context) {
    context = context || $('body');

    //Wire up view types for links
    context.find('a[class*=viewType]').click(function() {
        var el = $(this);
        var isIE6orLess = $.browser.version < 7 && $.browser.msie;
        if (isIE6orLess && el.mmsClassData('viewType') == 'Layer' && el.hasClass('figureLink')) {
            //downgrade layer functionality from IE6 on figure/table anchors
            return true;
        }
        
        var selector = el.mmsClassData('event');
        $.mmsLinkEvent('a.' + selector, el);

        //Show the appropriate view
        $.mmsViews.showView(this.href,
                el.mmsClassData('viewType'),
                el.mmsClassData('viewClass'),
                el.mmsClassData('viewPosition'), el);

        return false;
    });

    //Wire up view types for forms
    context.find('form:mmsClassData(viewType=Layer)').each(function() {
        var el = $(this);
        var viewType = el.mmsClassData('viewType');
        var viewClass = el.mmsClassData('viewClass');
        if(viewType) el.append('<input type="hidden" name="viewType" value="' + viewType + '"/>');
        if(viewClass) el.append('<input type="hidden" name="viewClass" value="' + viewClass + '"/>')
        el.ajaxForm(function(response) {
            if($.mmsViews.currentLayer) $.mmsViews.currentLayer.unload();
            $.mmsViews.renderLayer(response, viewClass);
        });
    });

    context.find('form:mmsClassData(viewType=Iframe)').each(function() {
        $(this).append('<input type="hidden" name="viewType" value="Iframe"/>');
    });
};


//Sizes and options for popups, since these need to be known on popup creation
$.mmsViews.popupStyles = {
    Audio: 'menubar=0,width=800,height=630,scrollbars=1',
    Normal: 'menubar=0,width=800,height=460,scrollbars=1',
    Print: 'menubar=1,width=800,height=600,scrollbars=1',
    Suppl: 'menubar=1,width=785,height=460,scrollbars=1,status=1,location=1,toolbar=1'
};


//Options for layers
$.mmsViews.layerOptions = {title: ' ', fixed:false, unloadOnHide: true, modal: false, opacity: 0.52};

//Options for layers
$.mmsViews.layerOptionsBlackOut = {title: ' ', fixed:false, unloadOnHide: true, modal: true, opacity: 0.52};

//Show a version of a page such as a layer or pop-up
$.mmsViews.showView = function(url, viewType, viewClass, viewPosition, linkRef, callback) {
    if(viewType == 'Popup') {
        var popupUrl = url + '&viewType=' + viewType + '&viewClass=' + viewClass;
        var styleKey = url.indexOf("audio") != -1 ? 'Audio' : (viewClass || 'Normal');
        window.open(popupUrl, 'audioWindow', $.mmsViews.popupStyles[styleKey]);
     }
    else if(viewType == 'Print') {
        var popupUrl = (url.indexOf('?') > 0)? url + '&' : url + '?';
        popupUrl += "viewType=" + viewType + "&viewClass=" + viewClass;
        window.open(popupUrl, 'printWindow', $.mmsViews.popupStyles[viewClass || 'Print']);
    }
    else if(viewType == 'Layer') {
        if($.mmsViews.currentLayer) $.mmsViews.currentLayer.unload();
        $.ajax({
            url: url,
            success: function(html) { $.mmsViews.renderLayer(html, viewClass, viewPosition, linkRef);  },
            data: { viewType: viewType, viewClass: viewClass }
        });
    }
    else if(viewType == 'Panel') {
        $.ajax({
            url: url,
            success: function(html) { callback(html); },
            data: { viewType: viewType, viewClass: viewClass }
        });
    }
    else {
        window.location.href = url;
    }
};


//Render a layer
$.mmsViews.renderLayer = function(html, viewClass, viewPosition, linkRef) {
    var content = $('<div>' + html + '</div>');
    if ($.mmsRegisterEvents) $.mmsRegisterEvents(content);  // IE sometimes complains $.mmsRegisterEvents is undefined ;(
    content.appendTo('body');
    var newContent = content.find('div.newContent');
    if(newContent.length > 0) {

        if (linkRef) {
            var layerTrigger = linkRef.mmsClassData('event');
            if (layerTrigger) $.mmsLinkEvent('a.' + layerTrigger + '-open');
            else {  //for links in ads
                $.mmsLinkEvent('a.' + linkRef.text().replace(' ','').toLowerCase() + '-open');
            }
        }

        var modalClass = ['ImcWideLayer', 'ImageViewerLayer','WiderLayer','SlideShow','SlideShowLayer', 'Audio'];

        // display layer with a black modal background for certain viewClass types
        if ($.inArray(viewClass, modalClass) >= 0){
            $.mmsViews.currentLayer = new Boxy(newContent, $.mmsViews.layerOptionsBlackOut);
        }
        else {
            $.mmsViews.currentLayer = new Boxy(newContent, $.mmsViews.layerOptions);
        }


        if(viewPosition == 'Absolute') {
            $.mmsViews.currentLayer.boxy
                .addClass(viewClass)
                .css('top', linkRef.offset().top - 5)
                .css('left', linkRef.offset().left - 25);

            //Make sure we're centered
            setTimeout(function() { $.mmsViews.currentLayer.moveToX(); }, 100);
        }
        else {
            $.mmsViews.currentLayer.boxy.addClass(viewClass);                       // Will change dimensions
            $.mmsViews.currentLayer.center();                                       // Centers horizontally and vertically
            var sT = $(window).scrollTop() + 50;
            $.mmsViews.currentLayer.boxy.css('top', (sT < 110) ? 110 : sT);    // Move vertically 50px down from scrolled position
        }

        var loginObj = newContent.find('#login');
        if (loginObj.length > 0) {
            loginObj.focus();
            newContent.find("input").keyup(function(e) {   //force form submission when the enter key is pressed
                 if (e.keyCode==13) { 
                     var form = $(this).parents("form").get(0); // first <form> tag that is a parent.
                     if (form) form.submit();
                     return e.preventDefault(); // stop it from activating in other browsers.
                 }
             });
        }
        
        
        var saveLayerTitle = newContent.find('#title');
        if(saveLayerTitle.length > 0)
        {
        	saveLayerTitle.focus();
        	
        }
        
        
        
        if (layerTrigger == 'lyrForgotPwd') $('#email').focus();
        if (layerTrigger == 'zone-tools-articleEmail') $('#mailFrom').focus();
        var ads = newContent.find(".CM8");
        if (ads.length > 0) {
            $.mmsViews.currentLayer.boxy.find('td.bottom').html("").append(newContent.find(".bottomAd"))
                    .append("<br style='display:none'/>"); // prevents hiding of td.bottom when there is no ad available
            $.mmsRefreshAds(getMmsAdFormatsOnPage(ads));
        }
        newContent.find('.NO_CM8').each(function() { hideTopWrapperIfWithoutSibling(this) });
    }
    content.remove();
};
