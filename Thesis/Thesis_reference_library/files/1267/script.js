// Stub firebug if its not present
if(!("console" in window) || !("firebug" in console)) {
	var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
	window.console = {};
	for (var i = 0; i < names.length; ++i)
		window.console[names[i]] = function() {};
}

// Stub ad code if its not present
if(!window.CM8AjaxRefresh) CM8AjaxRefresh = function() {};
if(!window.CM8ShowAd) CM8ShowAd = function() {};

// Set up analytics info for the page
if($.mmsEvents) $.mmsEvents.gatherPageInfo();

// On page load...
$(function() {
	$.mmsRegisterEvents($('body'));
	$('.scrollDirectly').click(handleScrollDirectly);
	
	/*-- Begin Add/Remove placeholder text --*/
	$('.searchTerm').togglePlaceholder();
	/*-- End Add/Remove placeholder text --*/
	
	/*-- Begin CPC - Clinical Pears - Toggle Answers --*/
	$('#cpcClinicalPearls li').toggleDisplay({
		trigger: '.jToggle',
		area: '.answer',
		triggerShowMsg: 'See answer',
		triggerHideMsg: 'Close answer'
	});
	/*-- End CPC - Clinical Pears - Toggle Answers --*/
});


$.initCommentFormOnError = function(context) {
    $('input[id^="limited-field"]').each(function() {
        $(this).keyup(function(){
            charCount($(this).attr("id"), $(this).attr("name") + "CharsCounter", $(this).attr("maxlength"));
        })
        charCount($(this).attr("id"), $(this).attr("name") + "CharsCounter", $(this).attr("maxlength"));
    })

    $('textarea[id^="limited-field"]').each(function() {
        $(this).keyup(function(){
            charCount($(this).attr("id"), $(this).attr("name") + "CharsCounter", $(this).attr("maxlength"));
        })
        charCount($(this).attr("id"), $(this).attr("name") + "CharsCounter", $(this).attr("maxlength"));
    })
}


