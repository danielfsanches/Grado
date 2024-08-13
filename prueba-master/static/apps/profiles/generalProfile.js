// --------------Incio Pasos Recuperar Contraseña----------------------------------------------
let userpk;
let userUid;
let tokenReset;

$(".js-form_Reset").submit(function(event){
    event.preventDefault();
    $(this).find("button[name=submitReset]").prop("disabled", true);
    $(this).find("button[name=submitReset]").children('span').removeClass('d-none');
    data = {
        "email" : $(this).find("input[name=emailReset]").val(),
    }
    infoToSend = {
        url:URLAPIS+'/profiles/apiSendCodeSMS',
        method:"POST",
        data:data,
        cache: false,
        element: $(this).find("button[name=submitReset]")
    };
    apisSendToApi(infoToSend, saveDataResetEmail, apisFailed);
});

function saveDataResetEmail(response, kwargs){
    $("[name='Paso2']").addClass("active").siblings().removeClass("active");
    kwargs.element.prop('disabled', false);
    kwargs.element.children('span').addClass('d-none');
    userpk= response.usuario;
}

$(".js-form_Verify").submit(function(event){
    event.preventDefault();
    $(this).find("button[name=submitVerify]").prop("disabled", true);
    $(this).find("button[name=submitVerify]").children('span').removeClass('d-none');
    data = {
        "user" : userpk,
        "code": $(this).find("input[name=codeVerify]").val()
    }
    infoToSend = {
        url:URLAPIS+'/profiles/apiValidateCodeSMS',
        method:"POST",
        data:data,
        cache: false,
        element: $(this).find("button[name=submitVerify]")
    };
    apisSendToApi(infoToSend, saveDataResetCode, apisFailed);
});

function saveDataResetCode(response, kwargs){
    $("[name='Paso3']").addClass("active").siblings().removeClass("active");
    kwargs.element.prop('disabled', false);
    kwargs.element.children('span').addClass('d-none');
    userUid = response.uid;
    tokenReset = response.token;
    // alertboostrap('alert-success', response.Mensaje, "alert-boostrap", "alert-generalmodal");
}

$(".js-form_Confirm").submit(function(event){
    event.preventDefault();
    $(this).find("button[name=submitConfirm]").prop("disabled", true);
    $(this).find("button[name=submitConfirm]").children('span').removeClass('d-none');
    data = {
        "uid": userUid,
        "token": tokenReset,
        "new_password1": $(this).find("input[name=new_password1Confirm]").val(),
        "new_password2": $(this).find("input[name=new_password2Confirm]").val()
    }
    infoToSend = {
        url:URLAPIS+'/rest-auth/password/reset/confirm/',
        method:"POST",
        data:data,
        cache: false,
        redirectURL:'/profiles/login/',
        element: $(this).find("button[name=submitConfirm]")
    };
    apisSendToApi(infoToSend, generalRedirectPage, apisFailed);
});

$(".js-btnPassOne").on("click", function(){
    $("[name='Paso1']").addClass("active").siblings().removeClass("active");
    $("[aria-controls='Paso1']").click();
});

$('#reset_password_modal').on('hidden.bs.modal', function () {
    location.reload();
});

$('.js-eye-show').on('click', function(){
    let types='password';
    if($(this).hasClass('fa-eye-slash')){
      types= 'text';
    }
    $(this).toggleClass("fa-eye-slash").toggleClass("fa-eye");
  
    $(this).parents('.input-group').children('input').prop('type', types);
});
// --------------Fin Pasos Recuperar Contraseña----------------------------------------------

