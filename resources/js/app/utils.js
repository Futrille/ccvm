

/**
 * Consiguraci�n para guardar cache de las llamadas asincronas
 */
//$.ajaxSetup({
//    cache: true
//});

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
    if (id != null && id > 0){
        setIdEntidad(id);
    }

    var wrapper = $("#page-wrapper");
    switch (accion){
        case 'Index':
            wrapper.load("views/" + modulo + "/" + vista + accion + ".html",
                function (response, status, xhr) {
                $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                    console.log("Script cargado: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                    printMessage(getMessageCode());
                });
            });
            break;
        case 'Nuevo':
            $.loader({ className:"blue-with-image-2", content:'' });
            wrapper.load(getRoute('persona_new'), {
                "apiKey":"77fa53ff60e8f41e40260b0dad826d76"
            }, function (response, status, xhr) {
                $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                    console.log("Script cargado: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                    printMessage(getMessageCode());
                    $.loader('close');
                });
            });
            break;
        case 'Editar':
            $.loader({ className:"blue-with-image-2", content:'' });
            wrapper.load(getRoute('persona_edit', getIdEntidad()), {
                "apiKey":"77fa53ff60e8f41e40260b0dad826d76",
                //"id":id
            }, function (response, status, xhr) {
                $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                    console.log("Script cargado Editar: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                    printMessage(getMessageCode());
                    $.loader('close');
                });
            });
            break;
        case 'Login':
            $.loader({ className:"blue-with-image-2", content:'' });
            wrapper.load(getRoute('login'), {
                "apiKey":"77fa53ff60e8f41e40260b0dad826d76"
            }, function (response, status, xhr) {
                $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                    console.log("Script cargado: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                    printMessage(getMessageCode());
                    $.loader('close');
                });
            });
            break;
        default:

    }
}

/**
 * Consulta lista de datos desde el backend
 * @param url
 * @returns {*}
 */
function getList(url){
    $.loader({
        className:"blue-with-image-2",
        content:''
    });
    return $.get(url,{
            apiKey:'77fa53ff60e8f41e40260b0dad826d76',
            "_": $.now()
        },null,'json'
    );
}

function validateSession(data){
    if (data.status != undefined && data.status == 'logout'){
        setMesageCode(MSG_LOGIN_ERROR);
        printMessage(getMessageCode());
        window.location.href = 'login.html';
    }
}

