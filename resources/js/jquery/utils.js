

/**
 * Consiguración para guardar cache de las llamadas asincronas
 */
$.ajaxSetup({
    cache: true
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
        cache: true,
        url: url
    });

    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return jQuery.ajax( options );
};

/**
 * Carga modulos html en el pag-wrapper
 * @param modulo
 * @param accion
 */
function loadModule(modulo, vista, accion){
    $.loader({
        className:"blue-with-image-2",
        content:''
    });
    $("#page-wrapper").load("views/" + modulo + "/" + vista + accion + ".html", function(response, status, xhr){
        $.cachedScript( "resources/js/jquery/" + modulo + "/" + vista + "Controller.js" ).done(function( script, textStatus ) {

        });

        $.loader('close');
    });
};

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
    return $.get(
        url,
        {
            apiKey:'77fa53ff60e8f41e40260b0dad826d76',
            "_": $.now()
        },
        null,
        'json'
    );
};

