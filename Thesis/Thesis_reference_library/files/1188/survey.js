/* This is an attempt to comment out the popup

$(document).ready(function() {

var q_viewrate=20;
if (Math.random() < q_viewrate / 100){var q_popup_f = function(){var q_script = document.createElement("script");var q_popup_g = function(){new QualtricsEmbeddedPopup({
    id: "SV_0kSjL39NDRAxEH2",
    imagePath: "http://qdistribution.qualtrics.com/WRQualtricsShared/Graphics/",
    surveyBase: "https://qtrial.qualtrics.com/WRQualtricsSurveyEngine/",
    delay:500,
    preventDisplay:5,
    animate:true,
    width:400,
    height:300,
    surveyPopupWidth:900,
    surveyPopupHeight:600,
    startPos:"ML",
    popupText:"Please take a moment to participate in this ASM Journals survey.",
    linkText:"Click Here"
});};q_script.onreadystatechange= function () {if (this.readyState == "loaded") q_popup_g();};q_script.onload= q_popup_g;q_script.src="http://qdistribution.qualtrics.com/WRQualtricsShared/JavaScript/Distribution/popup.js";document.getElementsByTagName("head")[0].appendChild(q_script);};if (window.addEventListener){window.addEventListener("load",q_popup_f,false);}else if (window.attachEvent){r=window.attachEvent("onload",q_popup_f);}else {};};

});

*/