/*-- Begin mmsRegisterEvents --*/
$.mmsRegisterEvents = function(context) {
	//$(".meta li").each(function(i, el) {
		 // Remove white space
	//    var html = $(el).html().replace(/\s+/, "");
	
		 // Check if element is :empty or length of html is zero
	//    if ($(el).is(":empty") || html.length == 0)
	//        $(el).remove();
	//});
	
	// Add first and last classes to lists for styling
	context.find('li, dd, dt, dl')
		.filter(':first-child').addClass('firstChild').end()
		.filter(':last-child').addClass('lastChild').end();
	
	// Add odd and even classes to striped lists
	context.find('.striped')
		.find('li:even').addClass('odd').end()
		.find('li:odd').addClass('even').end();
	
	// Handle hovering over tab elements
	context.find('#content dl.articleTabs dt')
		.hover(
			function() {
				$(this).filter('.inactive').addClass('hover');
			},
			function() {
				$(this).removeClass('hover');
			}
		)
		.click(function() {
			$(this).removeClass('hover');
		});
		
		
	// Turn .tabPanel <dl>s into tabbed interfaces
	function getUrlVars() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
   }
	var activeTabId = getUrlVars()["activeTab"];
	var actionBtns = ['.searchSubmit', '.continueBtn', '.examSubmit', '.creditSubmit', '.podcastSignup a', 'a.download-mp3', '.imageChallengeSubmit'];
	jQuery.each(actionBtns, function(idx, btn) {
		 context.find(btn).click( function () {
			var type = getQuerystring("viewType");
			var el = $(this);
			
			if (btn == '.continueBtn' && type == 'Iframe')
				btn = '.cdfContinueBtn';
			
			$.mmsLinkEvent(btn, el);
		 });
	});
	
	context.find("#counterIdsAll").click(function() {
		$(this).parents('form').find('.counterIds').attr('checked', $(this).is(':checked'));
	});
	context.find(".counterIds").click(function() {
		if (! $(this).is(':checked') ) {
			context.find("#counterIdsAll").attr('checked', false);
		}
	});

	// Create IDs for cldeTabPanel so that tabbing can work.
	context.find('.cldeTabPanel').each(function() {
		var idRoot = 'cldeOpt';
		$(this).children('dt').each(function(index) {
			var idNum = index + 1;
			$(this).attr('id',idRoot+idNum+'Tab');
		});
		$(this).children('dd').each(function(index) {
			var idNum = index + 1;
			$(this).attr('id',idRoot+idNum);
		});
	});
	
	context.find('.tabPanel').mmsMakeTabPanel(activeTabId);

	//Turn .clde-tabPanel <dl>s into tabbed interfaces
	context.find('.cldeTabPanel').mmsMakeTabPanel();
	
	//Clear search terms on focus
	context.find('.placeHolderToggle').placeHolderToggle(); // Should use togglePlaceholder() in the future. Will need HTML update.
	context.find('#sli_search_1').placeHolderColorToggle(); // Should use togglePlaceholder() in the future. Will need HTML update.
	
	context.find('#btnSignIn', context).click(function() {
		var type = getQuerystring("viewType");
	
		if (type == 'Iframe')
			$.mmsLinkEvent('#cdfBtnSignIn');
		else
			$.mmsLinkEvent('#btnSignIn');
		
		// Hide the sign-in layer.
		jQuery('.boxy-wrapper').hide();
	})

	context.find('#frmLogin', context).keypress(function(e) {
		var code=e.charCode || e.keyCode;
		if (code==13 && jQuery.browser.msie) $('#btnSignIn').trigger('click');
	})
	
	context.find('#signInForm .formLine #password', context).keypress(function(e){
		var code=e.charCode || e.keyCode;
		if (code==13 && jQuery.browser.msie) $('#btnSignIn').trigger('click');
	})
	
	//Clear other inputs
	context.find('input.volume, input.num, input.month, input.day, input.year').placeHolderRemove();
	
	//Hide references in lettersy
	context.find('div.letterReferences').addClass('hidden').end();
	
	//Show references in letters
	context.find("a.toggleRef").click(function() {
		var ref = $(this.parentNode).next();
		ref.is('.hidden') ? ref.addClass('shown').removeClass('hidden') : ref.removeClass('shown').addClass('hidden') ;
		$.mmsLinkEvent('a.toggleRef');
		return false;
	});
	
	//Show references in article content
	context.find('a.showRefLayer').click(function() {
		var ext = this.hash.split("-")[1];
		$.mmsGetReferences(this.innerHTML,ext);
	});
	
	// enable alert formats in nejm-alerts page, bug#43201
	context.find('#contentAlertsList input').click(function() {
		$('#alertFormat_html').attr({'disabled': ''});
		$('#alertFormat_text').attr({'disabled': ''});
	});
	
	// enable alert formats in nejm-alerts page, bug#43201
	context.find('#collectionPublicationsList input').click(function() {
		$('#alertFormat_html').attr({'disabled': ''});
		$('#alertFormat_text').attr({'disabled': ''});
	});
	
	// enable alert formats in nejm-alerts page, bug#43201
	context.find('#productFeatureAlertsDiv input').click(function() {
		$('#alertFormat_html').attr({'disabled': ''});
		$('#alertFormat_text').attr({'disabled': ''});
	});
	
	context.find('#examHeadingLink').click(function() {
		window.open(this.href, '_blank');
		return false;
	});
	
	context.find('a.showRefLayer').cluetip({
		local:true,
		cluezIndex: 2000,
		activation: 'click',
		cursor: 'pointer',
		closePosition: 'top',
		sticky: true,
		arrows: true,
		cluetipClass: 'nejm',
		showTitle: false,
		closeText: '<img src="/templates/jsp/_style2/_mms/_nejm/img/close.gif" alt="Close" />'
	});
	
	// may want to have start date based on the issue being viewed. if so, calculate number of days different from this
	// date and add the following to the options: defaultDate: -dayDiff
	context.find("#datepickerFindIssues").datepicker({
		showOn: 'button',
		buttonImage: '/templates/jsp/_style2/_mms/_nejm/img/calendar.gif',
		buttonImageOnly: true,
		showOn: 'both',
		changeMonth: true,
		changeYear: true,
		beforeShowDay: $.mmsRestrictCalToPublishDays,
		onSelect: function(dateText) {
			$.mmsAddDates(dateText,'findIssueByDate')
		}
	});
	
	//Register layer and popups on links and forms
	$.mmsViews.registerViewTypes(context);
	
	//Load in remote content for links with class=remoteContent
	context.find('a.remoteContent').each(function() {
		var link = $(this).attr('href');
		var div = $('<div></div>').insertAfter($(this));
		$(this).remove();
	
		$.mmsViews.showView(link, 'Panel', '', '', null, function(html) {
			div.html(html);
			$.mmsRegisterEvents(div);
		});
	});

	context.find(".corners, .left .box, .MediumLayer, .hover").each(function() {
		var el = $(this);
		var children = el.children();
		el.append(
			'<div class="wrap">' +
				'<div class="topRow tl"><div class="tr"><div class="t">&#160;</div></div></div>' +
				'<div class="middleRow l"><div class="r"><div class="content"></div></div></div>' +
				'<div class="bottomRow bl"><div class="br"><div class="b">&#160;</div></div></div>' +
			'</div>'
		);
		el.find('.content').append(children);
	});

	context.find("*:mmsClassData(dropDownTrigger)").mmsRegisterMenuTrigger();
	//context.find("*:mmsClassData(hoverTrigger)").mmsRegisterHoverTrigger();

	context.find('div.hover').each(function() {
		$.mmsDoHover(this);
	});
	
	context.find("a[rel=external]").click(function() {
		window.open( $(this).attr('href'), 'newwin' , 'width=788, height=530, resizable=1, scrollable=1');
		return false;
	});
	
	context.find("a.closer").click(function() {
		window.opener.location.href = $(this).attr('href');
		window.close();
		return false;
	});
	
	// links on abstract tab go to certain sections of article tab
	context.find("a[rel=gotofulltext]").click(function() {
		var newhash = (this.hash.substring(1) == "Conclusions") ? "Discussion" : this.hash.substring(1);
		$.bbq.pushState( {t : 'article' + newhash});
		var selector = "a" + this.hash;
		$.mmsLinkEvent(selector);
		return false;
	});
	
	// links on abstract tab go to cited by tab
	context.find("a.articleActivity-citedby").click(function() {
		$("dl.articleTabs dt.citedby").removeClass('inactive').siblings('dt').addClass('inactive').end()
		.parent().find('dd').hide().eq($("dl.articleTabs dt.citedby").prevAll().length).show();
		window.location.hash = "citedby";
		$.mmsLinkEvent('a.articleActivity-citedby');
		return false;
	});


	// for collapsible lists, eg. in homepage the correspondence, book reviews, etc.
	context.find("div.collapsible").mmsInitCollapsibles();
	
	context.find("div.letterContent").each(function() {
		var doi = $(this).attr('rel');
		$.mmsGetLetters(doi);
	});
	
	//Prevent image submits from sending "x" and "y" parameters
	context.find('input[type=image]').each(function() {
		$(this).click(function() {
			$(this).closest('form').submit();
			return false;
		});
	});
	
	//Set up filter banks
	if($('body').hasClass('search') || $('#content.filterBank').length > 0) {
		context.find('.searchTypes ul a, .sortTypes ul a, .filter a').click($.mmsFilterBanks.linkClick);
		context.find('#dateFilter form').submit($.mmsFilterBanks.formSubmit);
		if(!$('body').hasClass('browse'))
			context.find('form.searchWithin').submit($.mmsFilterBanks.formSubmit);
		context.find('dl.filter').mmsInitFilters();
	}


	context.find('#galleryContent').jcarousel({
		scroll:1,
		initCallback: galleryContent_initCallback,
		wrap: 'circular',
		itemVisibleInCallback: {onBeforeAnimation: galleryContent_itemVisibleInCallback},
		itemVisibleOutCallback: {onAfterAnimation: galleryContent_itemVisibleOutCallback}
	});
	
	context.find('#galleryContentAudio').jcarousel({
		scroll:1,
		initCallback: galleryContent_initCallback,
		wrap: 'circular',
		itemVisibleInCallback: {onBeforeAnimation: galleryContent_itemVisibleInCallback},
		itemVisibleOutCallback: {onAfterAnimation: galleryContent_itemVisibleOutCallback}
	});
	
	context.find('#highlightsCarousel').jcarousel({
		scroll: 1,
		initCallback: highlights_initCallback
	});
	
	context.find('#HYDScarousel').jcarousel({
		scroll: 2,
		visible: 2,
		itemFirstInCallback:hyds_carousel_itemFirstInCallback,
		initCallback: hyds_carousel_initCallback,
		buttonNextHTML: null,
		buttonPrevHTML: null
	});

	
	context.find('ul.foundIssuesByYear').each(function() {
		$.mmsRenderFoundIssues();
	});
	
	context.find('div.medicalIndexAllYears').each(function() {
		$.mmsRenderYearListing();
	});
	
	context.find('#topNav form').submit(function(event) {
		var q = event.target.q;
		if (q)  return $(q).data('placeHolderVal') != q.value; // cancel submit for default value
	});
	
	context.find('#findIssueByDate').submit(function() {
	var year = $('#findIssueByDate .year').val().length;
	if (year<4||year>4) {
	$('#findIssueByDateMessage').html("Please specify a four-digit year.").addClass("errorMessage").css("font-size","1em");
	return false;
	}
	else {
	return;
	}
	
	});

	context.find('#rightRail .challenge .answers, #rightRail .challenge .showVotes').live('click', function() {
		$('#rightRail .challenge input[type=image]').attr({
			'disabled':'',
			'src':'/templates/jsp/_style2/_mms/_nejm/img/answerButton.gif'
		});
	});

    $('input[id^="limited-field"]').each(function() {
        $(this).keyup(function(){
            charCount($(this).attr("id"), $(this).attr("id") + "CharsCounter", $(this).attr("maxlength"));
        })
    })

    $('textarea[id^="limited-field"]').each(function() {
        $(this).keyup(function(){
            charCount($(this).attr("id"), $(this).attr("id") + "CharsCounter", $(this).attr("maxlength"));
        })
    })

	context.find('#searchButton', context).click(function() {
		setActive('search');
	})
	
	context.find('#downloadButton', context).click(function() {
		setActive('download');
	})
	
	context.find('.rotatingPanelBox').each(function( key, panelBox) {
		$.mmsRotatingPanelBox(panelBox);
	});

	if(typeof DD_belatedPNG != "undefined") DD_belatedPNG.fix('.r, .br, .b');

};
/*-- End mmsRegisterEvents --*/


