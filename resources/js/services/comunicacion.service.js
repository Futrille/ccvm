//(function() {
//	'use strict';
//
//	angular
//		.module('iglesys')
//		.service('ComunicacionService', ComunicacionService);
//
//	ComunicacionService.$injector = ['$log'];
	/**
	 *
	 * @param $log
	 */
	//function ComunicacionService($log) {
	//	var listeners = [];
		/**
		 * @description Registra una función "callback" y asigna un token de identificación
		 * @param token - variable de identificación
		 * @param listener - función callback a pasar
		 * @return
		 */
		//this.registerListener = function(token, listener) {
		//	var exist = false;
		//	angular.forEach(listeners, function(list) {
		//		if (list.token == token && list.listener) {
		//			exist = true;
		//			list.listener = listener;
		//		}
		//	});
		//	if (!exist)
		//		listeners.push({token: token, listener:listener});
		//}
		/**
		 * @description Entrega un objeto a una función callback identificado por un token.
		 * @param token - variable de identificación
		 * @param obj - Objeto
		 * @return
		 */
		//this.takeThisListener = function(token, obj) {
		//	angular.forEach(listeners, function(listener) {
		//		if (listener.token == token && listener.listener)
		//			listener.listener(obj);
		//	});
		//}
		/**
		 * @description Llama a una función callback con un token identificador dado.
		 * @param token - variable de identificacion.
		 * @return
		 */
		//this.doSomethingListener = function(token) {
		//	angular.forEach(listeners, function(listener) {
		//		if (listener.token == token && listener.listener)
		//			listener.listener();
		//	});
		//}
//	}
//})();