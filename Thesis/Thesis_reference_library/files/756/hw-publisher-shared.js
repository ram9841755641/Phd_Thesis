gSiteOptions.suppressDockedNav=true;
gSiteOptions.noInlineFigExpand=true;
gSiteOptions.setColSizes=false;
gSiteOptions.suppressRefPopups=true;
gSiteOptions.refLinksNewWindow=true;
gSiteOptions.noPDFExtractExpand=true;
gSiteOptions.suppressFloatingAbs=30;
$(document).ready(function() {
	href = $("a.request-permissions").attr("href");
	$("a.request-permissions").click(function(ev){
		window.open(href,
		'Request Permission','location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=550');
		ev.preventDefault();
		return false;
  });
});

function prtflo_click(){ u = location.href; t = document.title;var obj = document.getElementById("addToPortfolio"); if(obj != null){ t = obj.innerHTML; }var objUrl = document.getElementById("addUrlToPortfolio");if(objUrl != null){ u = objUrl.href; } var windowFeatures = "height=500,width=790,status=0,left=" + parseInt((screen.availWidth/2) - 310) + ",top=50,scrollbars=yes" ; window.open("http://portfolio.bmj.com/portfolio/add-to-portfolio.html?t=" + encodeURIComponent(t) + "&u=" + encodeURIComponent(u),"sharer",windowFeatures);return false;}