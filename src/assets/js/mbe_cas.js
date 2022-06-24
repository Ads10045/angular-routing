var loginsAlias = [];
function getParam( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
	var domain= getCookieDomain();
	if(exdays != 0) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue+ ';' + expires + ";domain="+ domain + ";path=/";
    } else {
        document.cookie = cname + "=" + cvalue + ";domain="+ domain + ";path=/";
    }
}

function getCookieDomain(){
	var domains=document.location.hostname.split(".");
	if (domains.length > 1){//localhost
		//remove cert
		if (domains[0] == "cert"){
		    domains[0]= "";
		}else{
			//add empty to add .
			domains.unshift("");
		}
	}
	return domains.join(".");
	
}

//language, langue du navigateur
function setLanguage(browserLanguage) {
	var savedLang = getCookie('chosenLanguage');
	if(savedLang === "") {
		var newLanguage = "";
		// check if language not in ["fr","en"]
		var authorizedLanguages=["fr","en"];
		if (!authorizedLanguages.includes(browserLanguage)){
			newLanguage = "en";
		}else{
			newLanguage = browserLanguage;
		}
		//save newLanguage
		setCookie('chosenLanguage', newLanguage, 365);
	}else{
		//new language is the language saved in the cookie 
		newLanguage = savedLang;
	}
	
	if (browserLanguage != newLanguage){
		//reload page
		changeLanguage(newLanguage);
	}
    if(newLanguage === "en") {
        document.getElementById("i_fr").setAttribute("class","language-select fr");
        document.getElementById("i_en").setAttribute("class","language-select en ml-3 selected");
    } else {
        document.getElementById("i_en").setAttribute("class","language-select en ml-3 ");
        document.getElementById("i_fr").setAttribute("class","language-select fr selected");
    }
    return newLanguage;
}
function changeLanguage(lang) {
    setCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE', lang, 0);
    setCookie('chosenLanguage', lang, 365);
    location.reload(true);
}
function initialiseFormErrorBlocks() {
    var activeform = getCookie("formactive");
    if(activeform.length === 0) {
        setCookie("formactive", "lsf", 0);
        activateMode('lsf');
        document.getElementById("returnedErrorLsf").setAttribute("style","display:block");
        document.getElementById("returnedErrorNvs").setAttribute("style","display:none");
        document.getElementById("returnedErrorCrt").setAttribute("style","display:none");
    } else {
        activateMode(activeform);
        if(activeform.localeCompare("lsf") === 0) {
            console.log("lsf");
            document.getElementById("returnedErrorLsf").setAttribute("style","display:block");
            document.getElementById("returnedErrorNvs").setAttribute("style","display:none");
            document.getElementById("returnedErrorCrt").setAttribute("style","display:none");

            document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:none");
            document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:none");
            document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:none");
        } else {
            if(activeform.localeCompare("nvs") === 0) {
                document.getElementById("returnedErrorLsf").setAttribute("style","display:none");
                document.getElementById("returnedErrorNvs").setAttribute("style","display:block");
                document.getElementById("returnedErrorCrt").setAttribute("style","display:none");

                document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:none");
                document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:none");
                document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:none");
            } else {
                document.getElementById("returnedErrorNvs").setAttribute("style", "display:none");
                document.getElementById("returnedErrorLsf").setAttribute("style", "display:none");
                document.getElementById("returnedErrorCrt").setAttribute("style", "display:block");

                document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:none");
                document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:none");
                document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:none");
            }
        }
    }
}
function activateMode(mode){
    $('#identification-block').css('display','block');
    if(mode === 'crt'){
        //Activation du bouton et désactivation des autres
        $('#crt-button').addClass('active');
        $('#lsf-button').removeClass('active');
        $('#nvs-button').removeClass('active');

        $('#connexion-content').css({"clip-path": "polygon( 0 0, 100% 0, 100% 100%, 0 100%, 0 0, calc(83.5% - 10px) 0, 83.5% 10px, calc(83.5% + 10px) 0, 0px 0px )"});

        //Affichage du contenu de l'onglet et désactivation des autres
        $('#cert_content').css('display','block');
        $('#cert_multiple').css('display','none');  
        $("#butt_engagement").css('display','block');
        $("#butt_declare_crt").css('display','block'); 
        $("#bnpp-separator").css('display','block');
        document.getElementById("submit-pki").setAttribute("class","btn-bnpp-major important mt-1 mx-auto");
        $('#lsf_content').css('display','none');
        $('#nvs_content').css('display','none');

        setCookie("formactive", "crt", 0);
        document.getElementById("returnedErrorLsf").setAttribute("style","display:none");
        document.getElementById("returnedErrorNvs").setAttribute("style","display:none");

        document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:none");
        document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:none");
    }
    else if(mode === 'lsf'){
        //Activation du bouton et désactivation des autres
        $('#crt-button').removeClass('active');
        $('#lsf-button').addClass('active');
        $('#nvs-button').removeClass('active');

        $('#connexion-content').css({"clip-path": "polygon( 0 0, 100% 0, 100% 100%, 0 100%, 0 0, calc(50% - 10px) 0, 50% 10px, calc(50% + 10px) 0, 0px 0px )"});

        //Affichage du contenu de l'onglet et désactivation des autres
        $('#cert_content').css('display','none');
        $('#cert_multiple').css('display','none');
        $("#butt_engagement").css('display','block');
        $("#butt_declare_crt").css('display','block');
        $("#bnpp-separator").css('display','block');
        document.getElementById("submit-pki").setAttribute("class","btn-bnpp-major important mt-1 mx-auto");
        $('#lsf_content').css('display','block');
        $('#nvs_content').css('display','none');

        setCookie("formactive", "lsf", 0);
        document.getElementById("returnedErrorNvs").setAttribute("style","display:none");
        document.getElementById("returnedErrorCrt").setAttribute("style","display:none");

        document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:none");
        document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:none");
    }
    else if(mode === 'nvs'){
        //Activation du bouton et désactivation des autres
        $('#lsf-button').removeClass('active');
        $('#nvs-button').addClass('active');
        $('#crt-button').removeClass('active');

        //Affichage du contenu de l'onglet et désactivation des autres
        $('#cert_content').css('display','none');
        $('#cert_multiple').css('display','none');
        $("#butt_engagement").css('display','block');
        $("#butt_declare_crt").css('display','block');
        $("#bnpp-separator").css('display','block');
        document.getElementById("submit-pki").setAttribute("class","btn-bnpp-major important mt-1 mx-auto");
        $('#lsf_content').css('display','none');
        $('#nvs_content').css('display','block');

        $('#connexion-content').css({"clip-path": "polygon( 0 0, 100% 0, 100% 100%, 0 100%, 0 0, calc(16.5% - 10px) 0, 16.5% 10px, calc(16.5% + 10px) 0, 0px 0px )"});
        
        setCookie("formactive", "nvs", 0);
        document.getElementById("returnedErrorLsf").setAttribute("style","display:none");
        document.getElementById("returnedErrorCrt").setAttribute("style","display:none");

        document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:none");
        document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:none");
    }
}
function clearInput(id_input){
    var input = $('#' + id_input);
    input.focus();
    //Rajouter dans le cadre de garder l'ID mandataire
    //en changeant le mode de connexion
    if(id_input != 'cle_acces_lsf' && id_input != 'code_pin_nvs'){
        $('#num_abonn_crt').val('');
        $('#num_abonn_nvs').val('');
        $('#num_abonn_lsf').val('');
        $('#cle_acces_lsf').val('');
    }else{
        input.val('');
    }
}
function initialiseForm() {
    clearInput('num_abonn_crt');
    $('#num_abonn_lsf')
        .on('keyup', function(){
            var value = $(this).val();
            $('#num_abonn_crt').val(value);
            $('#num_abonn_nvs').val(value);
        });
    $('#num_abonn_crt')
        .on('keyup', function(){
            var value = $(this).val();
            $('#num_abonn_nvs').val(value);
            $('#num_abonn_lsf').val(value);
        });
    $('#num_abonn_lsf')
        .on('blur', function(){
            var value = $(this).val();
            $('#num_abonn_nvs').val(value);
            $('#num_abonn_crt').val(value);
        });
    $('#num_abonn_crt')
        .on('blur', function(){
            var value = $(this).val();
            $('#num_abonn_nvs').val(value);
            $('#num_abonn_lsf').val(value);
        });
}
function submitPkiLogin(numero) {
    if(numero != '') {
        document.getElementById('certificate').value = 'multiple';
    } else {
        document.getElementById('num_abonn_crt').value = '00000000';
        document.getElementById('certificate').value = 'single';
    }
    document.forms["loginPkiForm"].submit();
}
function  initialiserInWebo() {
    console.log("initialisation d'inwebo en cours")
    neon.initOnline().then(inweboInitSuccess, inweboInitExceptionHandler);
}
//Inwebo on Sucess
function inweboInitSuccess(logins){
    console.info('list des login enrolés: ', logins);
    afficherBlocNVS(logins);
    loginsAlias = logins;
    localStorage.setItem("loginsFromInwebo", logins);
}

