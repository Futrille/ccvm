

var APP = {
    //Constants
    MAX_SEG_SESSION : 20
    , TITLE: ''
    , TITLE_DESCRIPTION: ''

    //Globals
    , useStorage: true
    , storage: new AppStorage()

    , msg: new Message()
    
    , idEntidad : 0
    , getIdEntidad: function(){
        return this.idEntidad;
    }
    , setIdEntidad: function(id){
        return this.idEntidad = id;
    }

    , validate: function(data){
        if (data != null && data.message != null && data.message == 'logout'){
            // setMesageCode(MSG_LOGIN_ERROR);
            // printMessage(getMessageCode());
            window.location.href = getRoute() + '/login.html';
            return false;
        }
        return true;
    }

    , setCookie: function (cname, cvalue, seconds) {
        var d = new Date();
        d.setTime(d.getTime() + (seconds*1000));
        // d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    , getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    /**
     * Consulta lista de datos desde el backend
     * @param url
     * @returns {*}
     */
    , getJSON: function(url){
        $(document).ajaxStart(function() { Pace.restart(); });
        var jqXHR =
            $.get(
                url,
                null,
                function(response){
                    console.log("Callback getJSON...");
                    APP.validate(response);
                },
                'json'
            );
        $.xhrPool.push(jqXHR);
        return jqXHR;
    }

    /**
     * Consulta lista de datos desde el backend
     * @param url
     * @returns {*}
     */
    , getHTML: function(url){
        $(document).ajaxStart(function() { Pace.restart(); });
        var jqXHR =
            $.get(
                url,
                null,
                function(response){
                    console.log("Callback getHTML...");
                    this.validate(response);
                },
                'html'
            );
        $.xhrPool.push(jqXHR);
        return jqXHR;
    }

    , setTitle: function(titulo){
        this.TITLE = titulo;
        $('#page-title').html(this.TITLE + '<small id="page-title-descripcion">' + this.TITLE_DESCRIPTION + '</small>');
    }

    , setTitleDescription: function(valor){
        this.TITLE_DESCRIPTION = valor;
        $('#page-title-descripcion').html(this.TITLE_DESCRIPTION);
    }

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
            APP.setIdEntidad(id);
        }
        else{
            APP.setIdEntidad(0);
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
                wrapper.load(getRoute('persona_edit', APP.getIdEntidad()), {
                    "apiKey": "77fa53ff60e8f41e40260b0dad826d76",
                    //"id":id
                }, function (response, status, xhr) {
                    $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                        console.log("Script cargado Editar: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                        APP.msg.printMessage(APP.msg.getMessageCode());
                    });
                });
                break;
            case 'Login':
                wrapper.load(getRoute('login'), {
                    "apiKey": "77fa53ff60e8f41e40260b0dad826d76"
                }, function (response, status, xhr) {
                    $.cachedScript("resources/js/app/" + modulo + "/" + vista + accion + "Controller.js").done(function (script, textStatus) {
                        console.log("Script cargado: " + "resources/js/app/" + modulo + "/" + vista + accion + "Controller.js");
                        APP.msg.printMessage(APP.msg.getMessageCode());
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
    var jqXHR =
        $.get(
            url,
            null,
            function(response){
                console.log("Callback getList...");
                APP.validate(response);
            },
            'json'
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
    var jqXHR =
        $.get(
            url,
            null,
            function(response){
                console.log("Callback getBody...");
                APP.validate(response);
            },
            'html'
        );
    $.xhrPool.push(jqXHR);
    return jqXHR;
}

/**
 * Consulta HTML de datos desde el backend
 * @param url
 * @returns {*}
 */
function postBody(url, params){
    $(document).ajaxStart(function() { Pace.restart(); });
    var jqXHR =
        $.post(
            url,
            params,
            function(response){
                console.log("Callback postBody...");
                APP.validate(response);
            },
            'html'
        );
    $.xhrPool.push(jqXHR);
    return jqXHR;
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
















