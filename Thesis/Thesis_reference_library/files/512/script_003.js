jQuery(document).ready(function(){
    clearRightBorderForNavigationMenu();
    jQuery('#MenuLine li.lifirst').hover(
            function() { jQuery('ul', this).css('display', 'block'); },
			function() { jQuery('ul', this).css('display', 'none'); });

    jQuery('li#shareBookmark').hover(
            function() { jQuery('span', this).css('display', 'block'); },
			function() { jQuery('span', this).css('display', 'none'); });

    jQuery('li.vcats').hover(
            function() { jQuery('span', this).css('display', 'block'); },
			function() { jQuery('span', this).css('display', 'none'); });


    var journalListToggleOpenImage = "url(/templates/jsp/_style2/_mal/images/mal_iconMinus.gif)";
    var journalListToggleClosedImage = "url(/templates/jsp/_style2/_mal/images/mal_iconPlus.gif)";

    function debug(str) {
        document.getElementById('debug').innerHTML += str + "<br>";
    }

    function getItems(className,parent,tag) {
        if (true || navigator.userAgent.indexOf('MSIE')!=-1) {
            var tags = document.getElementsByTagName(tag);
            var items = [];
            for (var i=0; i<tags.length; i++) {
               if (tags[i].className.indexOf(className) != -1 && tags[i].parentNode == parent) {
                   items.push(tags[i]);
               }
            }
            return items;
        } else {
            return parent.getElementsByClassName(className);
        }
    }

    //journalList.jsp publication list behaviors
    jQuery('div.journalListToggle').toggle(function() {
        var inner_list = this.parentNode.getElementsByTagName("ul")[0]
        var listItems = getItems('journalItems',inner_list,'li');

        for (var i = 0; i < listItems.length; i++) {
            listItems[i].style.display = 'block';
        }

        jQuery(this).css('background-image',journalListToggleOpenImage);
    }, function() {
        var inner_list = this.parentNode.getElementsByTagName("ul")[0]
        var listItems = getItems('journalItems',inner_list,'li');

        for (var i = 0; i < listItems.length; i++) {
            listItems[i].style.display = 'none';
        }

        jQuery(this).css('background-image',journalListToggleClosedImage);
    });

    jQuery('.journalCategoryCheckbox').click(function() {
        var inner_list = this.parentNode.getElementsByTagName("ul")[0]
        var listItems = getItems('journalItems',inner_list,'li');
        for (var i = 0; i < listItems.length; i++) {
            var input = listItems[i].getElementsByTagName("input")[0];
            input.checked = this.checked;
        }
    });

    jQuery('#allPublications').click(function() {
        var inputfields = document.getElementsByTagName('input');
        for (var i=0; i<inputfields.length; i++) {
            var inp = inputfields[i];
            if (inp.className.indexOf('journalCategoryCheckbox') != -1 || inp.className.indexOf('journalItemCheckbox') != -1) {
                inp.checked = false;
            }
        }
    });

    jQuery('.journalCategoryCheckbox , .journalItemCheckbox').click(function() {
        document.getElementById("selectedPublications").click();
    });

    // If you click on a radio button, IE seems to wait with firing the change event until you leave the button,
    // which is unintuitive, fix this behavior...
    jQuery(function() {
        if (jQuery.browser.msie) {
            jQuery('input:radio').click(function() {
              this.blur();
              this.focus();
            });
        }
    });

    jQuery('.filterByRadio').change(function(){
        var jCode = '';
        if (jQuery(this).attr('id') == 'thisJournal') {
            jCode = jQuery(this).val();
            window.location = '/action/topicalIndex?jCode=' + jCode;
        } else {
            jCode = jQuery('#thisJournal').val();
            window.location = '/action/topicalIndex?filterByCode=' + jCode;
        }
    });
});

function addFlvFlashMovie(id, flv) {
    var so = new SWFObject('/flvplayer.swf',id,'352','288','7');
	so.addParam('allowfullscreen','true');
	so.addVariable('file',flv);
	so.addVariable('type','flv');
    if (navigator.appName.indexOf("Microsoft") != -1) {
        // this is needed for IE, but i breaks Gecko
        so.addVariable('width','352');
        so.addVariable('height','288');
    }
    so.write(id);
}

