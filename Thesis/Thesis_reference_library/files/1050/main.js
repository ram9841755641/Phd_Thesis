// detecting IE7 and IE6
function iesux() {
	if (navigator.appVersion.indexOf("MSIE")!=-1) {
		var temp=navigator.appVersion.split("MSIE");
		var version=parseFloat(temp[1]);
	}
	if (version < 7) return 6;
	else if (version < 8) return 7;
	else return 8;
}

/*
Ajax.Request.abort
extend the prototype.js Ajax.Request object so that it supports an abort method
*/
Ajax.Request.prototype.abort = function() {
    // prevent and state change callbacks from being issued
    this.transport.onreadystatechange = Prototype.emptyFunction;
    // abort the XHR
    this.transport.abort();
    // update the request counter
    Ajax.activeRequestCount--;
};

function markAllcounterIds(all) {
    var a = all.form.counterIds;
    for (var i = 0; i < a.length; i++) {
        a[i].checked = all.checked;
    }
}

/* -------- start cookie scripts -------- */
function createCookie(name,value,days,domain) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	if (domain) {
		document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
	}
	else document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') { c = c.substring(1,c.length); }
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
/* -------- end cookie scripts -------- */

// Same as above, but for the Related Content hovers
function ieRelated () {
if (document.all&&document.getElementById) {
navRoot = $('relatedArticles');
for (var i=0; i<navRoot.childNodes.length; i++) {
node = navRoot.childNodes[i];
if (node.nodeName=="LI") {
node.onmouseover=function() {
this.className+=" over";
  }
  node.onmouseout=function() {
  this.className=this.className.replace(" over", "");
   };
   }
  }
 }
}

// 4 functions for hiding layers when clicking outside of them
	// A-Z Layer
	offClickAZ=function(event) {
		var target = Event.element(event);
		// Journal A-Z layer
		if (target==$('journalList') && $('pubsSelector').style.display!="block") counter++;
		if ($('pubsSelector') && $('pubsSelector').style.display=="block") {
			if (!target.descendantOf('pubsSelector') && target!=$('pubsSelector')) {
				toggleAZ();
				Event.stop(event);
			}
		}
	};
		// In-line References
	offClickRef=function(event) {
		var target = Event.element(event);
		if (!target.descendantOf('openBalloon') && target!=$('openBalloon').parentNode.previousSiblings('a')[0]) {
			var sendThis=$('openBalloon').parentNode.previousSiblings('a')[0];
			showRef(sendThis);
		}
	};
	// Figure Viewer
	offClickFigViewer=function(event, elementId) {
		var target = Event.element(event);
		if ($('figureViewer-wrap').style.display!="none" && target!=$('figureViewer-wrap') && !target.descendantOf('figureViewer-wrap')) {
			showFigures(event);
			Event.stopObserving(document,"click",offClickFigViewer);
		}
	};
    offClickRefViewer=function(event, elementId) {
		var target = Event.element(event);
		if ($('refViewer-wrap').style.display!="none" && target!=$('refViewer-wrap') && !target.descendantOf('refViewer-wrap')) {
			showRef(event);
			Event.stopObserving(document,"click",offClickRefViewer);
		}
	};
	// Article Anchor Menus
	offClickAnchors=function(event) {
		var target = Event.element(event);
		if (!target.descendantOf('openJumpMenu')) {
			showPulldown($('openJumpMenu').select('a')[0]);
		}
	};


// For clearing/repopulating the search input box,
// citation jump input boxes, and DOI input boxes
// Atypon version
function flipDefault(field) {
	if (!field.defaultValue) field.defaultValue = field.value;
	if (field.value == field.defaultValue) field.value = "";
	else if (field.value == "") field.value = field.defaultValue;
}

function checkInput(aType) {
	var inputs = (aType == 'advanced') ?
				 ['advSearchText', 'advTitle', 'advAuthor', 'advAbstract', 'advFigure'] :
				 ['searchText'];
	var valid = false;
	for (var i=0; i<inputs.length; i++) {
		var input = $(inputs[i]);
		valid |= input &&
				 (input.type == 'text') &&
				 (input.value.replace(/^\s+|\s+$/g,'').length > 0);
	}
	if (! valid) {
		alert("Enter search criteria.");
		return false;
	}
	return true;
}

function submitAdvSearch() {
	if (checkInput('advanced')) {
		document.advSearch.submit();
		return true;
	}
	return false;
}

// For showing/hiding the Journal List menu layer
function toggleAZ() {
	// first test for Explorer 6 and below to fix a bug in that crap browser
	var version=0;
	var needfix=0;
	if (Prototype.Browser.IE) {
		if (iesux() == 6) needfix=1;
	}

	// show or hide the Pubs Select layer
	var box=$('pubsSelector');
	var bg= new Array();
	bg[0]=$('header');
	bg[1]=$('mainBody');
	bg[2]=$('pageFooter-wrap');
	var n=0;

	if (box.style) {
		if (box.style.display=="none") {
			if (needfix==1) pubsSelectIEfix('hide');

			while (bg[n]) {
				bg[n].changeOpacity="0.50";
				bg[n].style.KHTMLOpacity="0.50";
				bg[n].style.opacity="0.50";
				n++;
			}
			box.style.display="block";
			// make it so that clicking off the layer hides the viewer
			Event.observe.defer(document,"click",offClickAZ);
		}
		else {
			if (needfix==1) pubsSelectIEfix('show');

			while (bg[n]) {
				bg[n].style.MozOpacity="1";
				bg[n].style.KHTMLOpacity="1";
				bg[n].style.opacity="1";
				n++;
			}
			box.style.display="none";
			Event.stopObserving(document,"click",offClickAZ);
		}
	}
}
// companion script to make pubsSelect() work in Explorer 6 and below
// without having the form select boxes appear through the Pubs Select layer
function pubsSelectIEfix(hideOrShow) {
	// for Browse By Issue boxes on journal-specific pages
	if ($('inDecade')) {
		var hideBrowse1=$('inDecade');
		var hideBrowse2=$('inVolume');
		var hideBrowse3=$('inIssue');
		if (hideOrShow=="hide") {
			hideBrowse1.style.visibility="hidden";
			hideBrowse2.style.visibility="hidden";
			hideBrowse3.style.visibility="hidden";
		}
		else {
			hideBrowse1.style.visibility="visible";
			hideBrowse2.style.visibility="visible";
			hideBrowse3.style.visibility="visible";
		}
	}
	// for Quick Search pulldowns
	if ($('qs')) {
		var qs1=$('qsSearchArea');
		if ($('qsProduct')) var qs2=$('qsProduct');
		if (hideOrShow=="hide") {
			qs1.style.visibility="hidden";
			if (qs2) qs2.style.visibility="hidden";
		}
		else {
			qs1.style.visibility="visible";
			if (qs2) qs2.style.visibility="visible";
		}
	}
	// for journal selector on ARRC pages
	if ($('arrcJournalInfo')) {
		var arrc=$('arrcJournalInfo');
		if (hideOrShow=="hide") {
			arrc.style.visibility="hidden";
		}
		else arrc.style.visibility="visible";
	}
	// for account selector on Lib. Admin. pages
	if ($('libAccount')) {
		var account=$('libAccount');
		if (hideOrShow=="hide") {
			account.style.visibility="hidden";
		}
		else account.style.visibility="visible";
	}
	// for month/year navigation on Online News Archive and newsletters
	if ($('monthYearNav')) {
		var account=$('monthYearNav');
		if (hideOrShow=="hide") {
			account.style.visibility="hidden";
		}
		else account.style.visibility="visible";
	}
}

// Another pair of scripts to fix IE's problem with select boxes showing through layers
// This one is for the Author Index page
function fixAI4IE(state) {
	if (Prototype.Browser.IE) {
		if (iesux() == 6) {
			if ($('aiVolJump')) {
				var form=$('aiVolJump');
				var select1=form.getElementsByTagName('select')[0].style;
				var select2=form.getElementsByTagName('select')[1].style;
				if (state=="on") {
					select1.visibility="hidden";
					select2.visibility="hidden";
				}
				else {
					select1.visibility="visible";
					select2.visibility="visible";
				}
			}
		}
	}
}
// This one is only for the Online News Archive
function fixArchive4IE(state) {
	if (Prototype.Browser.IE) {
		if (iesux() == 6) {
			if ($('newsArchiveNav')) {
				var form=$('newsArchiveNav');
				var select1=form.getElementsByTagName('select')[0].style;
				var select2=form.getElementsByTagName('select')[1].style;
				if (state=="on") {
					select1.visibility="hidden";
					select2.visibility="hidden";
				}
				else {
					select1.visibility="visible";
					select2.visibility="visible";
				}
			}
		}
	}
}

// For toggling the article lists on the journal home pages
function toggleArticleList(focus) {
	var focusList=focus+"Articles";
	var focusTab=focus+"Tab";

	var list = new Array($('justAcceptedArticles'),$('justPublishedArticles'),$('currentIssueArticles'),$('mostReadArticles'),$('mostCitedArticles'));
	var tab = new Array($('justAcceptedTab'),$('justPublishedTab'),$('currentIssueTab'),$('mostReadTab'),$('mostCitedTab'));
	focusList=$(focusList);
	focusTab=$(focusTab);

	// first, hide all lists
	list[0].style.display="none";
	list[1].style.display="none";
	list[2].style.display="none";
	list[3].style.display="none";
	list[4].style.display="none";

	// second, show the one that was clicked
	focusList.style.display="block";

	// third, put all the tab backgrounds into the neutral position;
	tab[0].style.backgroundPosition="-4px -4px";
	tab[1].style.backgroundPosition="-99px -4px";
	tab[2].style.backgroundPosition="-194px -4px";
	tab[3].style.backgroundPosition="-289px -4px";
	tab[4].style.backgroundPosition="-384px -4px";

	// fourth, put the focused tab background into the active position
	if (focus=="justAccepted") {
		focusTab.style.backgroundPosition="-4px -29px";
	}
	else if (focus=="justPublished") {
		focusTab.style.backgroundPosition="-99px -29px";
	}
	else if (focus=="currentIssue") {
		focusTab.style.backgroundPosition="-194px -29px";
	}
	else if (focus=="mostRead") {
		focusTab.style.backgroundPosition="-289px -29px";
	}
	else {
		focusTab.style.backgroundPosition="-384px -29px";
	}
	//added by Atypon
	setRange(focusList);
	prepareThumbFromTab(focusList);
}

// To update the Select All checkbox
function updateSelectAllBox(checkState,form) {
	var oneOrTwo=form.selectAll.length;
	if (oneOrTwo==2) {
		form.selectAll[0].checked=checkState;
		form.selectAll[1].checked=checkState;
	}
	else form.selectAll.checked=checkState;
}

// For selecting/deselecting articles
function selectDeselect(box) {
	var form=box.form;
	var checkState=false;
	var n = 0;
	if (box.checked==true) checkState=true;

	if (form.doi[1]) { // if there is more than one article on the page
		while (form.doi[n]) {
			form.doi[n].checked=checkState;
			n++;
		}
		updateSelectAllBox(checkState,form)
	}
	else form.doi.checked=checkState; // if there's only one article on the page (search result or asap page)
}

function submitArticles(anElement, action) {
	var aForm = $(anElement).up('form');
	submitMultiArticles(aForm, action, false);
}

// For checking if all of the checkboxes are checked or not
function evalAll(box) {
	var form=box.form;
	var checked=0;
	var max=form.doi.length;
	for (var count=0; count < max; count++) {
		if (eval("form.doi[" + count + "].checked") == true) {
			checked++;
		}
	}
	if (checked==max) updateSelectAllBox(true,form);
	else updateSelectAllBox(false,form);
}

function updateFigImg(doiFigure, index, imgTag) {
	var isMedium = index== 0 && doiFigure.isTocFigure;
	imgTag.src = doiFigure.path + '/images/' + (isMedium ? 'medium/' : 'small/') + doiFigure.images[index];
	$(imgTag)[isMedium ? 'addClassName' : 'removeClassName']('tocGraphic');
    $(imgTag)['removeClassName']('emptyImg');
}

// For toggling the Journal View on the Pubs Home Page
function changeView(id) {
	var show=id+"View";
	var highlight=id+"Link";

	var block1=$('azView');
	var block2=$('catView');
	show=$(show);
	var link1=$('azLink');
	var link2=$('catLink');
	highlight=$(highlight);

	// first, hide both views
	block1.style.display="none";
	block2.style.display="none";

	// second, show the one that was clicked
	show.style.display="block";

	// third, set both links to the default appearance
	link1.style.fontWeight="normal";
	link1.style.background="transparent";
	link1.style.color="#369";
	link1.style.border="0";
	link2.style.fontWeight="normal";
	link2.style.background="transparent";
	link2.style.color="#369";
	link2.style.border="0";

	// fourth, highlight the link that was used
	highlight.style.fontWeight="bold";
	highlight.style.background="#eee";
	highlight.style.color="#000";
	highlight.style.border="solid 1px #ccc";
}

// Article template pulldown menus
// Also used on Cover Catalog sorted by volume
function showPulldown(button) {
	var block;
	var list;

	// for cover art gallery
	if ($('coverVol')) {
		block=$('coverVol');
		button=button.getElementsByTagName('a')[0];
		list=button.parentNode.getElementsByTagName('ul')[0];
		if (list.style.display == "none") {
			Effect.BlindDown(list, {duration:0.3});
			button.style.backgroundPosition="0 -20px";
		}
		else {
			block.style.zIndex="1";
			Effect.BlindUp(list, {duration:0.3});
			button.style.backgroundPosition="0 0";
		}
	}

	// for full text html template
	else {
		block=button.parentNode.parentNode; // ul.anchors
		list=button.parentNode.getElementsByTagName('ul')[0];
		if (list.style.display == "none") {
			block.style.zIndex="9000";
			Effect.BlindDown(list, {duration:0.3});
			button.style.backgroundPosition="0 -20px";
			$(block).writeAttribute("id","openJumpMenu");
			Event.observe(document,"click",offClickAnchors);
		}
		else {
			block.style.zIndex="1";
			Effect.BlindUp(list, {duration:0.3});
			button.style.backgroundPosition="0 0";
			$(block).writeAttribute("id","");
			Event.stopObserving(document,"click",offClickAnchors);
		}
	}
}

function hidePulldown(anchor) {
	var button=anchor.parentNode.parentNode.parentNode.getElementsByTagName('a')[0];
	showPulldown(button);
}
function hideRef(ref) {
    displayWithEffect('refViewer-wrap', window.event, offClickRefViewer);
}

// Sign In Page
function preRegMessage(registrationPage) {
	var r=confirm("To register on this site, you must create an ACS ID on the ACS Society website (www.acs.org). After completing your registration, you will be returned back to the page you were viewing on the ACS Publications website (pubs.acs.org).");
		if (r==true) {
			parent.location=registrationPage;
		}
	else {
		return false;
	}
}

