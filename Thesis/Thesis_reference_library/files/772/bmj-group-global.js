var hostSiteBaseUrl = window.location.hostname;
var groupSiteBaseUrl = 'group-ivip.ntt.bmjgroup.com/repository';    

// global variables for responsive design , the screen size detectors
var compareWidth, //previous width used for comparison
	detector, //the element used to compare changes
	smallScreen; // Size of maximum width of single column media query


/* ===========================================================================
 *
 * jQuery BMJ Global Navigation Bar
 * Version 2.0 
 * In this version Resposive design , a mobile optimised navigation was added.
 * Plus a few function for displaying the coolkie policy popup.
 * Author: Zoe Azhdari Radkani
 * Author email: ZAzhdariRadkani@bmjgroup.com
 *
 * ---------------------------------------------------------------------------
 * 
 * EXAMPLES OF USE:
 *
 * Notice: These methods do not return any value. Developers need to catch the
 * value with the callback function.
 * 
 *------------------------------------------------------------------------------
 *
 *SETTINGS:
 * 
 *===========================================================================*/
//Creating closure
(function($) {
         //plug-in definition
  $.fn.BmjGlobalNav = function() {
    
    initiateBmjGlobalNav();
    
    //var css_link = '<link rel="stylesheet" type="text/css" href="http://' + groupSiteBaseUrl + '/css/bmj-group-global.css" />';
    //$('head').append(css_link);
    var globalNavExist = $("div#bmj-group-nav");
                
                if(globalNavExist.length > 0){
                    //do nothing
   		 $('div#bmj-group-nav').after(' <div id="global-nav-slider" style="display:none;">Slider</div>');
                 bmjCookiePolicyPopUp('div#bmj-group-nav');   
                }else{
                    var bannerAdExist = $("div.ad-leaderboard");
		if(bannerAdExist.length > 0){
		   $('div.ad-leaderboard').after('<div id="bmj-group-nav"></div>');		
		}else{
		   $('body').prepend('<div id="bmj-group-nav"></div>');
		}
		
		    
   		 $('div#bmj-group-nav').after(' <div id="global-nav-slider" style="display:none;">Slider</div>');
                    $('#bmj-group-nav').load( 'http://' + hostSiteBaseUrl + '/proxy/' + groupSiteBaseUrl + '/global-nav/global-nav.html #bmj-group-nav', function(){
			
			bmjCookiePolicyPopUp('div#bmj-group-nav');
		}); 
		
		
  
                }
                
             
	     $('#bmj-group-nav div.menu-button').live('click',function(){
		
		$('#bmj-group-nav ul[role="navigation"]').slideToggle('fast', function() {});
		
		});
	     
	     
	     $('ul.products-tab li.menu').mouseover(function(){
                                                $(this).addClass('hover');
                                        }).mouseout(function(){
                                                $(this).removeClass('hover');
                                }); 
                                
                                
                                $('.two-column ul.products-tab li.menu').live('click', function(event){
                                        var $this = $(this);
                                        var target = jQuery("a", this).attr('href');   
                                        targetId = target.split('#')[1];
                                        $('div#global-nav-slider').html('<div class="grid-system"><div class="container_12"><div id="' + targetId + '_holder" style="display:none;" >' + $('#' + targetId).html() + '</div></div><div>');
                                	var offset = $('#tabs').offset();
                                        var hieght = $('#tabs').height();
                                        if(hieght < 1 ){ hieght = 47;}
                                        var topOffset = offset.top + hieght;
                                  
                                         $('div#global-nav-slider').css({
                                                
                                                'top' : topOffset+'px'
                                                
                                                });


 
                                        if ($('div#global-nav-slider').is(":hidden")) {     
                                           $('ul.products-tab li.menu').removeClass('active');                                           
                                           $this.addClass('active');                                           
                                           $('#' + targetId +'_holder').fadeIn();                                        
                                           $('div#global-nav-slider').slideToggle("fast");                                           
                                          } else {  
                                             if($this.hasClass('active')){   
                                               $this.removeClass('active');
                                               $('div#global-nav-slider').slideToggle("fast");   
                                             }else{   
                                               $('ul.products-tab li.menu').removeClass('active');
                                               $this.addClass('active');
                                               $('#' + targetId +'_holder').fadeIn();
                                             }
                                          }
                                        
                                         
                                        return false;
                                       });
				
				$('.one-column ul.products-tab li.menu').live('click', function(event){
				        var $this = $(this);
                                        var tab = jQuery("a", this).attr('href');   
                                        tabId = tab.split('#')[1];
					var target = tabId.split('-tab-')[1]+'-landing.html';
					//window.location = groupSiteBaseUrl + '/global-nav/landing-pages/' + target;
					window.open('http://eso-cdn.group.bmj.com/repository/global-nav/landing-pages/' + target);
					return false;
				    });
				
                                $(document).click(function(event) { 
                                        
                                        if($(event.target).parents().index($('div#global-nav-slider')) == -1 && $(event.target).parents().index($('.products-tab')) == -1) {
                                            
                                                if($('div#global-nav-slider').is(":visible")) {
                                                    $('div#global-nav-slider').slideUp('fast');
                                                    $('ul.products-tab li.menu').removeClass('active');
                                                }
                                               
                                          }
                                          if($(event.target).parents().index($('#global-tab-group')) == -1 && $(event.target).parents().index($('.group-tab')) == -1) {
                                            
                                                if($('#global-tab-group').is(":visible")) {
                                                    $('#global-tab-group').slideUp('fast');
                                                    $('ul.group-tab li:first').removeClass('active');
                                                }
                                               
                                          }
                                        
                                        
                                        
                                        if($(event.target).parents().index($('#search-box')) == -1) {
                                            
                                                
                                                
                                                if($('span#global-nav-search-toggler').hasClass('open')) {
                                                    $("#global-header-search input#groupSearchGadget").animate({ width:105}, 500, function(){
                                                         $('span#global-nav-search-toggler').removeClass('open').addClass('close');
                                                     });
                                                   
                                                }
                                          }    
                                        });
                
                                        $("#global-header-search span.submit").live('click', function(){
                                            
                                                $("form#global-header-search").submit();
                                            });
                                        
                                        
                                        $(".two-column span#global-nav-search-toggler.close").live('click', function() {
                                                if($('div#global-nav-slider').is(":visible")) {
                                                              $('div#global-nav-slider').slideUp('fast');
                                                              $('ul.products-tab li.menu').removeClass('active');
                                                          }
                                                $(this).removeClass('close').addClass('open');
                                                $("#global-header-search input#groupSearchGadget").animate({ width: 200}, 500);
                                        });
                
                                        $("#global-header-search input#groupSearchGadget").click(function(){
                                              
                                                if(jQuery.trim($(this).val()) === 'Search BMJ Group'){
                                                         $(this).attr('value' , '');
                                                         
                                                }
                                                
                                           });
        };
  
  
  function initiateBmjGlobalNav(){
    
    //set the initial values
    detector = jQuery('.js');

    compareWidth = detector.width();
    
	smallScreen = '820'; 

	if ($(window).width() < smallScreen) {
		$("body").addClass("one-column");		
	}
	else {
		$("body").addClass("two-column");	
	}

	// Toggle for nav menu
	//$('.js .menu-button').click(function() {
		//alert('before');
		//$('[role="navigation"]').slideToggle('fast', function() {});
		//alert('after');
	//});	
		
	// Credit: http://webdeveloper2.com/2011/06/trigger-javascript-on-css3-media-query-change/
    jQuery(window).resize(function(){
        //compare everytime the window resize event fires
        if(detector.width()!=compareWidth){

            //a change has occurred so update the comparison variable
            compareWidth = detector.width();
			
			if (compareWidth < smallScreen) {
				$("body").removeClass("two-column").addClass("one-column");				
			}
			else {
				$("body").removeClass("one-column").addClass("two-column");	
			}
			if (compareWidth >= smallScreen) {
				$('[role="navigation"]').show();
			}
        }

    });	
    
  }
  
  $(window).load(function (){     
    $('body').BmjGlobalNav();
  });

})(jQuery);


