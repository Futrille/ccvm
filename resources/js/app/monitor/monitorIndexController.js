(function() {
    'use strict';

    setTitle('Niveles ');
    setTitleDescription('');

    $.ajax({
        url: R_NIVEL_INDEX + '/PRU-1986/index.json',
        type: 'GET',
        dataType: 'json',
        headers: {
            'padres': 'padres'
        },
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            for(var i = 0; i < data.data.length; i++){
                $('#cuerpoMonitor').append("" +
                    "<div class='col-lg-3 col-xs-6'>" +
                        "<div class='small-box bg-"+data.data[i].color+"'>" +
                            "<div class='inner'>" +
                                "<h3 id='nivel_"+data.data[i].nombre.toLowerCase()+"_cantidad'>-</h3>" +
                                "<p>"+data.data[i].nombre+"</p>" +
                            "</div>" +
                            "<div class='icon'>" +
                                "<i class='fa fa-"+data.data[i].idIcono.nombre+"'></i>" +
                            "</div>" +
                            "<a id='consultar-nivel-1' href='javascript:void(0);' class='small-box-footer'>Ver listado <i class='fa fa-arrow-circle-right'></i></a>" +
                        "</div>" +
                    "</div>");
            }

        },
        error: function (error) {
            console.log(error);
        }
    });

    try {
        var codeSessionStorage = 'cantidad';
        var cantidad = APP.storage.get(codeSessionStorage, '-');

        if (cantidad == '-') {
            getList(getRoute('persona_count'))
                .done(function (response) {
                    try {
                        llenar(response.data);
                    }
                    catch (e) {
                        console.log("Error [Monitor/Index]: " + e.message);
                    }
                })
                .fail(function (dataFail) {
                })
                .always(function () {
                });
        }
        else {
            $('#ganados_cantidad').html(cantidad);
        }
    }
    catch(e){
        console.log("Error [Monitor/Index]:" + e.message);
    }
    function llenar(valores){
        if (valores != null){
            APP.storage.set(codeSessionStorage, valores);
            $('#ganados_cantidad').html(valores);
            iniciarEventos();
        }
        else{
            APP.storage.remove(codeSessionStorage);
        }
    }
    
    
    function iniciarEventos(){
        
    }
    // $("#consultar-nivel-1").on('click', function(){
    //     loadModule('ganados','ganados','Index');
    // });

})();