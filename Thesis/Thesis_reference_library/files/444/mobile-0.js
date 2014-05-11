// Viewport - jQuery selectors for finding elements in viewport Copyright (c) 2008-2009 Mika Tuupola Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php Project home: http://www.appelsiini.net/projects/viewport 
(function(jQuery){jQuery.belowthefold=function(element,settings){var fold=jQuery(window).height()+jQuery(window).scrollTop();return fold<=jQuery(element).offset().top-settings.threshold;};jQuery.abovethetop=function(element,settings){var top=jQuery(window).scrollTop();return top>=jQuery(element).offset().top+jQuery(element).height()-settings.threshold;};jQuery.rightofscreen=function(element,settings){var fold=jQuery(window).width()+jQuery(window).scrollLeft();return fold<=jQuery(element).offset().left-settings.threshold;};jQuery.leftofscreen=function(element,settings){var left=jQuery(window).scrollLeft();return left>=jQuery(element).offset().left+jQuery(element).width()-settings.threshold;};jQuery.inviewport=function(element,settings){return!jQuery.rightofscreen(element,settings)&&!jQuery.leftofscreen(element,settings)&&!jQuery.belowthefold(element,settings)&&!jQuery.abovethetop(element,settings);};jQuery.extend(jQuery.expr[':'],{"below-the-fold":function(a,i,m){return jQuery.belowthefold(a,{threshold:0});},"above-the-top":function(a,i,m){return jQuery.abovethetop(a,{threshold:0});},"left-of-screen":function(a,i,m){return jQuery.leftofscreen(a,{threshold:0});},"right-of-screen":function(a,i,m){return jQuery.rightofscreen(a,{threshold:0});},"in-viewport":function(a,i,m){return jQuery.inviewport(a,{threshold:0});}});})(jQuery);

/* FlameViewportScale. 0.11. Facilitates a simple viewport scale query. Optic Swerve, opticswerve.com Documented at http://menacingcloud.com/?c=viewportScale */
function FlameViewportScale(){this.delay=600;this.orientation;this.screenWidth;this.timeout;this.viewportScale;this.getScale=function(){this.viewportScale=undefined;var A=document.documentElement.clientWidth;if(screen.width>A){console.log('Aborted viewport scale measurement. Screen width > viewport width');return;}this.updateOrientation();this.screenWidth=screen.width;if(this.orientation==='portrait'){if(screen.width>screen.height)this.screenWidth=screen.height;}else {if(screen.width<screen.height)this.screenWidth=screen.height;}var B=A/window.innerWidth;var C=A/this.screenWidth;this.viewportScale=B/C;return this.viewportScale;};this.updateOrientation=function(){this.orientation=window.orientation;if(this.orientation===undefined){if(document.documentElement.clientWidth>document.documentElement.clientHeight)this.orientation='landscape';else this.orientation='portrait';}else if(this.orientation===0||this.orientation===180)this.orientation='portrait';else this.orientation='landscape';};this.update=function(callback){if(this.timeout!==undefined){clearTimeout(this.timeout);this.timeout=undefined;}if(this.delay>0){var D=this;this.timeout=setTimeout(function(){D.getScale();if(callback!==undefined)callback();},this.delay);}else {this.getScale();if(callback!==undefined)callback();}};return true;}

// end MOBILE PLUGINS


