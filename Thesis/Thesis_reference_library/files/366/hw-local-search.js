/* search page checkbox function */
$(document).ready(function() {

	/* standard search */
	var mjFormSelects = $("form ul.mj-select li").not(".mj-select-all").find("input");
	var mjFormSelectAll = $("form ul.mj-select li.mj-select-all input");
	if (mjFormSelects.length && mjFormSelectAll.length) {
		mjFormSelectAll.click(
			function() {
				if (($(this).attr("checked") != 'checked')) {
					mjFormSelects.each(
						function() {
							$(this).attr("checked",false);
						}
					);
				}
			}
		);
		mjFormSelects.click(
			function() {
				mjFormSelectAll.each(
					function() {
						$(this).attr("checked",false);
					}
				);
			}
		);
	}
	
	/* search figures and tables */
	var mjFormFigSelects = $("form ul.mj-select-figures-and-tables li").not(".mj-select-all").find("input");
	var mjFormFigSelectAll = $("form ul.mj-select-figures-and-tables li.mj-select-all input");
	if (mjFormFigSelects.length && mjFormFigSelectAll.length) {
		mjFormFigSelectAll.click(
			function() {
				if (($(this).attr("checked") != 'checked')) {
					mjFormFigSelects.each(
						function() {
							$(this).attr("checked",false);
						}
					);
				}
			}
		);
		mjFormFigSelects.click(
			function() {
				mjFormFigSelectAll.each(
					function() {
						$(this).attr("checked",false);
					}
				);
			}
		);
	}
	
});
