function ResetFeedbackForm()
{
    $("#FeedBack_Form").reset();
    $("#FeedBack_Form span.field-validation-error").each(function() {
        $(this).hide();
    })  
    $('input[title!=""]').hint();
    $("#feebackErrorDiv").html('');
      $("#feebackErrorDiv").css({
            "color": "#a20f08"
        });
    $("#feebackErrorDiv").hide();
    
}
function loadFeedbackPopup() {
    //loads popup only if it is disabled
    if (FeedbackPopupStatus == 0) {
        $("#FeedbakBackgroundPopup").css({
            "opacity": "0.25","background-color":"#000"
        });
        $("#FeedbakBackgroundPopup").show();
        $("#divFeedbackPopUp").show();               
        FeedbackPopupStatus = 1;   
       $('textarea[name=FeedbackData.Comments]').focus();
    }
}
function disableFeedbackPopup() {
    //disables popup only if it is enabled    
    if (FeedbackPopupStatus == 1) {   
        ResetFeedbackForm();
        $("#FeedbakBackgroundPopup").hide();      
       $("#divFeedbackPopUp").hide(); 
        FeedbackPopupStatus = 0;
    }
}
function FeedbackPopupPositioning() {   
    var windowHeight = $(document).height();
    var windowWidth = $(document).width();
    $("#FeedbakBackgroundPopup").css({
         "height": windowHeight-10,"width":windowWidth-50
    });
}
function PreSubmitFeedback(formData, jqForm, options){            
    if (!$(jqForm).valid())   
    {   
        return false;
        }
        $("#feebackErrorDiv").html('');
        $("#feebackErrorDiv").hide();
}
function CallbackFeedback(responseText, statusText){    
    
    var src = $("#captchaImage").attr("src").split('?')[0];
    $("#captchaImage").removeAttr("src").attr("src", src +'?'+Math.random());
    if(responseText.indexOf('Success|') > -1)
    {        
        $("#feebackErrorDiv").hide();
        disableFeedbackPopup();     
    }
    else    
    {   
        $("#feebackErrorDiv").html("Security Code - Couldn't verify the security code. Please try again.");
        $("#feebackErrorDiv").show();
    }
}

function FeedbackFormReady(){
 }
 
 
 
function MasterReady_Feedback()
{
    $(document).ready(function() {
        $("#divFeedbackPopUp").bgiframe();
    
        $(function() {
            $('input[type="text"]').hint();
        });

        $(document).ready(function() {    
        var options = {    
            beforeSubmit: PreSubmitFeedback,     
            success:       CallbackFeedback  // post-submit callback
        }; 
        $('#FeedBack_Form').ajaxForm(options);    
        $("#btnReset").click(function() {
                 ResetFeedbackForm();
            });
        });    
        $("#lnkFeedbackPopUpClose").click(function(e) {
                e.preventDefault();
                disableFeedbackPopup();
        });
         $("#btnOkFeedback").click(function() {            
                disableFeedbackPopup();
        });
    
    
        $("#lnkFeedBack").click(function(e){
            e.preventDefault();
            var lnkFeedbackOffset =  $(this).offset();       
           //var divFeedbackPopUp = $(this).parent('div').next("#divFeedbackPopUp");
            loadFeedbackPopup();
//            $("#divFeedbackPopUp").load(urlFeedbackGet);
            FeedbackPopupPositioning();
            $("#divFeedbackPopUp").css({"top": lnkFeedbackOffset.top+11,"left": lnkFeedbackOffset.left-200});
        });
        $("#FeedbakBackgroundPopup").click(function() {
            disableFeedbackPopup();
        });
        $(document).keypress(function(e) {
            if (e.keyCode == 27 && FeedbackPopupStatus == 1) {
                disableFeedbackPopup();
            }
        });
       
    });
 }