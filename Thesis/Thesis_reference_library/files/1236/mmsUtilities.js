/*-- Begin jQuery Enclosure --*/
// Prevent conflicts with $ sign
(function($) {

	/*-- Begin togglePlaceholder --*/
	// Add or remove placeholder text and style
	$.fn.togglePlaceholder = function(){
		return this.each(function(){
			var el = $(this);
			var defaultValue = el.attr("placeholder") || el.attr("title");
					
			// Initialize
			if ( (el.val()=="") || (el.val()==defaultValue) ) el.addClass("placeholderText").val(defaultValue);
			
			el.focus(function(){
				if (el.val() == defaultValue) el.val("").removeClass("placeholderText");
			}).blur(function(){
				if (el.val() == "") el.addClass("placeholderText").val(defaultValue);
			});
		});
	};
	/*-- End togglePlaceholder --*/
	
	/*-- Begin toggleDisplay --*/
	/* Plugin used to show or hide, expand or collapse, and slide down or slide up an area.
		Triggered by element - .jTrigger.
		If jActive is added to the parent, the containing .jTrigger and .jArea will be on the active state.
		
		HTML Example:
		<ul id="CPC">
			<!-- Active Item -->
			<li class="jActive">
				<h2>How many days in a year?</h2>
				<a href="#" class="jTrigger">Close answer</a>
				<div class="jArea">There are 365 days in a year!</div>
			</li>
			<!-- /Active Item -->
			<!-- Hidden Answer -->
			<li>
				<h2>What's 1 + 1?</h2>
				<a href="#" class="jTrigger">See answer</a>
				<div class="jArea">1 + 1 = 2!</div>
			</li>
			<!-- /Hidden Answer -->
		</ul>
		
		<script>
			$('#CPC li').toggleDisplay();
		</script>
	*/ 
	$.fn.toggleDisplay = function(options){
		
		// Default settings + options
		var o = $.extend({
			trigger:        '.jTrigger', // Element that'll triger the toggle
			area:           '.jArea',    // Element which will show or hide
			effects:        'none',      // Effects: none, slide
			active:         'jActive',   // Active class on parent element means element area is visible
			triggerShowMsg: 'Show',      // Trigger Show message 
			triggerHideMsg: 'Hide'       // Trigger Hide message
		}, options);
		
		return this.each(function() {
			var el = $(this);
			var trigger = el.find(o.trigger);
			var area = el.find(o.area);
			
			function show() {
				(o.effects == 'slide') ? area.slideDown() : area.show();
				trigger.html(o.triggerHideMsg);
			}
			function hide() {
				(o.effects == 'slide') ? area.slideUp() : area.hide();
				trigger.html(o.triggerShowMsg);
			}
			
			// Initialize
			// If parent is active, make sure trigger displays Trigger's Hide message and area is visible
			(el.hasClass(o.active)) ? show() : hide();
			
			// On click Trigger
			trigger.click(function(e){
				e.preventDefault();
				(el.hasClass(o.active)) ? hide() : show();
				el.toggleClass(o.active);
			});
		});
	};
	/*-- End toggleDisplay --*/
	
})(jQuery);
/*-- End jQuery Enclosure --*/


//For inputs with place holder text like "Search Terms", hide it on focus,
//and re-show it when focus is left.
$.fn.placeHolderToggle = function() {
    this.each(function() {
        var el = $(this);
        el.data('placeHolderVal', el.val());

        el.focus(function() {
            if(el.val() == el.data('placeHolderVal'))
                el.val('');
        })
        .blur(function() {
            if(el.val() == '')
                el.val(el.data('placeHolderVal'));
        });
    });
    return this;
};

$.fn.placeHolderColorToggle = function() {
    this.each(function() {
        var el = $(this);
        el.data('placeHolderVal', el.val());

        el.focus(function() {
            if(el.val() == el.data('placeHolderVal')) {
                el.val('');
                el.css('color', '#333') ;
            }
        })
        .blur(function() {
            if(el.val() == '') {
                el.val(el.data('placeHolderVal'));
                el.css('color', '#bdbdbd');
            }
        });
    });
    return this;
};


