(function() {
    'use strict';
    setTitle('Registrar Familia ');
    setTitleDescription(" Ingrese los datos de la Familia Conectada.");

    var codeSessionStorage = 'ganados-familia-nuevo';
    var data = null;
    var tablaPersonas = null;

    try{
        tablaPersonas = $("#table-familia-personas").DataTable({
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
        console.log("Error [Ganados/Nuevo/Controller]:", e.message);
    }
    
    if (getIdEntidad() == 0){
        data = APP.storage.get(codeSessionStorage);
    }
    else{
        APP.storage.remove(codeSessionStorage);
    }

    if (data == null){
        getBody(getRoute('persona_new', getIdEntidad()))
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
            loadModule('ganados', 'ganados', 'Index');
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
                $('#form-ganados').html(valores);
                valores = $('#form-ganados').html();
                APP.storage.set(codeSessionStorage, valores + '');
                $('#form-ganados').ready(function(){
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
            console.log('Error [Ganados/Nuevo]: ' + e.message);
        }
    }

    function llenarTabla(values){
        // APP.storage.set(codeStorage, JSON.stringify(values));
        $.each(values, function(i, item) {
            if (tablaPersonas != null){
                tablaPersonas.row.add( [
                    (i+1),
                    '<input type="checkbox" id="persona-' + item.id + '">',
                    item.idRolFamilia.descripcion,
                    '<a id="persona_' + item.id + '" href="javascript:loadModule(\'ganados\',\'ganados\',\'Nuevo\',' + item.id + ');">' + item.nombres + '</a>',
                    (item.correo != null && item.correo != '' ? item.correo : '') + ' / ' + (item.telefono != null && item.telefono != '' ? item.telefono : ''),
                ] ).draw( false );
            }
        });
        $("#loader-personas").remove();
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
            $('#btn-ganados-registrar-cancelar').click(function () {
                setIdEntidad(0);
                setMesageCode(MSG_NO_MESSAGE);
                loadModule('ganados', 'ganados', 'Index');
            });

            $("#btn-ganados-registrar-limpiar").on('click',function (e) {
                e.preventDefault();
                $('form').val('');
            });

            $("#btn-ganados-registrar-guardar").on('click',function (e) {
                e.preventDefault();
                APP.storage.remove('ganados-familia-index');
                APP.storage.remove('ganados-familia-nuevo');
                $('#form-ganados').append('<div id="table-loader" class="overlay"><i class="fa fa-refresh fa-spin"></i></div>');
                var jqxhr = $.post(
                    getRoute('persona_new', getIdEntidad())
                    , ( $('form[name=persona]') != null ? $('form[name=persona]').serialize() + '&' : '' ) + $('form[name=familia]').serialize()
                    , function(response) {
                        // response = $.parseJSON(response);
                        if(response != null){
                            validateSession(response);
                            cargarFormulario($.parseHTML(response.data), false);
                        }
                    // validateSession(data);
                    // if (data != null && data.status != null && data.status == "error"){
                    //     // setMesageCode(MSG_SAVE_ERROR);
                    //     // printMessage(getMessageCode());
                    // }
                    // else {//if (data != null && data.status != null && data.status == "success"){
                    //     setIdEntidad(data.response.id);
                    //     // setMesageCode(MSG_SAVE_SUCCESS);
                    //     loadModule('ganados','ganados','Index');
                    // }
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

            $("#btn-ganados-familia-guardar").on('click',function (e) {
                e.preventDefault();
                APP.storage.remove('ganados-familia-index');
                APP.storage.remove('ganados-familia-nuevo');
                $('#form-ganados').append('<div id="table-loader" class="overlay"><i class="fa fa-refresh fa-spin"></i></div>');
                console.log("boton guardar ", $('form[name=persona]').serialize());
                var jqxhr = $.post(
                    getRoute('persona_new', getIdEntidad())
                    , $('form[name=familia]').serialize()
                    , function(response) {
                        // response = $.parseJSON(response);
                        if(response != null){
                            cargarFormulario($.parseHTML(response.data), false);
                        }
                    // validateSession(data);
                    // if (data != null && data.status != null && data.status == "error"){
                    //     // setMesageCode(MSG_SAVE_ERROR);
                    //     // printMessage(getMessageCode());
                    // }
                    // else {//if (data != null && data.status != null && data.status == "success"){
                    //     setIdEntidad(data.response.id);
                    //     // setMesageCode(MSG_SAVE_SUCCESS);
                    //     loadModule('ganados','ganados','Index');
                    // }
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
            console.log("Error [Ganados/Nuevo]: " + e.message);
        }
    }

})();