//<![CDATA[
// JavaScript Document

//Contents for menu 1
var menu1=new Array()

menu1[0] = '<a href="' + journalCurrentUrl + '" >Current</a>'

menu1[1] = '<a href="' + journalArchivesUrl + '">Archives</a>'
menu1[2] = '<a href="' + journalAllUrl + '">All</a>'

//Contents for menu 2, and so on
var menu2=new Array()

menu2[0] = '<a href="' + bookLatestReleaseUrl + '" >New Titles</a>'
menu2[1] = '<a href="' + bookAllUrl + '">All</a>'

var menu3=new Array()
//menu3[0] = '<a href="' + subscribeUrl + '">Subscribe</a>'
menu3[0] = '<a href="http://www.rsc.org/publishing/journals/forms/profile.asp" target="_blank">Subscribe</a>'
menu3[1] = '<a href="' + rssFeedsUrl + '">RSS Feeds</a>'

var menu4=new Array()
menu4[0]='<a href="' + faqUrl + '">FAQ</a>'
menu4[1]='<a href="http://www.rsc.org/aboutus/contacts/" target="_blank">Contact Us</a>'
menu4[2]='<a href="http://www.rsc.org/publishing/aboutrscpublishing.asp" target="_blank">About RSC Publishing</a>'

var menu7=new Array()
menu7[0]='<a href="http://www.rsc.org/aboutus/contacts/" target="_blank">Contact Us</a>'
menu7[1]='<a href="http://www.rsc.org/publishing/aboutrscpublishing.asp" target="_blank">About Us</a>'


var menu5=new Array()
menu5[0]='<a href="http://www.rsc.org/publishing/librarians/ourproducts.asp" target="_blank">Journals Pricing</a>'
menu5[1]='<a href="http://www.rsc.org/publishing/librarians/ourproducts.asp" target="_blank">Books Pricing</a>'
menu5[2]='<a href="http://www.rsc.org/publishing/librarians/consortia.asp" target="_blank">Consortia Information</a>'


var menu6=new Array()
menu6[0]='<a href="'+CreateSalesMgrUrl+'" >Sales Manager</a>'
menu6[1]='<a href="'+LibApprovalUrl+'" >Approve Librarians</a>'
menu6[2]='<a href="'+PublishingSocietyUrl+'" >Partner Societies</a>'
menu6[3]='<a href="'+PublishingSocietyLinkingUrl+'" >Societies Mapping</a>'

var othersMenu = new Array()
othersMenu[0] = '<a href="http://www.rsc.org/publishing/currentawareness/index.asp" target="_blank">A&I Databases</a>'
othersMenu[1] = '<a href="http://blogs.rsc.org" target="_blank">Blogs</a>'
othersMenu[2] = '<a href="http://www.rsc.org/chemistryworld" target="_blank">Chemistry World</a>'
othersMenu[3] = '<a href="http://www.rsc.org/education/eic/index.asp" target="_blank">Education in Chemistry </a>'
othersMenu[4] = '<a href="http://www.chemspider.com" target="_blank">ChemSpider</a>'
othersMenu[5] = '<a href="http://www.rsc.org/Publishing/Journals/OpenScience/index.asp" target="_blank">Open Access</a>'
othersMenu[6] = '<a href="http://www.rsc.org/Advertising/index.asp" target="_blank">Advertising</a>'
othersMenu[7] = '<a href="http://www.rsc.org/Advertising/index.asp" target="_blank">Partnerships</a>'


var menuwidth='184px' //default menu width
var menubgcolor='lightyellow'  //menu bgcolor
var disappeardelay=250  //menu disappear speed onMouseout (in miliseconds)
var hidemenu_onclick="yes" //hide menu when user clicks within menu?

/////No further editting needed

var ie4=document.all
var ns6=document.getElementById&&!document.all

if (ie4||ns6)
document.write('<div id="dropmenudiv1" style="visibility:hidden;width:'+menuwidth+'" onMouseover="clearhidemenu()" onfocus="clearhidemenu()" onblur="dynamichide(event)" onMouseout="dynamichide(event)"></div>')

function getposOffset(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
}

function showhide(obj, e, visible, hidden, menuwidth){
if (ie4||ns6)
dropmenuobj.style.left=dropmenuobj.style.top="-500px"
if (menuwidth!=""){
dropmenuobj.widthobj=dropmenuobj.style
dropmenuobj.widthobj.width=menuwidth
}
if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover")
obj.visibility=visible
else if (e.type=="click")
obj.visibility=hidden
}

function iecompattest(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
var edgeoffset=0
if (whichedge=="rightedge"){
var windowedge=ie4 && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
}
else{
var topedge=ie4 && !window.opera? iecompattest().scrollTop : window.pageYOffset
var windowedge=ie4 && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure){ //move up?
edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight
if ((dropmenuobj.y-topedge)<dropmenuobj.contentmeasure) //up no good either?
edgeoffset=dropmenuobj.y+obj.offsetHeight-topedge
}
}
return edgeoffset
}

function populatemenu(what){
if (ie4||ns6)
{
   
    dropmenuobj.innerHTML=what.join("")
}
}


function dropdownmenu(obj, e, menucontents, menuwidth){
if (window.event) event.cancelBubble=true
else if (e.stopPropagation) e.stopPropagation()
clearhidemenu()
dropmenuobj=document.getElementById? document.getElementById("dropmenudiv1") : dropmenudiv1
populatemenu(menucontents)

if (ie4||ns6){
showhide(dropmenuobj.style, e, "visible", "hidden", menuwidth)

dropmenuobj.x=getposOffset(obj, "left")
dropmenuobj.y=getposOffset(obj, "top")
dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+"px"
dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"


}

return clickreturnvalue()
}

function clickreturnvalue(){
if (ie4||ns6) return false
else return true
}

function contains_ns6(a, b) {
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
}

function dynamichide(e){
if (ie4&&!dropmenuobj.contains(e.toElement))
delayhidemenu()

else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget))
delayhidemenu()
}

function hidemenu(e){
if (typeof dropmenuobj!="undefined"){
if (ie4||ns6)
dropmenuobj.style.visibility="hidden"
}
}

function delayhidemenu(){
if (ie4||ns6)
delayhide=setTimeout("hidemenu()",disappeardelay)
}

function clearhidemenu(){
if (typeof delayhide!="undefined")
clearTimeout(delayhide)
}

if (hidemenu_onclick=="yes")
document.onclick=hidemenu


 //]]>   