function bmjCookiePolicyPopUp(globalNavDiv){
   
    var cookiePolicyHtml = '<div class="bmj-cookie-noticebar-content"><span class="cookie-notice">'+
			'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.'+
			'<a id="bmj-cookie-link" target="_blank" href="http://group.bmj.com/group/about/legal/privacy#cookies" title="Read our privacy policy">'+
			' Find out more here</a></span><span class="hide-bar">&times;</span></div>';
   
   
    if(getBMJCookie('BMJ-cookie-policy')!= null){
	if(getBMJCookie('BMJ-cookie-policy')== 'open'){
	    $('div#bmj-group-nav:first').after(cookiePolicyHtml);
	    setBMJCookie('BMJ-cookie-policy','open','365');
	}else{
	    setBMJCookie('BMJ-cookie-policy','close','365');
	}
    }else{
	$('div#bmj-group-nav:first').after(cookiePolicyHtml);
	setBMJCookie('BMJ-cookie-policy','open','365');
    }
    
    $('.bmj-cookie-noticebar-content .hide-bar').live('click', function(){
	$('div.bmj-cookie-noticebar-content').remove();
	setBMJCookie('BMJ-cookie-policy','close','365');
	return false;
	});
    $('.bmj-cookie-noticebar-content #bmj-cookie-link').live('click', function(){
	$('div.bmj-cookie-noticebar-content').remove();
	setBMJCookie('BMJ-cookie-policy','close','365');
	return true;
	})
}

function setBMJCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";

    var holder = window.location.hostname.split('.');
    var l = holder.length;
    var crossDomain = holder[l-2];
  
    document.cookie = name+"="+value+expires+"; domain=."+crossDomain+".com;path=/";
}

function getBMJCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteBMJCookie(name) {
    setCookie(name,"",-1);
}