function clk(u,r,a) {
	var e=encodeURIComponent||escape,xmlhttp=0,x="";
	if(!c_url){return true;}
	var cu=[c_url,u?"&url="+e(u):"",r?"&rk="+e(r):"",a?"&"+a:""].join("");
	if(typeof(XMLHttpRequest)!="undefined"){try{xmlhttp=new XMLHttpRequest();x="XHR";}catch(e){xmlhttp=0;}}
	if(!xmlhttp&&typeof(window.ActiveXObject)!="undefined"){try{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");x="XO2";}catch(e){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");x="XO1";}catch(E){xmlhttp=0;}}}
	if(xmlhttp){xmlhttp.open("GET",cu+"&lot=xml&ourl="+x,true);xmlhttp.send(null);}
	return true;
}

function addDescription() {
	textbox=document.getElementById("ipRangeDescription");
	if (textbox.value=="") textbox.value="Description is optional. Use it to describe the IP address or range you are entering.";
}
function removeDescription() {
	textbox=document.getElementById("ipRangeDescription");
	if (textbox.value=="Description is optional. Use it to describe the IP address or range you are entering.") textbox.value="";
}
function addIpRanges() {
	textbox=document.getElementById("ipRanges");
	if (textbox.value=="") {
	textbox.value="Enter an IP Address or range here";
	addDescription();
	}
}
function removeIpRanges() {
	textbox=document.getElementById("ipRanges");
	if (textbox.value=="Enter an IP Address or range here"){
		textbox.value="";
		removeDescription();
	}
}
function addTag(tagString) {
	var currentTagStrings = (document.getElementById("tstr").value);
	if (currentTagStrings=='') {
		document.getElementById("tstr").value = tagString;
	} else {
		var currentTagList = currentTagStrings.split(";");
		var var_exists = exists(tagString, currentTagList);
		if (var_exists=="false") {
			document.getElementById("tstr").value = currentTagStrings + "; " + tagString;
		}
	}
}
function exists (tagString, currentTagList) {
	for (var i = 0; i< currentTagList.length; i++) {
		if (trim(currentTagList[i]) == tagString) {
			return "true";
		}
	}
	return "false";
}
function trim(text) {
	return text.replace(/^\s*/, "").replace(/\s*$/, "");
}

