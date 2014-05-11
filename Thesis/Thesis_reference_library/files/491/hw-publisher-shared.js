/* publisher-level JS configuration, overrides, and utility functions */

function localColMinF(colJQueryEl, colnum) {
	colJQueryEl.append('<div class="corner_top_left"></div><div class="corner_top_right"></div><div class="corner_bottom_left"></div><div class="corner_bottom_right"></div>');
}

$(document).ready(function () {
	if (!document.location.toString ().match (/freetrial/)) {
	var email_surrogate = $("input[name='email_surrogate']");
	var submit_button = $("input[type='submit']");
	var recipient = $("input[name='recipient']");
	if (email_surrogate && submit_button && recipient) {
		submit_button.click (function () {
			$(".FormErrorMessage").html ("");
      			var req_fields = $(".req_field");
			var ret = true;
			$(req_fields).each (function () {
				var v = (this.tagName=="INPUT")?$(this).val ().trim ():$(this).val ().trim ();
				if (v == null||v=="") {
					$(".FormErrorMessage").html ("Please fill in the required information.");
					$(this).addClass("Error").one ("focus", function () {
						$(this).removeClass("Error");
					});
					ret = false;
				}
			});
			if (ret) {
				 var e = email_surrogate.val();
       		                 e = recipient.val() + ',' + e ;
                       		 recipient.val(e);
			}
			else {
				return false;
			}
			return ret;
		});
	}
	}
	$("div.reg_request_form input[type=checkbox][class=ss-q-checkbox]").click(function() {
	var bol = $("div.reg_request_form input[type=checkbox][class=ss-q-checkbox]:checked").length >= 2;
	$("div.reg_request_form input[type=checkbox][class=ss-q-checkbox]").not(":checked").attr("disabled",bol);
	}); 
});
