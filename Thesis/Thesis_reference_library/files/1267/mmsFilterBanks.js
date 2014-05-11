//Code for filters and result panes
$.mmsFilterBanks = {};

//On page load...
$(function() {
    //Set up filter banks action - only if page actually has filters
    if($('body').hasClass('search') || $('#content.filterBank').length > 0) {
        // Bind an event to window.onhashchange that, when the history state changes,
        $(window).bind( 'hashchange', function(e) {

            $.mmsFilterBanks.linkAction();

        });
        var qs = $.bbq.getState('qs');
        if (qs) $.mmsFilterBanks.linkAction();
    	$.mmsFilterBanks.updateFilterList();
    }
});

$.fn.mmsInitFilters = function() {
    this.each(function() {
        var el = $(this);
        var filterBank = el.closest('.filterBank');
        var showFullList = filterBank.data(el.attr('id') + 'ShowingFullList');

        //Hide extra items if a showOnly-x class is applied
        el.filter('dl:mmsClassData("showOnly")').mmsShowOnly('dd').end()
            //Mark the last filter in the list
            .filter('dl:last-child').addClass('lastFilter').end()
            //Count clicks on a checkbox icon as clicks on the link
            .filter('dl.checkFilter').find('dt').click(function() { $(this).find('a').click() });

        //If this filter was showing only n elements before, keep it in that state
        if(showFullList) el.find('a.showToggle').click();

        //If this filter was collapsed before, keep it collapsed
        if(filterBank.data(el.attr('id') + 'Collapsed')) el.toggleClass('filterCollapsed');

    });
    return this;
};

$.mmsFilterBanks.linkClick = function() {
    var el = $(this);
    $.bbq.pushState( {qs : el.attr( 'href' ) }) ;
    $.mmsLinkEvent('dl.filter a', el);
    if(el.closest('div').hasClass('pages'))
        $('body, html').scrollTop($('#content').offset().top);
    return false;
};

$.mmsFilterBanks.linkAction = function() {
    var qs = $.bbq.getState('qs');
    if (!qs) qs = $(location).attr('href');
    if (qs) {
        $('#searchResultContent').css('opacity', 0.75);
        $.mmsViews.showView(qs, 'Panel', '', '', null, $.mmsFilterBanks.updateAll);
        
        /* Reload ads on current page */
        var adFormats = getMmsAdFormatsOnPage();
        if(adFormats)
        {
	        if ($('body.search.browse').length) {
	        	// Browse page : Don't refresh ads.
	        	} else if ($('body.search.topic').length) {
	        	// Topic page : Don't refresh ads.
	        	} else if ($('body.search').length) {
	        	// Search results page : Refresh all ads.
	        	$.mmsRefreshAds(adFormats);
	        }
        } 
    }
}

$.mmsFilterBanks.formSubmit = function() {
    $.mmsLinkEvent('zone-searchFilterResults-submitSearch');
    var form = $(this);
    var qs = "?";
    var formFields = $(this).find('input');
    formFields.each(function() {
        if (this.value != "Search" && this.name != 'pageType')
            qs += this.name + "=" + this.value + "&";
    })
    var dateFields = $('#dateFilter .selected .showWhenSelected select');
    dateFields.each(function() {
        if (this.value != "Search" && this.name != 'pageType'){
        	qs += this.name + "=" + this.value + "&";
        }
    })
    $.bbq.pushState( {qs : qs.substring(0,qs.length - 1) }) ;
    $.bbq.pushState( {qs : qs.substring(0,qs.length - 1) }) ;
    form.append('<input type="hidden" name="viewType" value="Panel"/>');
    form.ajaxSubmit({ success: $.mmsFilterBanks.updateAll });
    return false;
};


