

var PROTOCOL    = 'http://';
var SERVER      = 'localhost';
var app         = {
        idEntidad: 0
};

var ROUTE;
ROUTE = {
    MODULES: {
        GANADOS: '/efi-core/web/app_dev.php/persona/',
        GANADOS_NEW: '/efi-core/web/app_dev.php/persona/new',
        GENERAL: '/efi-core/web/app_dev.php/general/valorvariable'
    }
};

function getIdEntidad(){
    return app.idEntidad;
}

function setIdEntidad(id){
    return app.idEntidad = id;
}

function getRoute(nameRoute, id){
    var route = '';
    setIdEntidad(id);
    switch (nameRoute){
        case 'persona_index':
            route = '/efi-core/web/app_dev.php/persona'
            break;
        case 'persona_new':
            route = '/efi-core/web/app_dev.php/persona/new'
            break;
        case 'persona_edit':
            route = '/efi-core/web/app_dev.php/persona/' + getIdEntidad() + '/edit'
            break;
        case 'persona_delete':
            route = '/efi-core/web/app_dev.php/persona/' + getIdEntidad() + '/delete'
            break;
        default:
            route = '/efi-core/web/app_dev.php/general';
    }
    return route;
}