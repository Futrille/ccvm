/**
 * Seguridad Service
 */
(function(){
	'use strict'
	angular
		.module('pt.seguridad',[])
		.factory('ptSeguridadService', SeguridadService)
		.constant('SEGURIDAD', {
	    	 USUARIO : '/cain/api/seguridad/usuario',
	    	 ABOUT : '/cain/api/seguridad/menuproperties'
	     });
	// Inyectando $servicios
	SeguridadService.$inject =  ['$log','ptService','SEGURIDAD'];
	function SeguridadService ($log, ptService, SEGURIDAD) {
		
		var service = {
				obtenerUsuario : obtenerUsuario,
				obtenerAcercaDe: obtenerAcercaDe
		};
		
		return service;
		
		/**
		 * 
		 */
		function obtenerUsuario (obj) {
			var url = SEGURIDAD.USUARIO;
			if (obj)
				url += '/' + obj;
				
			var peticion = ptService.comunicacionBackend({
				method : 'GET',
				url : url				
			});
			
			return peticion.then(function(response){
				return response;
			})
		}
		
		function obtenerAcercaDe() {
			var peticion = ptService.comunicacionBackend({
				method : 'GET',
				url : SEGURIDAD.ABOUT
			});
			
			return peticion.then(function(response) {
				return response;
			});
		}
	}
})();