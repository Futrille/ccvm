/**
 * Notificación Service
 */
(function(){
	'use strict';
	angular
		.module('pt.utils', [])
		.service('ptJsonService', ptJsonService);

	ptJsonService.$inject = ['$log']
	function ptJsonService($log){	
		this.sanitizeJson = sanitizeJson;
		this.stringifyJson = stringifyJson;
		
		/**
		 * @description Revisa el Json y elimina los atributos que sean nulos
		 * @param - Json a limpiar
		 * @return  Json convertido.
		 */
		function sanitizeJson(json){
			angular.forEach(json, function(value, key) {
				if (value == null || key == '$$hashKey')
					delete json[key];
				else if (angular.isObject(value) && !angular.isArray(value))
					value = sanitizeJson(value);
			});
			return json;
		}
		
		/**
		 * @description Revisa el Json y elimina los atributos que sean nulos
		 * @param - Json a limpiar
		 * @return  Json convertido.
		 */
		function stringifyJson(json){
			var obj = json;
			obj = JSON.stringify(obj);
			obj = obj.replace(/\"[\[]/g, "[");
			obj = obj.replace(/[\]]\"/g, "]"); 
			obj = obj.replace(/[\\]\"/g, "\""); 
			obj = obj.replace(/\"\{/g, "\{"); 
			
			return obj;
		}
	}
})();