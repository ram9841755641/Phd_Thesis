$(document).ready(function(){
		
	$(".searchoption").click(function(){
		if ($("#search-value1").val() != '')
		{
			if ($(this).hasClass("searchall"))
				$(".navitem_search #option1").val("tka");
			if ($(this).hasClass("searchtitle"))
				$(".navitem_search #option1").val("title");
			if ($(this).hasClass("searchpubtitle"))
			{
				$("#quicksearchform").append("<input type='hidden' name='database' value='2' />");				
				$("#quicksearchform").find("#option1").remove();
				$("#quicksearchform").append("<input type='hidden' name='title' value='" + $("#search-value1").val() + "' />");
				$("#quicksearchform").find("#search-value1").attr("name","x");
			}
			if ($(this).hasClass("searchauthor"))
			{
				$("#quicksearchform").append("<input type='hidden' name='option2' value='author' />");
				$("#quicksearchform").find("#option1").remove();
				$("#quicksearchform").append("<input type='hidden' name='value2' value='" + $("#search-value1").val() + "' />");
				$("#quicksearchform").find("#search-value1").attr("name","x");
			}
			if ($(this).hasClass("searchsubscriptions"))
				$("#quicksearchform").append("<input type='hidden' name='subscribed' value='true' />");
		
			$("#quicksearchform").submit();

		}
		else
			alert("Please enter a search term first before choosing a filter option");
		return false;
	});
	
	$("#subjectarea").mouseover(function(){
		$("#subjectlist").show();	
	});
	$("ul.toprightsidenav").mouseout(function(){
		$("#subjectlist").hide();	
	});
	
	$(".expandlinks").click(function(){
		if ($(this).find(".plus").hasClass("hide"))
		{
			$(this).find(".plus").removeClass("hide");
			$(this).find(".minus").addClass("hide");
			$(this).parent("span").parent("li").find(".expandable").slideUp();
		}
		else
		{
			$(this).find(".plus").addClass("hide");
			$(this).find(".minus").removeClass("hide");
			$(this).parent("span").parent("li").find(".expandable").slideDown();
		}
		return false;
	});
	$(".expandlinks").click();
	
	
	$(".filteroptions .allfilter").click(function(){
		$("#filterform").append("<input type='hidden' value='all' name='j_availability' />");
		$("#filterform").submit();
	});
	
	$(".filteroptions .subsfilter").click(function(){
		$("#filterform").append("<input type='hidden' value='subs' name='j_availability' />");
		$("#filterform").submit();
	});

	$(".filteroptions .freefilter").click(function(){
		$("#filterform").append("<input type='hidden' value='free' name='j_availability' />");
		$("#filterform").submit();
	});

	$(".searchoptionsbutton").click(function(){
		return false;
	});

	$(".printButton").click(function() {
		window.print();
        return false;
    });	
	
});

