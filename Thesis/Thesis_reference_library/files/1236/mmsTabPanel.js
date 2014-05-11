
/* checks for iOS/Android/WebOS in navigator strings */
function isMobileDevice(){
	return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPad") != -1) ||
        (navigator.platform.indexOf("iPod") != -1) ||
        (navigator.platform.indexOf("Android") != -1) ||
        (navigator.platform.indexOf("webOS") != -1)
        
    );
}

/* specific check to see if the client is a Android device */
function isAndroidDevice() {
	return (navigator.platform.indexOf("Android") != -1);
}


function addSaveRedirect() {
		
	var autoSignIn = $.cookie('AUTO_SIGNIN');
	if(autoSignIn == null || autoSignIn == "")
	{
		
		$('.event-hoverSavePage').each(function() { 
		
			  	var pageUrl = decodeURIComponent($(location).attr('href'));
			    if(pageUrl.indexOf("#qs=?") != -1)
			    {
			    	pageUrl = pageUrl.replace("#qs=?","?");
			    }
			    
			    if(pageUrl.indexOf("?") == -1)
			    {
			    	pageUrl = pageUrl + '?';
			    }
			    
			    
			    this.href += '&saveRedirect='+encodeURIComponent(pageUrl);
			});    

	}
	
	
}


//fire bi events 
function enableBIEvents() {
	
				
	 				 
	 			
	 			
	 			
	 			 
}



function replaceIMCPlayAndSaveLinks() {
	var autoSignIn = $.cookie('AUTO_SIGNIN');
	if(autoSignIn == null || autoSignIn == "")
	{
		$('.playAndSave a').each(function() { 
			  	var pageUrl = decodeURIComponent($(location).attr('href'));
			    if(pageUrl.indexOf("#") != -1)
			    {
			    	pageUrl = pageUrl.substring(0, pageUrl.indexOf("#"));
			    }
			    
			    if(pageUrl.indexOf("?") == -1)
			    {
			    	pageUrl = pageUrl + '?';
			    }
			    
			    this.href += '&saveRedirect='+pageUrl;
		});    

	}
	
}




function reloadTriggerPage() {
	
	var autoSignIn = $.cookie('AUTO_SIGNIN');
	
	if (autoSignIn == null || autoSignIn == "" )
	{
		autoSignIn = $.cookie('isIndividual');
		
	}
	
	
	
	
	if (autoSignIn != null && autoSignIn != "" )
	{
		
		var triggerBrowserURL = $.cookie('TRIGGER_BROWSER_URL');
		var triggerSaveId = $.cookie('TRIGGER_SAVE_ID');
		
		var createNewAccountCookie = $.cookie('TRIGGER_CREATE_ACCOUNT');
		var createNewAccountParam = $(document).getUrlParam('createNewAccount');
		
		var trigger = 0;
		
		//cookie is present
		if(createNewAccountCookie !=null && createNewAccountCookie != "")
		{
			//check if page param is present too (coming back from nejm-alerts page)
			if(createNewAccountParam == null || createNewAccountParam == "" )
			{
				
				return;
			}
		}
		
		//disable triggers for nejm-alerts page
		if(window.location.href.indexOf("nejm-alerts") != -1)
		{
			
					return;
		}
		
		
		if(triggerBrowserURL != null && triggerBrowserURL != "")
		{
			
			
			$.cookie('TRIGGER_CREATE_ACCOUNT',null, { path: '/' });
			$.cookie('TRIGGER_BROWSER_URL',null, { path: '/' });
			document.location = triggerBrowserURL;
			return;
		}
		
		if(triggerSaveId != null && triggerSaveId != "")
		{
			var triggerSaveId = $.cookie('TRIGGER_SAVE_ID');
			$.cookie('TRIGGER_SAVE_ID',null, { path: '/' });
			
			var str = 'a[id^="'+triggerSaveId+'"]';
			$(str).click();
		}
		
		
		
	}
	
	
}