function oncomplete() {
}

/**
 * intercept all scrollDirectly anchors to do a scrollIntoView without affecting the url
 * eg. <a href="#poll" name="poll" class="scrollDirectly">Poll</a> will bind to event
 * that scrolls to an element with id "poll".  If JS is disabled, browser will handle old way.
 */
function handleScrollDirectly(){
	var idToView = $(this).attr("href");
		var elementToView = $(idToView);
		if (elementToView.length != 0){
			//special handling for commentTab: if the anchor is hidden in the commentTab, open the tab but don't scroll
			//note, since anchor with no content has width = 0,
			if ($(elementToView).parent().is(":hidden") && idToView == "#discussion"){
				var commentsTab = $('dt#commentsTab');
				if (commentsTab.length != 0){
					commentsTab.click();//open the comments tab
				}
			} else {
				$(elementToView).get(0).scrollIntoView();
			}
		}
	return false;
}

if ($.ajax) { // jQuery need to be present before we can hack it
	$.mmsAjaxBackup = $.ajax;
	$.ajax = function(s) {
		if (s.url && s.url.indexOf(location.protocol) !== 0) { // we need cookie hacking only when protocols differ
			s.mmsBeforeSendBackup = s.beforeSend;
			s.beforeSend = function (xhr, s) {
				xhr.setRequestHeader("Cookie", document.cookie); // IE ignores firs one, but will work for the second
				xhr.setRequestHeader("Cookie", document.cookie); // http://support.microsoft.com/kb/234486
				s.url += s.url.indexOf('?') == -1 ? '?' : '&';
				s.url += "CrossOriginCookie=" + encodeURIComponent(document.cookie);
				if (s.mmsBeforeSendBackup) return s.mmsBeforeSendBackup(xhr, s);
			};
		}
		return $.mmsAjaxBackup(s); // Call the original function
	};
}
// var toPost = {cookie: document.cookie};
// var where = s.url.substr(0, s.url.indexOf('/', 9)) + "/cookieSync.jsp";
// $.mmsAjaxBackup({url: where, data: toPost, complete: function() { $.mmsAjaxBackup({url: where, data: toPost, complete: function() { $.mmsAjaxBackup(s); } }); } });


