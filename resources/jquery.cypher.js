/*
 * jQuery Cypher Plugin v1.0.0
 * https://sourceforge.net/projects/jquery-cypher/
 *
 * Copyright 2016 Edgar E. Carrizales Martinez
 * Released under the MIT license
*/
 /*
 
 Uso:
 
Ligado al val de un elemento:
 $("#input").Cypher('en',"llave"); 

Como retorno de datos:
 var textoDemo=$.Cypher("en","mi cadena","miLlave")
Ligado a un elemento pero especificando el texto a trabajar:
  $("#texto").Cypher('en',"texto","llave");
 
Metodos:
Cypher('en',"texto","llave");
Cypher('de',"texto","llave");

*/

(function($) {
    var methods = {
        en: function(texto, llave) {
            var key = 0;
            for (var k = 0; k < llave.length; k++) {
                keychar = llave.substr(k, 1);
                key = key + Number(keychar.charCodeAt())
            }
            var newKey = parseInt(parseInt(key / llave.length) / llave.length);
            var newTexto = "";
            for (var x = 0; x < texto.length; x++) {
                caracter = texto.substr(x, 1);
                var char = caracter.charCodeAt() + newKey;
                newTexto += String.fromCharCode(char)
            }
            return window.btoa(newTexto)
        },
        de: function(text, llave) {
            var key = 0;
            for (var k = 0; k < llave.length; k++) {
                keychar = llave.substr(k, 1);
                key = key + Number(keychar.charCodeAt())
            }
            var newKey = parseInt(parseInt(key / llave.length) / llave.length);
            var texto_decode = window.atob(text);
            var newTexto = "";
            for (var x = 0; x < texto_decode.length; x++) {
                caracter = texto_decode.substr(x, 1);
                var char = caracter.charCodeAt() - newKey;
                newTexto += String.fromCharCode(char)
            }
            return newTexto
        }
    };
    $.Cypher = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    };
    $.fn.Cypher = function(method) {
        var cantidad_argumentos = arguments.length;
        if (cantidad_argumentos > 2) {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        } else {
            if (cantidad_argumentos == 2) {
                arguments = [$(this).val(), arguments[1]];
                var resultado = methods[method].apply(this, arguments);
                return $(this).val(resultado)
            }
            $.error("Falta indicar el parametro de la llave")
        }
        $.error('La funcion ' + method + ' no existe')
    }
})(jQuery);