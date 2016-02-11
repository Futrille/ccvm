(function(){
	'use strict';
	angular
	.module('pt.redo')
	.factory('ptService', ptService);
	
	ptService.$inject = [
		//'$http',
		//'$log',
		//'$rootScope',
		//'$window',
		//'ptJsonService',
		//'NotificacionService'
	];
	
	function ptService(
		//$http,
		//$log,
		//$rootScope,
		//$window,
		//ptJsonService,
		//NotificacionService
	){

		var nRequests = 0;
		
		var service = {
				//comunicacionBackend : hacerSolicitud
		};
		
		return service;
		
		/**
		 * @description Función que crea un petición http usando $http.
		 * @param httpObj - Objeto de configuración, contiene (method, url, q, param etc).
		 * @return Petición $http
		 */
		//function hacerSolicitud(httpObj) {
		//	// Si existe el parámetro "data"
		//	if(httpObj.data) {
		//
		//		httpObj.data = ptJsonService.sanitizeJson(httpObj.data);
		//		httpObj.data = ptJsonService.stringifyJson(httpObj.data);
		//	}
        //
		//	// Si existe el objeto q dentro de params, pero es un objeto vacío, tonces lo eliminamos
		//	if (httpObj.params && httpObj.params.q && angular.equals({}, httpObj.params.q)) {
		//
		//		httpObj.params.q = null;
		//	}
		//
		//
		//	// Si "params" y "q" son ciertos...
		//	if(httpObj.params && httpObj.params.q) {
		//
		//		httpObj.params.q = ptJsonService.sanitizeJson(httpObj.params.q);
		//		httpObj.params.q = ptJsonService.stringifyJson(httpObj.params.q);
		//
		//	} else if(httpObj.params && !httpObj.params.q) {
		//
		//		httpObj.params = ptJsonService.sanitizeJson(httpObj.params);
		//		httpObj.params = ptJsonService.stringifyJson(httpObj.params);
		//	}
		//
		//	if(nRequests == 0) {
		//		// Mostrar mensaje 'Cargando... Por favor espere...'
		//	}
		//
		//	nRequests++;
		//	$rootScope.mostrarBusy = true;
		//
		//	var peticion = $http(httpObj);
	     //
		//	return peticion
         //   	.then(function (response) {
         //
         //   		nRequests--;
         //
        	//		if(nRequests == 0) {
        	//			$rootScope.mostrarBusy = false;
        	//		}
        	//
         //   		// Si la petición no fue por GET...
         //   		if(httpObj.method != 'GET') {
         //
         //   			var type = null;
         //
         //   			switch(response.data.title.type) {
         //   				case 'SUCCESS':
         //   					type = 'success';
         //   					break;
         //
         //   				case 'ERROR':
         //   					type = 'error';
         //   					break;
         //
         //   				case 'WARNING':
         //   					type = 'warn';
         //   					break;
         //
         //   				case 'INFO':
         //   					type = 'info';
         //   					break;
         //   			}
         //
         //               NotificacionService.params.tipo = type;
         //               NotificacionService.params.mensaje = response.data.title.text;
         //               NotificacionService.mostrar();
         //   		}
         //
         //   		return response.data;
         //
         //   	}).catch(function (response) {
         //
         //   		nRequests--;
         //
        	//		if(nRequests == 0) {
        	//			$rootScope.mostrarBusy = false;
        	//		}
         //
         //   		if(response.status == 401) {
         //   			alert("Acceso no autorizado. Debe iniciar Sesión");
         //   			$window.close();
         //
         //   		} else if(response.status >= 400) {
         //
         //               NotificacionService.params.tipo = "error";
         //               NotificacionService.params.mensaje = response.data.title.text;
         //               NotificacionService.mostrar();
         //   		}
         //   		return response.data;
         //   	});
		//}
	}

})();