jQuery(document).ready(function() {
    jQuery("a.popup").click(function() {
        var url = jQuery(this).attr('href');
        var w = 768;
        var h = 578;

        if (jQuery(this).figDimension) {
            var d = jQuery(this).figDimension;
            if (d.w) w = d.w + 230; // add sidebar width and some padding
            if (d.h) h = d.h + 280; // add top navigation an some space for captipn
        }

        doPop(w,h,url);
        return false;
    });

    jQuery("a.ref").click(function() {
        var url = jQuery(this).attr('href');
        var w = 500;
        var h = 200;

        doPop(w,h,url);
        return false;
    });

});

function doPop(w,h,url) {
    if (w > screen.width) w = screen.width; // do not make it bigger than the screen
    if (h > screen.height) h = screen.height;
    window.open(url,'popup', 'scrollbars=1,toolbar=0,location=0,statusbar=0,menubar=0,resizable=1,width='+w+',height='+h);

}