// JavaScript Document

// fly out menu 
$(function() {

$('.navigation').on('click', 'a[href="#"]', function() {
    var submenu = $(this).next('ul');
    submenu.parentsUntil('.navigation', 'ul').show().end().toggle();
    return false;
});

$(document).click(function() {
    $('.navigation ul ul').hide();
});


});

	 // tab menus 
$(document).ready(function () {
				
	$('#menu').tabify();
				
	$('#menu2').tabify();
				
// fixes this issue navigation on page scroll
if ($('#commentWrapper').length) {
 var top = ($('#commentWrapper').offset().top - parseFloat($('#commentWrapper').css('marginTop').replace(/auto/,0))) + 200;
  $(window).scroll(function (event) {
    // what the y position of the scroll is
    var y = $(this).scrollTop();
    // whether that's below the form
    if (y >= top) {
      // if so, ad the fixed class
      $('#commentWrapper').addClass('fixed');
    } else {
      // otherwise remove it
      $('#commentWrapper').removeClass('fixed');
    }
  });
}
		

// <!-- placeholder text -->

if(!Modernizr.input.placeholder){

	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});

}


});




