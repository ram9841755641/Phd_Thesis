jQuery(document) .ready(function () {
    bk_epub_lnk();
    bk_tgl_cit();
    bk_cit_avail_lnk();
    bk_tgl_gloss_lnks();

});


//============================================================================
// add dialog to epub link
//============================================================================
function bk_epub_lnk() {
   var $link = jQuery('.bk_epub_link');
    // Return if there is no epub link.
    if (! $link) {
        return;
    }

    var dialogDiv =
    '<div title="Making content easier to read in Bookshelf" ' +
    '     id="epubDialog" ' +
    '     style="display: none">' +
    '  <p>We are experimenting with display styles that make it easier to read books and documents ' +
    '    in Bookshelf. ' +
    '    Our first effort uses ebook readers, which have several "ease of reading" ' +
    '    features already built in.</p>' +
    '  <p>The content is best viewed in the <em>iBooks ' +
    '    reader</em>. You may notice problems with the display of some features of books or documents' +
    '    in other eReaders.</p>' +
    '  <button id="cancelEpub">Cancel</button>' +
    '  <button id="downloadEpub" style="float: left">Download</button>        ' +
    '</div>';

    // Initialize the dialog
    var $dialog = jQuery(dialogDiv).ncbidialog({
        autoOpen: false,
        modal: true,
        width: "500px"
    });

    // Set the link event to open the dialog
    $link.on("click", function (event) {
        //var h = $dialog.ncbidialog('option', 'height');
        //console.info("Initial height per ncbidialog is " + h);
        //console.info("Grabbing css prop directly, height is " + $dialog.css('height'));

        event.preventDefault();
        // do not let the link click event fire
        $dialog.ncbidialog("open");
        // open the dialog

        // Get rid of vertical scrollbar.  See JSL-1849 and JSL-1850.  Just add 5 px
        // to the height.
        $dialog.height($dialog.height() + 5);
    });

    // Set the event handler for the cancel button
    jQuery('#cancelEpub').click(function () {
        $dialog.ncbidialog("close");
    });

    // Set the event handler for the download button
    jQuery('#downloadEpub').click(function () {
        $dialog.ncbidialog("close");
        // hide dialog
        window.location.href = $link.prop("href");
        // navigate to next page
    })
}


//============================================================================
// toggle bibliographic details in book-page-banner if there are a lot of them
//============================================================================
function bk_tgl_cit() {
    var cit = jQuery('._bk_pgbnr_cit');
    if (! cit || cit.height() < 126) {
        return;
    }

    var ln = jQuery('._bk_pgbnr_cit_ln');
    var h = 0;
    ln.each(function (i) {
        h = h + jQuery(this).height();
        if (i != 0 && h > 90) {
            jQuery(this).addClass('_bk_pgbnr_cit_ln_hdn');
        }
    });

    var hd = jQuery('._bk_pgbnr_cit_ln_hdn');
    if (! hd) {
        return;
    }
    hd.hide();
    cit.after('<a href="#" class="small" id="_bk_cit_tgl">Show details</a>');
    jQuery('#_bk_cit_tgl').click(function () {
        if (hd.is(':hidden')) {
            hd.show();
            jQuery(this).text('Hide details');
        } else {
            hd.hide();
            jQuery(this).text('Show details');
        }
        return false;
    });
};

//============================================================================
// add URL to "available at" part in citation
//============================================================================
function bk_cit_avail_lnk() {
    var bk_l = jQuery(location);
    jQuery('.bk_cite_avail').text(' Available from: ' + bk_l.attr('href').replace(bk_l.attr('hash'), ''));
    //jQuery('.bk_cite_avail').css('word-wrap', 'break-word');
};


//============================================================================
// toggle glossary links
//============================================================================

function bk_tgl_gloss_lnks() {

    var toggle_element = jQuery("a.toggle-glossary-link");
    if (! toggle_element) {
        return;
    }
    checkGlossLinks('init');

    toggle_element.click(function () {
        checkGlossLinks();
        return false;
    });

    jQuery('a.def').click(function (e) {
        e.preventDefault();
        if (jQuery(this).hasClass('def_inactive')) {
            return false;
        } else {
            var href = jQuery(this).attr('href');
            return startTarget(href, 'item', 800, 250);
            //startTarget in pmc common js
        }
    });
}

// This function gets called on document ready and whenever the user clicks on
// the "enable/disable glossary links" control.
function toggleglossarylinks_(cookie_value) {

    var toggle_element = jQuery(".toggle-glossary-link");
    var glossary_links = jQuery(".def");

    if (cookie_value == "disabled") {
        toggle_element.text("Enable Glossary Links");
        glossary_links.addClass("def_inactive");
        glossary_links.attr("style", "color:#000000;cursor:default;border:0;text-decoration:none;");
    }
    else {
        toggle_element.text("Disable Glossary Links");
        glossary_links.removeClass("def_inactive");
        glossary_links.removeAttr("style");
    }

    // Fire a global event to let the Portal ncbipopper code know that we are done.
    jQuery.event.trigger("glossarylinks");
}

function checkGlossLinks(state) {
    var c = 'GlossaryLinks';
    var cv = pmcReadCookie(c);
    var d = 'disabled';

    if (state == 'init') {
        toggleglossarylinks_(cv);
    }
    else if (cv == d) {
        // Was disabled, now enable them.
        pmcEraseCookie(c);
        toggleglossarylinks_();
    } else {
        pmcCreateCookie(c, d, 7);
        toggleglossarylinks_(d);
    }
}

//------ AK - cookie support ---------------------------------------------------
function pmcCreateCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() +(days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function pmcReadCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}

function pmcEraseCookie(name) {
    pmcCreateCookie(name, "", - 1);
}
