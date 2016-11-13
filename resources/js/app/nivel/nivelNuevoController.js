/**
 * Created by luisc on 2/11/2016.
 */
var cont = 0;
(function() {
    'use strict';
    setTitle('Registrar Nivel');
    setTitleDescription(" Ingrese los datos del nivel nuevo.");
    setValoresVariables($("#nivIconos"), 'nivel_icono');
    setValoresVariables($("#nivEstatus"), 'nivel_estatus');
    setValoresVariables($("#nivTipo"), 'nivel_tipo');
})();

function setValoresVariables(select, codigo){
    var iconos =  select;
    var url = R_VALORVARIABLE_INDEX;
    var headers = {
        'vvaCodigo': codigo
    };
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: headers,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $.each(data, function (i, item) {
                iconos.append($('<option>', {
                    value: item.id,
                    text : item.nombre
                }));
               console.log(item);
            });
            setCont();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function setCont() {
    cont++;
    if(cont==3){
        $('#table-loader').remove();
    }
}

function agregarNivel() {
    var url = R_NIVEL_INDEX + '/new/PRU-1986/index.json';
    var headers = {
        'color': 'blue',
        'nombre': 'nombre',
        // 'nivelpadre': '',
        'icono': 'heart',
        'tipo': 'Clase',
        'estatus': 'Inactivo'
    };

    $.ajax({
        url: url+"?XDEBUG_SESSION_START=14745",
        type: 'POST',
        dataType: 'json',
        headers: headers,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
        },
        error: function (error) {
            console.log(error);
        }
    });

    $("#btn-nivel-registrar-cancelar").on('click', function(){
        loadModule('nivel','nivel','Index');
    });
}