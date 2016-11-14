/**
 * Created by luisc on 28/10/2016.
 */
var idForDelete=null;
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
            var idEdit = "'nivel-edit-";
            $.each(response.data, function(i, item) {
                if (tablaActual != null){
                    idAdd+=item.id+"'";
                    idDelete+=item.id+"'";
                    idUp+=item.id+"'";
                    idDown+=item.id+"'";
                    idEdit+=item.id+"'";

                    var linkBorrarNivel = '<a id="' +idDelete+ '" href="javascript:void(0);" data-toggle="modal" data-target="#myModalSelected" onclick="seleccionNivelBorrar('+idDelete+')"><i class="fa fa-minus"></i></a>';
                    var linkAgregarNivel = '<a id="' +idAdd+ '" style="margin-right: 10%;" href="#" onclick="agregarNivel('+idDelete+')"><i class="fa fa-plus-square"></i></a>';
                    var linkEditarNivel = '<a id="' +idEdit+ '" style="margin-left: 10%;" href="#" onclick="editarNivel('+idEdit+')"><i class="fa fa-pencil"></i></a>';
                    var linkCambiarOrdenUp = '<a id="' +idUp+ '" style="margin-right: 10%;" href="#"  onclick="cambiarNivel('+idUp+')"><i class="fa fa-arrow-circle-up"></i></a>';
                    var linkCambiarOrdenDown = '<a id="' +idDown+ '" href="#" onclick="cambiarNivel('+idDown+')"><i class="fa fa-arrow-circle-down"></i></a>';

                    tablaActual.row.add( [
                        '<input type="checkbox" id="nivel-' + item.id + '">',
                        (item.padre != null ? linkBorrarNivel : linkAgregarNivel + linkBorrarNivel)+linkEditarNivel,
                        item.orden,
                        (item.padre != null ? "-------"+item.nombre : item.nombre),
                        item.idTipo.nombre,
                        item.idEstatus.nombre,
                        (item.orden != 1 ? linkCambiarOrdenUp + linkCambiarOrdenDown : linkCambiarOrdenDown),
                    ] ).draw( false );
                }
                idAdd="'nivel-add-";
                idDelete = "'nivel-delete-";
                idUp = "'nivel-up-";
                idDown = "'nivel-down-";
                idEdit = "'nivel-edit-";
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

    $("#nivel-eliminar-seleccionados").on('click', function(){
        eliminarSeleccionados();
    });

    $("#nivel-eliminar").on('click', function(){
        borrarNivel();
    });

    $("#nivel-eliminar-cancel").on('click', function(){
        idForDelete=null;
    });
})();

function seleccionNivelBorrar(id) {
    idForDelete=id.split("-")[2];
}

function borrarNivel() {
    if(idForDelete!=null){
        $.ajax({
            url: R_NIVEL_INDEX + '/PRU-1986/index.json',
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'id': idForDelete
            },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                idForDelete=null;
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

function editarNivel(id) {
    window.sessionStorage.setItem("nivelEditId", id.split("-")[2]);
    loadModule('nivel','nivel','Nuevo');
}

function eliminarSeleccionados() {
    var tabla = $('#nivel-cuerpo-tabla tr');
    var i;
    var result=[];
    for(i=0; i<tabla.length; i++){
        if(tabla[i].children[0].children[0].checked){
            result.push(tabla[i].children[0].children[0].id.split("-")[1]);
        }
    }
    console.log(result.toString());
    if(result!=[]){
        $.ajax({
            url: R_NIVEL_INDEX + '/PRU-1986/index.json'+"?XDEBUG_SESSION_START=17204",
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'ids': result.toString()
            },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                idForDelete=null;
                console.log(data);
                loadModule('nivel','nivel','Index');
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}