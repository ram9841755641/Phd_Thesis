var thisref = document.referrer;
var herenow = location.href;
	 var metaArray = document.getElementsByName('citation_doi');
	if(metaArray.length >0){
		var thisdoi = metaArray[0].content;
		var metaArray1 = document.getElementsByName('citation_title');
		
		var thisurl = " ";
		var metaArray2 = document.getElementsByName('citation_abstract_html_url');
		if(metaArray2.length >0){
			thisurl = metaArray2[0].content;			
		}
		var thiscid = " ";
		var metaArray3 = document.getElementsByName('citation_id');
		if(metaArray3.length >0){
			thiscid = metaArray3[0].content;			
		}
		thisloc = window.location.href;
 		 document.write(unescape("%3Cscript src='http://www.cshsymposium.org/doi_testz_gd.php?cid=" + thiscid+ "&dx=" + thisdoi + "&rfx=" + thisurl  + "&loc=" + thisloc  +  "&artx=" + escape(herenow) +  "&fromw=" + escape(thisref) + "' type='text/javascript'%3E%3C/script%3E"));
	}
 




