

var PROTOCOL    = 'http://';
var SERVER      = 'localhost';
var module      = '/ivm-core';
var front_dir   = '/ivm-web';    // /ivm
var ENV         = '/app_dev.php';// /app.php
var web         = '/web';
var app         = {
        idEntidad: 0
};
var MSG_CODE            = 0;
var MSG_NO_MESSAGE      = 0;
var MSG_SAVE_SUCCESS    = 1;
var MSG_SAVE_ERROR      = 2;
var MSG_DELETE_SUCCESS  = 3;
var MSG_DELETE_ERROR    = 4;
var MSG_LOGIN_ERROR     = 5;

var ROUTE;
ROUTE = {
    MODULES: {
        GANADOS: module + web + ENV + '/persona/',
        GANADOS_NEW: module + web + ENV + '/persona/new',
        GENERAL: module + web + ENV + '/general/valorvariable'
    }
};
var R_PERSONA_COUNT = module + web + ENV + '/persona/count';
var R_FAMILIA_INDEX = module + web + ENV + '/familia';
var R_NIVEL_INDEX = module + web + ENV + '/nivel';
var R_VALORVARIABLE_INDEX = module + web + ENV + '/general/valorvariable';

function getIdEntidad(){
    return app.idEntidad;
}

function setIdEntidad(id){
    return app.idEntidad = id;
}

function getRoute(nameRoute, id){
    var route = module + web + ENV;
    setIdEntidad(id);

    switch (nameRoute){
        case 'persona_index':
            route = route + '/persona/';
            break;
        case 'persona_new':
            // route = route + '/persona/new';
            // break;
        // case 'persona_edit':
            route = route + '/persona/new/' + getIdEntidad();
            break;
        case 'persona_delete':
            route = route + '/persona/' + getIdEntidad() + '/delete';
            break;
        case 'persona_count':
            route = route + '/persona/count/';
            break;

        case 'valorvariable_index':
            route = route + '/valorvariable/' + getIdEntidad() + '/delete/';
            break;

        case 'login':
            route = route + '/login';
            break;

        case 'homepage':
            route = route + '/';
            break;

        default:
            route = front_dir;
    }
    return route;
}

/**
 *
 * @returns {number}
 */
function getMessageCode(){
    return MSG_CODE;
}

/**
 *
 * @param code
 * @returns {*}
 */
function setMesageCode(code){
    return MSG_CODE = code;
}

/**
 *
 * @param messageCode   Codigo del Mensaje a Mostrar
 * @param message       Mensaje Alternativo a mostrar
 */
function printMessage(messageCode, message){
    var messagePrint    = '';
    var classPrint      = 'alert alert-success alert-dismissable';
    switch (messageCode){
        case MSG_NO_MESSAGE:
            messagePrint    = '';
            classPrint      = '';
            break;
        case MSG_SAVE_SUCCESS:
            messagePrint    = (message != null && message != '' ? message : 'Registro Guardado Satisfactoriamente');
            classPrint      = 'alert alert-success alert-dismissable';
            break;
        case MSG_SAVE_ERROR:
            messagePrint    = 'Error al Guardar.';
            classPrint      = 'alert alert-danger alert-dismissable';
        case MSG_DELETE_SUCCESS:
            messagePrint    = (message != null && message != '' ? message : 'Registro Eliminado Satisfactoriamente');
            classPrint      = 'alert alert-success alert-dismissable';
            break;
        case MSG_DELETE_ERROR:
            messagePrint    = 'Error al Eliminar.';
            classPrint      = 'alert alert-danger alert-dismissable';

        case MSG_LOGIN_ERROR:
            messagePrint    = 'Error al Iniciar Sesi&oacute;n.';
            classPrint      = 'alert alert-danger alert-dismissable';
        default:

    }

    if (messageCode != MSG_NO_MESSAGE) {
        $("#notificaciones").html(
            '<div class="col-lg-12"><div class="' + classPrint + '">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">�</button>' +
            messagePrint + '</div></div>'
        );
        setMesageCode(MSG_NO_MESSAGE);
    }
    else{
        $("#notificaciones").html('');
    }
}