$(document).ready(function() {
	
	if($.browser.msie)
	{
		
		var pageUrl = decodeURIComponent($(location).attr('href'));
		if(pageUrl.indexOf("showMostEmailedArticles") != -1) {
			$('#emailedTab').click();
		}
		
	}
	
	if(isMobileDevice())
	{
		$('#sli_search_1').attr('id','mobile_sli_search_1'); //rename it to disable autosuggest for mobile devices
		$('div.hover').unbind('mouseenter mouseleave');      //unbind hover events
		$('.hoverwrap').css('display','block');              //show content, otherwise hidden and that's only visible on mouse-events
		$('.hover_text').css('fontSize','80%');
		$('.ref').css('fontSize','120%');  		
		$('.text').css('fontSize','60%');
	}
	
		
	addSaveRedirect(); 
	reloadTriggerPage();
	replaceIMCPlayAndSaveLinks();
	
	
	$('.createAccountFromSaveLayer').live("click", function(event) {
		$.cookie('TRIGGER_CREATE_ACCOUNT','y', { path: '/' });
	});

	
	
	 $('.playAndSave a').bind("click", function(event){
		 
		    var imcPageUrl = decodeURIComponent($(location).attr('href'));
		    
		    if(imcPageUrl.indexOf("#") != -1)
		    {
		    	imcPageUrl = imcPageUrl.substring(0, imcPageUrl.indexOf("#"));
		    }
		    
		    
		    var autoSignIn = $.cookie('AUTO_SIGNIN');
			
		    if(autoSignIn == null)
			{
				$.cookie('TRIGGER_BROWSER_URL', imcPageUrl, { path: '/' });
				
			}
			
			return false;
	 });
	
	
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
			if(autoSignIn == null)
			{
				$.cookie('TRIGGER_BROWSER_URL', browserURL, { path: '/' });
				$.cookie('TRIGGER_SAVE_ID',elemId, { path: '/' });
			}
			
			return false;
	 });

    $('.paginationLinks').each(function(){
        $(this).children('li').each(function(){
            console.log($(this).attr("class"));
            if ($(this).attr("class").indexOf("selected")==-1){
                var hreflink = $(this).find("a").attr('href');
                var currentTab = window.location.href.indexOf("#");
                console.log(hreflink);
                console.log(currentTab);
                if (hreflink.indexOf("#")==-1 && currentTab!=-1){
                    $(this).children("a").attr('href',hreflink + window.location.href.substring(currentTab));
                }
            }
        });
    });

    enableBIEvents();

});




//Create the tab panel plugin
$.mmsTabPanel = {};

$.mmsTabPanel.defaultTab = "";
//Initialize a tab panel
$.fn.mmsMakeTabPanel = function(activeTabId) {
        if ($(this).length == 0) return;
        $.mmsTabPanel.defaultTab = activeTabId;
        $(this).append($(this).children('dd'))
        //Display the tabs in a horizontal row
        //Sometimes tab panels will contain dt tags denoting a definition list inside a tab. These inner lists aren't
        //actually tabs and shouldn't be processed as tabs. These inner non-tab definition lists are marked with the
        //class "nottab" notifying that they should not be processed as tabs.
        .children('dt:not(.nottab)').addClass('sideBySide')
        //Deactivate tabs and add a tab click handler
        .addClass('inactive').click($.mmsTabPanel.activateTab).end();

        //mynejm uses anchors, not click events, so remove click binding
        if ($(this).hasClass("anchorClick")) {
            $(this).find('dt.sideBySide').unbind("click");
        }
        // Bind an event to window.onhashchange that, when the history state changes,
        $(window).bind( 'hashchange', function(e) {

            $.mmsTabPanel.tabAction();

        });

        //run a preliminary action to initialize tabs
        var bbqState = $.bbq.getState('t');
        if ($(this).parents('.tabPanel').length > 0) {
        	var bbqState = $.bbq.getState('t');
        	if (bbqState == null || bbqState == 'article') {        		
        		$.mmsTabPanel.tabAction($(this).find('dd:first').attr('id'));
        	} else if (bbqState.indexOf('clde') >= 0) {
        		$.mmsTabPanel.tabAction(bbqState);
        	}
        } else {
        	if (bbqState != null && bbqState.indexOf('clde') >= 0) {
        		$.mmsTabPanel.tabAction('article');
        	} else {
        		$.mmsTabPanel.tabAction();
        	}
        }
};

$.mmsTabPanel.activateTab = function() {
    //$.bbq.pushState( {t : $(this).attr( 'id' ).replace('Tab','') }) ;
    var hrefLink = window.location.href;
    var tabId = $(this).attr( 'id' ).replace('Tab','');
    if ( hrefLink.indexOf("#t=") == -1 )           {
         hrefLink = window.location.href + "#t=" + tabId;
    } else {
        hrefLink = hrefLink.replace($.bbq.getState('t'), tabId);
    }
    if ( hrefLink.indexOf("page=") != -1 ){
        hrefLink = hrefLink.replace(new RegExp("page=[^&#]*").exec(hrefLink)[0], "page=1");
    }
    $('.paginationLinks').each(function(){
        $(this).children('li').each(function(){
            //console.log("window.location.href=" + window.location.href);
            if ($(this).attr("class").indexOf("selected")==-1){
                var hreflink = $(this).find("a").attr('href');
                var currentTab = window.location.href.indexOf("#");
                if (currentTab!=-1){
                    $(this).children("a").attr('href',hreflink.replace($.bbq.getState('t'), tabId));
                }  else {
                   $(this).children("a").attr('href',hreflink + "#t=" + tabId);
                }
            }
        });
    });
    window.location.href = hrefLink;

}

$.mmsTabPanel.activeTab = function() {
    //Show the initial tab
    var Atab = ($.mmsTabPanel.defaultTab) ? $('#' + $.mmsTabPanel.defaultTab) : $('.tabPanel').find('dt.selected');
    if (Atab.length == 0) Atab = $('.tabPanel').find('dt:first');
    return Atab;

}

