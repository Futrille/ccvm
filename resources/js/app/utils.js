
var TITLE = '';
var TITLE_DESCRIPTION = '';

var APP = {
    MAX_SEG_SESSION : 20

    , idEntidad : 0
    , useStorage: true
    , storage: new AppStorage()
};

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
        $.xhrPool.abortAll();

        if (id != undefined && id != null && id > 0) {
            setIdEntidad(id);
        }
        else{
            setIdEntidad(0);
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
                // wrapper.load(getRoute('persona_new'), {
                wrapper.load("views/" + modulo + "/" + vista + accion + ".html", {
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
 * Consulta lista de datos desde el backend
 * @param url
 * @returns {*}
 */
function getBody(url){
    $(document).ajaxStart(function() { Pace.restart(); });
    var jqXHR = $.get(url,null,null,'html');
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

// function getFromStorage(clave, defaultValue){
//     // console.log("Storage.get:", APP.storage.get(clave, defaultValue));
//     if (defaultValue == undefined){
//         defaultValue = null;
//     }
//     if (APP.cifrar){
//         clave = $.Cypher("en",clave+'',APP.clave);
//         // var preResultado = sessionStorage.getItem(clave) != null ? sessionStorage.getItem(clave) : defaultValue;
//         // if (preResultado != defaultValue){
//         //     var values = preResultado.split('-');
//         //     resultado = values[0];
//         //     if (($.now() - values[1]) / 1000 > APP.MAX_SEG_SESSION){
//         //         resultado = defaultValue;
//         //         sessionStorage.removeItem(clave);
//         //     }
//         // }
//         // else{
//         //     resultado = preResultado;
//         // }
//         return sessionStorage.getItem(clave) != null ? $.Cypher("de",sessionStorage.getItem(clave),APP.clave)  : defaultValue;
//     }
//     else{
//         return sessionStorage.getItem(clave) != null ? sessionStorage.getItem(clave)  : defaultValue;
//     }
// }

// function setToStorage(clave, valor){
//     // console.log("Storage.set:", APP.storage.set(clave, valor));
//     if (APP.cifrar){
//         sessionStorage.setItem($.Cypher("en",clave+'',APP.clave), $.Cypher("en",valor+'',APP.clave));
//     }
//     else{
//         sessionStorage.setItem(clave, valor);
//     }
// }

// function removeStorage(clave){
//     // console.log("Storage.remove:", APP.storage.remove(clave));
//     if (APP.cifrar){
//         sessionStorage.removeItem($.Cypher("en",clave+'',APP.clave));
//     }
//     else{
//         sessionStorage.removeItem(clave);
//     }
// }

// function clearAllStorage(){
//     console.log("Storage.removeAll:", APP.storage.removeAll());
//     sessionStorage.clear();
// }



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


















