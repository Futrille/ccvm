(function() {
    'use strict';

    APP.setTitle('Familias Conectadas ');
    APP.setTitleDescription('');
    var codeStorage = 'ganados-familia-index';
    var tablaActual = null;
    var data = null;
    try{
        tablaActual = $("#ganados-main-table").DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "info": false,
            "autoWidth": false,
            "responsive": true
        });
    }
    catch (e){
        console.log("Error [Ganados/Index/Controller]:", e.message);
    }


    /**
     *
     * @param timestamp
     * @returns {string}
     */
    function getFecha(timestamp){
        var a = new Date(timestamp * 1000);
        var months = ['Ene','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = "0" + a.getMonth();
        var date = "0" + a.getDate();

        var time = date.substr(-2) + '/' + month.substr(-2) + '/' + year;
        return time;
    }

    data = $.parseJSON(APP.storage.get(codeStorage));
    if (data == null){
        getList(R_FAMILIA_INDEX + '/PRU-1986/index.json')
            .done(function(response) {
                if (response != null){
                    llenarTabla(response);
                }
            })
            .fail(function(dataFail) {
            })
            .always(function() {
                $( "#table-loader" ).remove();
            });
    }
    else{
        llenarTabla(data);
        $( "#table-loader" ).remove();
    }

    $("#btn-registrar-familia").on('click', function(){
        loadModule('ganados','ganados','Nuevo');
    });

    function llenarTabla(values){
        APP.storage.set(codeStorage, JSON.stringify(values));
        $.each(values.data, function(i, item) {
            if (tablaActual != null){
                tablaActual.row.add( [
                    (i+1),
                    '<input type="checkbox" id="familia-' + item.id + '">',
                    '<a id="familia_' + item.id + '" name="lista_editar" href="javascript:loadModule(\'ganados\',\'ganados\',\'Nuevo\',' + item.id + ');">' + item.nombre + '</a>',
                    item.integrantes,
                    // item.telefono,
                    // item.correo,
                    // item.metodoGanar.nombre,
                    // getFecha(item.fechaGanado.timestamp)
                ] ).draw( false );
            }
        });
    }

    $('#mi-modal').on('shown.bs.modal', function () {
        // $('#myInput').focus()
    })
})();
