

var PROTOCOL    = 'http://';
var SERVER      = 'localhost';
var module      = 'prueba';
var ENV         = 'app.php';
var app         = {
        idEntidad: 0
};

var ROUTE;
ROUTE = {
    MODULES: {
        GANADOS: '/' + module + '/web/' + ENV + '/persona/',
        GANADOS_NEW: '/' + module + '/web/' + ENV + '/persona/new',
        GENERAL: '/' + module + '/web/' + ENV + '/general/valorvariable'
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
            route = '/' + module + '/web/' + ENV + '/persona'
            break;
        case 'persona_new':
            route = '/' + module + '/web/' + ENV + '/persona/new'
            break;
        case 'persona_edit':
            route = '/' + module + '/web/' + ENV + '/persona/' + getIdEntidad() + '/edit'
            break;
        case 'persona_delete':
            route = '/' + module + '/web/' + ENV + '/persona/' + getIdEntidad() + '/delete'
            break;
        default:
            route = '/' + module + '/web/' + ENV + '/general';
    }
    return route;
}