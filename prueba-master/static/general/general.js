function generalRedirectPage(response, kwargs){
    console.log(kwargs);
    if(kwargs.redirectURL){
        window.location.replace(URLAPIS+kwargs.redirectURL);
    }
    
}

$('.btn_clean').on('click', function(){
    $("form select").each(function() { this.selectedIndex = 0 });
    $("form input[type=text] , form input[type=number], form input[type=date] ").each(function() { this.value = '' });
});

//-----------Inicio Seleccionar ciudad dependiendo de departamento y pais--------------------


$('.js-country').on('change',function(){
    $('.js-departament').html("").removeAttr('disabled');
    $('.js-city').html("").attr('disabled',true);
    apiGetDepartament($(this).val());
});


function apiGetDepartament(id){
    infoToSend = {
        url:`${URLAPIS}/locations/apiDepartament?country=${id}`,
        cache: false,
    };
    apisSendToApi(infoToSend,infoDepartament,apisFailed);
}

function infoDepartament(response){
    if(response[0]){
        $('.js-departament').html("").removeAttr('disabled').append('<option value="0" selected> - - - Seleccione el Departamento - - - -</option>');
        response.forEach(element => {
            const option = document.createElement('OPTION');
            option.text = element.name;
            option.value = element.id;
            $('.js-departament').append(option);
        });
    }else{
        $('.js-departament').html("").attr('disabled',true);
        $('.js-city').html("").attr('disabled',true);
    }
}

$('.js-departament').on('change',function(){
    $('.js-city').removeAttr('disabled');
    apisGetCity($(this).val());
});

function apisGetCity(id){
    infoToSend = {
        url:`${URLAPIS}/locations/apiCity?departament=${id}`,
        cache: false,
    };
    apisSendToApi(infoToSend,infoCity,apisFailed);
}

function infoCity(response){
    if(response[0]){
        $('.js-city').html("");
        $('.js-city').removeAttr('disabled').append('<option value="0" selected> - - - Seleccione la  Ciudad - - - -</option>');
        response.forEach(element => {
            const option = document.createElement('OPTION');
            option.text = element.name;
            option.value = element.id;
            $('.js-city').append(option);
        });
    }else{
        $('.js-city').html("").attr('disabled',true);
    }
} 

$('.js-city').on('change',function(){
    if ($(this).attr('data-info') == 'branch'){
        $('.js-branch').removeAttr('disabled');
        apisGetBranch($(this).val());        
    }
    else{
        if ($(this).attr('data-info') == 'point_sale'){
            $('.js-point_sale').removeAttr('disabled');
            apisGetPointSale($(this).val());
        }

    }
});

function apisGetPointSale(id){    
    infoToSend = {
        url:`${URLAPIS}/locations/apiPointSale?city=${id}`,
        cache: false,
    };
    apisSendToApi(infoToSend,infoPointSale,apisFailed);
}

function infoPointSale(response){
    if(response[0]){
        $('.js-point_sale').html("");
        $('.js-point_sale').removeAttr('disabled').append('<option value="0" selected> - - - Seleccione el punto de venta - - - -</option>');
        response.forEach(element => {
            const option = document.createElement('OPTION');
            option.text = element.name;
            option.value = element.id;
            $('.js-point_sale').append(option);
        });
    }else{
        $('.js-city').html("").attr('disabled',true);
    }
} 

function apisGetBranch(id){
    infoToSend = {
        url:`${URLAPIS}/locations/apiBranch?city=${id}`,
        cache: false,
    };
    apisSendToApi(infoToSend,infoBranch,apisFailed);
}

function infoBranch(response){
    if(response[0]){
        $('.js-branch').html("");
        $('.js-branch').removeAttr('disabled').append('<option value="0" selected> - - - Seleccione la Bodega PT - - - -</option>');
        response.forEach(element => {
            const option = document.createElement('OPTION');
            option.text = element.name;
            option.value = element.id;
            $('.js-branch').append(option);
        });
    }else{
        $('.js-city').html("").attr('disabled',true);
    }
} 

//----------Fin Seleccionar office dependiendo de ciudad departamento y pais--------------
//----------Inicio elemento clonar fue modificado de tal manera que se invierte los clones el nuevo queda de primeras--------------
function custom_generalClone(idChild, idFather, flagClone, idClone) {
    var clone = $("#" + idChild).clone(true);
    var nameClone = "_clone_";
    if (idClone == null) {
        idClone = parseInt($("#" + idChild).attr("valueClone")) + 1;
        $("#" + idChild).attr("valueClone", idClone);
        nameClone = nameClone + "new";
    }
    $("*", clone).add(clone).each(function() {
        if (this.id) {
            this.id = this.id + nameClone + idClone;
        }
        if ($(this).attr("for")) {
            let temporalfor = $(this).attr("for");
            $(this).attr("for", temporalfor + nameClone + idClone);
        }
    });
    
    // Set the new id based on the value of idClone (i)
    var newId = idChild + nameClone + idClone;
    clone.attr("id", newId);
    
    if (flagClone == true) {
        clone.insertAfter($("#" + idChild)); // Insertar después del clon anterior
    } else {
        $("#" + idFather).append(clone);
    }
    
    $("#" + newId).removeClass("d-none");
}
//----------Fin elemento clonar-----------------
//----------Funcion "enter" para filtros-----------------
$(document).ready(function() {
    $('.js-input-search').keydown(function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        $(this).closest('form').submit();
      }
    });
  });

function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

$(".js-delete").on("click", function(){
    var x=$(this).attr("data-value");  
    $(".js-deletePost").val(x);
    console.log(x)    
    
});


