/**
 * Created by luisc on 28/10/2016.
 */
(function() {
    'use strict';

    setTitle('Niveles ');
    setTitleDescription('');
    var tablaActual = null;
    try{
        tablaActual = $("#nivel-main-table").DataTable({
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
            $.each(response.data, function(i, item) {
                console.log(item);
                if (tablaActual != null){
                    var idAdd="nivel-add-";
                    var idDelete = "nivel-delete-";
                    tablaActual.row.add( [
                        '<input type="checkbox" id="nivel-' + item.id + '">',
                        (item.padre != null ? '<a id="nivel-delete-' + item.id + '" href="#" onclick="borrarNivel(idDelete+item.id)"><i class="fa fa-minus"></i></a>' : '<a id="nivel-add-' + item.id + '" style="margin-right: 10%;" href="#"><i class="fa fa-plus-square"></i></a>' +
                        '<a id="nivel-delete-' + item.id + '" href="#"><i class="fa fa-minus"></i></a>'),
                        item.orden,
                        (item.padre != null ? "-------"+item.nombre : item.nombre),
                        item.idTipo.nombre,
                        item.idEstatus.nombre,
                        '<a id="nivel-up-' + item.id + '" style="margin-right: 10%;" href="#"><i class="fa fa-arrow-circle-up"></i></a>' +
                        '<a id="nivel-down-' + item.id + '" href="#"><i class="fa fa-arrow-circle-down"></i></a>',
                    ] ).draw( false );
                }
            });
        })
        .fail(function(dataFail) {
        })
        .always(function() {
            $( "#table-loader" ).remove();
        });

    $("#btn-registrar-nivel").on('click', function(){
        loadModule('nivel','nivel','Nuevo');
    });
})();