/*
 * BioMed Central Mobile Javascript
 *
 * Version: 2
 */

	// mobile namespace
	site = site || {};
	site.mobile = {};

		// get current scale
		site.mobile.viewscale = new FlameViewportScale(); 
		site.mobile.scale = Math.round(site.mobile.viewscale.getScale()) || 0;
		
		// scale at which to enhance
		site.mobile.enhancescale = (navigator.userAgent.match("iPhone") !== null) ?  1.5 :  2;
		
		// device properties
		site.mobile.device = {
			platform: navigator.platform,
			agent: navigator.userAgent,
			retina : window.devicePixelRatio >= 2 ? true : false
		}

		site.mobile.screenwidth = $(window).width() || window.innerWidth;
		
		// add here functions for overwriting desktop namespace
		site.mobile.overrides = function() {
			window.LoadInParent = function(link) {
				$('ol#references li').css('background-color','#fff');
				$('li' + link).css('background-color','#f2f2f2');
				$('li' + link + ' p.totext').show();
				
				if($("#article-references.collapsible-content").is(":hidden")) {
					$("#article-references").siblings("h3").click();
				}
				
				window.location = link;
			}

			//main function is returnToText(); in articles.js
			$("p.totext").click(function() {$(this).hide()});
		}
		
		/* hide-reveal for mobile sidebar */
		site.mobile.sidebar = function() {


				$('#mobile-sidebar-tab').show();
			
				// Handle click event on sidebar
				$('#mobile-sidebar-tab').click(function() {

					//$('#mobile-sidebar-list').toggle();
					$('#mobile-sidebar-tab-link img').toggle();
					
					if($('#mobile-sidebar').hasClass('active')){
						$('#mobile-sidebar').removeClass('active');
					} else {
						$('#mobile-sidebar').addClass('active');
					}
					
					return false;
				});

				// using hammer.js to handle swipe event for sidebar
				var hammer = new Hammer(document.getElementById("mobile-sidebar"));

				hammer.onswipe = function(ev) { 
				    if(ev.type == "swipe" && ev.direction == "left" ) {

				        if($('#mobile-sidebar').hasClass('active') !== true){
				            $('#mobile-sidebar').addClass('active');
				            $('#mobile-sidebar-tab-link img').toggle();
				        }

				    } else if(ev.type == "swipe" && ev.direction == "right") {

				        if($('#mobile-sidebar').hasClass('active')){
				            $('#mobile-sidebar').removeClass('active');
				            $('#mobile-sidebar-tab-link img').toggle();
				        }

				    }
				};


				// hide sidebar when clicking/scrolling outside sidebar
				var container = document.getElementById("content");

				container.addEventListener("touchstart", function(e) {

				    if($(e.target).parents(".article").length == 1 && $('#mobile-sidebar').hasClass('active')) {
				        $('#mobile-sidebar').hide();
				         $('#mobile-sidebar').removeClass('active');
				         $('#mobile-sidebar-tab-link img').toggle();
				         $('#mobile-sidebar').show();

				    }
				}, false);
		
		}
		
		/* hide-reveal for mobile sidebar */
		site.mobile.searchAndNav = function() {
			$('#mobile-search').hide();
			$('#search_cancel').hide();
			
			$('a.mob_nav').click(function() {
				$('#mobile-nav-list').toggle();
				$(this).toggle();
				$('a.mob_search').toggle();
				
				$(this).after('<a class="nav-link mob_search_cancel text" id="nav_cancel" href="#"><span>Cancel</span></a>');
						
				$('#nav_cancel').click(function() {
					$('#mobile-nav-list').toggle();
					$('#nav_cancel').remove();
					$('a.mob_search').toggle();
					$('a.mob_nav').toggle();
					
					return false;
				});
				
				return false;
			});
			
			$('a.mob_search').click(function() {
				$('#mobile-search').toggle();
				$(this).toggle();
				$('a.mob_nav').toggle();
				$('#mobile-navbar').toggleClass('navActive');
				
				
				$(this).after('<a class="nav-link mob_search_cancel text" id="search_cancel" href="#"><span>Cancel</span></a>');
				$("#search_box").focus();
						
				$('#search_cancel').click(function() {
					$('#mobile-search').toggle();
					$('#search_cancel').remove();
					$('a.mob_search').toggle();
					$('a.mob_nav').toggle();
					$('#mobile-navbar').toggleClass('navActive');
					
					return false;
				});
				
				return false;
			});
		
	}
	
