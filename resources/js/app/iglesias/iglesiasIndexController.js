(function() {
    'use strict';

    APP.setTitle('Iglesias');
    APP.setTitleDescription('');
    var codeStorage = 'iglesias-index';
    var tablaActual = null;
    var data = null;

    APP.msg.printMessage(APP.msg.getMessageCode());
    try{
        tablaActual = $("#iglesias-main-table").DataTable({
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
        console.log("Error [Iglesias/Index/Controller]:", e.message);
    }


    data = $.parseJSON(APP.storage.get(codeStorage));
    if (data == null){
        getList(ROUTE.MODULES.IGLESIA + APP.getIdEntidad())
            .done(function(response) {
                if (response != null){
                    console.log("debug 3");
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
        console.log("debug 4");
        llenarTabla(data);
        $( "#table-loader" ).remove();
    }

    $("#btn-registrar-iglesia").on('click', function(){
        loadModule('iglesias','iglesias','Nuevo');
    });

    function llenarTabla(values){
        APP.storage.set(codeStorage, JSON.stringify(values));
        $.each(values.data, function(i, item) {
            if (tablaActual != null){
                tablaActual.row.add( [
                    (i+1),
                    '<input type="checkbox" id="iglesia-' + item.id + '">',
                    '<a id="iglesia_' + item.id + '" name="lista_editar" href="javascript:loadModule(\'iglesias\',\'iglesias\',\'Nuevo\',' + item.id + ');">' + item.nombre + '</a>',
                    item.pais.nombre,
                    item.idEstatus.nombre
                ] ).draw( false );
            }
        });
    }

    $('#mi-modal').on('shown.bs.modal', function () {
        // $('#myInput').focus()
    })
})();
