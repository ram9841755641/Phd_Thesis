function validateLogin() {
	if(document.getElementById("userName").value=="" || document.getElementById("password").value=="") {
		document.getElementById("loginError").innerHTML = "Please enter a valid User Name and Password.";
		return false;
	}
	return true;
}

function validateAlertsLogin() {
	if(document.eaLogin.userName.value=="" || document.eaLogin.password.value=="") {
		document.getElementById("alertsLoginError").innerHTML = "Please enter a valid User Name and Password.";
		return false;
	}
	return true;
}

function validateLoginForDiagnosticPage() {
	if(document.getElementById("userName").value=="" || document.getElementById("password").value=="") {
		return false;
	}
	return true;
}

function validateRenewOnlineLogin() {
	if(document.renewLoginForm.userName.value=="" || document.renewLoginForm.password.value=="") {
		document.getElementById("renewOnlineloginError").innerHTML = "Please enter a valid User Name and Password.";
		document.getElementById("renewOnlineloginError").className = "alert errormsg";
		return false;
	}
	return true;
}