// Article template permalink viewer
function showPermalink(doi) {
	doi=doi.parentNode.getElementsByTagName('span')[0];
	if (doi.style.display == "none") {
		Effect.BlindDown(doi, {duration: 0.3});
	}
	else Effect.BlindUp(doi, {duration: 0.3});
}
function hidePermalink(doi) {
	doi=doi.parentNode.parentNode.getElementsByTagName('a')[0];
	showPermalink(doi);
}

// Function added by Atypon
function toggleSFinterfaceOnLoad(id) {
	Event.observe(window, 'load', function() {
		var radio = $(id);
		radio.checked = true;
		toggleSFinterface(radio);
	});
}
// SciFinder Explore Section
function toggleSFinterface(target) {
	target=$(target);
	$('sfArtAuthorsLayer').style.display="none";
	$('sfAuthorsLayer').style.display="none";
	$('sfTopicLayer').style.display="none";
	if (target==$('sfArtAuthors')) {
		$('sfArtAuthorsLayer').style.display="block";
		$('sfArtAuthorsSelect').focus();
	}
	else if (target==$('sfAuthors')) {
		$('sfAuthorsLayer').style.display="block";
		$('sfAuthorLast').focus();
	}
	else {
		$('sfTopicLayer').style.display="block";
		$('sfTopicInput').focus();
	}
}