site.mobile.searchShowOptions = function() {
	$('#mobile-search-top').hide();
		$('#mobile-search-toggle').click(function() {		
			$('#mobile-search-top').toggle();		
				$(this).children('img, span').toggle();	
				return false;	
			});
		
		$('.article-entry').click( function(){
		var articleURL = $(this).children('.article-title-block').find('a').attr('href');
		window.location = articleURL;
	});
}
	
	
		
		site.mobile.allCookies = {
		  getItem: function (sKey) {
			if (!sKey || !this.hasItem(sKey)) { return null; }
			return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		  },
		  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
			var sExpires = "";
			if (vEnd) {
			  switch (vEnd.constructor) {
				case Number:
				  sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
				  break;
				case String:
				  sExpires = "; expires=" + vEnd;
				  break;
				case Date:
				  sExpires = "; expires=" + vEnd.toGMTString();
				  break;
			  }
			}
			document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		  },
		  removeItem: function (sKey, sPath) {
			if (!sKey || !this.hasItem(sKey)) { return; }
			document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
		  },
		  hasItem: function (sKey) {
			return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		  },
		  keys: /* optional method: you can safely remove it! */ function () {
			var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
			for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
			return aKeys;
		  }
		};


		site.mobile.accordionToggle = function() {
			$('section h3, .toggle').live("click", function() {
			//$(this).siblings().toggleClass("collapsible-content");
			$(this).children("span.arrow").toggleClass("active");	
			if($(this).hasClass("collapser"))
			{
				$(this).siblings().toggleClass("collapsible-content-desktop");
			}
			else
			{
				$(this).siblings().toggleClass(".collapsible-content");
			}
				$(this).toggleClass(".active");
			});
		}
		
		// this  behaviour is in addition to initAffiliations() in articles.js
		site.mobile.affilliationsToggle = function() {
			$("p.authors sup a").click(function(e) {
					e.preventDefault();
					var ind = $(this).text();
					jQuery("#ins_container sup").parent().css("background-color","").eq(ind-1).css("background-color","lightGrey");
					$("#affiliations #ins_container").show();

				if($("#affiliations #ins_container").is(":hidden")) {
					$("#affiliations").find("h3").click();
				}

			});
		}

		
		/* get viewport width */
		site.mobile.viewport = function()
		{
			var viewportwidth;
			var viewportheight;
			// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
			if (typeof window.innerWidth != 'undefined')
			{
				viewportwidth = window.innerWidth,
				viewportheight = window.innerHeight
			}
			// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
			else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !='undefined' && document.documentElement.clientWidth != 0)
			{
				viewportwidth = document.documentElement.clientWidth,
				viewportheight = document.documentElement.clientHeight
			}
			// older versions of IE
			else
			{
				viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
				viewportheight = document.getElementsByTagName('body')[0].clientHeight;
			}
				return viewportwidth;
		}
		
		site.mobile.switchLayout = function()
		{
			var width=(site.mobile.viewport());
			//$(".logo").html(width);
			if(width < 800)
			{
				$("body").addClass("mobile-layout");
				if($(".top .collapsible-content-desktop"))
			{
				$(".top .collapsible-content-desktop").removeClass("collapsible-content-desktop").addClass("collapsible-content");
				$(".top h3").removeClass("active");
			}
			}
			else
			{
				$("body").removeClass("mobile-layout");
			}
		}
		
		/* resize figure thumbnail for mobile */
		site.mobile.thumbnailSize = function() {
			if($('body').hasClass('mobile'))
			{
				$('img.thumbnail').each(function(ind, elem){
					var src=elem.src;

					if(src)
					{
						elem.src=src.substring(0, src.lastIndexOf("."))+".jpg";
					}
				});
			}
		}
		
		site.mobile.viewtype = function() {
			var queryString=location.search;
			var params=queryString.substring(1).split('&');
			
			for(var i=0; i<params.length; i++) {
			
				var pair=params[i].split('=');
				var key=decodeURIComponent(pair[0]);
				var dec=decodeURIComponent(pair[1]);
				
				if(key == "fmt_view" && dec == "classic")
				{
					$("body").removeClass("mobile").addClass("classic");
				}
				if(key == "fmt_view")
				{
					site.mobile.allCookies.setItem("fmt_view",dec,150000, "/");
				}
			}
		}
		
		//display 'this journal' or journal name on search
		site.mobile.searchJournalName = function() {
			if(site.mobile.viewport() < 653){
				$('option:first-child').text('this journal');
			} else {
				$('option:first-child').text(site.name);
			};
		}
		

		/* pinch to zoom image enhancment */
		site.mobile.enhancefigures = function(element, event) {

			if(jQuery(element).hasClass("highres") !== true) {
				enhancethumbnail(element);
			}
				
				
			function enhancethumbnail(el) {
			
				// prevent multiple event firing on same thumbnail
				jQuery(el).addClass("highres");
					
				// high res image parameters
				var height = $(el).height() + "px", width = $(el).width() + "px";
				var f = el.src.split("figures/");
				f = f[1].split(".");
				f = "http://biomedcentral.com/content/figures/" + f[0] + "-l." + f[1];

					
				// loading icon
				var enhancingtext = $(el).siblings().first().text() || "Image";
				jQuery(el).after("<div class='enhancing' style='width:90px; height: 80px; background:#333; text-align: center; opacity: 0.9; position: relative; border-radius: 5px; float: left; margin-top: -" + (($(el).height()/2) + 40) + "px; margin-left:" + (($(el).width()/2) - 40) + "px;'><img src='/images/icons/spinner.gif' style='margin-top: 3px;'/><p style='color: white;  font-size: 7px; font-weight: bold; display: inline; position:absolute; top: 60px; left: 5px;  '>Enhancing " + enhancingtext + "</p></div>"); 
				
				
				// load high res image
				var g = $("<img class='thumbnail highres'/>").attr("src", f).attr("height", height).attr("width", width).load(function () {
					
					if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {

						// image load failed
						console.log("broken image!");
						jQuery(this).siblings(".enhancing").delay(1500).fadeOut("slow"); //spinner.stop();
						
					} else {
					
						// replace iimage
						jQuery(el).replaceWith(g);
						jQuery(this).siblings(".enhancing").delay(1500).fadeOut("slow"); //spinner.stop();
						
					}
				}).error(function () {
					// error
					console.log("Error: could not load high resolution image at " + this.src);
				});
				
			}

		}