$.mmsFilterBanks.updateAll = function(html) {
    var newContent = $(html);
    $.each(['HeaderContent', 'ResultContent', 'FilterContent', "SuggestionContent"], function() {
        $('#search' + this).replaceWith(newContent.find('#new' + this).attr('id', 'search' + this));
        $.mmsRegisterEvents($('#search' + this));
    });
    $.mmsFilterBanks.updateFilterList();

    //fix for save links to trigger save dialog  & remove hover events for content loaded via Ajax--
    if(isMobileDevice())
	{	//remove blurb
		$('div.hover').unbind('mouseenter mouseleave');
		$('.hoverwrap').css('display','block');
		
		$('.hover_text').css('fontSize','80%');
		$('.text').css('fontSize','60%');
		$('.ref').css('fontSize','120%');
		
		//$('.hover_text').css('fontSize',$('.ref').css('fontSize'));
		//$('.ref').css('fontSize','100%');  			
		//$('.hover_text').css('fontSize','100%');  	
		//$('body').css('-webkit-text-size-adjust','125%');
	}	
	    
    //replaceSaveLinks();
    //replaceIMCPlayAndSaveLinks();
    enableBIEvents();
    addSaveRedirect()
    reloadTriggerPage();
    $('.event-hoverSavePage').bind("click", function(event){
		 
    	 var browserURL = decodeURIComponent($(location).attr('href'));
		    if(browserURL.indexOf("#qs=?") != -1)
		    {
						var stateVal = jQuery.bbq.getState();
						if(stateVal != "" || stateVal != null)
						{
						var newlocation = $(location).attr('href').replace(/\?.*/,'');
						var newlocation = $(location).attr('href').replace(/\#.*/,'');
						browserURL = newlocation+stateVal.qs;
						console.log('updated browser URL '+browserURL);
						}else{
					       browserURL = browserURL.replace("#qs=?","?");
						}
		    }

	    var elemId = $(this).attr('id');
	    
	    var autoSignIn = $.cookie('AUTO_SIGNIN');
		if(autoSignIn == "" || autoSignIn == null)
		{
			$.cookie('TRIGGER_BROWSER_URL', browserURL, { path: '/' });
			$.cookie('TRIGGER_SAVE_ID',elemId, { path: '/' });
		}
		
		return false;
   });

    
    
    
};


$.mmsFilterBanks.toggleFilterVisibility = function() {
    var filter = $(this).parent().toggleClass('filterCollapsed');

    //Keep the collapsed state up on the root filterBank element so it won't get erased with Ajax updates
    var filterBank = filter.closest('.filterBank');
    var property = filter.attr('id') + 'Collapsed';
    filterBank.data(property, !filterBank.data(property));
};


$.fn.mmsShowOnly = function() {
    this.each(function() {
        var container = $(this);
        var showOnly = container.mmsClassData('showOnly');
        if(container.find('dd').length > showOnly) {
            var link = $('<a class="showToggle showToggleLess" href="#"></a>');
            link.click($.mmsFilterBanks.toggleFullList);
            $('<dd/>').addClass('toggle').append(link).appendTo(container);
            link.click();
        }
    });

    return this;
};


$.mmsFilterBanks.toggleFullList = function() {
    var el = $(this);
    var container = el.closest('dl');
    var showOnly = container.mmsClassData('showOnly');
    if(el.hasClass('showToggleLess')) {
        container.find('dd:not(.toggle):gt(' + (showOnly - 1) + ')').addClass('hidden');
        el.removeClass('showToggleLess').html('More');
        container.closest('.filterBank').data(container.attr('id') + 'ShowingFullList', false);
    }
    else {
        container.find('dd').removeClass('hidden');
        el.addClass('showToggleLess').html('Less');
        container.closest('.filterBank').data(container.attr('id') + 'ShowingFullList', true);
    }

    return false;
};

$.mmsFilterBanks.updateFilterList = function() {
	var el = $(this);
	var selected = $('#searchFilterContent dl dd.selected');
	var filter_string = "";
	$.each(selected,function(index, value) {
		var text = $(value).text();
		if (text.indexOf('Specific date range')>-1) { text = "Specific date range"; }
		text = text.replace(/\((.+?)\)/,"");
		text = text.replace(/\s+$/,"");
		filter_string = filter_string + text;	
		if (index != selected.length-1) {
			filter_string = filter_string + ", ";
		}
	});
		
	var filters = $('<div class="searchFilters"><span class="label">Filters:</span>').append(filter_string);
	var searchtypes = $('body.search').not('body.topic,body.browse').find('#searchHeaderContent .searchTypes');
	$(filters).insertBefore(searchtypes);
}