//For inputs with place holder text like volume, issue, hide it on focus,
//but don't re-show it when focus is left
$.fn.placeHolderRemove = function() {
    this.focus(function() {
        this.placeHolderVal = $(this).val();
        $(this).val('');
    });
    return this;
};

//Find the max height and even all other elements to it
$.fn.mmsEvenHeights = function() {
    var max = 0;
    this.each(function() { max = Math.max(max, $(this).height()); });
    if(max > 0) this.height(max);
    return this;
};


// to display a list of references on mouse over within an article
$.mmsGetReferences = function(ref,ext) {
    // remove existing
    $("#refLayer").remove();
    var f = 0; // floor of reflist
    var c = 0; // ceiling of reflist
    var refList = new Array();
    if (ref.search(/,/) != -1) {
        var refs = new Array();
        refs = ref.split(",");
        for (j=0;j<refs.length;j++)
        {
           if (refs[j].match(/-/) != null) {
            var morerefs = new Array();
            morerefs = refs[j].split("-");
            var f = parseInt(morerefs[0]);
            var c = parseInt(morerefs[1]);
            var i = f;
            for (i;i<=c;i++) {
                   refList.push(i);
            }               
           }
           else {
            refList.push(refs[j]);
           }
        }
    }
    else if (ref.search(/-/) != -1) {
        refList = ref.split("-");
        f = parseInt(refList[0]);
        c = parseInt(refList[1]);
        refList = new Array();
        i = f;
        for (i;i<=c;i++)
        {
           refList.push(i);
        }
    }
    else {
        refList[0] = ref;
        f = ref;
        c = ref;
    }
    var refListContainer = document.createElement("div");
    var refListEl = document.createElement("ol");
    refListContainer.id = "refLayer";

    $(refList).each(function(i,o) {
            var refItemCopy;
            if (ext) {
                refItemCopy = $("#refItem"+o+"-"+ext).clone().get(0);
            }
            else {
                refItemCopy = $("#refItem"+o).clone().get(0);
            }
            $(refItemCopy).appendTo(refListEl);
    });
    refListContainer.appendChild(refListEl);
    $("div#content").before(refListContainer);
};


// called by datepicker on Issue archive pages to restrict datepicker to present only thursdays as clickable days on calendar
$.mmsRestrictCalToPublishDays = function(date) {
    var day = date.getDay();
    if (day == 4) {
        return [true, ''];
    }
    else {
        return [false, day + '_day'];
    }
};


// onclick of a date on datepicker, this will put the date values into the appropriate inputs. takes a formid and
// assumes that the form has inputs with classnames month, day, year
$.mmsAddDates = function(date,form) {
    // date format 02/05/2009
    var day   = date.split('/')[1];
    if (parseInt(day) < 10) { day = day.substring(1); }
    var month = date.split('/')[0];
    var year  = date.split('/')[2];
    //$("form#" + form).children('fieldset').children("input.month").val(month);

    $("form#" + form).children('fieldset').children("select.month").children("option[value='" + month + "']").attr('selected', 'selected');
    $("form#" + form).children('fieldset').children("input.day").val(day);
    $("form#" + form).children('fieldset').children("input.year").val(year);
};

// get the letters
$.mmsGetLetters = function(doi) {
    var lettersContent = $.ajax({
        url: '/action/showLetters',
        success: function(html) {
             $.mmsRenderLetters(html, doi);
        },
        data: { doi: doi }
    });
}

