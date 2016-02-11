(function(){
    'use strict';
    angular
        .module('iglesys')
        .config(routes);

    routes.$injector = ['$stateProvider', '$urlRouterProvider','$ocLazyLoadProvider'];

    function routes( $stateProvider, $urlRouterProvider,$ocLazyLoadProvider) {
        $urlRouterProvider.otherwise('/');

        //$stateProvider
        //    .state('inicio', {
        //        url : '/'
//            resolve : [
//                '$ocLazyLoad', function($ocLazyLoad){
//                    return $ocLazyLoad.load([]);
//                }
//            ]
//            })
//            .state('buscar', {
//                controller: 'buscarController',
//                controllerAs: 'ctrl',
//                templateUrl: 'documento/buscar.jsp',
//                url : '/buscar'
//                resolve : [
//                    '$ocLazyLoad', function($ocLazyLoad){
//                        return $ocLazyLoad.load([]);
//                    }
//                ]
//            })
    }
})();