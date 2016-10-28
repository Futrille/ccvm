/**
 * Created by luisc on 28/10/2016.
 */
(function() {
    'use strict';

    var tablaActual2 = null;
    try{
        tablaActual2 = $("#nivel-main-table").DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false
            //"responsive": false
        });
    }
    catch (e){
        console.log("Error [Nivel/Index/Controller]:", e.message);
    }


    getList(R_NIVEL_INDEX + '/PRU-1986/index.json')
        .done(function(response) {
            console.log(response);
            // validateSession(data);
            // $.each(data.resumen, function(i, item) {
            //     $('#ganados-resumen-tipo-' + item.id).html(item.cantidad);
            // });
            //
            $.each(response.data, function(i, item) {
                console.log(item);
                  if (tablaActual2 != null){
                    tablaActual2.row.add( [
                        'combobox',
                        'acciones',
                        item.orden,
                        (item.padre != null ? "-------"+item.nombre : item.nombre),
                        item.idTipo.nombre,
                        item.idEstatus.nombre,
                        'mover'
                        // '<a id="persona_' + item.id + '" name="lista_editar" href="javascript:loadModule(\'ganados\',\'ganados\',\'Editar\',' + item.id + ');">' + item.nombres + '</a>',
                        // item.telefono,
                        // item.correo,
                        // item.metodoGanar.nombre,
                        // getFecha(item.fechaGanado.timestamp),
                    ] ).draw( false );
                }
            });
        })
        .fail(function(dataFail) {
        })
        .always(function() {
            $( "#table-loader" ).remove();
        });


})();