window.onload = function() {
	try { // in case jquery is unavailable
	
			// override desktop javascript
			site.mobile.overrides();
				
			// mobile initialisation
			site.mobile.viewtype();
			site.mobile.cookie = site.mobile.allCookies.getItem("fmt_view") || window.bmcIsMobile;
			site.mobile.switchLayout();
			site.mobile.accordionToggle();
			site.mobile.thumbnailSize();
			site.mobile.searchJournalName();
		 
		 if(site.page == "searchresults") {
		 	site.mobile.searchShowOptions();
		 }			
						
			// adding arrows to accordion
			(function(){ $("section h3").prepend("<span class='arrow'></span>"); })();
			

		// execute mobile fulltext functions
		if(site.page == "fulltext" || site.page == "abstract") {
			// iOS events
			if(site.mobile.cookie == "mobile" && site.mobile.device.retina == true) {
			
				// remove pop-up behaviour
				$("img.thumbnail").unwrap("a");
			
				//  scroll event
				jQuery(window).bind("scroll", function (e) { 
					// when thumbnail enters viewport
					jQuery("img.thumbnail:in-viewport").each(function (a) {
						// if enhancescale 
						site.mobile.scale = Math.round(site.mobile.viewscale.getScale()) || 0;
						if((site.mobile.scale >= site.mobile.enhancescale)) {
							site.mobile.enhancefigures(this, "scroll");
						}
					});
				});
				
				// attach zoom event
				jQuery(document).bind("gestureend", function (e) { 
					// if enhancescale and event target is a thumbnail
					site.mobile.scale = Math.round(site.mobile.viewscale.getScale()) || 0;
					if((site.mobile.scale >= site.mobile.enhancescale) && (typeof e.target.src === "string" && e.target.src.match("figures") !== null)) {
						site.mobile.enhancefigures(e.target, "gestureend"); 
					}
				});

			}
			
			
				
			if(site.mobile.cookie == "mobile") {
				site.mobile.searchAndNav();
				site.mobile.affilliationsToggle();

				// mobile sidebar
				if((window.location.pathname.match("/qc/") == null)) {
					site.mobile.sidebar();
				}


			}
			
			jQuery(window).resize(function() {
				site.mobile.switchLayout();
			});
		}

		 if((site.page == "contactus") || (site.page == "contacts") || (site.page == "searchresults")) {
		 	site.mobile.searchAndNav();
		 }

		 // remove trailing mobile class when classic view is set
		 if(site.mobile.cookie != "mobile") {
		 	if($("body").hasClass("mobile")) {
		 		$("body").removeClass("mobile");
		 	}
		 }

		 $('section h3, .toggle').click(function() {
		
			$(this).siblings().toggleClass("collapsible-content");
			$(this).toggleClass("active");
		});


			
		
	} catch(error) {
	
		console.log(error);
		
	}
} 

