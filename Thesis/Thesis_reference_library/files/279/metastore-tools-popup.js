$(document).ready(function(){
	
	var iframe  = $("<iframe id='metastore-tools-popup'> </iframe>");
	$(iframe).css({"border":"0","padding":"0px","margin":"0"});
	
	$(".metastore-tools-trigger").click(function(){
		
		var type    = $(this).attr("resourcetype");
		var urlcontext = $(this).attr("urlcontext");
		var context = $(this).attr("resourcecontext");
		var url     = $(this).attr("itemurl");
		var redirectTo = $(this).attr("redirectto");
		var title   = $(this).attr("title");
		var action  = $(this).attr("resourceaction");

        if (urlcontext != '') {
                url     = urlcontext +url;
                redirectTo     = urlcontext +redirectTo;

        }
		
		url = url.split("?")[0].split(";")[0];

		if(action == 'Create') url+= '/create'
		if(action == 'Edit') url+= '/edit'
		if(action == 'Delete') url+= '/delete'
		
		url += '?&popup=true&portal=admin&context=' + context;
		if(action == 'Create') url += '&type=' + type;
		if($(this).attr("redirectto")) url += '&redirectTo=' + redirectTo;
			
		$("body").append(iframe);
		iframe.get(0).src = url;
		
		var iframeButtons = {
			Cancel: function() {
				$(this).dialog('close');
				//this.src = "about:blank";
			}
		}
		iframeButtons[action] = function() {
			var iframeContent = $("#metastore-tools-popup").get(0).contentWindow;
			if(iframeContent.UPLOADS_IN_PROGRESS>0){
				alert("Please wait until all uploads have completed before submitting the form");
				return;
			}
			iframeContent['$'](".facet-form,.delete-form").submit();
			return false;
			//$(this).dialog('close');
		};
		iframe.dialog({
			bgiframe: true,
			height: 490,
			width: 960,
			modal: true,
			title: title,
			buttons: iframeButtons,
			beforeclose: function(){
				return confirm("Are you sure you want to close this window? Any changes will be lost.")
			},
			close: function(){
				this.src = "about:blank"
				$(this).remove();
			}
		})
		iframe.css({"width":"935px"})
	})
})