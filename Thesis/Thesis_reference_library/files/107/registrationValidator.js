
function validateCustomerNumber(customerNumber , errMessage){
return validateCustomerNumberInputField(customerNumber, 1, customerNumber + '_error', errMessage);
}

function validateUserName(userName , errMessage) {
	return validateInputField(userName, 6, userName + '_error', errMessage);
}

function validateAffiliation(affiliation , errMessage) {
	var trimmedFieldValue = new String(document.getElementById(affiliation).value);
	if(trimmedFieldValue.length < 1 || trimmedFieldValue == "Institution Name") {
		setErrorMessage(affiliation, errMessage);
	} else {
		removeErrorMessage(affiliation);
	}
}

function validateRegisterUserName(userName , errMessage) {
	var trimmedFieldValue = new String(trim(document.getElementById(userName).value));
	if(trimmedFieldValue.length < 6  ) {
		setErrorMessage(userName,errMessage);
		return false;
	} 
	else{ 
		if(trimmedFieldValue.indexOf(" ") != -1){
			document.getElementById(userName + '_error').innerHTML = "User Name cannot contain spaces.";
			return false;
		}
		else {
			if(document.getElementById(userName + '_error').innerHTML != "")
				removeErrorMessage(userName);
			return true;
		}
	}
}
function setErrorMessage(errorDivId,errorMessage)
{
	if (document.getElementById(errorDivId + '_error')) {
	document.getElementById(errorDivId + '_error').innerHTML = errorMessage;
	}
	if (document.getElementById('formLevel_error')) {
		document.getElementById('formLevel_error').innerHTML = 'Please correct the errors displayed in red below and resubmit the form.';
		document.getElementById('formLevel_error').className = 'alert registerwide errormsg';
	}
}

function removeErrorMessage(errorDivId)
{
	if (document.getElementById(errorDivId + '_error')) {
		document.getElementById(errorDivId + '_error').innerHTML = "";
	}
	if (document.getElementById('formLevel_error')) {
		document.getElementById('formLevel_error').innerHTML = "";
		document.getElementById('formLevel_error').className = "";
	}
}

function validatePassword(password , errMessage) {
 
	if(validateInputField(password, 6, password + '_error', errMessage ))
	return validateInputFieldByCharacters(password, "Please enter a valid password. The password can only contain letters and numbers (a-z, A-Z, 0-9). Special characters and symbols are not allowed.", password + '_error');
	else
		return false;
}

function validateResetPassword(password , errMessage) { 
		if(validateInputFieldForSimpleForms(password, 6, password+'_error', errMessage))
     	return validateInputFieldForPasswordChange(password, "Please enter a valid password. The password can only contain letters and numbers (a-z, A-Z, 0-9). Special characters and symbols are not allowed.", password + '_error');
		else
			return false;
}

function validateOriginalPasswordField(password , errMessage) {
	return validateInputFieldForSimpleForms(password, 1, password+'_error', errMessage);	
}


function validateResetConfirmPassword(password) {
	if(document.getElementById(password).value != document.getElementById('confirmPassword').value) {
		document.getElementById('confirmPassword_error').className="alert errormsg";
		document.getElementById('confirmPassword_error').innerHTML = "Please ensure the passwords match.";
		return false;
	} else {
		if(document.getElementById('confirmPassword_error').innerHTML != "") {
			document.getElementById('confirmPassword_error').innerHTML = "";
			document.getElementById('confirmPassword_error').className="";
		}
		return true;
	}
}

function validateConfirmPassword(password) {
	if(document.getElementById(password).value != document.getElementById('confirmPassword').value) {
			document.getElementById('confirmPassword_error').innerHTML = "Please ensure the Passwords match.";
		return false;
	} else {
		if(document.getElementById('confirmPassword_error').innerHTML != "")
			document.getElementById('confirmPassword_error').innerHTML = "";
		return true;
	}
}

function validateFirstName() {
	return validateInputField('firstName', 1, 'firstName_error', 'Please enter your first name.');
}

function validateLastName(lastName , errMessage) {
	return validateInputField(lastName, 1, lastName + '_error', errMessage);
}

function validateNameForFeedback(name , errMessage) {
	return validateInputField(name, 1, name + '_error', errMessage);
}

function validateSubject(subject, errMessage) {
	return validateInputField(subject, 1, lastName + '_error', errMessage);
}
function validateLastNameForSimpleForms(lastName , errMessage) {
	return validateInputFieldForSimpleForms(lastName, 1, lastName + '_error', errMessage);
}

function validateTitleId() {
	return validateSelectField('titleId', 'titleId_error', 'Please select your title.');
}

