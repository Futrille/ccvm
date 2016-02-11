(function() {
    angular
        .module('iglesys')
        .controller('VistaController', VistaController);
    VistaController.$injector = [
        //'$log',
        //'$sce',
        //'$state',
        //'$modal',
        //'ComunicacionService',
        //'ptSeguridadService',
        //'NAVEGACION',
        //'INTERFAZ'
    ];

    function VistaController (
        //$log,
        //$sce,
        //$state,
        //$modal,
        //ComunicacionService,
        //ptSeguridadService,
        //NAVEGACION,
        //INTERFAZ
    ) {

        var vm = this;
        //vm.showAbout = showAbout;
        //vm.tipo = NAVEGACION.UI_VIEW;
        //vm.url;
        //vm.titulo = '';
        //vm.username = null;
        //vm.userFullName = '';

        //function navegarHasta(obj) {
        //    vm.tipo = obj.tipoDestino;
        //    vm.titulo = obj.textoInicio;
        //    if (vm.tipo == 0) {
        //        vm.url = obj.url;
        //        vm.player = $sce.trustAsHtml('<iframe style="width: 100%; height: 100%; border: 0;display: flex;flex: 1;" src="'+vm.url+'"></iframe>');
        //    }
        //    else {
        //        var url = obj.url.split('||');
        //        if (url.length == 1)
        //            $state.go(url[0]);
        //        else
        //            $state.go(url[0], {accion : url[1]});
        //    }
        //}

        //function getUser() {
        //    ptSeguridadService.obtenerUsuario()
        //        .then(function(response) {
        //            var user = response.data;
        //            if (user) {
        //                vm.username = user.login;
        //                vm.userFullName = user.nombrePrimero + ' ' + user.apellidoPrimero;
        //            }
        //        });
        //}

        //function showAbout() {
        //    ptSeguridadService.obtenerAcercaDe()
        //        .then(function(response) {
        //            var version = response.data;
        //            $modal.open({
        //                animation : true,
        //                templateUrl : 'modalAbout.jsp',
        //                controller : 'modalAboutController',
        //                controllerAs : 'ctrlAbout',
        //                resolve : {
        //                    params: function() {
        //                        return version;
        //                    }
        //                }
        //            });
        //        })
        //}

        //getUser();
        //ComunicacionService.registerListener(NAVEGACION.NAVEGAR, navegarHasta);
    }
})();