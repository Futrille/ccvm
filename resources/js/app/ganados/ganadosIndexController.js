(function() {
    'use strict';

    setTitle('Familias Conectadas ');
    setTitleDescription('');

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
    console.log('Session familia:',$.parseJSON(sessionStorage.getItem('ganados-familia-index')));

    data = $.parseJSON(sessionStorage.getItem('ganados-familia-index'));
    if (data == null){
        getList(R_FAMILIA_INDEX + '/PRU-1986/index.json')
            .done(function(response) {
                // validateSession(data);
                // $.each(data.resumen, function(i, item) {
                //     $('#ganados-resumen-tipo-' + item.id).html(item.cantidad);
                // });
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
        $( "#table-loader" ).remove();
        llenarTabla(data);
    }

    $("#btn-registrar-familia").on('click', function(){
        loadModule('ganados','ganados','Nuevo');
    });

    function llenarTabla(values){
        sessionStorage.setItem('ganados-familia-index', JSON.stringify(values));
        $.each(values.data, function(i, item) {
            if (tablaActual != null){
                tablaActual.row.add( [
                    (i+1),
                    '<input type="checkbox" id="familia-' + item.id + '">',
                    item.nombre,
                    item.integrantes
                    // '<a id="persona_' + item.id + '" name="lista_editar" href="javascript:loadModule(\'ganados\',\'ganados\',\'Editar\',' + item.id + ');">' + item.nombres + '</a>',
                    // item.telefono,
                    // item.correo,
                    // item.metodoGanar.nombre,
                    // getFecha(item.fechaGanado.timestamp),
                ] ).draw( false );
            }
        });
    }

    $('#mi-modal').on('shown.bs.modal', function () {
        // $('#myInput').focus()
    })
})();