function addFlashMovie(id, flv, jCode) {
   var flvFile = flv.substr(flv.lastIndexOf("/")+1);
   var adSession = Math.random();
   var adBase = "http://itportal.liebertpub.com/vas/";
   var adUrl = adBase + "ad_server.cfm?" + escape("dvid="+flvFile+"&s="+adSession+"&journalcode=" + jCode);
   var adRedir = adBase + "ad_redir.cfm?" + escape("dvid="+flvFile+"&s="+adSession);
   flowplayer(id, "/flowplayer.commercial-3.1.5.swf", {
      key: '#@be328f970531a3f206e',
      onError: function(err) { this.play(flv); },
      showErrors: false,
      clip: { scaling: 'fit' },
      playlist: [
         { url: adUrl, linkUrl: adRedir, linkWindow: '_blank' },
         { url: flv },
         { url: '/templates/jsp/_style2/_mal/images/~splash_screen_' + jCode + '.jpg' } ],
      plugins: { controls: {
         url: '/flowplayer.controls-3.1.5.swf',
         backgroundColor: '0x999999',
         sliderGradient: 'none',
         timeBgColor: '#262626',
         bufferGradient: 'none',
         volumeSliderColor: '0x999999',
         buttonColor: '#666666',
         buttonOverColor: '#000000',
         tooltipTextColor: '#000000',
         progressGradient: 'medium',
         backgroundGradient: 'high',
         sliderColor: '0x999999',
         bufferColor: '0xcccccc',
         progressColor: '0x777777',
         tooltipColor: '#C9C9C9',
         durationColor: '#CCCCCC',
         timeColor: '0xcccccc',
         height: 24
         } }
      });
}

function showChildren(pid) {
    var expand = '/templates/jsp/_style2/_mal/images/expand.gif';
    var collapse = '/templates/jsp/_style2/_mal/images/collapse.gif';

    // toggle sub topic display
    var childTopics = document.getElementById(pid);
    childTopics.style.display = (childTopics.style.display == 'none') ? "block" : "none";

    // toggle status gif
    var parentTopicStatus = document.getElementById(pid + '-status');
    var source = parentTopicStatus.src;

    source = source.substring(source.indexOf('/') + 2);   // chop off protocol
    source = source.substring(source.indexOf('/'));     // chop off hostname
    parentTopicStatus.src = (source == expand) ? collapse : expand;
}

function searchChangeResultsPerPage(aForm, pageSizeVal, submitForm) {
    var pageSize=getFormInput(aForm.name, 'pageSize');
    pageSize.value = pageSizeVal;

    if(submitForm)
        aForm.submit();
}

function showPermalink() {
    jQuery('span', 'li#permalinkEl').fadeIn('fast');
}
function hidePermalink() {
    jQuery('span','li#permalinkEl').fadeOut('fast');
}
function activate(text) {
    text.select();
}

function textBoxBackText(tb,eventCode){
    switch (eventCode){
        case 0:
            if(tb.value==tb.defaultValue){
                tb.value='';
            }
            tb.style.color='#000';
            break;
        case 1:
            if(tb.value==''){
                tb.value=tb.defaultValue;
                tb.style.color='#ccc';
            }
            break;
    }
}

function clearRightBorderForNavigationMenu(){
    jQuery("ul.width25pc:last").css("border-right","none");
}

function goto(url) {
    if (url != "") {
        location=url;
    }
}

function popup(url,text,winProps){
    window.open(url,text,winProps);
    return;
}

function performSaveSearch(aForm, aIsFAJ) {
	var sltAlert = aForm.searchalert;
	if (aIsFAJ && (sltAlert.selectedIndex>0)) {
		alert("Sorry, e-mail alert for journals with \n" +
				"full access rights is not available.");
		return;
	}

    aForm.setAttribute("action", "/action/doSaveSearch");
    var performEle = document.createElement("input");
    performEle.setAttribute("name", "perform");
    performEle.setAttribute("value", "false");
    aForm.appendChild(performEle);
    aForm.submit();
}

function updateSSAFormat(id,element){
    var selected = jQuery(element).find(":selected").text();
    var form = ['<form method="post" action="/action/doUpdateAlertSettings">'];
    form.push('<input type="hidden" name="ssaID" value="',id,'"/> ');
    form.push('<input type="hidden" name="action" value="updateSSA"/> ');
    form.push('<input type="hidden" name="SSAFormat" value="',selected,'"/> ');
    form.push('</form>');
    jQuery(form.join('')).appendTo('body')[0].submit();

}