//Inwebo Exception Handling
function inweboInitExceptionHandler(inweboError){
    console.log("oups!");
    inweboErrorCode = inweboError.errCode;
    console.log("-> .catch on INIT",inweboErrorCode);   
    var errorsToIgnore = ['USER_IS_BLOCKED','TOKEN_IS_BLOCKED','UNEXPECTED_ERROR'];

    //show the error div
    $("#browser_not_enrolled").css('display','none');
    $("#browser_enrolled").css('display','block');
    $("#inwebo_exceptions_enrolled").css('display','block');
    $("#nvs_technicalException").css('display','none');

    $(".erreur_message_code").css('display','none');
    if(errorsToIgnore.indexOf(inweboErrorCode) >= 0){
        $("#"+inweboErrorCode+"_OnInit").css('display','block');
    }else{
        $("#GENERIC_EXCEPTION_OnInit").css('display','block');
    }
    localStorage.setItem("loginsFromInwebo", "");
    afficherBlocNVS("");
}
//Show Secure Login
function afficherBlocNVS(logins){
    if (logins.length > 0) {
        $("#browser_not_enrolled").css('display','none');
        $("#browser_enrolled").css('display','block');
    } else {
        $("#browser_enrolled").css('display','none');
        $("#browser_not_enrolled").css('display','block');
    }
}
function getOnlineOtp(numero, code) {
    console.log("numero abonne " + numero);
    console.log("code pin " + code);
    neon.getOnlineOtpWithPin(loginsAlias[0], code).then(affectOTP,inweboGetOnlineOtpExceptionHandler);
}
function affectOTP(o) {
    console.log('OTP genere :',o);
    document.getElementById('OTP').value = o;
    document.forms["loginSafeForm"].submit();
}
function inweboGetOnlineOtpExceptionHandler(inweboError){
    inweboErrorCode = inweboError.errCode;
    console.log("-> .catch on GET_ONLINE_OTP",inweboErrorCode);
    document.getElementById('submit-nvs').disabled = false;
    var errorsArray = ['PASSWORD_IS_WRONG','USER_IS_BLOCKED','TOKEN_IS_BLOCKED','UNEXPECTED_ERROR'];

    $("#inwebo_exceptions_enrolled").css('display','block');
    $("#nvs_technicalException").css('display','none');
    $(".erreur_message_code").css('display','none');
    if(errorsArray.indexOf(inweboErrorCode) >= 0){
        $("#"+inweboErrorCode+"_GetOtp").css('display','block');
    }else{
        $("#GENERIC_EXCEPTION_GetOtp").css('display','block');
    }
}
function getErrorMessage(errorCode) {
    var attributes = [];
    attributes = JSON.parse(localStorage.getItem('errorMessagesi18nObject'));
    if (errorCode != undefined) {
        var messageErreur = attributes[errorCode];
    }
    return messageErreur === undefined ? attributes["app.identification.erreur.generique"]
        : messageErreur;
}

