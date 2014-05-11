function galleryContent_initCallback(carousel) {
        var count = 0;
        var showNum = 0;
        var showText;

        //each carousel may show different number of items per panel and has different text
        if ($('#galleryContentAudio.carousel-type-audiosummary').length > 0) { showText = "recent audio summaries"; showNum = 2; count=$('#galleryContentAudio.carousel-type-audiosummary div#itemCount').html(); }        
        if ($('#galleryContentAudio.carousel-type-audiointerview').length > 0) { showText = "recent audio interviews"; showNum = 2; count=$('#galleryContentAudio.carousel-type-audiointerview div#itemCount').html(); }
        if ($('#galleryContentAudio.carousel-type-clinicalpracticearticles').length > 0) { showText = "recent Clinical Practice Audio"; showNum = 2; count=$('#galleryContentAudio.carousel-type-clinicalpracticearticles div#itemCount').html(); }
        if ($('#galleryContent.carousel-type-vcm').length > 0) { showText = "videos"; showNum = 4; count=$('#galleryContent.carousel-type-vcm div#itemCount').html();}
        if ($('#galleryContent.carousel-type-icm').length > 0) { showText = "recent images"; showNum = 4; count=$('#galleryContent.carousel-type-icm div#itemCount').html();}

        $('#galleryNav #count').html('<span class=\'message\'>Showing <span class=\'startPos\'>1</span>-<span class=\'endPos\'>'+showNum+'</span> of '+count+' ' + showText +'</span>')
	    $('.jcarousel-control a').bind('click', function() {
			$('.jcarousel-control a').removeClass('active');
	        carousel.scroll($.jcarousel.intval($(this).text()));
			$(this).addClass('active');
			var startPlace = carousel.first;
			$('#count span').text(startPlace);
            $.mmsLinkEvent('.jcarousel-control a');
            return false;
	    });

	    $('.jcarousel-scroll select').bind('change', function() {
	        carousel.options.scroll = $.jcarousel.intval(this.options[this.selectedIndex].value);
			return false;
	    });

		$('.jcarousel-next').bind('click', function() {
		        carousel.next();
                var startPlace = $('#galleryNav #count span.startPos').html();
                var count = $('#itemCount').html();
                if ((parseInt(startPlace)+showNum) >= parseInt(count)) {
                    var newStartPlace = 1;
                    var newPlace = showNum;                }
                else {
                    var newStartPlace = parseInt(startPlace)+parseInt(showNum);
                    var newPlace = (parseInt(newStartPlace))+parseInt(showNum-1);
                }
                $('#galleryNav #count span.startPos').html(newStartPlace);
                $('#galleryNav #count span.endPos').html(newPlace);
                return false;
		});
	    $('.jcarousel-prev').bind('click', function() {
	        carousel.prev();
                var startPlace = $('#galleryNav #count span.startPos').html();
                var count = $('#itemCount').html();
                if ((parseInt(startPlace)+showNum) <= (1+showNum)) {
                    var newStartPlace = parseInt(count)-(showNum-1);
                    var newPlace = count;                }
                else {
                    var newStartPlace = parseInt(startPlace)-parseInt(showNum);
                    var newPlace = (parseInt(newStartPlace))+parseInt(showNum-1);
                }
                $('#galleryNav #count span.startPos').html(newStartPlace);
                $('#galleryNav #count span.endPos').html(newPlace);
                return false;
	    });

	};

function highlights_initCallback(carousel) {
    $('.jcarousel-control a').bind('click', function() {
		$('.jcarousel-control a').removeClass('active');
        carousel.scroll($.jcarousel.intval($(this).text()));
		$(this).addClass('active');
        $.mmsLinkEvent('.jcarousel-control a');
        return false;
    });

    $('.jcarousel-scroll select').bind('change', function() {
        carousel.options.scroll = $.jcarousel.intval(this.options[this.selectedIndex].value);
		return false;
    });

	$('.jcarousel-next').bind('click', function() {
	        carousel.next();
			$('.jcarousel-control').find('a').removeClass('active');
			var startPlace = carousel.first;

            $('.jcarousel-control').find('a'+'.link'+startPlace).addClass('active');
            $.mmsLinkEvent('.jcarousel-control a');
            return false;
	});
    $('.jcarousel-prev').bind('click', function() {
        carousel.prev();
		$('.jcarousel-control').find('a').removeClass('active');
		var startPlace = carousel.first;
        
        $('#galleryNav #count span.startPos').html();
        $('.jcarousel-control').find('a'+'.link'+startPlace).addClass('active');
        $.mmsLinkEvent('.jcarousel-control a');
        return false;
    });
};

function galleryContent_itemVisibleInCallback(carousel, item, i, state, evt)
{
    var carouselList = $(carousel.list);
    var carouselLength = $(carouselList).children().length;

    var getHtml;
    if (state == "prev") {
        getHtml = $(carouselList).children()[carouselLength-1]
    }
    else {
        getHtml = $(carouselList).children()[0]
    }
    var itemHtml = $(getHtml).html();

    if (state == "prev") {
        carousel.add(i, itemHtml);
    }
    else if (state == "init") {
    }
    else if (state =="next") {
        carousel.add(i+(carouselLength-1), itemHtml);
    }

};

function galleryContent_itemVisibleOutCallback(carousel, item, i, state, evt)
{
    var carouselList = $(carousel.list);
    var carouselLength = $(carouselList).children().length;
    if (state == "next") {
       carousel.remove(i);
    }
    else {
        carousel.remove(i+(carouselLength-2)); 
    }
};

function hyds_carousel_initCallback(carousel) {
    var carouselList = $(carousel.list);
    var carouselLength = $(carouselList).children().length;
    var navnum = Math.round(carouselLength/2);

    for (i=1;i<=navnum;i++){
	$('<a href="#" class="num">'+i+'</a>').insertBefore('#HYDScarousel .jcarousel-nav a.next');
    }    	

    $('.jcarousel-nav a.num').bind('click', function() {
        var pos = parseInt($(this).html());
	var newpos = pos+(pos-1);
        carousel.scroll($.jcarousel.intval(newpos));
        return false;
    });
    
    $('.jcarousel-nav a.next').bind('click', function() {
        carousel.next();
        return false;
    });

    $('.jcarousel-nav a.prev').bind('click', function() {
        carousel.prev();
        return false;
    });
};

function hyds_carousel_itemFirstInCallback(carousel, item, idx, state) {
	$(".jcarousel-nav a.num").removeClass("active");
 	var pos = Math.round(idx/2)-1;
	$(".jcarousel-nav a.num:eq("+pos+")").addClass("active");
};

