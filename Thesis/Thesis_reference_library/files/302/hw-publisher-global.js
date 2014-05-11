// hw-rupjnls-global.js

// convert list to select box
$(document).ready(function() {
	$('div#info-menu ul').hide();
	var new_select = '<select class="menu"></select>'
	$('div#info-menu').append(new_select);
	$('div#info-menu li a').each(function () {
		var this_link = $(this)
		var txt = this_link.text();
		var url = this_link.attr('href');
		var new_option ='<option value="' + url + '">' + txt + '</option>';
		$('select.menu').append(new_option);
	});
	$('div#info-menu').append('<span class="action"><button>GO</button></span>');
	$('div#info-menu ul').remove();
	$('div#info-menu span.action').click(function(){
		window.location = $('select.menu').val();
	})
});



// stripe tables
$(document).ready(function() {
	$('table.highlight-rows tr:nth-child(even)').addClass('alt'); 
});


// select all search results
$(document).ready(function() {
	$('form#results-gca-form .search-results-gca').prepend('<div id="select-all-results"><a href="#">Select all items</a></div');
	$('div#select-all-results a').click(function() {
		$(this).parents('form').find('input:checkbox').attr('checked', true);
		return false;
	});
});


// archive navigation
$(document).ready(function() {
	var archive = $('#archive-menu > ul');
	archive.find('ul.submenu').hide();
	if (archive.find('ul li').hasClass('active')) {
		archive.find('li.active').parent('ul.submenu')
			.show()
			.parent('li').addClass('open');
	}
	else {		
		archive.children('li').eq(0)
			.addClass('open')
			.children('ul.submenu').show()
	}
	archive.find('.header').click(function() {
		var this_hdr = $(this);
		this_hdr.parent('li').siblings().children('ul.submenu:visible')
			.hide()
			.parent('li').removeClass('open');
		this_hdr.parent('li').children('ul.submenu')
			.toggle()
			.parent('li').toggleClass('open');
	});
});


// article back to top links
$(document).ready(function() {
	$('#content-block .fulltext-view .section h2').prepend('<span class="to-top"><a href="#pageid-content">Back to Top</a></span');
});



// tabbed element
$(document).ready(function() {
	$('.tabbed').each(function(){
		var el = $(this);
		var menu = $('<ul class="tab-control"></ul>'); 
		el.find('.section').each(function(){
			var this_section = $(this);
			this_section.hide();
			var hdr = this_section.children('h5');
			menu.append('<li>' + hdr.text() + '</li>');
			hdr.remove();
		});

		menu.children('li').eq(0).addClass('selected');
		el.find('.section').eq(0).show();
		el.prepend(menu);

		menu.children('li').each(function(index){
			var this_item = $(this);
			this_item.hover(function () {
				this_item.addClass('hover');
			}, function () {
				this_item.removeClass('hover');
			});
			this_item.click(function() {
				this_item.siblings('li').removeClass('selected');
				this_item.addClass('selected');
				var all_sections = this_item.parents('.tabbed').find('.section');
				all_sections.hide();
				all_sections.eq(index).show();
			});
		}); 
	});
});



// docked elements
gSiteOptions.suppressDockedNav=true;

$(document).ready(function() {
	var artSupRules = [
		'', '$(#article-supplemental)'
	];
	var artViewsRules = [
		'', '$(#article-views)'
	];
	
	setupDockBlock(3, 'docked-art-sup', 'docked-nav', artSupRules);
	setupDockBlock(2, 'docked-art-views', 'docked-nav', artViewsRules);

});


// label free sections on certain pages
$(document).ready(function() {
	var freeSectionSelector = ['#pageid-toc #News ~ div.level2 h3','#pageid-toc #Reviews ~ div.level2 h3',
		'#pageid-pap-bysection div.last-child h4[id^="News"]', '#pageid-pap-bysection div.level3 h4[id^="Reviews"]',
		'#pageid-pap-bysection div.last-child h3[id^="REVIEW"]'];
	for (var i = 0; i < (freeSectionSelector.length); i++) {
		var sectionSelector = $(freeSectionSelector[i]);
		if (sectionSelector.length) {
			sectionSelector.append('<span class="free-section-indicator"> free access</span>');
		}
	}
});

gSiteOptions.hwCitingLabel="Citing Articles via HighWire"