function setErrorLogoutIfAny(authUrl) {
    var activeform = getCookie("formactive");
    authUrl = authUrl.replace(/&amp;/g, "&");
    mbeErrorMessage = getParam('error_code', decodeURI(authUrl));
    if(mbeErrorMessage !==null) {
        if(activeform.localeCompare("lsf") === 0) {
            document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:block");
            document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:none");
            document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:none");
            document.getElementById("message_erreur_lsf").innerText = getErrorMessage(mbeErrorMessage);
        }
        if(activeform.localeCompare("nvs") === 0) {
            document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:block");
            document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:none");
            document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:none");
            document.getElementById("message_erreur_nvs").innerText = getErrorMessage(mbeErrorMessage);
        }
        if(activeform.localeCompare("crt") === 0) {
            document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:block");
            document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:none");
            document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:none");
            document.getElementById("message_erreur_crt").innerText = getErrorMessage(mbeErrorMessage);
        }
        console.log(mbeErrorMessage);

    } else {
        document.getElementById("returnErrorLsfRedirect").setAttribute("style","display:none");
        document.getElementById("returnErrorNvsRedirect").setAttribute("style","display:none");
        document.getElementById("returnErrorCrtRedirect").setAttribute("style","display:none");
    }
}

function getCertificateUrl(urlCertificate) {
	
	var urlSplited=document.location.href.split("/");
	urlSplited[2]=urlCertificate;
	return urlSplited.join("/");
	
	
	
}