<!--
$(document).ready(function() {
// add editors to non-custom subj coll pages
var edstr = "";
var mycollx = "";
var edstr0 = "Editors";
if ($(".no-prev-or-next").length > 0){
mycollx = $(".no-prev-or-next").html();
mycollx = mycollx.toLowerCase();
}
if ($(".proxied-collections").length > 0){
  if ($(".no-prev-or-next").length > 0){
switch(mycollx)
{
case "addiction":
  edstr = "R. Christopher Pierce, and Paul J. Kenny";
  break;

case "angiogenesis":
  edstr = "Michael Klagsbrun, and Patricia D'Amore";
  break;

case "cystic fibrosis":
  edstr = "John R. Riordan, Richard C. Boucher, and Paul M. Quinton";
  break;

case "hemoglobin and its diseases":
  edstr = "David Weatherall, Alan N. Schechter, and David G. Nathan";
  break;


case "hiv":
  edstr = "Frederic D. Bushman, Gary J. Nabel, and Ronald Swanstrom";
  break;

case "parkinson\'s disease":
  edstr = "Serge Przedborski";
  edstr0 = "Editor";
  break;

case "the biology of alzheimer disease":
  edstr = "Dennis J. Selkoe, Eckhard Mandelkow, and David M. Holtzman";
  break;
    
case "bacterial pathogenesis":
  edstr = "Pascale Cossart and Stanley Maloy";
  break;
 
case "the biology of heart disease":
  edstr = "Margaret Buckingham, Christine L. Mummery, and Kenneth R. Chien";
  break;
    
case "transplantation":
  edstr = "Laurence A. Turka and Kathryn J. Wood";
  break;

case "type i diabetes":
  edstr = "Jeffrey A. Bluestone, Mark A. Atkinson, and Peter R. Arvan";
  break;
default:
  edstr = "";
}

                $('.results-count').before( "<p style='padding-top:0px;padding-bottom:0px;padding-left:0px;'><b>" + edstr0 + ": </b>" + edstr + "</div>" );
    //$('.proxied-collections:first-child h1:first-child').append("<p>more text</p>");
  }
}
// end add editors



  
$('div.gca-buttons:not(:first):not(:last)').remove();

   elem = $("#content-block"); 

var mycoll = 'none';

  
  $("#cb-art-col a") 
   .each(function() 
   {  
  mycoll = this.innerHTML
   // alert(mycoll + " x: " + this.href); 
   });
  
if (!(mycoll == "none")){getcoll();}
function getcoll() {
mycoll = mycoll.toLowerCase();
var exp = / /gi;
mycoll = mycoll.replace("'","")
mycoll = mycoll.replace( exp, '_' );
var exp1 = /__/gi;
mycoll = mycoll.replace( exp1, '_' );

var cc = '/cgi/collection/rss?coll_alias=' + mycoll;
      //use the JQuery get to grab the URL from the selected item, put the results in to an argument for parsing in the inline function called when the feed retrieval is complete
       
      $.get(cc, function(d) {
is_abstract = 0;

                 if ((location.href.indexOf('short') !=-1)|| (location.href.indexOf('abstract') !=-1))
{
  is_abstract = 1;
}
    var browserName=navigator.appName; 

        html ='';
        //find each 'item' in the file and parse it
        
$(d).find('item').each(function() {
        
          //name the current found item this for this particular loop run
          var $item = $(this);
          // grab the post title
          var title = $item.find('title').text();
//alert(title);
title=title.replace(/\[(.*)/g,'');
          title=title.replace(/\[(.*)\]/g,'');
 if (browserName=="Microsoft Internet Explorer"){
expc = /"/gi;
title = title.replace( expc, '' );
}

          // grab the post's URL
          var link = $item.find('link').text();
          // next, the description
          var description = $item.find('description').text();
          var j = 0;
          var strToAppend = "";
          
          
          //don't forget the pubdate
          var pubDate = $item.find('pubDate').text();
var authors = $item.find('dc\\:creator').text();
          
          // now create a var 'html' to store the markup we're using to output the feed to the browser window
          html += '<li style="padding-bottom:4px;"><a href="'  + link + '" title="'  + title + '"  >'  + title +   '</a>';
          html += '<br>' + authors + '</li>';
          
          //put that feed content on the screen!
                   });

 
if (is_abstract == 1)

{
html += '<br><br>';

  document.getElementById('coll_list_abstract').innerHTML = html;
 $('#article-cb-mainx').hide();
}
else {
      document.getElementById('coll_list').innerHTML = html;
     }
 
      });
}
$("a[href='/cgi/collection/the_biology_of_alzheimer_disease']").attr('href', '/site/misc/the_biology_of_alzheimer_disease.xhtml');
$("a[href='/cgi/collection/type_i_diabetes']").attr('href', '/site/misc/type_i_diabetes.xhtml');
$("a[href='/cgi/collection/parkinsons_disease']").attr('href', '/site/misc/parkinsons_disease.xhtml');  
$("a[href='/cgi/collection/hiv']").attr('href', '/site/misc/hiv.xhtml'); 
$("a[href='/cgi/collection/angiogenesis']").attr('href', '/site/misc/angiogenesis.xhtml');
});


-->