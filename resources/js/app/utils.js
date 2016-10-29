
var MAX_SEG_SESSION = 20;

$.xhrPool = [];
$.xhrPool.abortAll = function() {
    $(this).each(function(i, jqXHR) {   //  cycle through list of recorded connection
        jqXHR.abort();  //  aborts connection
        $.xhrPool.splice(i, 1); //  removes from list by index
    });
}

$.ajaxSetup({
    beforeSend: function(jqXHR) {

    },
    complete: function(jqXHR) {
        var i = $.xhrPool.indexOf(jqXHR);   //  get index for current connection completed
        if (i > -1) $.xhrPool.splice(i, 1); //  removes from list by index
    }
    // , cache: true
});

/**
 * Carga Script dinamicamente y los almacena temporalmente en cache
 * @param url
 * @param options
 * @returns {*}
 */
jQuery.cachedScript = function( url, options ) {

    // Allow user to set any option except for dataType, cache, and url
    options = $.extend( options || {}, {
        dataType: "script",
        cache: false,
        url: url
    });

    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return jQuery.ajax( options );
};

/**
 * Carga modulos html en el pag-wrapper
 * @param modulo
 * @param vista
 * @param accion
 */
function loadModule(modulo, vista, accion, id, messageCode){
    try {
        if (id != null && id > 0) {
            setIdEntidad(id);
        }

        var wrapper = $("#page-wrapper");
        switch (accion) {
            case 'Index':
                wrapper.load("views/" + modulo + "/" + vista + accion + ".html", {
                    "apiKey": "77fa53ff60e8f41e40260b0dad826d76"
                }, function (response, status, xhr) {
                    $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                        console.log("Script cargado: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                        // printMessage(getMessageCode());
                    });
                });
                break;
            case 'Nuevo':
                wrapper.load(getRoute('persona_new'), {
                    "apiKey": "77fa53ff60e8f41e40260b0dad826d76"
                }, function (response, status, xhr) {
                    $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                        console.log("Script cargado: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                        // printMessage(getMessageCode());
                    });
                });
                break;
            case 'Editar':
                wrapper.load(getRoute('persona_edit', getIdEntidad()), {
                    "apiKey": "77fa53ff60e8f41e40260b0dad826d76",
                    //"id":id
                }, function (response, status, xhr) {
                    $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                        console.log("Script cargado Editar: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                        printMessage(getMessageCode());
                    });
                });
                break;
            case 'Login':
                wrapper.load(getRoute('login'), {
                    "apiKey": "77fa53ff60e8f41e40260b0dad826d76"
                }, function (response, status, xhr) {
                    $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                        console.log("Script cargado: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                        printMessage(getMessageCode());
                        // $.loader('close');
                    });
                });
                break;
            default:

        }
    }
    catch(e){
        console.log("Error [Util]: " + e.messsage);
    }
}

/**
 * Consulta lista de datos desde el backend
 * @param url
 * @returns {*}
 */
function getList(url){
    $(document).ajaxStart(function() { Pace.restart(); });
    var jqXHR = $.get(url,{
            apiKey:'77fa53ff60e8f41e40260b0dad826d76',
            "_": $.now()
        },null,'json'
    );
    $.xhrPool.push(jqXHR);
    return jqXHR;
}

/**
 *
 * @param data
 */
function validateSession(data){
    if (data.status != undefined && data.status == 'logout'){
        setMesageCode(MSG_LOGIN_ERROR);
        printMessage(getMessageCode());
        window.location.href = 'login.html';
    }
}

/**
 *
 * @param clave
 * @param defaultValue
 * @returns {*|string}
 */
function getFromSessionStorage(clave, defaultValue){
    if (defaultValue == null){
        defaultValue = '-';
    }
    var preResultado = sessionStorage.getItem(clave) != null ? sessionStorage.getItem(clave) : defaultValue;
    if (preResultado != defaultValue){
        var values = preResultado.split('-');
        resultado = values[0];
        if (($.now() - values[1]) / 1000 > MAX_SEG_SESSION){
            resultado = defaultValue;
            sessionStorage.removeItem(clave);
        }
    }
    else{
        resultado = preResultado;
    }
    return resultado;
}

/**
 *
 * @param clave
 */
function setToSessionStorage(clave, value){
    sessionStorage.setItem(clave, value + '-' + $.now());
}

/**
 *
 */
function clearSessionStorage(){
    sessionStorage.clear();
}

var TITLE = '';
var TITLE_DESCRIPTION = '';

function setTitle(titulo){
    TITLE = titulo;
    $('#page-title').html(TITLE + '<small id="page-title-descripcion">' + TITLE_DESCRIPTION + '</small>');
}

function setTitleDescription(valor){
    TITLE_DESCRIPTION = valor;
    $('#page-title-descripcion').html(TITLE_DESCRIPTION);
}

JSON.stringify = JSON.stringify || function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"'+obj+'"';
            return String(obj);
        }
        else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n]; t = typeof(v);
                if (t == "string") v = '"'+v+'"';
                else if (t == "object" && v !== null) v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };


