function validateCountryId() {
	return validateSelectField('countryId', 'countryId_error', 'Please select your country.');
}
function validatejobTitleId() {
	return validateSelectField('jobTitleId', 'jobTitleId_error', 'Please select your job title.');
}
function validateworkSettingId() {
	return validateSelectField('workSettingId', 'workSettingId_error', 'Please select your work setting.');
}
function validateprincipalFieldId() {
	return validateSelectField('principalFieldId', 'principalFieldId_error', 'Please select your principal field.');
}

function validateEmailAddress() {
	if(validateInputField('emailAddress', 1, 'emailAddress_error', 'Please enter your email address.')) {
		return validateEmailField('emailAddress', 'emailAddress_error', 'Please enter a valid email address.');
	}
	return false;
}

function validateEmailAddressForSimpleForms()
{
	if(validateInputFieldForSimpleForms('emailAddress', 1, 'emailAddress_error', 'Please enter your email address.')) {
		return validateEmailFieldForSimpleForms('emailAddress', 'emailAddress_error', 'Please enter a valid email address.');
	}
	return false;
}

function validateActivateClaimInputField(fieldName , fielderrMessage) {
	return validateActivateInputField(fieldName, 1, fieldName + '_error', fielderrMessage);
}

function validateActivateClaimInputFieldForSimpleForms(fieldName , fielderrMessage) {
	return validateActivateInputFieldForSimpleForms(fieldName, 1, fieldName + '_error', fielderrMessage);
}
function validateRegistrationFields() {
	var valid = true;
	if (!validateCustomerNumber('customerNumber','Please enter your Customer Number.')) valid = false;
	if (!validateRegisterUserName('registrationUsername','Please enter a User Name that is at least 6 characters long.')) valid=false;
	if (!validatePassword('registrationpassword','Please enter a Password that is at least 6 characters long.')) valid=false;
	if (!validateFirstName()) valid=false;
	if (!validateLastName('lastName','Please enter your last name.')) valid=false;
	if (!validateEmailAddress()) valid=false;
	if (!validateTitleId()) valid=false;
	if (!validateCountryId()) valid=false;
	if (!validatejobTitleId()) valid=false;
	if (!validateprincipalFieldId()) valid=false;
	if (!validateworkSettingId()) valid=false;
    if (!validateConfirmPassword()) valid=false;
    return valid;
	
} 

function validateChangePasswordFields() {
	var valid = true;
	var trimmedFieldValue = new String(trim(document.getElementById('original').value));
	if(!trimmedFieldValue.length>0)
	{
			originalerrormsg = "Please enter your Original Password.";
	}
	trimmedFieldValue = new String(trim(document.getElementById('newPassword').value));
	if(trimmedFieldValue.length>0)
	{
		newpassworderrormsg = "Please enter New Password that is at least 6 characters long.";
	}
	else
	{
		newpassworderrormsg = "Please enter your New Password.";
	}
	
	if (!validateOriginalPasswordField('original',originalerrormsg)) valid=false;
	if (!validateResetPassword('newPassword',newpassworderrormsg)) valid=false;
	if (!validateResetConfirmPassword('newPassword')) valid=false;
	return valid;
}


function validateForgotPasswordFields(){
	var valid = true;
	document.getElementById('errorMessage_error').innerHTML = "";
	document.getElementById('errorMessage_error').className = "";
	if (!validateLastNameForSimpleForms('lastName','Please enter your last name.')) valid=false;
	if (!validateEmailAddressForSimpleForms()) valid=false;
    return valid;
}
function validateEmailAddressForForgotPassword()
{
	document.getElementById('errorMessage_error').innerHTML = "";
	document.getElementById('errorMessage_error').className = "";
	if(validateInputFieldForSimpleForms('emailAddress', 1, 'emailAddress_error', 'Please enter your email address.')) {
		return validateEmailFieldForSimpleForms('emailAddress', 'emailAddress_error', 'Please enter a valid email address.');
	}
	return false;
}
function validateLastNameForForgotPassword(lastName , errMessage) {
	document.getElementById('errorMessage_error').innerHTML = "";
	document.getElementById('errorMessage_error').className = "";
	return validateInputFieldForSimpleForms(lastName, 1, lastName + '_error', errMessage);
}
function validateActivateClaimFields() {
	var valid = true;
	if (!validateCustomerNumber('activateCustomerNumber','Please enter your Customer Number.')) valid = false;
	if (!validateUserName('activateUserName','Please enter your User Name.')) valid=false;
	if (!validatePassword('activatePassword','Please enter your Password.')) valid=false;
	if (!validateLastName('activateLastName','Please enter your Last Name.')) valid=false;
	return valid;
	
}

