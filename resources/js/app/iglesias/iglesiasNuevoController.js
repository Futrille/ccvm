(function() {
    'use strict';
    APP.setTitle('Registrar Iglesia ');
    APP.setTitleDescription(" Ingrese los datos de la Iglesia.");

    var codeSessionStorage = 'iglesias-nuevo';
    var data = null;
    // var tablaPersonas = null;

    // try{
    //     tablaPersonas = $("#table-familia-personas").DataTable({
    //         "paging": false,
    //         "lengthChange": false,
    //         "searching": false,
    //         "ordering": false,
    //         "info": false,
    //         "autoWidth": false,
    //         "responsive": true
    //     });
    // }
    // catch (e){
    //     console.log("Error [Ganados/Nuevo/Controller]:", e.message);
    // }
    
    if (getIdEntidad() == 0){
        data = APP.storage.get(codeSessionStorage);
    }
    else{
        APP.storage.remove(codeSessionStorage);
    }

    if (data == null){
        postBody(ROUTE.MODULES.IGLESIA + getIdEntidad(), null)
        .done(function(response) {
            response = $.parseJSON(response);
            if(response != null){
                cargarFormulario((response.data));
                if (response.metadata != null && response.metadata.familia != null){
                    llenarTabla((response.metadata.familia.personas));
                }
            }
        })
        .fail(function(dataFail) {
            console.log("FAIL: ", dataFail);
            // loadModule('ganados', 'ganados', 'Index');
        })
        .always(function() {});
    }
    else{
        cargarFormulario(data);
        actualizarToken();
    }

    function cargarFormulario(valores, guardarStorage){
        try{
            if (valores != null){
                $('#form-iglesias').html(valores);
                valores = $('#form-iglesias').html();
                APP.storage.set(codeSessionStorage, valores + '');
                $('#form-iglesias').ready(function(){
                    $('span.help-block').parent('.form-group').addClass('has-error');
                    if ( $('.has-error').length > 0 ){
                        APP.storage.remove(codeSessionStorage);
                    }
                });
            }
            else{
                APP.storage.remove(codeSessionStorage);
            }
            iniciarEventos();
        }
        catch(e){
            console.log('Error [Iglesias/Nuevo]: ' + e.message);
        }
    }

    function llenarTabla(values){
        // APP.storage.set(codeStorage, JSON.stringify(values));
        // $.each(values, function(i, item) {
        //     if (tablaPersonas != null){
        //         tablaPersonas.row.add( [
        //             (i+1),
        //             '<input type="checkbox" id="persona-' + item.id + '">',
        //             item.idRolFamilia.descripcion,
        //             '<a id="persona_' + item.id + '" href="javascript:loadModule(\'ganados\',\'ganados\',\'Nuevo\',' + item.id + ');">' + item.nombres + '</a>',
        //             (item.correo != null && item.correo != '' ? item.correo : '') + ' / ' + (item.telefono != null && item.telefono != '' ? item.telefono : ''),
        //         ] ).draw( false );
        //     }
        // });
        // $("#loader-personas").remove();
    }

    /**
     *
     */
    function actualizarToken(){
        var object = null;
        // getBody(getRoute('persona_new'))
        //     .done(function(response) {
        //         if (response != null){
        //              object = $('<div/>').html(response).contents();
        //             $('#form-ganados').find('#persona__token').val(object.find('#persona__token').val());
        //         }
        //     })
        //     .always(function() {
        //         object = null;
        //     });
    }



    function iniciarEventos(){
        try {
            $('#btn-iglesias-cancelar').click(function () {
                setIdEntidad(0);
                setMesageCode(MSG_NO_MESSAGE);
                loadModule('iglesias', 'iglesias', 'Index');
            });

            $("#btn-iglesias-guardar").on('click',function (e) {
                e.preventDefault();
                APP.storage.remove('iglesias-index');
                APP.storage.remove('iglesias-nuevo');
                $('#form-iglesias').append('<div id="table-loader" class="overlay"><i class="fa fa-refresh fa-spin"></i></div>');
                var jqxhr = $.post(
                    ROUTE.MODULES.IGLESIA + getIdEntidad()
                    , $('form[name=iglesia]').serialize()
                    , function(response) {
                        // response = $.parseJSON(response);
                        if(response != null){
                            APP.validate(response);
                            cargarFormulario($.parseHTML(response.data), false);
                        }
                })
                .done(function() {
                })
                .fail(function() {
                    $('#table-loader').remove();
                })
                .always(function() {
                    $('#table-loader').remove();
                });
            });

        }
        catch(e){
            console.log("Error [Iglesia/Nuevo]: " + e.message);
        }
    }

})();