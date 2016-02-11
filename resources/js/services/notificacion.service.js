/**
 * Notificación Service
 */
(function(){
	'use strict';
	angular
		.module('NotificacionService',['ngNotify','ngSanitize'])
		.service('NotificacionService',Notificacion);

		Notificacion.$inject = ['$log','ngNotify']
		function Notificacion($log, ngNotify){	
			/**
			 * @description Constructor de la notificación
			 * @param - tipo : Define el color de la notificación, soporta 'error','success','info','warn'.
			 * @param - mensaje : Mensaje de notificación.
			 * @param - duracion : Duración del mensaje en milisegundos. 
			 * @param - posicion : Posición en la que aparecerá la notificación soporta 'top' y 'bottom'.
			 * @return Objecto para construir una notificación
			 */			
			this.params = {
				tipo : 'success',
				mensaje : 'Mensaje por defecto!',
				duracion : 4000,
				posicion : 'bottom'							
			};
			
			/**
			 * @description Define el tipo de notificación
			 * @param  valor - string 'error','success','info','warn'.
			 * @return Parámetro "tipo" definido.
			 */
			this.tipo = function(valor){
				return this.params.tipo = valor;
			};
			
			/**
			 * @description Define el mensaje de la notificación
			 * @param valor - string, 'Operación exitosa'.
			 * @return Parámetro "mensaje" definido.
			 */
			this.mensaje = function(valor){
				return this.params.mensaje = valor
			};
			
			/**
			 * @description Define la duración de la notificación en milisegundos.
			 * @param valor - number, 4000 por defecto.
			 * @return Parámetro "duracion" definido.
			 */
			this.duracion = function(valor){
				return this.params.duracion = valor
			};
			
			/**
			 * @description Define la posición en pantalla de la notificación.
			 * @param valor - string, 'top', 'bottom'. 'bottom' por defecto.
			 * @return Parámetro "posicion" definido.
			 */
			this.posicion = function(valor){
				return this.params.posicion = valor
			};
			
			/**
			 * @description Construye la notificación segun los parámetros establecidos
			 * @param - reponse. Opcional. Objeto de respuesta del backend.
			 * @return  Notificación.
			 */
			this.mostrar = function(response){
				
				if(response) {
					
					
				} else {
					ngNotify.config({
						type : this.params.tipo,
						duration : this.params.duracion,
						position : this.params.posicion,
						theme : 'pure'					
					});
				}
				return ngNotify.set(this.params.mensaje);
			}
		}
})();