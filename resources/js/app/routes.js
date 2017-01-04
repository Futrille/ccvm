var PROTOCOL    = 'http://';
var SERVER      = 'localhost';
var module      = '/ivm-core';
var front_dir   = '/ivm-web';    // /ivm
var ENV         = '/app_dev.php';// /app.php
var web         = '/web';

var ROUTE = {
    MODULES: {
        GANADOS: module + web + ENV + '/persona/',
        GANADOS_NEW: module + web + ENV + '/persona/new',
        GENERAL: module + web + ENV + '/general/valorvariable',
        IGLESIA: module + web + ENV + '/iglesia/'
    }
};
var R_PERSONA_COUNT = module + web + ENV + '/persona/count';
var R_FAMILIA_INDEX = module + web + ENV + '/familia';
var R_NIVEL_INDEX = module + web + ENV + '/nivel';
var R_VALORVARIABLE_INDEX = module + web + ENV + '/general/valorvariable';



function getRoute(nameRoute, id){
    var route = module + web + ENV;
    APP.setIdEntidad(id);

    switch (nameRoute){
        case 'persona_index':
            route = route + '/persona/';
            break;
        case 'persona_new':
            // route = route + '/persona/new';
            // break;
        // case 'persona_edit':
            route = route + '/persona/new/' + APP.getIdEntidad();
            break;
        case 'persona_delete':
            route = route + '/persona/' + APP.getIdEntidad() + '/delete';
            break;
        case 'persona_count':
            route = route + '/persona/count/';
            break;

        case 'valorvariable_index':
            route = route + '/valorvariable/' + APP.getIdEntidad() + '/delete/';
            break;

        case 'login':
            route = route + '/login';
            break;
        
        case 'logout':
            route = route + '/logout';
            break;

        case 'homepage':
            route = route + '/';
            break;

        default:
            route = front_dir;
    }
    return route;
}
