/**
 * Created by luisc on 2/11/2016.
 */
var cont = 0;
var contTotal;
var idPadre = null;
var nivelEditId = null;
(function() {
    'use strict';

    if(window.sessionStorage.getItem("idPadre")!=null){
        contTotal=2;
        idPadre=window.sessionStorage.getItem("idPadre");
        window.sessionStorage.removeItem("idPadre");
        setPadre(idPadre);
    }else{
        contTotal=1;
    }

    if(window.sessionStorage.getItem("nivelEditId")!=null){
        setTitle('Editar Nivel');
        nivelEditId=window.sessionStorage.getItem("nivelEditId");
        window.sessionStorage.removeItem("nivelEditId");
        setTitleDescription(" Ingrese los datos del nivel.");
    }else{
        setTitle('Registrar Nivel');
        setTitleDescription(" Ingrese los datos del nivel nuevo.");
    }

    setValoresVariables();
})();

function validate() {
    return !($('#nivColor').val() == '' || $('#nivNombre').val() == '');
}

function clear() {
    $('#nivColor').val('');
    $('#nivNombre').val('');
}

function setValoresVariables(){
    var url = R_VALORVARIABLE_INDEX;
    var headers = {
        'vvaCodigo': 'nivel_icono,nivel_estatus,nivel_tipo'
    };
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: headers,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $.each(data[0], function (i, item) {
                $("#nivIconos").append($('<option>', {
                    value: item.id,
                    text : item.nombre
                }));
            });
            $.each(data[1], function (i, item) {
                $("#nivEstatus").append($('<option>', {
                    value: item.id,
                    text : item.nombre
                }));
            });
            $.each(data[2], function (i, item) {
                $("#nivTipo").append($('<option>', {
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
            setCont();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function setCont() {
    cont++;
    if(cont==contTotal){
        if(nivelEditId!=null){
            setNivel(nivelEditId);
        }else{
            $('#table-loader').remove();
        }
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
        url: url,
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

function actualizarNivel() {
    var url = R_NIVEL_INDEX + '/PRU-1986/index.json';
    var headers = {
        'id':nivelEditId,
        'color': $('#nivColor').val(),
        'nombre': $('#nivNombre').val(),
        'nivelpadre': idPadre,
        'icono': $("#nivIconos option:selected").text(),
        'tipo': $("#nivTipo option:selected").text(),
        'estatus': $("#nivEstatus option:selected").text()
    };

    $.ajax({
        url: url,
        type: 'PUT',
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

function setNivel(id) {
    $.ajax({
        url: R_NIVEL_INDEX + '/PRU-1986/index.json',
        type: 'GET',
        dataType: 'json',
        headers: {
            'idNivel': id
        },
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if(data.data[0].padre !=null){
                $('#nivSuperior').val(data.data[0].padre.nombre);
                idPadre = data.data[0].padre.id;
            }
            console.log(idPadre);
            $('#nivColor').val(data.data[0].color);
            $('#nivIconos').val(data.data[0].idIcono.id);
            $('#nivNombre').val(data.data[0].nombre);
            $('#nivEstatus').val(data.data[0].idEstatus.id);
            $('#nivTipo').val(data.data[0].idTipo.id);

            $('#table-loader').remove();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

$("#btn-nivel-registrar-cancelar").on('click', function(){
    loadModule('nivel','nivel','Index');
});

$("#btn-nivel-registrar-limpiar").on('click', function(){
    clear();
});

$("#btn-nivel-registrar-guardar").on('click', function(){
    if(validate()){
        if(nivelEditId!=null){
            actualizarNivel();
        }else{
            guardarNivel();
        }
    }else{
        alert("Debe llenar todos los campos");
    }
});