$.mmsTabPanel.updateRedirectUri = function (el_id, tabId) {
    if ($(el_id).length != 0 && tabId) {
        var loginUriValue = $(el_id).val();
        var loginCurrentTab = loginUriValue.indexOf('#t');
        var loginUriNoTab = loginCurrentTab > 0 ? loginUriValue.substr(0, loginCurrentTab) : loginUriValue;
        var loginUriNewTab = loginUriNoTab.concat('#t='+tabId);
        $(el_id).val(loginUriNewTab);
    }
}

$.mmsTabPanel.tabAction = function(tabId) {
    tabId = tabId || $.bbq.getState('t');
    
    if (!tabId) {
        //Show the active tab
        var activeTab = $.mmsTabPanel.activeTab();
        if (activeTab.length > 0)
           tabId = activeTab[0].id.replace('Tab','');
    }

    if (tabId) {
    	
    	if (tabId.indexOf('clde') >= 0) {
	    	var jqTab = $('#' + tabId);
	    	if (jqTab.parent().length > 0 
	    			&& jqTab.parent().parents('.tabPanel').length > 0) {
	    		if (jqTab.parent('dl').length > 0
	    				&& jqTab.parent('dl').parent('dd').length > 0
	    				&& jqTab.parent('dl').parent('dd').css('display') == 'none') {
	        		var parentId = jqTab.parent('dl').parent('dd').attr('id');
	        		if (parentId.length > 0) {
	        			$.mmsTabPanel.tabAction(parentId);
	        		}    			
	    		}
	    	}
    	}
    	
        var sect = '';
        if (tabId.indexOf('article') >= 0 && tabId != 'article') {
           sect = tabId ;
           tabId = 'article';
        }
        //Inactivate all tabs except this one
        var tab = $('#' + tabId + 'Tab');
        tab.removeClass('inactive').siblings('dt').addClass('inactive').end()
        //Show the appropriate content pane, hide all others
        .siblings('dd').hide();

        var tabContent = $('#' + tabId);
        if (tabContent) tabContent.show();

        if (sect.length > 0) {
           var sectObj = $('#'+sect);
           if (sectObj.length > 0)
             $('body, html').scrollTop(sectObj.offset().top);
           
        }

        //report initial event
        if (!$.mmsEventMappings.tabClicked) {
            var evtName = tab.text().replace(' ','').replace(' ','').replace(' ','').replace(' ','');
            $.mmsEvent('tab-' + evtName + '-initial',  {});
            $.mmsEventMappings.tabClicked = true;
        }

        //after login from comment Login form, user needs to be redirected to the same tab
        $.mmsTabPanel.updateRedirectUri('#loginUri', tabId);
        $.mmsTabPanel.updateRedirectUri('#redirectUri', tabId);

        // hide vcm and icm carousels on tabs other than article
        try {
            if(tab.hasClass('article')) {
                $('.jcarousel-skin-vcmicm #galleryContent').css('visibility','visible');
            }
            else {
                $('.jcarousel-skin-vcmicm #galleryContent').css('visibility','hidden');
            }
        } catch (ex) {
           // Do nothing if there is no carousel on the page (e.g., My NEJM)
        }
    }
}


/*getURLParam*/
jQuery.fn.extend({
	/**
	* Returns get parameters.
	*
	* If the desired param does not exist, null will be returned
	*
	* To get the document params:
	* @example value = $(document).getUrlParam("paramName");
	* 
	* To get the params of a html-attribut (uses src attribute)
	* @example value = $('#imgLink').getUrlParam("paramName");
	*/ 
	 getUrlParam: function(strParamName){
		  strParamName = escape(unescape(strParamName));
		  
		  var returnVal = new Array();
		  var qString = null;
		  
		  if ($(this).attr("nodeName")=="#document") {
		  	//document-handler
			
			if (window.location.search.search(strParamName) > -1 ){
				
				qString = window.location.search.substr(1,window.location.search.length).split("&");
			}
				
		  } else if ($(this).attr("src")!="undefined") {
		  	
		  	var strHref = $(this).attr("src")
		  	if ( strHref.indexOf("?") > -1 ){
		    	var strQueryString = strHref.substr(strHref.indexOf("?")+1);
		  		qString = strQueryString.split("&");
		  	}
		  } else if ($(this).attr("href")!="undefined") {
		  	
		  	var strHref = $(this).attr("href")
		  	if ( strHref.indexOf("?") > -1 ){
		    	var strQueryString = strHref.substr(strHref.indexOf("?")+1);
		  		qString = strQueryString.split("&");
		  	}
		  } else {
		  	return null;
		  }
		  	
		  
		  if (qString==null) return null;
		  
		  
		  for (var i=0;i<qString.length; i++){
				if (escape(unescape(qString[i].split("=")[0])) == strParamName){
					returnVal.push(qString[i].split("=")[1]);
				}
				
		  }
		  
		  
		  if (returnVal.length==0) return null;
		  else if (returnVal.length==1) return returnVal[0];
		  else return returnVal;
		}
	});



