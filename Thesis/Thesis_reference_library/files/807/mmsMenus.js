/*
Drop down menus. Menus are in the DOM as <div>s, hidden on page load, and shown when an associated link is hovered
over. Menu boxes are marked up with "dropDown-X" class data (see mmsClassData.js), and menu triggers are marked up with
"dropDownTrigger-X". In both cases X is an identifier for the menu and needs to match between trigger and menu box.
Further parameters such as delay in showing and hiding may be added if necessary.
*/
$.mmsMenus = {};
$.mmsMenus.hoverWait = 300;


//Find menus for trigger element(s) and set up showing and hiding of those menus.
$.fn.mmsRegisterMenuTrigger = function() {
	
		//disable hover menus for Android mobile devices
		if(isMobileDevice() && isAndroidDevice())
		{
				return this;
		}
	
    this.each(function() {
        var menuName = $(this).mmsClassData('dropDownTrigger');
        var menu = $(".dropDown:mmsClassData(dropDown=" + menuName + ")");
        menu.data('triggeredBy', $(this));
        if(menu.length > 0) {
            menu.data('overMenu', false);
            menu.data('overTrigger', false);
            $.mmsMenus.setupTriggerHover(menu);
            $.mmsMenus.setupMenuHover(menu);
        }
    });

    return this;
};


//Show the menu on mouseover in the right place, kick off a delayed check for hiding of the menu on mouseout.
$.mmsMenus.setupTriggerHover = function(menu) {
    menu.data('triggeredBy').hover(function() {
        var activeClass = 'menuActive-' + menu.mmsClassData('dropDown');
        var activeTriggerClass = 'triggerActive-' + menu.mmsClassData('dropDown');
        $('.dropDown').mmsHideMenu();
        var offset = $(this).offset();
        menu.data('triggeredBy').addClass('triggerActive').addClass(activeTriggerClass);
        menu.data('overTrigger', true)
            .css('left', offset.left).css("top", offset.top).show()
            .find('dl.column').mmsEvenHeights().end()
            .addClass('menuActive').addClass(activeClass);
    },
    function() {
        menu.data('overTrigger', false);
        $.mmsMenus.checkForHide(menu);
    });
};


//Continue showing the menu while the mouse stays over it, kick off a delayed check for hiding of the menu on mouseout.
$.mmsMenus.setupMenuHover = function(menu) {
    menu.hover(function() {
        menu.data('overMenu', true);
    }, function() {
        menu.data('overMenu', false);
        $.mmsMenus.checkForHide(menu);
    });
};


//When the mouse leaves the menu or trigger, pause to allow the use to hover back over the menu, then hide the menu if
//necessary. Always clear the last timeout so that if the user goes on and off the menu quickly, we don't get flicker.
$.mmsMenus.checkForHide = function(menu) {
    if($.mmsMenus.lastHideCheck)
        clearTimeout($.mmsMenus.lastHideCheck);
    
    $.mmsMenus.lastHideCheck = setTimeout(function() {
        menu.mmsHideMenu();
    }, $.mmsMenus.hoverWait);
};


$.fn.mmsHideMenu = function() {
    this.each(function() {
        var menu = $(this);
        var activeClass = 'menuActive-' + menu.mmsClassData('dropDown');
        var activeTriggerClass = 'triggerActive-' + menu.mmsClassData('dropDown');
        if(!menu.data('overMenu') && !menu.data('overTrigger')) {
            if(menu.data('triggeredBy'))
                menu.data('triggeredBy').removeClass('triggerActive').removeClass(activeTriggerClass);
            menu.hide().removeClass('menuActive').removeClass(activeClass);
        }
    });
};