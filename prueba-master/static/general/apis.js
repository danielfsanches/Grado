
//obtiene el token
function apisCsrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function apisGetCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = apisGetCookie('csrftoken');

//funcion general para llamar apis
function apisSendToApi(filters,sendFunction,sendErrorFunction){
    var method='';
    var async='';
    if (filters.method!=null){
        method=filters.method;
    }else{
        method='GET';
    }
    if (filters.cache!=null){
        cache=filters.cache;
    }else{
        cache=true;
    }
    if (sendErrorFunction==null){
        errorFunction=apis_failed;
    }else{
        errorFunction=sendErrorFunction;
    }
    if (filters.async!=null){
        async=filters.async;
    }else{
        async=true;
    }
    $.ajax({
        // dataType:'json',
        method: method,
        async: async,
        cache:cache,
        data: JSON.stringify(filters.data),
        url: filters.url,
        contentType:"application/json",
        //headers: filters.headers,
        beforeSend: function(xhr, settings) {
            xhr.url = settings.url;
            if (!apisCsrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken );
            }
        }, 
        success: function(response){ sendFunction(response, {'element':filters.element, 'redirectURL':filters.redirectURL}); }
    }).fail(function(response){errorFunction(response,{'element':filters.element, 'redirectURL':filters.redirectURL, 'data':filters.data})});
}

function apisFailed(response, kwargs){
    let Obj = response.responseJSON;
    let errorMessages = "";
    // alert(JSON.stringify(Obj))
    if(kwargs.element){
        kwargs.element.prop("disabled", false);
        kwargs.element.children('span').addClass('d-none');
    }
    if(response.status != 0){
        Obj.forEach(function(obj) {
            var clave = Object.keys(obj)[0];
            if (obj[clave]!== undefined) {
                var error = obj[clave][0];
                errorMessages += '<p><h5>' + error +'</h5></p>'
                console.log('Clave:', clave, 'Error:', error);
            } 
        });
        $('#modalError .modal-body').html('<div id="errorMessages">' + errorMessages + '</div>');
        $('#modalError').modal('show');
    }
    else{
        alert("Error por favor revise su conexión con internet");
    } 
}