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
            var idAdd="'nivel-add-";
            var idDelete = "'nivel-delete-";
            var idUp = "'nivel-up-";
            var idDown = "'nivel-down-";
            $.each(response.data, function(i, item) {
                if (tablaActual != null){
                    //console.log(item);
                    idAdd+=item.id+"'";
                    idDelete+=item.id+"'";
                    idUp+=item.id+"'";
                    idDown+=item.id+"'";

                    tablaActual.row.add( [
                        '<input type="checkbox" id="nivel-' + item.id + '">',
                        (item.padre != null ? '<a id="' +idDelete+ '" href="#" onclick="borrarNivel('+idDelete+')"><i class="fa fa-minus"></i></a>' : '<a id="' +idAdd+ '" style="margin-right: 10%;" href="#" onclick="agregarNivel('+idDelete+')"><i class="fa fa-plus-square"></i></a>' +
                        '<a id="' +idDelete+ '" href="#" onclick="borrarNivel('+idDelete+')"><i class="fa fa-minus"></i></a>'),
                        item.orden,
                        (item.padre != null ? "-------"+item.nombre : item.nombre),
                        item.idTipo.nombre,
                        item.idEstatus.nombre,
                        '<a id="' +idUp+ '" style="margin-right: 10%;" href="#"  onclick="cambiarNivel('+idUp+')"><i class="fa fa-arrow-circle-up"></i></a>' +
                        '<a id="' +idDown+ '" href="#" onclick="cambiarNivel('+idDown+')"><i class="fa fa-arrow-circle-down"></i></a>',
                    ] ).draw( false );
                }
                idAdd="'nivel-add-";
                idDelete = "'nivel-delete-";
                idUp = "'nivel-up-";
                idDown = "'nivel-down-";
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

function borrarNivel(id) {
    var result = prompt("¿Esta seguro que desea eliminar el nivel seleccionado?");
    if(result == "si"){
        $.ajax({
            url: R_NIVEL_INDEX + '/PRU-1986/index.json',
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'id': id.split("-")[2]
            },
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
}

function agregarNivel(id) {
    window.sessionStorage.setItem("idPadre", id.split("-")[2]);
    loadModule('nivel','nivel','Nuevo');
}

function cambiarNivel(id) {
    $.ajax({
        url: R_NIVEL_INDEX + '/PRU-1986/index.json',
        type: 'PUT',
        dataType: 'json',
        headers: {
            'id': id.split("-")[2],
            'orientation': id.split("-")[1]
        },
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