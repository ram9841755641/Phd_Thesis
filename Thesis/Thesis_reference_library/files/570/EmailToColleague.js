function clearEmailToColleagueText() {

    if (emailMessage != null) {
        emailMessage.value = '';
        if (typeof getMailMessage == 'function' && getMailMessage != undefined) {
            emailMessage.value = getMailMessage();
        }
    }

    if (yourName != null) {
        yourName.value = '';
    }

    if (yourEmail != null) {
        yourEmail.value = '';
    }

    if (colleagueEmail != null) {
        colleagueEmail.value = '';
    }

    if (btnSend != null) {
        btnSend.disabled = false;
    }
    if (chkSendMeCopy.checked) {
        chkSendMeCopy.checked = false;
    }
}


function clearEmailToColleagueTextLogin() {

    if (emailMessage != null) {
        emailMessage.value = '';
        if (typeof getMailMessage == 'function' && getMailMessage != undefined) {
            emailMessage.value = getMailMessage();
        }
    }

     if (yourName != null) {

        yourName.value = firstName;
    }
      

    if (yourEmail != null) {
        yourEmail.value = email;
     }



    if (colleagueEmail != null) {
        colleagueEmail.value = '';
    }

    if (btnSend != null) {
        btnSend.disabled = false;
    }
    if (chkSendMeCopy.checked) {
        chkSendMeCopy.checked = false;
    }
}
function validateSendEmail()
{
    if(yourEmail.value == '') {
        divErrorMessage.style.display = 'block';
        lblErrorMessage.innerHTML = 'Please enter Your Email';
        //alert('Please enter Your Email');
        yourEmail.focus();
        return false;
    }

    if (colleagueEmail.value == '') {

        if (lblColleaguesEmail.innerHTML == "Friend's Email:") {
            divErrorMessage.style.display = 'block';
            lblErrorMessage.innerHTML = 'Please enter Friend\'s Email';
           // alert("Please enter Friend's Email");
        }
        else {
            divErrorMessage.style.display = 'block';
            lblErrorMessage.innerHTML = 'Please enter Colleague\'s Email';
            //alert("Please enter Colleague's Email");
        }
        
        colleagueEmail.focus();
        return false;
    }
    
    if(emailMessage.value == '') {
        divErrorMessage.style.display = 'block';
        lblErrorMessage.innerHTML = 'Please enter the message.';
        //alert('Please enter the message.');
        emailMessage.focus();
        return false;
    }
    if((getEmailRegularExpression() != null) && !(getEmailRegularExpression().test(yourEmail.value)))
    {
        divErrorMessage.style.display = 'block';
        lblErrorMessage.innerHTML = 'Your E-mail is Invalid.';
        yourEmail.focus();
        yourEmail.select();
        return false; 
    }
    if((getMultipleEmailsRegularExpression() != null) && !(getMultipleEmailsRegularExpression().test(colleagueEmail.value)))
    {
        divErrorMessage.style.display = 'block';
        lblErrorMessage.innerHTML = "Colleague's E-mail is Invalid.";
        colleagueEmail.focus();
        colleagueEmail.select();
        return false; 
    }
    divErrorMessage.style.display = 'none';
    hiddenEmailToColleague.value = 'true';
    return true;
}
function closeWindow() {
    if (hiddenIsUser.value == '') {
        clearEmailToColleagueText();
    }
    else {
        clearEmailToColleagueTextLogin();
    }
    if (getEmailPopup() != null) {
        divErrorMessage.style.display = 'none';
        getEmailPopup().hide();
    }
    showMainEmailPanel();
}
function showMainEmailPanel()
{
    pnlMainEmail.style.display = 'block';
    pnlSuccessMessageEmail.style.display = 'none';
    pnlErrorMessage.style.display = 'none';
}

