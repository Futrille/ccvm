(function(){
    'use strict';
    angular
        .module('iglesys');
        //.run(reiniciarFiltro);

    RootScope.$injector = ['$rootScope'];
    function RootScope ($rootScope) {
        $rootScope.appid = null
    }

    /**
     *  @decription reinicia la variable de aplicación que mantiene el filtro de búsqueda.
     *  @param $rootScope.
     */
    //reiniciarFiltro.$inject = ['$rootScope','$log'];
    //function reiniciarFiltro($rootScope,$log){
    //    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // Eliminando variable filterModel que mantiene los objetos seleccionados en filtro.
//			if ((fromState.name.indexOf('movBancario') == 0 && (toState.name.indexOf('movBancario') !== 0)	||
//			(fromState.name.indexOf('conciliacion') == 0) && toState.name.indexOf('conciliacion') !== 0)) {
//				delete $rootScope.filterModel;
//			}
//        });
//    }
})();