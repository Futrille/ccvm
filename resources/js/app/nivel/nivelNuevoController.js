/**
 * Created by luisc on 2/11/2016.
 */
var cont = 0;
var contTotal;
var idPadre = null;
(function() {
    'use strict';

    if(window.sessionStorage.getItem("idPadre")!=null){
        contTotal =4;
        idPadre=window.sessionStorage.getItem("idPadre");
        window.sessionStorage.removeItem("idPadre");
        setPadre(idPadre);
    }else{
        contTotal=3;
    }

    setTitle('Registrar Nivel');

    setTitleDescription(" Ingrese los datos del nivel nuevo.");
    setValoresVariables($("#nivIconos"), 'nivel_icono');
    setValoresVariables($("#nivEstatus"), 'nivel_estatus');
    setValoresVariables($("#nivTipo"), 'nivel_tipo');
})();

function validate() {
    if($('#nivColor').val()==''){
        return false;
    }
    if($('#nivNombre').val()==''){
        return false;
    }
    return true;
}

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
            });
            setCont();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function setPadre(id) {
    $.ajax({
        url: R_NIVEL_INDEX + '/PRU-1986/index.json',
        type: 'GET',
        dataType: 'json',
        headers: {
            'idNivel': id
        },
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $('#nivSuperior').val(data.data[0].nombre);
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

function guardarNivel() {
    var url = R_NIVEL_INDEX + '/new/PRU-1986/index.json';
    var headers = {
        'color': $('#nivColor').val(),
        'nombre': $('#nivNombre').val(),
        'nivelpadre': idPadre,
        'icono': $("#nivIconos option:selected").text(),
        'tipo': $("#nivTipo option:selected").text(),
        'estatus': $("#nivEstatus option:selected").text()
    };

    $.ajax({
        url: url+"?XDEBUG_SESSION_START=19215",
        type: 'POST',
        dataType: 'json',
        headers: headers,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data);
            loadModule('nivel','nivel','Index');
        },
        error: function (error) {
            console.log(error);
        }
    });
}

$("#btn-nivel-registrar-cancelar").on('click', function(){
    loadModule('nivel','nivel','Index');
});

$("#btn-nivel-registrar-guardar").on('click', function(){
    if(validate()){
        guardarNivel();
    }else{
        alert("Debe llenar todos los campos");
    }
});