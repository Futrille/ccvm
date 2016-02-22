

var PROTOCOL    = 'http://';
var SERVER      = 'localhost';
var module      = '/efi-core';
var ENV         = '/app_dev.php';
var web         = '/web';
var app         = {
        idEntidad: 0
};

var ROUTE;
ROUTE = {
    MODULES: {
        GANADOS: module + web + ENV + '/persona/',
        GANADOS_NEW: module + web + ENV + '/persona/new',
        GENERAL: module + web + ENV + '/general/valorvariable'
    }
};

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
            route = route + '/persona';
            break;
        case 'persona_new':
            route = route + '/persona/new';
            break;
        case 'persona_edit':
            route = route + '/persona/' + getIdEntidad() + '/edit';
            break;
        case 'persona_delete':
            route = route + '/persona/' + getIdEntidad() + '/delete';
            break;

        case 'valorvariable_index':
            route = route + '/valorvariable/' + getIdEntidad() + '/delete';
        default:
            route = route + '/general';
    }
    return route;
}