// render the letters
$.mmsRenderLetters = function(content, doi) {
    if (content == "") {
	$('dt.letters').hide();
    } else {
	var letterDiv = $("div[rel="+doi+"]");
    	$(letterDiv).html(content);
    	// process letter content to render per spec
    	$(letterDiv).find("h2").addClass('letter');
    	$(letterDiv).find("p.articleType").remove();
    	$(letterDiv).find("h2").html('Letters in Response to this Article');
    	$(letterDiv).find('.striped')
		.find('li:even').addClass('odd').end()
		.find('li:odd').addClass('even').end();
    	// repeat on load events which are letter specific
    	$('div.letterReferences').addClass('hidden').end();
    	$(".letterContent a.toggleRef").click( function () {
        	var ref = $(this.parentNode).next();
        	ref.is('.hidden') ? ref.addClass('shown').removeClass('hidden') : ref.removeClass('shown').addClass('hidden') ;
        	$.mmsLinkEvent('a.toggleRef');
        	return false;
    	});
    	$('#letters a.showRefLayer').click( function () {
        	var ext = this.hash.split("-")[1];
        	$.mmsGetReferences(this.innerHTML,ext);
    	});
    	$('#letters a.showRefLayer').cluetip({
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
    	
    	//Register layer and popups on links and forms
    	$.mmsViews.registerViewTypes($(letterDiv));
	}
}


// get a collection of elements that should be collapsed. hide and add click event to all, then show first one
$.fn.mmsInitCollapsibles = function() {
    this.children().addClass('collapsed');
    this.children().find('a.toggle').click(function () {
           $.mmsToggleCollapsibles(this);
            return false;
    });
    this.children(":first").removeClass('collapsed').addClass('uncollapsed');
}

$.mmsToggleCollapsibles = function(link) {
    var collapsible = $(link).parents('div.collapsible');
    $(collapsible).children().removeClass('uncollapsed').removeClass('collapsed');
    $(collapsible).children().addClass('collapsed');
    $(link).parents('.collapsed').removeClass('collapsed').addClass('uncollapsed');  
}

//render browseIssues
$.mmsRenderFoundIssues = function() {
    var listContainer = $('ul.foundIssuesByYear');
    var firstMonths = ['January','February','March','April','May','June'];
    var firstList = $('<li class="leftMonths"></li>');
    $(firstMonths).each(function() {
        if ($('li.' + this).size() > 0) {
            var dl = $('<dl class="monthBlock"><dt>' + this + '</dt></dl>');
            $('li.' + this).each(function() {
               $('<dd>' + $(this).html() + '</dd>').appendTo(dl);
            });
            $(dl).appendTo(firstList);
        }
    });
    var secondMonths = ['July','August','September','October','November','December'];
    var secondList = $('<li class="rightMonths"></li>');
    $(secondMonths).each(function() {
        if ($('li.' + this).size() > 0) {
            var dl = $('<dl class="monthBlock"><dt>' + this + '</dt></dl>');
            $('li.' + this).each(function() {
               $('<dd>' + $(this).html() + '</dd>').appendTo(dl);
            });
            $(dl).appendTo(secondList);
        }
    });

    $(listContainer).html('');
    $(firstList).appendTo(listContainer);
    $(secondList).appendTo(listContainer);
};

//render browseIssues
$.mmsRenderYearListing = function() {
    $.mmsLinkEvent('page-medicalIndexAllYears');
    var listContainer = $('div.medicalIndexAllYears');
    var decades= new Array;
    $('div.medicalIndexAllYears a.year').each(function() {
        var year = $(this).html();
        var decade = year.slice(0,year.length-1)
        decades.push(decade);
    });
    var distinctDecades = new Array;
    $(decades).each(function() {
            if(distinctDecades.toString().indexOf(this) == -1) {
                distinctDecades.push(this);
        }
    });

    $(distinctDecades).each(function() {
       var yearsForThisDecade = $('div.medicalIndexAllYears a:contains(' + this + ')');
       var dl = $('<dl id="' + this + '0"/>');
       var dt = $('<dt>' + this + '0</dt>');
       $(dt).appendTo(dl); 
       $(yearsForThisDecade).each(function() {
        var dd = $('<dd />');
        $(this).appendTo(dd);
        $(dd).appendTo(dl);
       });
       $(dl).appendTo(listContainer); 
    });

    var digitalArchive = $('<div class="archiveBadge"><img src="/templates/jsp/_style2/_mms/_nejm/img/archiveBadge.gif" alt="NEJM Digital Archive" /></div>');
    $(digitalArchive).insertAfter('dl#1990');

};

$.mmsEmbedSWF = function(swfName, id, width, height, flashversion, install, flashvars, params) {
    if (typeof GUID !== "undefined") { flashvars.customerName = GUID; }
    else {flashvars.customerName = '';}
    if (typeof servicesURL !== "undefined") flashvars.servicesURL = servicesURL + "/";
        swfobject.embedSWF(swfName, id, width, height, '9.0.0', install, flashvars, params);
}

//event tags for ajax links
$.mmsLinkEvent = function(selector, el) {
    var evt = $.mmsEventMappings[selector];
    if(evt) {
        var name = evt.name;
        if (!el) el = this;
        var params = evt.params ? evt.params(el) : {};
        
        $.mmsEvent(name, params);
    }
}

$.mmsDoHover = function(link) {
    $(link).hover(
      function () {
        $(link).find('.common').css('border-bottom','1px dotted #ccc').end()
                .find('.hoverwrap').css('display','block').end().addClass('hoverActive').end();
      },
      function () {
        $(link).find('.common').css('border-bottom','none').end()
                .find('.hoverwrap').css('display','none').end().removeClass('hoverActive');
      }
    );
}

$.mmsLoadSlideshow = function(xmlPath,doi) {
  $.ajax({
    url: xmlPath,
    success: function(data) {
      $('.result').html(data);
    	$.mmsRenderSlideshow(data,doi); 
    }
  });
}

$.mmsRenderSlideshow = function(xml,doi) {
	var list = $('<ul class="gallery" />');
	var slide_count = $(xml).find('NumberOfSlides');
	var slides = $(xml).find('Slides').find('Slide').each(function(){
		var imgPath = $(this).find('jpgName').text().replace(/^\s+|\s+$/g,"");
		var img = $('<img src="/doi/media/' + doi + '/' + imgPath + '"/>');
		var textcontainer = $('<div class="slidetext" />');
		var title = $('<div class="slidetitle">' + $(this).find('slideTitle').text() + '</div>');
		var legend = $('<div class="slidelegend">' + $(this).find('slideLegend').text() + '</div>');
		var credit = $('<div class="slidecredit">' + $(this).find('slideCredits').text() + '</div>');
		var itemContainer = $('<li>');
                $(itemContainer).append(img);
                $(textcontainer).append(title);
		$(textcontainer).append(legend);
		$(textcontainer).append(credit);
		$(itemContainer).append(textcontainer);
		$(list).append(itemContainer);
	});
	$('#noFlashSlideshowContainer').append(list);
	$('#noFlashSlideshowContainer').jcarousel({
                scroll:1,
                initCallback: galleryContent_initCallback,
                wrap: null,
       		buttonNextHTML: '<div>Next &gt;</div>',
		buttonPrevHTML: '<div>&lt; Previous</div>', 
	        itemVisibleInCallback: {onBeforeAnimation: galleryContent_itemVisibleInCallback},
                itemVisibleOutCallback: {onAfterAnimation: galleryContent_itemVisibleOutCallback}
	
        });
        $('.jcarousel-next').trigger('click');
}

$.mmsRotatingPanelBox = function(panelBox) {
  var opts = Object();
  var classes =$(panelBox).attr('class').split(/\s+/);
  	$.each( classes, function(index, item){
    if (item.indexOf("panelopt") >= 0) {
    	opts_arr = item.split("-");
    	opts.delay = opts_arr[1];  
    	opts.fade = opts_arr[2];  
    }
  });
  var delay = 5000, fade = 750;  
  if (opts.delay) {delay = parseInt(opts.delay); } 
  if (opts.fade) {fade = parseInt(opts.fade); }
  var panels = $(panelBox).find('.rpanel');
  var i = 0;
  $(panels).eq(i).show();
  var cycle = function () {
	 $(panels).eq(i).fadeOut(fade,function () {
	 	i++;
	 	if (i>=panels.length) { i = 0; }
	 	$(panels).eq(i).fadeIn(fade);
	 	setTimeout(cycle, delay);
	 });
	  
  };
  setTimeout(cycle, delay); 
}