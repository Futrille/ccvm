(function(){
    'use strict';
    angular
        .module('iglesys')
        .constant('MENU', {
            'APP' : '/cain/api/seguridad/menus/'
        })
        .constant('VIEW_MODE', {
            BROWSE: 'browse',
            ADD:	'add',
            EDIT:	'edit'
        })
        .constant('NAVEGACION', {
            FRAME	: 0,
            BLANK	: 1,
            UI_VIEW	: 2,
            NAVEGAR	: 'navegar'
        })
        .constant('INTERFAZ', {
            ACTUALIZAR_TITULO	: 'actualizar titulo'
        })
})();