// Article template figure viewer
function showFigures(e) {
	if (!e)	e = window.event;
	initViewer(e);  /* Atypon change */
	displayWithEffect('figureViewer-wrap', e, offClickFigViewer);
    jQuery("#figureViewer-wrap").draggable({ cancel: "div#figureCanvas" });
}
function displayWithEffect(viewerId, e, funct)
{
    if (!e)	var e = window.event;
    var n=0;
    var viewer=$(viewerId);
	if (!viewer) return; // It may take some time till document gets ready
	if (viewer.style.display != '') {
		bg= new Array(); /* Atypon change */
		bg[0]=$('header');
		bg[1]=$('mainBody');
		bg[2]=$('pageFooter-wrap');
		var posY=0;

		if (e.pageY) {
			posY = e.pageY;
		}
		else if (e.clientY) {
			posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		while (bg[n]) {
			bg[n].style.MozOpacity="0.70";
			bg[n].style.KHTMLOpacity="0.70";
			bg[n].style.opacity="0.70";
			n++;
		}
		Effect.Appear(viewerId, {duration:0.5});
		posY=posY-100; // offset from mouse position
		viewer.style.top=posY+"px";

        // ToDo: why there are that many listeners, clearing them all most likely will break something
        // but they are stopping the mousedown and preventing text selection
//        if (!viewer.mouseSelectionFixed) {
//            var draggable = new Draggable(viewerId, {starteffect: null, endeffect: null});
//            Event.stopObserving(viewer, "mousedown");
//
//            var draggablePrototype = draggable.__proto__;   // Undefined in IE < 8 - ToDo: debug & fix IE
//            if (draggablePrototype && typeof draggablePrototype.initDragBackup === "undefined") {
//                var ignoredElement = function(event) {
//                    var sourceElement = $(Event.element(event));
//                    return sourceElement.up('#figureCanvas');
//                };
//
//                var shadow = function (original) {
//                    var backup = original + "Backup";
//                    draggablePrototype[backup] = draggablePrototype[original];
//                    draggablePrototype[original] = function(event, arg) {
//                        if (!ignoredElement(event)) draggablePrototype[backup].apply(this, [event, arg]);
//                    };
//                };
//
//                shadow("initDrag");
//                shadow("updateDrag");
//                shadow("endDrag");
//            }
//            // draggablePrototype is undefined in IE < 8 - ToDo: debug & fix IE
//            if (draggablePrototype) Event.observe(viewer, "mousedown", draggablePrototype.initDrag.bindAsEventListener(draggable));
//        }
        viewer.mouseSelectionFixed = true;
        jQuery("#refViewer-wrap").draggable({ cancel: "div#refCanvas" });
        clearRefLinksFromDialog();
        // clicking off the viewer hides the viewer
		Event.observe(document,"click",funct);
	}
	else {
		while (bg[n]) {
			bg[n].style.MozOpacity="1";
			bg[n].style.KHTMLOpacity="1";
			bg[n].style.opacity="1";
			n++;
		}
		Effect.Fade(viewerId, {duration:0.5});
		Event.stopObserving(document,"click",funct);
	}
}

// Search Page: Journal Filter Interface functions
function togglejFilter(targetType, event) {
    var targetId = targetType + "FilterInterface";
    var target = $(targetId);
    if (!event)    var event = window.event;
    if ($(target).style.display == "none") {
        $$(".filterInterface").each(Element.hide);
        if (!$(target).hasClassName('sorted') && "collection" != targetType) {
            // count the number of titles
            var n = 0;
            var title = new Array();
            // load each div into an array

            var list = new Array();
            list = target.getElementsByClassName('filterList')[0].getElementsByTagName('div');

            while (list[n] != null) {
                title[n] = list[n].innerHTML;
                n++;
            }

            if (n > 1) {
                var col2start = Math.round((n) / 2); // determines the first title to list in second column

                // generate the HTML for the first column
                var col1 = "";
                list1 = title.slice(0,col2start);
                col1 = list1.join("");
                col1 = "<div>" + col1 + "</div>";

                // generate the HTML for the second column
                var col2 = "";
                list2 = title.slice(col2start, n);
                col2 = list2.join("");
                col2 = "<div>" + col2 + "</div>";

                // add class to journalFilterInterface to prevent sorting after the first call
                $(target).addClassName('sorted');
                // spit out the new HTML
                $(targetType + 'List').innerHTML = col1 + col2;
            }
        }

        // display the hidden layer
        var posY = Event.pointerY(event);
        target.style.top = posY - 250 + "px";
        Effect.Appear(target, {duration:0.3});
    }
    else {
        Effect.Fade(target, {duration:0.3});
    }
}
function doFilter(targetType, skipToggle) {
    var form = $('advSearch');
    var boxGroup = form[targetType];
		var max=boxGroup.length;
		var coden=new Array();
		var list=$(targetType+'Selected');
		var checked=0;
		for (var count=0; count < max; count++) {
			if (boxGroup[count].checked) {
				coden[checked]=targetType=='collection' ? $(boxGroup[count]).siblings(".collTitle")[0].innerHTML :
                        $(boxGroup[count]).value;
				checked++;
			}
		}
		if (checked == 0 || checked==max) {
            var noFilterText = "<li>All Journals, Books and C&amp;EN Archives</li>";
            if(targetType=='collection'){
                noFilterText = "<li>Search All sections</li>";
            }
			list.innerHTML=noFilterText;
			if (!skipToggle) {
				togglejFilter(targetType);
			}
		}
		else {
			var jList="";
			var n=0;
			while (coden[n]) {
				coden[n]=decodeCoden(coden[n], targetType);
				jList=jList + "<li>" + coden[n] + "</li>";
				n++;
			}
			list.innerHTML=jList;
		}
		new Effect.Highlight(list, {duration: 2.5});
		if (!skipToggle) {
			togglejFilter(targetType);
		}

}

function changeAll(toggle, fieldName) {
    var form = $('advSearch');
var boxGroup = form[fieldName];
	updateChecks(boxGroup,toggle);
}

function updateChecks(boxGroup,toggle) {
	var max=boxGroup.length;
	if (toggle=="select") {
		for (var count=0; count < max; count++) {
			boxGroup[count].checked=true;
		}
	}
	else {
		for (var count=0; count < max; count++) {
			boxGroup[count].checked=false;
		}
	}
}

Event.observe(window, "load", function() {
	var f = $('searchName');
	if (f) Event.observe(f, 'keydown', function(e) {
		if (Event.KEY_RETURN == (e.which || e.keyCode)) {
			Event.stop(e);
			saveSearch('step2');
		}
	})
});
function saveSearch(action) {
	var button1=$('saveit');
	var button2=$('finalize');
	var link=$('viewSaved');
	var layer1=$('saveSearchA');
	var layer2=$('saveSearchB');
	var layer3=$('saveSearchC');
	var layer4=$('saveSearchD');
	if (action=="step2") {
		Effect.Fade(button1);
		Effect.Appear(button2);
		Effect.Fade(link);
		Effect.BlindDown(layer2);
	}
	else if (action=="cancel") {
		Effect.BlindUp(layer2);
		Effect.Appear(button1);
		Effect.Fade(button2);
		Effect.Appear(link);
	}
	else if (action=="saving") { // atypon change
		layer1.style.display="none";
		layer2.style.display="none";
		Effect.Appear(layer3);
	}
	else if (action=="finalize") {
		layer1.style.display="none";
		layer2.style.display="none";
		layer3.style.display="none";
		Effect.Appear(layer4); // atypon change
	}
	else return false;
}

function showSearchTips() {
	var tips=$('searchTipsLayer');
	var link=$('searchTipsLink');
	var needfix=0;
	var results=$('results');
	var pulldown1=results.getElementsByTagName('form')[0];
	var pulldown2=results.getElementsByTagName('form')[1];

	if (Prototype.Browser.IE) {
		if (iesux() == 6) needfix=1;
	}


	if (tips.style.display=="none") {
		if (needfix==1) {
			pulldown1.style.display="none";
			pulldown2.style.display="none";
		}
    $('results').childElements().each(function(s){s.hide();});
	Effect.Appear(tips);
	link.innerHTML="Hide Search Tips";
	}

	else {
		if (needfix==1) {
			pulldown1.style.display="block";
			pulldown2.style.display="block";
		}
	Effect.Fade(tips);
    $('results').childElements().each(function(s){s.show();});;
	link.innerHTML="Show Search Tips";
	}
}
function toggleParentByClass(link, parentClassName) {
    //when opening one, close others that are opened.
    if ($(link).up('.'+parentClassName).hasClassName('closed')){
        var myArray = $(link).up(".collectionList").select('.open');
        myArray.each(function(item) {
            item.addClassName('closed');
            item.removeClassName('open');
        });
    }

    $(link).up('.'+parentClassName).toggleClassName('closed');
    $(link).up('.'+parentClassName).toggleClassName('open');
}
function showIssues(link, jCode, volume) {
	var link = $(link);
	link.up('ul').toggleClassName('closed');
	if (!link.enteredOnce) {
		link.enteredOnce = true;
		if (!link.next('ul')) {
			var li = link.up('li');
			if (!li.innerHTMLBackup) li.innerHTMLBackup = li.innerHTML;
			li.innerHTML+="<img src='/templates/jsp/_style2/_achs/images/loading.gif'/>";
			new Ajax.Request('/action/showPage?page=/widgets/volume_ul.jsp&journalCode='+jCode+"&volume="+volume, {
				onSuccess: function(transport) {
					li.innerHTML = li.innerHTMLBackup + transport.responseText;
				}
			});
		}
	}
}

// Online News Archive
function showMonth(anchor,month) {
	var months = new Array();
	months[0]="all";
	months[1]="jan";
	months[2]="feb";
	months[3]="mar";
	months[4]="apr";
	months[5]="may";
	months[6]="jun";
	months[7]="jul";
	months[8]="aug";
	months[9]="sep";
	months[10]="oct";
	months[11]="nov";
	months[12]="dec";

	// hide all layers
	for (var x=1; x<13; x++) {
		var hide=document.getElementById(months[x]).style;
		hide.display="none";
	}

	// reset all anchors
	for (var x=0; x<13; x++) {
		var change=anchor.parentNode.parentNode.getElementsByTagName('a')[x].style;
		change.backgroundColor="#eee";
		change.color="#369";
	}

	// show the appropriate layer(s)
	if (month=="all") {
		for (var x=1; x<13; x++) {
			var show=document.getElementById(months[x]);
			Effect.Appear(show);
		}
	}
	else {
		month=document.getElementById(month);
		Effect.Appear(month);
	}
	// highlight the appropriate anchor
	anchor.style.backgroundColor="#369";
	anchor.style.color="#fff";
}

// Email Registration
function enableRadio(checkbox, radio1, radio2) {
	checkbox=document.getElementById(checkbox);
	radio1=document.getElementById(radio1);
	radio2=document.getElementById(radio2);
	if (checkbox.checked==true) {
		radio1.disabled=false;
		radio2.disabled=false;
	}
	else {
		radio1.disabled=true;
		radio2.disabled=true;
	}
}

// Electronic Galley Proof
function enableTextarea(textAreaID) {
	radioSet=document.proofForm.readyState;
	textbox=$(textAreaID);
	for (var i=0; i < radioSet.length; i++) {
		if (radioSet[i].checked) {
			var radioValue = radioSet[i].value;
		}
	}
	textbox.disabled = radioValue != "nobutton";
}

// Profile: Saved Searches
function toggleCriteria(button) {
	criteria=button.parentNode.parentNode.getElementsByTagName('div')[1];
	if (criteria.style.display=="none") {
		Effect.BlindDown(criteria);
		button.innerHTML="&uarr; Hide Criteria";
	}
	else {
		Effect.BlindUp(criteria);
		button.innerHTML="&darr; Show Criteria";
	}
}
// Article template reference viewer
// note: needed to weed out Opera because it doesn't display properly
function showRef(event, refIds) {
    initAndShowRefViewer(refIds);
    if (refIds != 'showAll'){
        displayWithEffect('refViewer-wrap', event, offClickRefViewer);
    }
    clearRefLinksFromDialog();
}

function initAndShowRefViewer(refIds){
//    if ($('refViewer-wrap') && $('refViewer-wrap').style.display == '') return false;
    var fvw = $('refViewer-wrap');
	if (!fvw) {
		var c = $('container');
		if (c) {
			fvw = $(document.createElement("div"));
			fvw.id='refViewer-wrap';
			fvw.style.display='none';
			c.appendChild(fvw);
			var fvwInnerHtmlText=
				'<div id="figureViewer">\
					<div id="refViewerNav">\
						<a title="Close Reference QuickView" href="#" onclick="hideRef(event); return false;" class="close">Close</a>\
					    <div class="logo"><img alt="SciFinder" src="/templates/jsp/_style2/_achs/images/sciFinderLogo.png"/><div id="referenceQuickDiv" style="float: right;padding-top: 6px;padding-left: 10px;">Reference QuickView</div></div>\
                        <ul class="viewOptions">\
                            <li><a class="printView" href="javaScript:void(0);" onclick="showPrintView(this, event); return false;">Print Selected Reference</a></li>\
                            <li><a class="casRefLink" href="javaScript:void(0);"  target="_blank">View Full Text Options</a></li></ul>\
                    </div>\
					<div id="refCanvas">\
                        <div class = "casAndNav"></div>';
                        if($$("strong.refLabel") == ''){
                            fvwInnerHtmlText += '<ol id="refList"></ol>';
                        }
                        else{
                            fvwInnerHtmlText += '<ul id="refList"></ul>';
                        }
                fvwInnerHtmlText +='</div>\
				</div>\
				<div id="refViewer-footer">\
					<a title="Open Reference QuickView" onclick="showRef(event,\'showAll\'); return false;" href="JavaScript:void(0);" class="showAllRef"><span>See All References</span></a>\
				</div>\
                <img alt="" src="/templates/jsp/_style2/_achs/images/figureViewer-bg3.gif"/>'
                    ;
            fvw.innerHTML = fvwInnerHtmlText;
			fvw = $(fvw);
		}
	}
    var showAllRef = $("refViewer-footer").down(".showAllRef");
    if (!refIds || refIds == 'showAll') {
        refIds = undefined;
        showAllRef.addClassName("hidden");
    }else{
        showAllRef.removeClassName("hidden");
    }
    if (typeof refIds == "string") refIds = refIds.split(' ');
    var casIds = getCasIds(refIds);
    var currentIndex = 0;
    setRefCasHtml(casIds[currentIndex]);
    setRefPrevNext(casIds, currentIndex);
    if (!refIds) refIds = getAllRefIds();
    setRefListHtml(refIds, currentIndex);
}

//window.refViewer is required
function getCasIds(refIds){
    if (!window.refViewer) return false;
    var casIds = new Array();
    if (refIds){
        for (var i = 0; i < refIds.length; i++) {
            casIds = casIds.concat(getCitOrRefId(refIds[i]));
        }
    }else{
        for(var refId in window.refViewer) {
            casIds = casIds.concat(getCitOrRefId(refId));
        }
    }
    return casIds;
}
function getAllRefIds(){
    var allRefIds = new Array();
    for(var refId in window.refViewer) {
        allRefIds.push(refId);
    }
    return allRefIds;
}
//if it has citIds, use those. Otherwise, use the refId
function getCitOrRefId(id){
    return (window.refViewer[id] && window.refViewer[id].length) > 0 ? (window.refViewer[id]): id;
}
function setRefCasHtml(casId, cleanCasOnly){
    var casRecord = $("cas_"+ casId + "R");
    var figCanvas = $('refCanvas');
    //if prev or next is clicked, only modify the casRecord
    if (cleanCasOnly){
        figCanvas.down(".casRecord").remove();
    }else{
        figCanvas.down(".casAndNav").innerHTML = "";
    }
    var casAndNavWrapper = figCanvas.down(".casAndNav");
    casAndNavWrapper.insert({'bottom' :(casRecord.cloneNode(true))});
    figCanvas.insert({'top':casAndNavWrapper});
    checkViewOptions(casRecord);
}
//if the reference has no cas record, hide the "viewOption" links
function checkViewOptions(casRecord){
    var viewOptions = $("refViewerNav").down(".viewOptions");
    if (casRecord.hasClassName("empty")){
        viewOptions.addClassName("hidden");
    }else{
        viewOptions.removeClassName("hidden");
        var printView = viewOptions.down(".printView");
        printView.id= "print_"+casRecord.id;

        var casRefLink = viewOptions.down(".casRefLink");
        casRefLink.href = casRecord.down(".casRefUrl").innerHTML;
    }
}
function setRefListHtml(ids, currentIndex){
    var casIds = getCasIds(ids);
    var refListDiv = $('refList');
    $('refList').innerHTML = "";

    //construct the li elements
    var index = 0;
    for (var i = 0; i < ids.length; i++) {
        var highlight = i == currentIndex && casIds.length > 0;
        var refItem = $(document.createElement('li'));
        var refId = ids[i];
        refItem.writeAttribute("id", "ref_"+ refId);
        //if citationId exists, use that.  Otherwise, use refId
        var hasCitationId = false;
        var currentRefModified = null;
        var isCitation =false;
        if(isNumber(refId.substring(refId.length-1))){
            currentRefModified = $(refId).down('.reference').cloneNode(true);
        }else{
            isCitation = true;
            var refId=refId.replace("cit","ref");
            currentRefModified = $(refId.substring(0,refId.length-1)).down('.reference').cloneNode(true);
        }
        currentRefModified.select('.NLM_citation').each(function(c){
            if(isCitation){
                var citId=refId.replace("ref","cit");
                if(c.id != citId){
                    c.remove();
                    --index;
                }
            }
            //c.writeAttribute("onClick",  "changeRef('"+casIds + "'," + index + "); return false;");
            var tmpIndex=index;
            c.observe('click',function(event){
                   changeRef(casIds,tmpIndex);
             });
            c.id="nav_"+c.id; //rename id to avoid duplicate ids in the html
            if (highlight || (isCitation && index == 0 && casIds.length > 1)){
                $(c).addClassName("current");
                highlight = false;
            }
            hasCitationId = true;
            index++;
        });
           var currentRefLabel = jQuery(currentRefModified).find("strong.refLabel").text();
           jQuery(refListDiv).find("strong.refLabel").each(function(){
               var refLabel = jQuery(this).text();
               if(refLabel == currentRefLabel){
                   jQuery(currentRefModified).find("strong.refLabel").remove();
               }
           });
            refItem.appendChild(currentRefModified);
          if (!hasCitationId){
              var tIndex = index;
              //refItem.writeAttribute("onClick",  "changeRef('"+casIds + "'," + index + "); return false;");
              refItem.observe('click',function(event){
                   changeRef(casIds,tIndex);
              });
              if (highlight){$(refItem).addClassName("current");}
              index++;
          }
        refListDiv.appendChild(refItem);
        if(i == ids.length-1){
            $$("#figureViewer div.citationLinks a").each(function(element) {
                element.observe('click', stopprpegationForAnchor);
            });
        }
   }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function stopprpegationForAnchor(event){
    event.cancelBubble = true;
    if(event.stopPropagation)
    {
        event.stopPropagation();
    }
}

function setRefPrevNext(ids, refIndex){
    if (!ids || ids.length == 1) return false;

    var figCanvas = $('refCanvas');
    var navLinks = $(document.createElement('div'));
    navLinks.id = "refNav";

    var prevLink = $(document.createElement('a')).addClassName("prevLink").writeAttribute("href", "javascript:void(0)");
    prevLink.innerHTML = "<< Previous";
    setPrevRef(prevLink, ids, refIndex);

    var nextLink = $(document.createElement('a')).addClassName("nextLink").writeAttribute("href", "javascript:void(0)");
    nextLink.innerHTML = "Next >>";
    setNextRef(nextLink, ids, refIndex);

    var separator = document.createElement('span');
    separator.innerHTML=" | ";
    navLinks.appendChild(prevLink);
    navLinks.appendChild(separator);
    navLinks.appendChild(nextLink);
    $(figCanvas.down(".casAndNav")).insert({'top': navLinks});
}
function setPrevRef(el, ids, index){
    var prevIndex = index-1;
    $(el).stopObserving('click');
    if (prevIndex > -1){
        $(el).observe('click',function(event){
            changeRef(ids,prevIndex);
        });
        $(el).removeClassName("gray");
    }else{
        $(el).addClassName("gray");
    }
}
function setNextRef(el, ids, index){
    var nextIndex = index+1;
    $(el).stopObserving('click');
    if (nextIndex < ids.length){
        $(el).observe('click',function(event){
            changeRef(ids,nextIndex);
        });
        $(el).removeClassName("gray");
    }else{
        $(el).addClassName("gray");
    }
}
//takes comma separated ids.
function changeRef(ids, index){
    if (typeof ids == "string") ids = ids.split(',');
    if(ids[index] == null){
        index = 0;
    }
    setRefCasHtml(ids[index], true);
    changeCurrentRefHighlight(ids[index]);
    changePrevNext(ids, index);
}
function changeCurrentRefHighlight(refId){
    var current = $("refList").down(".current");
    if (current) {current.removeClassName("current");}

    var navElem = $("nav_"+refId);
    if (!navElem) navElem = $("ref_"+refId);
    navElem.addClassName("current");
    $('refList').scrollTop = navElem.offsetTop - $('refList').offsetTop;
}
function changePrevNext(ids, index){
    var refNav = $('refNav');
    if(refNav != null){
        setPrevRef(refNav.down('.prevLink'), ids, index);
        setNextRef(refNav.down('.nextLink'), ids, index);
    }
}
/* Atypon added */
function initViewer(e) {
	if (!window.figureViewer) return false;
	if ($('figureViewer-wrap') && $('figureViewer-wrap').style.display == '') return false;

	var figures = window.figureViewer.figures;

	/* clear up figures that were not rendered */
	for (var i = figures.length - 1; i >= 0; i--) {
		var figureMeta = figures[i];
		if (!figureMeta || !$(figureMeta.i)) figures.splice(i, 1);
	}
	if (figures.length == 0) {
		window.figureViewer = null;
		return false;
	}

	var fvw = $('figureViewer-wrap');
	if (!fvw) {
		var c = $('container');
		if (c) {
			fvw = $(document.createElement("div"));
			fvw.id='figureViewer-wrap';
			fvw.style.display='none';
			c.appendChild(fvw);
			fvw.innerHTML =
				'<div id="figureViewer">\
					<div id="figureViewerNav">\
						<a title="Close Figure Viewer" href="#" onclick="showFigures(event); return false;" class="close">Close</a>\
						<div class="figureNav">\
							<a class="prev" title="Previous Figure" href="#" class="disabled"></a>\
							<span>Figure <span class="index">1</span> of ' + figures.length + '</span>\
							<a class="next" title="Next Figure" href="#" class="disabled"></a>\
						</div>\
					</div>\
					<div id="figureCanvas">\
						<div id="figTools">\
						</div>\
						<div class="figBox">\
						</div>\
						<div class="caption">&nbsp;\
						</div>\
					</div>\
				</div>\
				<div id="figureViewer-footer">\
					<img alt="" src="/templates/jsp/_style2/_achs/images/figureViewer-bg3.gif"/>\
				</div>';
			fvw = $(fvw);
		}
	}

	var index = 0;
	var figureElement = Event.findElement(e, ".figure");
	if (figureElement && figureElement.id) {
		var figureId = figureElement.id;
		while (index < figures.length && figures[index].i != figureId) index++;
	}
	showImage(index);
}

function showImage(index) {
	var figures = window.figureViewer.figures;
	var figureMeta = figures[index];
	if (!figureMeta) figureMeta = figures[index=0];
	var graphics = figureMeta.g;
	var figureElement = $(figureMeta.i);

	var fvw = $('figureViewer-wrap');

	/* image and caption */
	var html = "";
	for (var i = 0; i < graphics.length; i++) {
		html += '<img alt="Figure" src="' + window.figureViewer.path + '/images/medium/' + graphics[i].m + '"/>';
	}
	fvw.down(".figBox").innerHTML = html;
	var captionElement = figureElement.down(".caption");
	fvw.down(".caption").innerHTML = captionElement ? captionElement.innerHTML : "";

	/* navigation */
	var pLink = fvw.down('.prev');
	if (index == 0) {
		pLink.addClassName("disabled");
		pLink.href = "#"
	} else {
		pLink.removeClassName("disabled");
		pLink.href = "JavaScript:showImage(" + (index - 1) + ")";
	}

	index++;
	var nLink = fvw.down('.next');
	if (index == figures.length) {
		nLink.addClassName("disabled");
		nLink.href = "#"
	} else {
		nLink.removeClassName("disabled");
		nLink.href = "JavaScript:showImage(" + index + ")";
	}

	fvw.down('.index').innerHTML = index;

	/* figure tools */
	var ftHtml = '';

	if (figureMeta.weo) {
		for (var i = 0; i < figureMeta.weo.length; i++) {
			var weo = figureMeta.weo[i];
			if (weo && weo.h) {
				ftHtml += '<div class="weo"><a title="View this Web Enhanced Object'
				if (weo.t) { ftHtml += ': ' + weo.t; }
				ftHtml += '" href="' + weo.h + '" target="_blank"><span>Web Enhanced Object</span></a></div>';
			}
		}
	}


	html = '';
	for (var i = 0; i < graphics.length; i++) {
		if (graphics[i].l) {
			if (html) html += '<br />'; // is not first link
			html += '<a href="' + window.figureViewer.path + '/images/large/' + graphics[i].l + '"><span>High Resolution Image</span></a>';
		}
	}
	if (html) {
		ftHtml += '<div class="highRes">' + html + '</div>';

		ftHtml += '<div class="ppt"><a title="Download MS PowerPoint Slide" href="/action/downloadFigures?doi=' + window.figureViewer.doi + '&id=' + figureMeta.i + '">\
				  <span>PowerPoint Slide</span>\
			   </a></div>';
	}

	fvw.down('#figTools').innerHTML = ftHtml;
}

function showLoading() {
	alert("Loading");
}
function displayFigureBrowser() {
	alert("Loaded");
}
function popRef2(ids) {
}

function initReferencesBaloon(link, ids) {
    if (!ids) return;
    link = $(link);
    var bv = link.next();
    if (!bv || bv.tagName.toLowerCase()!= 'span' || bv.className!='ref') {
        if (typeof ids == "string") ids = ids.split(' ');
        var content = "";
        for (var i = 0; i < ids.length; i++) {
            var refLabel = $(ids[i]).down('.refLabel');
            if (refLabel && ids.length == 1){
                //remove label only for display purposes.
                var label = refLabel.innerHTML;
                refLabel.innerHTML="";
                content += '<span>' + $(ids[i]).innerHTML + "</span>";
                //insert it back after display incase the same reference is used with another one (multiple references should display labels)
                refLabel.innerHTML=label;
            }else{
                content += '<span>' + $(ids[i]).innerHTML + "</span>";
            }
        }
        link.insert({after: '<span class="ref"><span class="balloon-wrap"><span class="balloon"><a title="Hide Reference Information" onclick="hideRef(this); return false;" href="#" class="close"></a>' + content + '<a class="refLink" title="View References" onclick="hideRef(this);" href="#references">View Full Reference List</a></span></span></span>'});
    }
}
//atypon method
function setupNextPrev(figureNav, doiFigure, index){
	var currentImages = doiFigure.images;
	var size = currentImages.length;
	if (size==1){
		$(figureNav).addClassName("disabled");//by default
		figureNav.style.display="none";
		return;
	};
	figureNav.style.display="block";
	var doi = doiFigure.doi;
	var nLink = $(figureNav).select('.next')[0];
	var prevLink = $(figureNav).select('.prev')[0];
	if (index == size-1){//index is last, disable next and set previous
		nLink.addClassName("disabled");
		prevLink.removeClassName("disabled");
		prevLink.stopObserving('click',prevEvent);
		var prevEvent = function(e){changeImage(this,index-1,doi); Event.stop(e)}
		prevLink.observe('click', prevEvent);
	}else if(index == 0){ //index is first, disable prev and set next
		prevLink.addClassName("disabled");
		nLink.removeClassName("disabled");
		nLink.stopObserving('click',nextEvent);
		var nextEvent = function(e){changeImage(this,index+1,doi); Event.stop(e)};
		nLink.observe('click', nextEvent)
	}else{
		prevLink.removeClassName("disabled");
		prevLink.stopObserving('click',prevEvent);
		var prevEvent = function(e){changeImage(this,index-1,doi); Event.stop(e)};
		prevLink.observe('click',prevEvent)
		nLink.removeClassName("disabled");
		nLink.stopObserving('click',nextEvent);
		var nextEvent = function(e){changeImage(this,index+1,doi); Event.stop(e)};
		nLink.observe('click',nextEvent);
	 }
	figureNav.getElementsByTagName('span')[0].innerHTML='Figure ' + eval(index+1) + ' of ' + size;
}

function changeImage(navLink, index, doi){
	var figureTray = navLink.parentNode.parentNode.parentNode;
	var imgTag = $(figureTray).select('img')[0];
	var doiFigure = getDoiFigures(doi);
	if (!doiFigure) return;
	imgTag.style.border="0";
	imgTag.src="/templates/jsp/_style2/_achs/images/loading.gif";
	setTimeout(function() {updateFigImg(doiFigure, index, imgTag); imgTag.style.border="1px solid #ccc"; }, 500);
	var figureNav = figureTray.select('.figureNav')[0];
	setupNextPrev(figureNav, doiFigure, index);
}
function getDoiIndex(doi) {
	var figures = window.figureViewer;
	if (!figures) return -1;
	var max = figures.length;
	for (var count=0; count < max; count++) {
		if (figures[count].doi == doi){
		   return count;
		}
	}
	return -1;
}
function getDoiFigures(doi) {
	var doiFigure;
	var figures = window.figureViewer;
	if (!figures) return;
	var max = figures.length;
	for (var count=0; count < max; count++) {
		if (figures[count].doi == doi){
		   return doiFigure=figures[count];
		}
	}
}

function addFigure(doi, path, images, isTocFigure) {
	var figureViewer = window.figureViewer;
	var figure = {doi:doi,path:path,images:[images]};
	if (isTocFigure) figure.isTocFigure = true;
	var doiIndex = getDoiIndex(doi);
	if (!figureViewer){
		figureViewer = new Array();
		figureViewer[0]=figure;
	}else if(doiIndex > -1){
		var doiImages = figureViewer[doiIndex].images;
		doiImages[doiImages.length] = images;
		figureViewer[doiIndex].images = doiImages;
	}else{
		var size = figureViewer.length;
		figureViewer[size]=figure;
	}
	window.figureViewer = figureViewer;
}

function createIssueNav(tocNav) {
	// if ($$('body')[0].hasClassName('cen-archives')) return; // no toc nav for C&EN Archives
	var subjects = $$('div.subject');
	if (!subjects || subjects.length < 2) return;
	var tocHtml =  "<h4>In this issue:</h4> <ul>";
	for (var count = 0; count < subjects.length; count++) {
	   subject = $(subjects[count]);
	   tocHtml += '<li><a href="#' + subject.parentNode.id +'">' + subject.innerHTML + '</a></li>'
	}
	tocHtml += '</ul>';
	tocNav.innerHTML=tocHtml;
}

function openMultiTrays(button) {
	if (!button) return;
	var form = $(button).up('form');
	var body = $$('body')[0];
    var hasNoThumbs = body.hasClassName('noThumbs');
	// user opts to show thumbnails
	if (hasNoThumbs) {
		createCookie('thumbs','show',0); // set cookie to always show thumbnails
		body.removeClassName('noThumbs');
		// create global variables if not already created
		if (!window.formArticles) {
			formArticles = form.getInputs('checkbox','doi');
			allFormArticles = formArticles.length;
			loopedArts = new Array(allFormArticles);
		}
		loadThumbnailsA();
		Event.observe(window,'scroll',loadThumbnailsA);
	}
	// user opts to hide thumbnails
	else {
		createCookie('thumbs','hide',0); // set cookie to always hide thumbnails
		body.addClassName('noThumbs');
		Event.stopObserving(window,'scroll',loadThumbnailsA);
	}
}

function loadThumbnailsA() {
	var initBottom = document.viewport.getHeight() + document.viewport.getScrollOffsets()[1] + 700;
	// check if still scrolling before starting the load process (improves IE scrolling performance)
	var t = setTimeout(function(){loadThumbnailsB(initBottom); initBottom = null;},100); // parameter set to null to prevent IE memory leak
}

function loadThumbnailsB(initBottom, ignoreScroll) {
	var top = document.viewport.getScrollOffsets()[1];
	var wHeight = document.viewport.getHeight();
	var bottom = top + wHeight + 700;
	if (initBottom && bottom != initBottom) return; // stop if user is still scrolling
	Event.stopObserving(window,'scroll',loadThumbnailsA);
	var wrap, tray, figBox, nav, img, doi, doiFigure;
	// show thumbnails for articles that are above the bottom threshold
	for (var count=0; count < allFormArticles; count++) {
		if (!ignoreScroll){
            if (formArticles[count].cumulativeOffset()[1] < top) continue; // skip loop if the article is above the viewport
            if (bottom < formArticles[count].cumulativeOffset()[1]) break; // stop loop if the article is below the bottom threshold
        }
        if (loopedArts[count] == 1) continue; // stop if the article has already been through the loop
		loopedArts[count] = 1; // set to 1 so that we can ignore this article if it gets put into the loop again
		wrap = formArticles[count].parentNode.parentNode;
		doi = formArticles[count].value;
		doiFigure = getDoiFigures(doi);
		if (doiFigure) {
			tray = $(wrap).select('div.figureTray')[0];
			tray.style.display="block";
			figBox = $(tray).select('div.figureBox')[0];
			figBox.style.display = "block";
			img = $(figBox).select('img')[0];
			updateFigImg(doiFigure, 0, img);
			nav = $(tray).select('div.figureNav')[0];
			setupNextPrev(nav, doiFigure, 0);
		}
	}
	Event.observe(window,'scroll',loadThumbnailsA);
}


// Atypon JS
function hideAndShow(hideThis, showThis, cssClassForShown, hideTab, showTab) {
	hideThis = $(hideThis);
	showThis = $(showThis);
	if (hideThis && hideThis.style.display != 'none') {
		if (cssClassForShown) {
			$(hideTab).removeClassName(cssClassForShown);
		}
		hideThis.style.display="none";
	}
	if (showThis && showThis.style.display == 'none') {
		if (cssClassForShown) {
			$(showTab).addClassName(cssClassForShown);
		}
		showThis.style.display="block";
	}
}

function toggleDisplay(elem) {
	elem = $(elem);
	if (elem.style.display == "none") {
		Effect.BlindDown(elem, {duration: 0.3});
	}
	else Effect.BlindUp(elem, {duration: 0.3});
}

function pubsLogin() {
	if (window.signIn) {
		alert ('On this page, please use the Log In box that appears in the yellow box below the article title. Thank you.');
		new Effect.ScrollTo('articleMain');
		return false;
	}
	var bg = '<div id="bgWhite" style="display:none;">&nbsp;<\/div>';
	$('container').insert(bg);
	$('bgWhite').appear({to:0.85});
	$('loginLayer-wrap').appear();
	if ($('loginLoadMsg')) $('loginLoadMsg').remove();
	$('layerLogin').appear({afterFinish: function(){$('acsID').focus();}});
	// make it so clicking outside of the layer hides the layer
	setTimeout(function(){Event.observe(document,"click",closeLoginBox);},100);
}
closeLoginBox = function(event) {
	var target = Event.element(event);
	if (target != $('loginLayer') && !target.descendantOf('loginLayer')) {
		hideLoginLayer();
	}
};
function hideLoginLayer() {
	Event.stopObserving(document,"click",closeLoginBox);
	$('bgWhite').fade({afterFinish: function(){$('bgWhite').remove();}});
	$('loginLayer-wrap').fade();
}

function jsonfeed(data) {
    var e, showPrefs, logout, value = null;
    e = document.getElementById('loginErrorMessage');
    if (data.msg === "Successful authentication") {
        e.innerHTML = "<span style=\"color:green!important;font-weight:bold;\">You are now logged in<\/span>";
        showPrefs = '<a href="/action/showPreferences">Your Profile<\/a>';
        logout = '<a href="https://portal.acs.org/portal/signoff?return_URL=http%3a%2f%2fpubs.acs.org%2faction%2fdoLogout">Log Out<\/a>';
        // redirectUri is only on Log In page, so do the following only if NOT on the Log In page
        if (!document.getElementById('redirectUri')) { 
            if ($('loginButton')) {
                $('loginButton').replace(showPrefs);
                $('registerButton').replace(logout);
            }
            if ($('loginLayer-wrap') && $('loginLayer-wrap').style.display !== "none") {
                setTimeout(function(){hideLoginLayer();},500);
            }
            if ($('register-alerts-login')) { 
                ACSPubs.user.email = true;
                setTimeout(FollowHubPage.testAlertsLogin, 500);
            }
        }
    } else { e.innerHTML = data.msg; }
    // Preset the value of the cookie
    // If the session was created, set then cookie value to the session id
    if (data.sessionid) {
        value = data.sessionid;
        createCookie('ERIGHTS', value, 0, '.acs.org');
        if (document.getElementById('redirectUri')) {
            window.location = document.getElementById('redirectUri').value; 
        }
    }
}

function doLogin(smHost) {
	if (document.getElementById('loginErrorMessage')) {
		document.getElementById('loginErrorMessage').innerHTML = "Sending Log In information...";
	}
	var username = encodeURIComponent(document.getElementById('acsID').value);
	var password = encodeURIComponent(document.getElementById('password').value);
	var url = smHost + '/portal/signon?username=' + username + '&password=' + password;

	var loginScript = document.createElement('script');
	loginScript.type="text/javascript";
	loginScript.src = url;
	document.getElementsByTagName('head')[0].appendChild(loginScript);
	return false;
}
function showTokenLogin(link) {
	toggleView(link,'fade');
	setTimeout(function(){if($('acsID')) $('acsID').focus();},500);
}
function checkLoginStatus(link) {
	// not logged in
	if ($('loginButton')) {
		$(link).hide();
		showTokenLogin(link);
	}
	// already logged in
	else {
		toggleView(link,'fade');
		$(link).hide();
		$('signInBox').hide();
		var updateText="<span style=\"color:green;font-weight:bold;\">You are already logged in.<\/span> Proceed to step #2, unless you need to <a href=\"#\" onclick=\"stillShowLogin(this); return false;\">log in with a different ACS ID<\/a>";
		$('defaultLoginText').innerHTML=updateText;
	}
}
function stillShowLogin(link) {
	// logged in, but want to log in with another ACS ID
	link.parentNode.style.display=="none";
	$('signInBox').show();
}
function activateToken(token, domain) {
	// defaults to the "campaign" token domain
	if (!domain) domain = "campaign";
	// provide feedback that token activation is taking place
	$('tokenStatus').innerHTML = '<span style="color:red;">Activating token...<\/span>';
	// create the token url
	var tokenURL = "/token/";
	tokenURL = tokenURL + token + "/" + domain;

	// AJAX
    var sendToken = new Ajax.Request(tokenURL, {
   		method: 'get',
		onSuccess: function(response) {
			response=response.responseText;
			// when user hasn't logged in
			if (response.include('Log In \(ACS Publications\)')) {
				alert('Please log in with an ACS ID before attempting to activate this token.');
				$('tokenStatus').innerHTML = "";
				return false;
			}
			// when token is successfully activated
			else if (response.include('Access token accepted (ACS Publications)')) {
				$('tokenLink').style.display="none";
				$('tokenStatus').style.marginLeft=0;
				$('tokenStatus').innerHTML = "<span style=\"color:green;font-weight:bold;\">Token successfully activated<\/span>";
			}
			// when token has reached activation limit
			else if (response.include('Activate a Token (ACS Publications)')) {
				$('tokenLink').style.display="none";
				$('tokenStatus').style.marginLeft=0;
				$('tokenStatus').innerHTML = "<span class=\"error\">Sorry, this token has reached its activation limit. If you have activated this token before, you only need to be signed in with your ACS ID to gain access to its associated content.<\/span>";
			}
			// when there is an unanticipated response to the request
			else {
				$('tokenLink').style.display="none";
				$('tokenStatus').style.marginLeft=0;
				$('tokenStatus').innerHTML = "<span class=\"error\">There was an error activating the token. Please report this to <a href=\"mailto:support@services.acs.org\?subject=Problem with token activation&amp;body=I had a problem activating the token on this page:" + parent.window.location + "\">support@services.acs.org<\/a><\/span>";
			}
		}
    });
}

//Added by Atypon: if there are fewer than 5 items in journalHome, set range.
function setRange(focusList){
	var articles = $(focusList).getElementsByClassName('articleBox');
	var range = $(focusList).down('div.range');
	var size = articles.length;
	if (size < 2){
		range.style.display='none';
		removeViewAllLinks(focusList);
		return;
	}
	if (size < 5){
		range.innerHTML='Now showing 1&ndash;' + size;
		removeViewAllLinks(focusList);
	}
}
//Added by Atypon: if there are fewer than 5 items in journalHome, remove "View All" links
function removeViewAllLinks(focusList){
	$(focusList).down('div.viewAll').style.display='none';
	$(focusList).down('div.viewAllLink').style.display='none';
}

// Alex Kim: function that we'll be using on static pages
function loadAudio(link) {
	var wrapper=$(link).parentNode.parentNode;
	var loadLink=$(wrapper).select('div.button')[0];
	var box=$(wrapper).select('div.audioBox')[0];
	if ($(wrapper).select('div.info')[0]) $(wrapper).select('div.info')[0].style.display="none";
	loadLink.style.display="none";
	box.style.display="block";
}

// a general show/hide toggle function
function toggleView(link,animate) {
	if (!animate) animate=0;
	var target=$(link).up('div').select('[class="toggled"]');
	var linkText=$(link).innerHTML;
	if (target[0].style.display=="none") {
		if (animate=="fade") Effect.Appear(target[0]);
		else target[0].style.display="block";
		$(link).innerHTML=linkText.gsub(/^View /, "Hide ");
	}
	else {
		if (animate=="fade") Effect.Fade(target[0]);
		else target[0].style.display="none";
		$(link).innerHTML=linkText.gsub(/^Hide /, "View ");
	}
}




// Alex Kim: Slideshow Functions for HPs and Site Editor pages
function gotoSlide(target,autoplay) {
	if (!autoplay) autoplay=0; // no autoplay unless designated
	// stop autoplay if this is a non-autoplay request
	if (autoplay=="0") {
		if (window.slideLoop) window.clearInterval(slideLoop);
		$('highlightPlay').show();
		$('highlightPause').hide();
	}
	var nav=$('slideSelect');
	var slides=$('slides');
	var slide=new Array();
	var button=new Array();
	var num=0;
	while (nav.select('li')[num]) {
		button[num]=nav.select('li')[num];
		if(button[num].hasClassName('current')) {
			button[num].removeClassName('current');
		}
		num++;
	}
	var max=num-1; // num ends up being one more than the total # of slides
	for (n=0;n<=max;n++) {
		slide[n]=slides.select('div.slide')[n];
		slide[n].style.display="none";
	}
	// target slide appears; target button gets highlighted
	target=target-1; // slide 1 = slide[0]
	Effect.Appear(slide[target]);
	button[target].addClassName('current');
}
function getCurrent(max) {
	var slideArray=new Array();
	slideArray=$('slideSelect').select('li');
	var max=slideArray.length;
	for (var i=0;i<max;i++) {
		if (slideArray[i].hasClassName('current')) var current=i;
	}
	var current=current+1; // translate array numbering to slide numbering (slide 1=array[0])
	return current;
}
function playSlides(command,initialize) {
	if (!initialize) initialize=0;
	var play=$('highlightPlay');
	var pause=$('highlightPause');

	if (command=="play") {
		// show pause button
		play.hide();
		pause.show();
		// find out how many slides there are
		var max=$('slideSelect').select('li').length;
		// determine which slide is currently displayed
		var n=getCurrent();
		if (n==max) n=1; // last slide loops to first slide
		else n++; // add 1 to go to the next slide
		n=n++; // target the next slide
		if (initialize!=0) n=1; // skip showing initial slide (again) if this is from the autoplay triggered by the loading of the window
		else gotoSlide(n,1); // immediately show next slide if this isn't triggered by autoplay
		// then loop through the slides
		slideLoop=setInterval(
			function() {
				if (n==max) n=1; // last slide loops to first slide
				else n++; // add 1 to go to the next slide
				gotoSlide(n,1);
			}
		,9000) // determines how long each slide displays in autoplay
	}
	else {
		window.clearInterval(slideLoop);
		play.show();
		pause.hide();
	}
}
function changeSlide(slide) {
	var n;
	var slideArray=new Array();
	slideArray=$('slideSelect').select('li');
	var max=slideArray.length;
	var current=getCurrent();
	if (slide=="next") {
		if (current==max) n=1;
		else n=current+1;
	}
	else {
		if (current==1) n=max;
		else n=current-1;
	}
	gotoSlide(n);
}


// new function for Archive first page image
function showFull(target) {
	image=$(target).getElementsByTagName('img')[0];
	text=$(target).getElementsByTagName('span')[0];
	if (image.style.width!="99%") {
        $(image).writeAttribute("style","width:99%;");
		text.style.width="611px";
		text.innerHTML="Click to increase image size";
	}
	else {
        $(image).writeAttribute("style","width:auto;");
		text.style.width="780px";
		text.innerHTML='Click to decrease image size<span class="bigx">X</span>';
	}
}

function toggleBooksTabs(tab) {
	var yearTab=$('ebookYearTab');
	var divisionTab=$('ebookDivTab');
	var yearLayer=$('booksByYear');
	var divisionLayer=$('booksByDivision');

	if (tab=="year" && yearTab.readAttribute('class')=="nowShowing") return false;

	else if (tab=="division" && divisionTab.readAttribute('class')=="nowShowing") return false;

	else if (tab=="year") {
		divisionLayer.hide();
		yearLayer.show();
		divisionTab.writeAttribute("class", "");
		yearTab.writeAttribute("class", "nowShowing" );
	}
	else {
		yearLayer.hide();
		divisionLayer.show();
		yearTab.writeAttribute("class", "");
		divisionTab.writeAttribute("class", "nowShowing" );
	}
	return false; // prevent user from jumping to top of the page
}

/* 4 Quick Search Functions */
function toggleQS(section) {
	//hide all forms
	$('qsSearch').style.display="none";
	$('qsCitation').style.display="none";
	$('qsDOI').style.display="none";
    $('qsSubjectSearch').style.display="none";

	//set all tabs to default styles
	$('qsTabSearch').removeClassName('active');
	$('qsTabCitation').removeClassName('active');
	$('qsTabDOI').removeClassName('active');
    $('qsTabSubjectSearch').removeClassName('active');

	if (section=="search") {
		$('qsSearch').style.display="block";
		$('qsTabSearch').addClassName('active');
		$('qsSearchString').focus();
	}
	else if (section=="citation") {
		$('qsCitation').style.display="block";
		$('qsTabCitation').addClassName('active');
		$('qsCitVol').focus();
	}
	else if (section=="doi") {
		// detect if someone started putting a DOI into the search field before clicking on the DOI tab, and transfer that value to the DOI field
		var sv=$('qsSearchString').value;
		if (sv.startsWith('10.1021/')) $('qsDOIField').value=sv;

		$('qsDOI').style.display="block";
		$('qsTabDOI').addClassName('active');
		// a dumb way of shifting focus to the text box; had to be done for Safari
		if ($('qsDOIField').value=="10.1021/" || $('qsDOIField').value=="") $('qsDOIField').value="10.1021/";
		$('qsDOIField').focus();
	}
    else if (section=="subjectSearch") {
		$('qsTabSubjectSearch').addClassName('active');
        $('qsSubjectSearch').style.display="block";
	}
}

function validateSearch() {
	var select = $('qsSearchArea');
	var searchArea = select.options[select.selectedIndex].value;
	var searchString = $('qsSearchString').value;
	if (searchString == "") {
		alert('Please enter search terms before running your search.');
		return false;
	}
	$('simpleSearchArea').name = searchArea;
	$('simpleSearchArea').value = searchString;
	$('qsSearch').submit();
}
function validateCitation() {
	var title = $('qsCitTitle');
	var volume = $('qsCitVol');
	var page = $('qsCitPage');

	if (title.value == "-") {
		alert('Please select a Journal or Book Series before running your search.');
		return false;
	}
	else if (volume.value == "" || !volume.value.toString().match(/^[-]?\d*\.?\d*$/)) {
		alert('Please enter a valid Volume before running your search.');
		return false;
	}
	else if (page.value == "")
	{
		alert('Please enter a valid Page before running your search.');
		return false;
	}

	parent.window.location="/action/quickLink?quickLinkJournal=" + title.value + "&quickLinkVolume=" + volume.value + "&quickLinkPage=" + page.value;
}
function validateDOI() {
	var doi=$('qsDOIField').value;

	// detect manuscript ids and prepend them with 10.1021/ to turn them into valid DOIs
	if (!doi.startsWith('10.1021/')) {
		doi="10.1021/"+doi;
	}
	else if (doi.length < 10) {
		alert('Please enter a valid ACS Publications DOI before running your search.');
		return false;
	}

	// detect book DOIs
	if (doi.startsWith('10.1021/bk-')||doi.startsWith('10.1021/ba-')) {
		// detect books
		if (doi.length < 21) {
			parent.window.location="/doi/book/" + encodeURIComponent(doi);
		}
		// all others must be chapters
		else parent.window.location="/doi/abs/" + encodeURIComponent(doi);
	}
	else parent.window.location="/doi/abs/" + encodeURIComponent(doi);
}

/* for search box on site-wide footer */
function footerSearch() {
    var searchString = $('footerSearchString').getValue();
    if (searchString == "") {
        return false;
    }
    var footerSearchInput = $('footerSimpleSearchArea');
    footerSearchInput.value = searchString;
    $('footerSearchForm').submit();
}

/* for search box on C&EN Archives home page */
function cenArchiveSearch() {
	var select = $('cenArchSearchArea');
	var searchArea = select.options[select.selectedIndex].value;
	var searchString = $('cenArchSearchString').value;

	if (searchString == "") {
		alert('Please enter search terms before running your search.');
		return false;
	}
    var cenSearchInput = $('cenSimpleSearchArea');
	cenSearchInput.name = searchArea;
	cenSearchInput.value = searchString;
	$('cenArchSearch').submit();
}


/* to toggle the ASAP/JAMs only button */
function toggleDateRange(checkbox) {
	var df = $('dateFilter');
	if (checkbox.checked) df.hide();
	else df.show();
}

/* show/hide the Title Results */
function toggleTitleResults(anchor) {
	var results=$('titleResultsLayer');
	if (results.style.display=="none") {
		Effect.BlindDown(results);
		$(anchor).writeAttribute("class","showing");
	}
	else {
		Effect.BlindUp(results);
		$(anchor).writeAttribute("class","");
	}
}

/* submit showBookSeries with correct values in query */
function submitShowBookSeries() {
	var select = document.getElementById("bookYear");
	var index = select.selectedIndex;
	var selectedValue = select.options[index].value;

	var beforeYear = document.getElementById("beforeYear");
	beforeYear.value = selectedValue;

	var form = document.getElementById("bookYearForm");
    getFormInput(form.name, 'startPageYear').value = 0;

	form.submit();

}

/* Browse by issue */
Event.observe(window, 'load', function() {
	if (!window.decadesArray) return;
	var inDecade = $('inDecade');
	var decadesSize = window.decadesArray.length;
	if (decadesSize < 2) { //hide the selDecade if there is only one Decade
		populateVolumeFromIndex(0);
		$('selDecade').style.display = 'none';
		reDrawIssueJump();
		return;
	}
	$('selDecade').style.display = 'block';
	for (var k = 0; k < decadesSize; k++) {
		var option = $(document.createElement("option"));
		option.value = k;
		option.innerHTML = window.decadesArray[k].label;
		inDecade.appendChild(option);
	}
	inDecade.observe('change', populateVolume);
});

function populateVolume(event) {
	var select = event.element();
	var index = select.value;

	// put a "loading" message in place until the volume pulldown is populated
	// also reset the Select Issue pulldown to prevent confusion
	// had to target the divs because Explorer doesn't handle innerHTML for <select> properly
	var volSelect = $('selVolume');
	var issSelect = $('selIssue');

	var issueJumpForm = $('issueJump');
	var inputDecade = issueJumpForm['inDecade'];
	if (index=="") {
		volSelect.innerHTML = '<select id="inVolume"><option>Select Volume</option></select>';
		issSelect.innerHTML = '<select id="inIssue"><option>Select Issue</option></select>';
	}
	else {
		volSelect.innerHTML = '<select id="inVolume"><option>Loading...</option></select>';
		issSelect.innerHTML = '<select id="inIssue"><option>Select Issue</option></select>';
	}

	populateVolumeFromIndex(index);
}

function populateVolumeFromIndex(index) {
	var decade = window.decadesArray[index];
	var journalCode = window.journalCode;
	if (!decade || ! journalCode) return;
	var volumeArray = decade.volumeArray;
	if (!volumeArray) {
		new Ajax.Request('/page/journal/decade.jsp?journalCode='+journalCode+'&key='+decade.key, {
		  method: 'get',
		  onSuccess: function(transport) {
              var json = transport.transport.responseText.evalJSON();
              if (json && json.volumeArray) {
		        window.decadesArray[index].volumeArray = json.volumeArray;
				populateVolumeFromIndex(index);
              }
		  }
		});
		return;
	}
	var volumeSize = volumeArray.length;
	var inVolume = $('inVolume');
	$('selVolume').style.display = 'block';
	inVolume.innerHTML = "";
	var option = document.createElement("option");
	option.innerHTML = "Select Volume";
	inVolume.appendChild(option);
	for (var k = 0; k < volumeSize; k++) {
		option = $(document.createElement("option"));
		option.value = k;
		option.decade = index;
		option.innerHTML = volumeArray[k][1];
		inVolume.appendChild(option);
	}
	inVolume.observe('change', populateIssue);
}

function populateIssue(event) {
	var select = event.element()
	var volumeIndex = select.value;
	var options = select.options;
	var found = false;
	var decadeIndex = 0;
	for (var k = 0; (k < options.length && !found); k++) {
		found = options[k].selected;
		decadeIndex = options[k].decade;
	}
	populateIssueFromIndex(decadeIndex, volumeIndex);
}
function populateIssueFromIndex(decadeIndex, volumeIndex) {
	var decade = window.decadesArray[decadeIndex];
	var volumeArray = decade.volumeArray[volumeIndex];
	var issues = volumeArray[2];//issue Arrays
	if (issues.length == 0) {
		return;
	}

	if (issues.length == 1 && decade.volumeArray.length == 1 && window.decadesArray.length == 1) {
		//if this issue is the only issue of this journal in the current area
		$('selIssue').style.display = 'none';
		reDrawIssueJump();
		return;
	}
	var inIssue = $('inIssue');

	inIssue.innerHTML = "";
	var option = document.createElement("option");
	option.innerHTML = "Select Issue";
	inIssue.appendChild(option);
	for (var k = 0; k < issues.length; k++) {
		option = $(document.createElement("option"));
		option.value = '/toc/' + journalCode + '/' + volumeArray[0] + '/' + issues[k][0];//the first one is issue#
		var pageRange = issues[k][1];
		if (pageRange && pageRange.length != 0){
			pageRange = "/("+pageRange+")";
		}
		option.innerHTML = 'Iss. '+ issues[k][0] + pageRange;//second value is label
		inIssue.appendChild(option);
	}
}

function respondToClick() {
	var issueJumpForm = $('issueJump');
	var inputIssue = issueJumpForm['inIssue'];
	if ($F(inputIssue) == "" || $F(inputIssue) == "Select Issue") {
		alert('Please select both a Volume and Issue before clicking the "Go" button.');
		return false;
	}
	window.location = $F(inputIssue)
}

function reDrawIssueJump() {
	var e = $('issueJump');
	e.hide();
	e.show();
}

/* Normal/Mobile Toggle Site Function */
function useSite(type) {
	if (type=="mobile") createCookie('useMobile','yes',0);
	else createCookie('useMobile','no',0);
	window.location.reload();
}



/* ========= GRID/PRINT VIEW FUNCTIONS ============= */

function submitGridArticles(formID,action) {
	var aForm = $(formID);
	submitMultiArticles(aForm, action, false);
}

var fetchAbstract = null;
function getAbstractText(doi) {
	var absLink = "/doi/abs/" + doi;
	if (fetchAbstract != null) fetchAbstract.abort();
	fetchAbstract = new Ajax.Request(absLink, {
		method: 'get',
		onSuccess: function(page) {
			var abstractText = page.responseText;
			var noAbs = '<div class="small" style="text-align:left;padding-top: 15px;">An abstract is not available for this content.</div>';
			var absBoxes = new Array();

			// strip out scripts to prevent them from messing up the pattern searches below
			abstractText = abstractText.stripScripts();
			// branch for Chem. Reviews abstract pages
			if (abstractText.include('<div id="titleResultsLayer"')) {
				abstractText = abstractText.sub(/^[\s,\S]*(<div id="titleResultsLayer">[\s,\S]*?<\/div>)[\s,\S]*$/m , '#{1}');
				abstractText = '<h4 class="alignLeft reallyPadTop">Table of Contents</h4>' + abstractText;
				$('focusBoxAbstract').innerHTML = abstractText;
			}
			// branch for Legacy Archives
			else if (abstractText.include('<div id="firstPage"')) {
				abstractText = abstractText.sub(/^[\s,\S]*increase image size[\s,\S]*<\/span>(.*?<img.*?firstPageImage")[\s,\S]*$/m , '#{1} width="740" style="margin: 7px 0; border: 1px solid #333;" \/>');
				$('focusBoxAbstract').innerHTML = abstractText;
			}
			// check for multiple #abstractBoxes - more than one means it's a multi-part article like Chem. Bio. Spotlights
			else {
				abstractText.scan('id="abstractBox"', function(match){ absBoxes.push(match[0])});
				if (absBoxes.length == 1) {
					// book chapters
					if (doi.include('/bk-') || doi.include('/ba-')) {
						abstractText = abstractText.sub(/^[\s,\S]*(<div id="abstractBox">[\s,\S]*)<p class="smaller clearBoth viewLinks">[\s,\S]*$/m , '#{1}');
						$('focusBoxAbstract').innerHTML = abstractText;
					}
					// normal journal TOCs
					else {
						abstractText = abstractText.sub(/^[\s,\S]*(<div id="abstractBox">[\s,\S]*)<div class="bottomViewLinks">[\s,\S]*$/m , '#{1}');
						$('focusBoxAbstract').innerHTML = abstractText;
					}
				}
				else { // multi-part articles: report No Abstract
					$('focusBoxAbstract').innerHTML = noAbs;
				}
			}
		},
		onComplete: function() {
			pageTracker._trackEvent('tocView', 'Fetched Abstract'); // GA event tracking
			fetchAbstract = null;
		}
	});
}

function highlightLastArticle(currentDoi) {
	// stop loading in toc thumbnails (for performance)
	if (readCookie('thumbs') != "hide") Event.stopObserving(window,'scroll',loadThumbnailsA);
	// find the current focused article's DOI and determine its position in the page's article array
	var currentArticle = doiArray.indexOf(currentDoi);
	// identify the article box that matches the focused article
	currentArticle = $(formArticles[currentArticle]).parentNode.parentNode.parentNode;
	// and then let the user know where he left off
	Effect.ScrollTo($(currentArticle), { offset: -20 });
	new Effect.Highlight($(currentArticle), {
		duration: 2,
		queue: 'end',
		afterFinish: function() {
			$$('body')[0].removeClassName('hideFlash');
			// resume thumbnail loading
			if (readCookie('thumbs') != "hide") {
				loadThumbnailsA();
				Event.observe(window,'scroll',loadThumbnailsA);
			}
		}
	});
}

keyboardFocusNav = function(e) {
	if (!e) var e = window.event;
	if (e.keyCode == "37") {
		var prev = $('prevFocus');
		new Effect.Highlight(prev, { startcolor: '#336699', endcolor: '#efefef', restorecolor: '#efefef', duration: '0.2' });
		gotoFocusArticle(prev,"prev");
	}
	else if (e.keyCode == "39") {
		var next = $('nextFocus');
		new Effect.Highlight(next, { startcolor: '#336699', endcolor: '#efefef', restorecolor: '#efefef', duration: '0.2' });
		gotoFocusArticle(next,"next");
	}
	else if (e.keyCode == "27") showAbstractLayer(e);
	// prevent scrolling the page with spacebar and arrows in Firefox
	else if (e.keyCode == "38" || e.keyCode == "40" || e.keyCode == "32") e.preventDefault();
}

var numberChecked = null;
var focusCheckbox = null;

function populateActions(doi) {
	var form = formArticles[0].up('form');
	if (numberChecked==null) {
		numberChecked=0;
		var max=doiArray.length;
		for (var count=0; count < max; count++) {
			if (eval("form.doi[" + count + "].checked") == true) {
				numberChecked++;
			}
		}
	}
	var line1 = '<div><a href="#" onclick="submitGridArticles(' + form.identify() + ',\'/action/showMultipleAbstracts\');return false;"><img src="/templates/jsp/_style2/_achs/images/viewAbs.png" alt="View abstracts of selected articles" /></a> <a href="#" onclick="submitGridArticles(' + form.identify() + ',\'/action/showCitFormats\');return false;"><img src="/templates/jsp/_style2/_achs/images/downCit.png" alt="Download citations of selected articles" /></a></div>';
	var line2 = '<div><input id="actionsCheckbox" type="checkbox" onclick="selectFocusBoxArticle(\'' + doi + '\');" /> <span id="numberChecked">' + numberChecked + '</span> <span>articles selected for actions above</span></div>';
	$('articleActions').innerHTML = line1 + line2;
	readFocusBoxArticle(doi);
}
function readFocusBoxArticle(doi) {
	// pick out the actual article checkbox
	focusCheckbox = doiArray.indexOf(doi);
	focusCheckbox = formArticles[focusCheckbox];
	// is the checkbox checked or not?
	if (focusCheckbox.checked==true) {
		$('actionsCheckbox').writeAttribute('checked');
	}
}
function selectFocusBoxArticle(doi) {
	if (focusCheckbox.checked==false) {
		focusCheckbox.checked=true;
		numberChecked++;
	}
	else {
		focusCheckbox.checked=false;
		numberChecked--;
	}
	$('numberChecked').innerHTML = numberChecked;
	var box = $('tocArticles').select('input')[0];
	evalAll(box);
}

function showAbstractLayer(e) {
	var container,winHeight,winWidth,focusLeft,focusTop,target,articleBox,focusBox;
	if (!e) var e = window.event;
	if (e.target) target = e.target;
	container = $('container');

	// assign target to the clicked articleBox
	if ($(target).hasClassName('articleBox')) articleBox = target;
	else articleBox = $(target).up('.articleBox');

    if (articleBox && 'tocArticles' != $(articleBox).up('form').id) articleBox = undefined;

	// target won't be assigned to an article box if user clicked on something that isn't an article box
	// if that's the case, close the Abstract Viewer if it's open
	// unless the user has clicked on the close button in Abstract Viewer
	if (articleBox==undefined || $('fb-wrap')) {
		if ($('fb-wrap')) {
			focusBox = $('fb-wrap');
			if ((target.descendantOf(focusBox) && target.hasClassName('close')) || (target.identify()!="fb-wrap" && !target.descendantOf(focusBox))) {
				e.preventDefault(); // prevent following links that are outside of focusBox
				var currentDoi = $(focusBox).select('input')[0].value;

				document.body.style.overflow="auto";
				Event.stopObserving(document,'keydown',keyboardFocusNav);
				if (fetchAbstract != null) fetchAbstract.abort();
				numberChecked = null;
				focusCheckbox = null;
				$(focusBox).remove();
				highlightLastArticle(currentDoi);
				$('bgWhite').fade({afterFinish: function(){
					$('bgWhite').remove();
				}});
			}
			return;
		}
		else return;
	}

	// allow for selecting of checkboxes without activating the Abstract Viewer
	if ($(target).readAttribute('name')=="doi") return;
	e.preventDefault(); // prevent following article links straight from the grid

	// remove flash ads because they screw up the Abstract Viewer
	$$('body')[0].addClassName('hideFlash');

	// add white overlay to page
	var bg = '<div id="bgWhite" style="display:none;">&nbsp;</div>';
	$$('body')[0].insert(bg);
	$('bgWhite').appear({to:0.85});

	// disable body scrolling
	document.body.style.overflow="hidden";

	// dynamically set dimensions for the Abstract Viewer
	fBoxHeight = document.viewport.getHeight() - 180;
	if (fBoxHeight > 700) fBoxHeight = 700;
	fContentHeight = fBoxHeight + 60;
	winWidth = document.viewport.getWidth();
	focusTop = document.viewport.getScrollOffsets()[1] + 30;
	focusLeft = winWidth/2 - 378;

	var doi = $(articleBox).select('input')[0].value;
	// if user has thumbnails disabled, need to create these global variables
	if (!window.formArticles) {
		formArticles = $(target).up('form').getInputs('checkbox','doi');
		allFormArticles = formArticles.length;
	}
	// create a global array of all the page's articles' DOIs
	doiArray = formArticles.pluck('value');
	// find the current focused article's DOI and determine its position in the page's article array
	var currentArticle = doiArray.indexOf(doi) + 1;

	// generate HTML for the Abstract Viewer and insert it onto the page
	focusBox='<div id="fb-wrap" style="top:'+ focusTop + 'px; left:' + focusLeft + 'px; height:' + fBoxHeight + 'px;"><div id="focusBox"><a class="close" href="#" title="Close">Close<\/a><div id="focusNav"><a id="prevFocus" href="#" onclick="gotoFocusArticle(this,\'prev\');return false;" title="View previous abstract"><span>&larr;<\/span><\/a><a id="nextFocus" href="#" onclick="gotoFocusArticle(this,\'next\');return false;" title="View next abstract"><span>&rarr;<\/span><\/a><div id="focusCounter"><span id="fnCurrent">' + currentArticle + '<\/span> of ' + allFormArticles +'<\/div><\/div><div id="focusBoxContent" style="height:' + fContentHeight + 'px;"><div id="focusBoxTOCContent">' + articleBox.innerHTML + '<\/div><div id="focusBoxAbstract"><\/div><\/div><div id="articleActions"></div><\/div></div>';
	$$('body')[0].insert(focusBox);
	$('focusBoxAbstract').innerHTML = '<img src="/templates/jsp/_style2/_achs/images/loading.gif" style="padding-top: 100px;" \/>';

	// Call function that grabs the abstract and puts it into #focusBoxAbstract
	getAbstractText(doi);

	// Call function that fills in #articleActions
	populateActions(doi);

	// observe key presses: arrow keys for navigation, esc for close, and disable up, down, and space bar
	Event.observe(document,'keydown',keyboardFocusNav);
}

function toggleTOCGraphics(checkbox) {
	if (checkbox.checked) {
		// load graphics
		var wrap, tray, figBox, nav, img, doi, doiFigure;
		// show thumbnails for articles that are above the bottom threshold
		for (var count=0; count < allFormArticles; count++) {
			if (loopedArts[count] == 1) continue; // stop if the article has already been through the loop
			loopedArts[count] = 1; // set to 1 so that we can ignore this article if it gets put into the loop again
			wrap = formArticles[count].parentNode.parentNode;
			doi = formArticles[count].value;
			doiFigure = getDoiFigures(doi);
			if (doiFigure) {
				tray = $(wrap).select('div.figureTray')[0];
				tray.style.display="block";
				figBox = $(tray).select('div.figureBox')[0];
				figBox.style.display = "block";
				img = $(figBox).select('img')[0];
				updateFigImg(doiFigure, 0, img);
				nav = $(tray).select('div.figureNav')[0];
				setupNextPrev(nav, doiFigure, 0);
			}
		}

		// insert updated CSS rules to display figures
		var newStyles = 'body.print .figureTray-wrap {display: block !important;} body.print #container .figureTray { display:block !important;} #linkToTop { display: none !important; }';
		var newStyleTag;
		if (Prototype.Browser.IE) { // stupid method for ie of course
			newStyleTag = new Element("style", { type: "text/css", id: "showGraphicsCSS" });
			$$('head')[0].insert(newStyleTag);
			newStyleTag.styleSheet.cssText = newStyles;
		}
		else {
			newStyleTag = '<style id="showGraphicsCSS" type="text/css">'+newStyles+'</style>';
			$$('head')[0].insert(newStyleTag);
		}
		$('imageSizeRadios').style.display="block"; // show image size selectors
		pageTracker._trackEvent('tocView', 'Print View: Graphics Loaded'); // GA event tracking
	}
	else {
		$('imageSizeRadios').style.display="none";
		$('showGraphicsCSS').remove();
	}
}
function changePrintImageSize(size) {
	if (size == "norm") {
		var newStyles = 'body.print .articleFigure img.tocGraphic {max-height:none;max-width:none;}';
		var newStyleTag;
		if (Prototype.Browser.IE && !$('largeTOCimages')) { // stupid method for ie of course
			newStyleTag = new Element("style", { type: "text/css", id: "largeTOCimages" });
			$$('head')[0].insert(newStyleTag);
			newStyleTag.styleSheet.cssText = newStyles;
		}
		else if (!$('largeTOCimages')) {
			var newStyleTag = '<style id="largeTOCimages" type="text/css">'+newStyles+'</style>';
			$$('head')[0].insert(newStyleTag);
		}
	}
	else if ($('largeTOCimages')) $('largeTOCimages').remove();
}

function showPrintView(button, event){
    var casId = $$("div.NLM_citation.current")[0];
    var copyright = "Copyright &copy; " +(new Date).getFullYear() + " American Chemical Society(ACS). All Rights Reserved";
    if($(casId).innerHTML.indexOf("PubMed") != -1) {
        copyright = "MEDLINE &reg; : is produced by the U.S. National Library of Medicine. MEDLINE is a registered trademark of the U.S. National Library of Medicine.";
    }
    var printWindow=window.open('','','');
    printWindow.document.write('<!DOCTYPE HTML><html><head>' +$$('head')[0].innerHTML + '</head><body class="casPrint">' +
        '<div id="printInfoLayer"><div class="centered">' +
        '<a class="rButton w150 marginSides10" style="display:inline;" href="javascript:void(0)" onclick="window.print();window.location.reload();return false;">Print Page</a>' +
        '</div></div>' +
        '<div id="printCas"><div class="banner">Reference QuickView</div>'+$(casId).innerHTML +
        '<div class="casFooter">'+copyright+'</div></div>' +
    '</body></html>');
}

function changeTOCView(button,type) {
	var body = $$('body')[0];
	var canvas = $('articleArea');

	if (!window.formArticles) {
		if ($('tocArticles')) var form = $('tocArticles');
		formArticles = form.getInputs('checkbox','doi');
		allFormArticles = formArticles.length;
		loopedArts = new Array(allFormArticles);
	}

	if (type=="list") {
		if ($(button).hasClassName('selected')) return;
		canvas.hide();
		if (body.hasClassName('grid')) {
			body.removeClassName('grid');
			Event.stopObserving(document,"click",showAbstractLayer);
		}
		if (body.hasClassName('print')) body.removeClassName('print');
		new Effect.Appear($(canvas));
		createCookie('tocView','',365); // set cookie to have list view as default
        _gaq.push(['_trackEvent', 'tocView', 'List View Set']); // GA event tracking
	}
	else if (type=="grid") {
		if ($(button).hasClassName('selected')) return;
		canvas.hide();
		if (body.hasClassName('print')) body.removeClassName('print');
		body.addClassName('grid');
		Event.observe(document,"click",showAbstractLayer);
		new Effect.Appear($(canvas), { afterFinish: function() {
			if (readCookie('thumbs') != "hide") loadThumbnailsA();
		}});
		createCookie('tocView','grid',365); // set cookie to have grid view as default
        _gaq.push(['_trackEvent', 'tocView', 'Grid View Set']); // GA event tracking
		if (Prototype.Browser.IE) {
			if (iesux() < 8) {
				$('ie7notice').style.display="block";
			}
		}
	}
	else if (type=="print") {
		canvas.hide();
		if (body.hasClassName('grid')) {
			body.removeClassName('grid');
			Event.stopObserving(document,"click",showAbstractLayer);
		}
		body.addClassName('print');
        var printInfoLayer = '<div id="printInfoLayer"><div class="centered"><a class="rButton w150 marginSides10" style="display:inline;" href="#" onclick="window.print(); _gaq.push([\'_trackEvent\', \'tocView\', \'Print Button Pressed\']); return false;">Print Page</a><a class="rButton w200" style="display:inline;background:#999;border-color:#666;" href="#" onclick="changeTOCView(this,\'closePrint\');return false;">Leave Print View</a><label for="incGraphics"><input id="incGraphics" type="checkbox" onclick="toggleTOCGraphics(this);" /> <span>Include Graphics</span></label><div id="imageSizeRadios" style="display:none;margin-top: 5px;"><span class="small">Graphics Size:</span> <label class="radios" for="smallTOCfigs"><input type="radio" id="smallTOCfigs" name="figsize" onclick="changePrintImageSize(\'small\');" checked="checked" /><span>Small</span></label><label class="radios" for="normTOCfigs" onclick="changePrintImageSize(\'norm\');"><input type="radio" id="normTOCfigs" name="figsize" /><span>Large (if available)</span></label></div></div>';
		body.insert({ top: printInfoLayer });
		// insert a print stylesheet to hide the interaction layer from the printout
		var printCSSstyles = '#printInfoLayer { display: none; }';
		var printCSSstylesTag;
		if (Prototype.Browser.IE) { // stupid method for ie of course
			printCSSstylesTag = new Element("style", { type: "text/css", id: "printCSS", media: "print" });
			$$('head')[0].insert(printCSSstylesTag);
			printCSSstylesTag.styleSheet.cssText = printCSSstyles;
		}
		else {
			printCSSstylesTag = '<style id="printCSS" type="text/css" media="print">'+printCSSstyles+'</style>';
			$$('head')[0].insert(printCSSstylesTag);
		}
		new Effect.Appear($(canvas));
        _gaq.push(['_trackEvent', 'tocView', 'Print View Displayed']); // GA event tracking
	}
	else if (type="closePrint") {
		body.removeClassName('print');
		if ($('showGraphicsCSS')) {
			$('showGraphicsCSS').remove();
			// prevent thumbs from displaying if user has chosen to hide thumbnails
			if (readCookie('thumbs') == "hide") body.addClassName('noThumbs');
		}
		if ($('largeTOCimages')) $('largeTOCimages').remove();
		$('printInfoLayer').remove();
		type = readCookie('tocView');
		if (type == "grid") changeTOCView($('gridView'),'grid');
		else changeTOCView($('listView'),'list');
	}
	// update buttons
	$(button).siblings().each(function(n) { n.removeClassName('selected'); });
	if (button != $('printView')) button.addClassName('selected');
}

function gotoFocusArticle(navLink,direction) {
	var focusBox = $(navLink).up(1);
	var currentDoi = $(focusBox).select('input')[0].value;
	var newArticle, newArticleDoi;
	var focusBoxAbstract = $('focusBoxAbstract');

	// find the current focused article's DOI and determine its position in the page's article array
	var currentArticle = doiArray.indexOf(currentDoi);

	// alert if at the beginning of the page's article array
	if (direction == "prev" && currentArticle == 0) {
		$('fb-wrap').shake();
		setTimeout("alert('You are at the beginning of the list of articles on this page.')",800);
		return;
	}
	// alert if at the beginning of the page's article array
	if (direction == "next" && currentArticle+1 == allFormArticles) {
		$('fb-wrap').shake();
		setTimeout("alert('You are at the end of the list of articles on this page.')",800);
		return;
	}

	// Clear the abstract out of the box
	focusBoxAbstract.innerHTML = '<img src="/templates/jsp/_style2/_achs/images/loading.gif" alt="loading" style="padding-top: 100px;" \/>';

	// Load Previous Article
	if (direction == "prev") {
		currentArticle = currentArticle - 1;
		newArticle = $(formArticles[currentArticle]).up(2).innerHTML;
		newArticleDoi = doiArray[currentArticle];
		$('focusBoxTOCContent').innerHTML = newArticle;
	}
	// Load Next Article
	else {
		currentArticle = currentArticle + 1;
		newArticle = $(formArticles[currentArticle]).up(2).innerHTML;
		newArticleDoi = doiArray[currentArticle];
		$('focusBoxTOCContent').innerHTML = newArticle;
	}

	// Update the counter display
	$('fnCurrent').innerHTML = currentArticle + 1;

	// Call function that grabs the abstract and puts it into #focusBoxAbstract
	getAbstractText(newArticleDoi);

	// Call function that fills in #articleActions
	populateActions(newArticleDoi);
}

/* ==== generate HTML from pubs.acs.org-hosted RSS feed ==== */
function RSStoHTML(xmlURL, numItems, divID, options) {
    var defaults, o, xmlAjaxRequest;
    defaults = {
        'showTitle': true,
        'linkTitle': true,
        'showDate': true,
        'showAuthor': false,
        'showDescription': false
    };
    options = options || {};
    for (o in defaults){
        if (defaults.hasOwnProperty(o) && !options.hasOwnProperty(o)) {
            options[o] = defaults[o];
        }
    }
    xmlAjaxRequest = new Ajax.Request(xmlURL, {
        method: "get",
        asynchronous: false,
        onSuccess: function (transport) {
            var date, ffbLI, ffbUL, ffb, i, items, xml;
            items = transport.responseXML.getElementsByTagName('item');
            ffbUL = new Element('ul');
            function getXMLNodeValue(tagName) {
                var tag, child, value;
                if (items[i].getElementsByTagName(tagName).length) {
                    tag = items[i].getElementsByTagName(tagName)[0];
                    if (tag.childNodes.length) {
                        child = tag.childNodes[0];
                        value = child.nodeValue;
                    }
                }
                return value;
            }
            for (i = 0; (i < items.length && i < numItems); i += 1) {
                xml = {
                    url: getXMLNodeValue('link'),
                    title: getXMLNodeValue('title'),
                    fescription: getXMLNodeValue('description'),
                    suthor: getXMLNodeValue('creator'),
                    date: new Date(getXMLNodeValue('pubDate')),
                    ffbLI: new Element('li')
                };
                if (options.showTitle && !options.linkTitle) {
                    ffbLI.insert({
                        'top': new Element('span', {'class': 'headline'}).update(xml.title)
                    });
                } else if (options.showTitle && options.linkTitle) {
                    ffbLI.insert({
                        'top': new Element('span', {'class': 'headline'}).update(
                            new Element('a', {href: xml.url, onclick: "_gaq.push(['_trackEvent', 'CEN Feed', '" + divID + "', '" + xml.url + "']); setTimeout(function() {this.location='" + xml.url + "'}, 100); return false;"}).update(xml.title)
                        )
                    });
                }
                if (options.showDate) {
                    ffbLI.insert({
                        'bottom': new Element('p', {'class': 'date'}).update(
                            xml.date.toDateString().replace(
                                /\w{3} ([\s\w]*) (\d{4})$/, "$1, $2"
                            ).replace(
                                /^Jan\b/, 'January'
                            ).replace(
                                /^Feb\b/, 'February'
                            ).replace(
                                /^Mar\b/, 'March'
                            ).replace(
                                /^Apr\b/, 'April'
                            ).replace(
                                /^Jun\b/, 'June'
                            ).replace(
                                /^Jul\b/, 'July'
                            ).replace(
                                /^Aug\b/, 'August'
                            ).replace(
                                /^Sep\b/, 'September'
                            ).replace(
                                /^Oct\b/, 'October'
                            ).replace(
                                /^Nov\b/, 'November'
                            ).replace(
                                /^Dec\b/, 'December'
                            )
                        )
                    });
                }
                if (options.showAuthor) {
                    ffbLI.insert({'bottom': new Element('p', {'class': 'author'}).update(xml.author)});
                }
                if (options.showDescription) {
                    ffbLI.insert({'bottom': new Element('p', {'class': 'description'}).update(xml.description)});
                }
                ffbUL.insert({'bottom': ffbLI});
            }
            ffb = $(divID).update(ffbUL);
        }
    });
}

/* ==== return to top link ==== */
backToTop = function() {
	var offset = document.viewport.getScrollOffsets()[1];
	var winWidth = document.viewport.getWidth();
	var winHeight = document.viewport.getHeight();
	var viewportBottom = offset + winHeight;
	var linkTrigger = winHeight * 2;
	var linkToTop = '<a id="linkToTop" style="display:none;" title="Return to top" href="#" onclick="new Effect.ScrollTo(\'container\');return false;">&nbsp;<\/a>';

	// insert link to top when scrolled past 2x the viewport height
	// only show it if the user's window is big enough (<1110px)
	if ($('linkToTop') && $('linkToTop').style.display != "none") {
		if (winWidth < 1110) $('linkToTop').remove();
		else if (viewportBottom < linkTrigger) $('linkToTop').fade();
	}
	else if (winWidth > 1110 && viewportBottom > linkTrigger) {
		if (!$('linkToTop')) $('container').insert(linkToTop);
		$('linkToTop').appear({to:0.8});
	}
}
new PeriodicalExecuter(backToTop,1);


// ---NAMESPACED VARIABLES---

// Follow Hub Page tab switching, eAlerts interface, and YouTube thumbnail loading
var FollowHubPage = {
    playlistIdList: {
        '6544210348021339': 'pub-101-thumb',
        'DEE0898E6A1CE852': 'jpc-letters-thumb',
        'F6C85552A9E8ABAF': 'est-papers-thumb',
        '0B0463FE8B72C36E': 'est-contest-thumb',
        'AE6615DD20D553C6': 'acs-on-campus-thumb'
    },

    updateYouTubeThumb: function(response) {
        try {
            for (var t = 0; t < response.feed.entry[0].media$group.media$thumbnail.length; t++) {
                if (-1 != response.feed.entry[0].media$group.media$thumbnail[t].yt$name.indexOf('hq')) {
                    $(FollowHubPage.playlistIdList[response.feed.yt$playlistId['$t']]).up('a').href = 'http://www.youtube.com/user/AmerChemSoc#g/c/' + response.feed.yt$playlistId['$t'];
                    $(FollowHubPage.playlistIdList[response.feed.yt$playlistId['$t']]).src = response.feed.entry[0].media$group.media$thumbnail[t].url;
                }
            }
        }
        catch(e) {
            console.log(FollowHubPage.playlistIdList);
        }
    },

    hideAlertsLoginPane: function() {
        $('registerAlerts').addClassName('live');
        $('register-alerts-login').removeClassName('live');
    },

    showAlertsLoginPane: function () {
        $('registerAlerts').removeClassName('live');
        $('register-alerts-login').addClassName('live');
    },

    testAlertsLogin: function () {
        var settingsAjaxRequest;
        if (ACSPubs && ACSPubs.user && ACSPubs.user.email) {
            settingsAjaxRequest = new Ajax.Request('/action/showAlertSettings', {
                onComplete: FollowHubPage.parseAlertsForm
            });
            FollowHubPage.hideAlertsLoginPane();
        }
        else {
            FollowHubPage.showAlertsLoginPane();
        }
    },

    parseAlertsForm: function (request) {
        var i, inputs, selections = [], value;
        checkedBoxes = request.responseText.replace(/(\r|\n)/g, '').match(/<input[^>]+checked="checked"[^>]*>/igm);
        for (var i = 0; i < checkedBoxes.length; i++) {
            var value = checkedBoxes[i].match(/value="([^"]+)"/);
            if (value && value.length > 1) selections.push(value[1]);
        }

        inputs = $('registerAlerts').getInputs().each(function(input) {
            if (-1 != selections.indexOf(input.value)) input.writeAttribute({checked: 'checked'});
            else input.removeAttribute('checked');
        });
    },

    submitEAlertsForm: function () {
        $('registerAlerts').request({
            onComplete: function (x) {
                var fadeEffect;
                $('register-alerts-response').update('Your e-Alerts preferences have been updated.').addClassName('live');
                FollowHubPage.parseAlertsForm(x);
                fadeEffect = new Effect.Fade('register-alerts-response', {
                    delay: 4,
                    afterFinish: function () {
                        $('register-alerts-response').removeClassName('live').style.display = '';
                    }
                });
            },
            onException: function (x) {
                var fadeEffect;
                $('register-alerts-response').update('Sorry, there was a problem processing your preferences. Please reload the page to confirm that you are still logged in and try again.').addClassName('live');
                fadeEffect = new Effect.Fade('register-alerts-response', {
                    delay: 4,
                    afterFinish: function () {
                        $('register-alerts-response').removeClassName('live').style.display = '';
                    }
                });
            },
            onFailure: function (x) {
                var fadeEffect;
                $('register-alerts-response').update('Sorry, there was a problem saving your preferences. Please reload the page to confirm that you are still logged in and try again').addClassName('live');
                fadeEffect = new Effect.Fade('register-alerts-response', {
                    delay: 4,
                    afterFinish: function () {
                        $('register-alerts-response').removeClassName('live').style.display = '';
                    }
                });
            }
        });
    },

    initialize: function() {
        $$('#follow-tabs a').each(function(a) {
            a.observe('click', function(e) {
                $$('div.follow-pane').invoke('removeClassName', 'current');
                $$('#follow-tabs a').invoke('removeClassName', 'current');
                var liClass = e.findElement().addClassName('current').up('li').className;
                $('follow-pane-' + liClass).addClassName('current');
            });
        });

        var followPaneClass = document.location.toString().split('#').pop();
        if (-1 == followPaneClass.indexOf('/')) {
            $$('div.follow-pane').invoke('removeClassName', 'current');
            $$('#follow-tabs a').invoke('removeClassName', 'current');
            $$('#follow-tabs li.' + followPaneClass + ' a')[0].addClassName('current');
            $('follow-pane-' + followPaneClass).addClassName('current');
        }
        FollowHubPage.testAlertsLogin();
    }
};

// Object used by video hub pages (namely, JPC) for carousel topic viewer
videoCollectionBrowser = {
    busy: false,
    setFrameWidth: function(){
        var containerWidth = $('videoFrame').getWidth() * $$('#videoContainer li').length;
        $('videoContainer').setStyle({width:containerWidth + 'px'});
    },
    updateVideosSubject: function(subjectIndex) {
        //	Count the videos in this subject and enumerate them within the total count
        //	expressed as a range (5-9 of 28).
        var allVideos = $$('#videoContainer .videoBox');
        var allSubjects = $$('#videoContainer .videoGroup');
        var currentSubjectCount = allSubjects[subjectIndex].select('.videoBox').length;
        var previousSubjectCount = 0;
        for (var i = 0; i < subjectIndex; i++) {
            previousSubjectCount += allSubjects[i].select('.videoBox').length;
        }
        $('videoSubjectRange').innerHTML = (1 + previousSubjectCount) + '-' + (previousSubjectCount + currentSubjectCount) + ' of ' + allVideos.length;
        $$('#videoSubjectHeader select')[0].selectedIndex = subjectIndex;
    },
    changeSubject: function(direction, absolute){
        this.busy = true;
        var frameWidth = $('videoFrame').getWidth() - 2;	// computed width minus 2 to account for borders (777-2 = 775)
        var currentLeft = parseInt($('videoContainer').getStyle('left'));

        var subjectLimit = $$('#videoContainer li').length - 1;
        var subjectIndex = Math.abs(Math.floor(currentLeft / frameWidth));

        var liHeight = parseInt($$('#videoContainer .videoGroup .videoBox').first().getStyle('height')) + 30;	// each videoBox has margin:15px

        var currentLiCount = $$('#videoContainer .videoGroup')[subjectIndex].select('.videoBox').length;
        var currentHeight = $('videoFrame').getHeight();

        if (!absolute && ((subjectIndex >= subjectLimit && direction > 0) || (subjectIndex <= 0 && direction < 0))) {
            this.busy = false;
            return;
        }

        var nextSubjectIndex;
        if (absolute) nextSubjectIndex = direction;
        else nextSubjectIndex = subjectIndex + direction;

        if (nextSubjectIndex < $$('#videoContainer .videoGroup').length) {
            var newLiCount = $$('#videoContainer .videoGroup')[nextSubjectIndex].select('.videoBox').length;
            var newHeight = liHeight * newLiCount;
            var scalePercentage = 100 * newHeight / currentHeight;

            new Effect.Move(
                $('videoContainer'),
                {
                    x:(subjectIndex - nextSubjectIndex) * frameWidth,
                    y:0, mode:'relative',
                    afterFinish: function() {
                        var i = nextSubjectIndex;
                        return function() {
                            videoCollectionBrowser.updateVideosSubject(i);
                        }
                    }()
                }
            );
            new Effect.Scale(
                $('videoFrame'),
                scalePercentage,
                {
                    scaleX:false,
                    scaleY:true,
                    scaleContent:false,
                    afterFinish: function() {
                        videoCollectionBrowser.busy = false;
                    }
                }
            );
        } else videoCollectionBrowser.busy = false;
    },
    nextSubject: function(){
        if (!this.busy) this.changeSubject(1);
    },
    previousSubject: function(){
        if (!this.busy) this.changeSubject(-1);
    },
    gotoSubject: function(subject){
        if (!this.busy) this.changeSubject(subject, true);
    }
};


//	--- DOCUMENT ONLOAD FUNCTIONS ---

// For the navigation dropdown menus and Related Content hovers:
// script to make IE to recognize hover state over list items
// borrowed from the "Suckerfish Dropdowns"
// (www.alistapart.com/articles/dropdowns)
startList = function() {
    if (Prototype.Browser.IE) {
        if (iesux() == 6) {
            // for dropdown nav
            if ($('nav')) {
                navRoot = $('nav');
                for (var i=0; i<navRoot.childNodes.length; i++) {
                    node = navRoot.childNodes[i];
                    if (node.nodeName=="LI") {
                        node.onmouseover=function() {
                            this.className+=" over";
                        };
                        node.onmouseout=function() {
                            this.className=this.className.replace(" over", "");
                        };
                    }
                }
            }
            // for Related Content hovers and
            if ($('relatedArticles')) {
                rcRoot = $('relatedArticles');
                for (var i=0; i<rcRoot.childNodes.length; i++) {
                    node = rcRoot.childNodes[i];
                    if (node.nodeName=="LI") {
                        node.onmouseover=function() {
                            this.className+=" over";
                        };
                        node.onmouseout=function() {
                            this.className=this.className.replace(" over", "");
                        };
                    }
                }
            }
            // for Cited By hovers
            if ($('citedBy')) {
                cbRoot = $('citedBy');
                for (var i=0; i<cbRoot.childNodes.length; i++) {
                    node = cbRoot.childNodes[i];
                    if (node.nodeName=="LI") {
                        node.onmouseover=function() {
                            this.className+=" over";
                        };
                        node.onmouseout=function() {
                            this.className=this.className.replace(" over", "");
                        };
                    }
                }
            }
        }
    }
};
document.observe("dom:loaded", startList);

function checkThumbCookie(){
    if (readCookie('thumbs') == "hide"){
        var body = $$('body')[0];
        body.addClassName('noThumbs');
    }
}

// SciFinder section population on page load
document.observe("dom:loaded", function() {
    checkThumbCookie()
    if (!$('casSection')) return;
    var sfAuthorsLayer = $('sfAuthorsLayer');
    if (sfAuthorsLayer) {
        Event.observe(sfAuthorsLayer, 'submit', function(e) {
            if (!sfAuthorsLayer.lastName.value) {
                alert("Last name is required!");
                e.stop();
            }
        });
    }
    var sfTopicLayer = $('sfTopicLayer');
    if (sfTopicLayer) {
        Event.observe(sfTopicLayer, 'submit', function(e) {
            if (!sfTopicLayer.topic.value) {
                alert("Topic is required!");
                e.stop();
            }
        });
    }
    if ($('missingTopic')) toggleSFinterfaceOnLoad('sfTopic');
    if ($('missingLastName')) toggleSFinterfaceOnLoad('sfAuthors');
    if (location.search.indexOf("issuetypefield=yes") != -1) {
        var cb = $('issuetypefield');
        if (cb) {
            cb.checked = true;
            toggleDateRange(cb);
        }
    }
    var counterIdsAll = $('counterIdsAll');
    if (counterIdsAll) {
        var markAll = function(event) {
            markAllcounterIds(counterIdsAll);
        };
        Event.observe(counterIdsAll, 'click', markAll);
        Event.observe(counterIdsAll, 'change', markAll);
    }
});

function prepareThumFromForm(form, ignoreScroll){
    if (!form) return;
    if (!form.doi) return;
    if (readCookie('thumbs') == "hide") {
        if ($('tocNav')) createIssueNav($('tocNav')); // for issue TOCs
        return false; // stop if user has opted to hide thumbnails
    }
    if (form.select('a.showThumbs')[0]) {
        if (readCookie('useMobile') == "yes") {
            form.select('a.showThumbs')[0].style.backgroundPosition="0px -50px"; // update Show/Hide Thumbnails button
        }
        else {
            form.select('a.showThumbs')[0].style.backgroundPosition="0px -18px"; // update Show/Hide Thumbnails button
        }
    }

    // create global variables
    formArticles = form.getInputs('checkbox','doi');
    allFormArticles = formArticles.length;
    loopedArts = new Array(allFormArticles);

    loadThumbnailsB(null, ignoreScroll);
    if ($('tocNav')) createIssueNav($('tocNav')); // for issue TOCs
    Event.observe(window,'scroll',loadThumbnailsA);
}
function prepareThumbFromTab(tab) {
    var form = $(tab).down('form');
    prepareThumFromForm(form);
}
function prepareThumbnails() {
    // branch for journal home pages
    if ($('justPublishedArticles') || $('currentIssueArticles')) {
        prepareThumbFromTab('justPublishedTab');
        return;
    }
    if ($('topCollectionArticles')){
        prepareThumFromForm($('topCollectionArticles'), true);
    }
    // other pages
    var form = $('tocArticles');
    prepareThumFromForm(form);
}
document.observe("dom:loaded", prepareThumbnails);

document.observe("dom:loaded", function() {
    var body = $$('body')[0];
    if (body.hasClassName('toc') || body.hasClassName('search')) {
        if (readCookie('tocView') == "grid") {
            body.addClassName('grid');
            $('listView').removeClassName('selected');
            $('gridView').addClassName('selected');
            Event.observe(document,"click",showAbstractLayer);
        }
    }
});

//  Click handling for ACS Journals dropdown in global nav

/*jslint browser: true */
/*globals $, $$, jQuery */

var ACSPubs = ACSPubs || {};
ACSPubs.nav = ACSPubs.nav || {};

ACSPubs.nav.toggleAZ = function (e) {
    var menu, tab, target;
    tab = jQuery('#pubsTopNav a#journalList');
    function hideMenu() {
        menu.removeClass('active');
        tab.removeClass('active');
    }
    if (e) {
        menu = jQuery('#pubsSelector');
        target = jQuery(e.target);
        menu.add(tab).off('mouseleave.journalList');
        menu.add(tab).off('mouseenter.journalList');
        if (0 === menu.filter(':visible').length) {
            tab.addClass('active');
            menu.addClass('active');
            menu.add(tab).on('mouseleave.journalList', function (e) {
                clearTimeout(ACSPubs.nav.toggleAZTimeout);
                ACSPubs.nav.toggleAZTimeout = setTimeout(function () {
                    hideMenu();
                }, 300);
            });
            menu.add(tab).on('mouseenter.journalList', function () {
                clearTimeout(ACSPubs.nav.toggleAZTimeout);
            });
            jQuery(document).on('click.journalList', function (e) {
                var target = jQuery(e.target);
                if (target.attr('id') !== 'pubsSelector' && target.parents('#pubsSelector').length) {
                    if (0 === target.filter('a').length) {
                        return false; 
                    }
                } else {
                    hideMenu();
                    jQuery(document).off('click.journalList');
                }
            });
        } else {
            hideMenu();
        }
    }
    return false;
};

jQuery(function () {
    jQuery('#pubsTopNav a#journalList').click(ACSPubs.nav.toggleAZ);
});


//  Click handling for display of QuickSearch label

/*jslint browser: true */
/*globals $, $$, jQuery */

jQuery(function () {
    jQuery('#qsSearchStringLabel span').css({display: 'block', position: 'absolute'});
    jQuery('#qsSearchString').focus(function (e) {
        jQuery('#qsSearchStringLabel span').css({visibility: 'hidden'});
    }).blur(function (e) {
        jQuery('#qsSearchStringLabel span').css({visibility: 'visible'});
    });
});



//	Code to try running at document load. Each step must test to see whether it's appropriate for the given page.
document.observe("dom:loaded", function() {

	//	Dynamically add the Website Demos button to the profile bar
	if ($('profile')) {
		var target = $('profile').getElementsByTagName('div')[0];
		var content = '  <a style="color: #fff; background: #ec8440; border: 1px solid #da6619; padding: 1px 3px; text-decoration: none; margin-left: 7px;" href="/page/demo/index.html">Website Demos</a>';
		$(target).insert({bottom: content});
	}
    //	End Website Demos button

	//	Find and parse JW Player parameters from #jwPlayerContainer if present
	jwPlayerParams = $$('div#jwPlayerContainer > form > input');
	if (jwPlayerParams.length) {
		jwBuilder = new JWPlayerBuilder(jwPlayerParams);
		jwBuilder.loadSWFs();

		// Check URL for related video request
		var queryStringStart = document.documentURI.indexOf('#') + 1;
		if (-1 != queryStringStart) {
			var queryString = document.documentURI.substr(queryStringStart);
			var params = queryString.split('&');
			for (var i = 0; i < params.length; i++) {
				if (params[i].length > 9 && -1 != params[i].indexOf('vidindex=')) {
					var vidIndex = params[i].split('=')[1];
					setTimeout(function(){jwplayer('jwPlayerContainer').playlistItem(vidIndex);}, 100);
					$$('#playlistLinkBox a').invoke('setStyle', {fontWeight: 'normal', color: '#369'});
					if ($('playlistLink' + vidIndex)) $('playlistLink' + vidIndex).setStyle({fontWeight: 'bold', color: '#9d0a0f'});
					break;
				}
			}
		}
	}
    // End JW Player loader

    //	Disqus Commenting Code
    //	Disqus Configuation Variables
    if ($('disqus_thread')) {
        var disqus_shortname = 'acspublications';
        var disqus_developer = 1;	// 0 turns off developer mode (URL must validate publically)

        // var disqus_identifier = 'unique_dynamic_id_1234';

        // Disqus Functions (Don't Edit)
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    }
    // End Disqus

    // First page image fix for legacy articles
    if ($('firstPage')) {
        var fpiTarget = $('firstPage').select('img')[0];
        var fpiTargetSrc = fpiTarget.readAttribute('src');
        if (fpiTargetSrc.endsWith('v03')) return false;
        else {
            fpiTargetSrc = fpiTargetSrc + "_v03";
            $(fpiTarget).writeAttribute('src',fpiTargetSrc);
        }
    }
    // End first page fix

    // Look for video collection browser and adjust videoContainer width if found
    if ($('videoCarouselFrame')) {
        videoCollectionBrowser.setFrameWidth();
        videoCollectionBrowser.changeSubject(0);
    }
    // End video collection browser

    // Follow Hub tab control and other onloads
    if (FollowHubPage && $('follow-tabs')) {
        FollowHubPage.initialize();
        followYouTubeCallback = FollowHubPage.updateYouTubeThumb;
        for (i in FollowHubPage.playlistIdList) {
            if (FollowHubPage.playlistIdList.hasOwnProperty(i)){
                $(document.body).insert({
                    bottom: new Element('script', {
                        type: 'text/javascript',
                        src: 'https://gdata.youtube.com/feeds/api/playlists/' + i + '?max-results=1&orderby=published&v=2&alt=json-in-script&callback=followYouTubeCallback'
                    })
});
            }
        }
    }
    // End Follow Hub

    // Footer Search Bar Functions
    $('footerSearchArrow').observe('click', function(e){
        e.stop();
        $('footerSearchArea').toggleClassName('active');
        return false;
    });

    $('footerSearchString').observe('focus', function(e){
        if ($('footerSearchString').getValue().match(/^(Search)?\s*(Anywhere|Titles|Authors|Abstracts)?$/)) {
            $('footerSearchString').setValue('');
            $('footerSearchString').addClassName('live');
        }
    });

    $$('#footerSearchArea li').each(function(item) {
        item.observe('click', function(e){
            var link = e.findElement('li').down('a');
            var buttonText = ' ' + link.innerHTML + 's';
            $('footerSimpleSearchArea').setAttribute('name', link.innerHTML.toLowerCase());
            if ($('footerSearchString').getValue().match(/^(Search)?\s*(Anywhere|Titles|Authors|Abstracts)?$/)) {
                if ('Anywhere' == link.innerHTML) buttonText = ' Anywhere';
                $('footerSearchString').setValue('Search' + buttonText);
                $('footerSearchString').removeClassName('live');
                $('footerSearchArea').toggleClassName('active');
            }
            if ('Advanced Search' == link.innerHTML) $('footerSearchString').setValue('Search Anywhere');
            else e.stop();
            if ('Anywhere' == link.innerHTML || 'Advanced Search' == link.innerHTML) {
                buttonText = '';
                $('footerSimpleSearchArea').setAttribute('name', 'searchText');
            }
            $$('#pageFooterLinks #footerSearchBox button')[0].update('Search' + buttonText);
            $('footerSearchString').focus();
            return false;
        })
    });

    $(document).observe('click', function(e) {
        var t = e.findElement();
        if ($('footerSearchArrow') != t) $('footerSearchArea').removeClassName('active');
    });

    //	  End Footer Search Bar Functions


    /*	Removing retracted article from most read list
     Prediction of Refractive Index of Polymers Using Artificial Neural Networks
     10.1021/je200071p
     Added 2011.07.29		*/
    if (-1 != document.location.pathname.split('/').indexOf('showMostReadArticles')) {
        $$('div.articleBox').each(function(box){
            if (-1 != box.innerHTML.indexOf('10.1021/je200071p')) box.remove();
        });
    }
    //	End retracted article
});

function clearRefLinksFromDialog(){
    jQuery("#refViewer-wrap a.refNumLink").each(function(){
        var cont = jQuery(this).contents();
        jQuery(this).replaceWith(cont);
    });
}

function toc_pod() {
    jQuery("body").addClass("pod");
}