function showOthersAnswers() {

    $('[name="barWrapper-others"]').each(function(index) {
       $(this).removeClass('hidden');
    });
}

function charCount(elementID, counterSpanID, maxLimit) {
	var limit = maxLimit;
	if($('#'+elementID).val().length < limit) {
        $('#'+counterSpanID).html(limit-$('#'+elementID).val().length + " characters remaining")
    } else {
        $('#'+elementID).val($('#'+elementID).val().substr(0,1200)) + $('#'+counterSpanID).html('<span style="color: rgb(255, 0, 0);">0</span>');
	}
}

//Get querystring value
function getQuerystring(key, default_) {
	if (default_ == null) default_ = "";
	
	key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	
	var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
	var qs = regex.exec(window.location.href);
	
	if (qs == null)
		return default_;
	else
		return qs[1];
}


/* Function to hide broken images */
$(document).ready(function() {
	$("img").each(function(index) {
		$(this).error(function() {
			$(this).hide();
		});
		$(this).attr("src", $(this).attr("src"));
	});
});

/* Function to validate the length of each phrase in save and edit items*/
function validateKeyWordPhraseForSaveEdit(){
	var separator = ";"
	var phrasesString = $("#tstr").val();
	var phrasesArray = phrasesString.split(separator);
	for(var i = 0 ; i < phrasesArray.length ; i++){
		if($.trim(phrasesArray[i]).length > 128){
			$("#saveEditPhraseError").css("display","block");
			return false;
		}
	}
	$("#saveEditPhraseError").css("display","none");
	return true;
}

function setActive(fieldName) {
	if(fieldName == "search") {
		$('#search').val(true);
		$('#download').val(null);
	} else {
		$('#search').val(null);
		$('#download').val(true);
	}
}

function commentSearchResultPage(i) {
	var f = document.forms.commentSearch;
	f.startRow.value = i;
	setActive("search");
	f.submit();
}

function msword2html(str)
{
    if (str == null || str.replace(/\s/g, "") == "") {
        return str;
    }
    var array = [
        8211,   "&ndash;",
        8212,   "&mdash;",
        8216,   "&lsquo;",
        8217,   "&rsquo;",
        8218,   "&sbquo;",
        8219,   "&#x201b;",
        8220,   "&ldquo;",
        8221,   "&rdquo;",
        8222,   "&bdquo;",
        8223,   "&#x201f;",
    ];
    for (var i=0; i<array.length; i+=2) {
        str = str.replace(new RegExp(String.fromCharCode(array[i]),"g"),array[i+1]);
    }
    return str;
}

/**	ccc rights link */
function RightslinkPopUp(link)
{
	var winprops = "location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=550";
	PopUp = window.open(link, 'Rightslink', winprops);
}


/*	======================================================================
	Article Style Helper
	Author: Joshua Kim
	Description: Add class "lastChild" to the last element
	=================================================================== */
/* Begin jQuery enclosure */
jQuery(document).ready(function($) {
	$('body.article .section-back:last-child').addClass('lastChild');
});
/* Begin jQuery enclosure */



