(function() {
    'use strict';
    setTitle('Registrar Familia ');
    setTitleDescription(" Ingrese los datos de la Familia Conectada.");

    var codeSessionStorage = 'ganados-familia-nuevo';
    var data = APP.storage.get(codeSessionStorage);

    if (data == null){
        getBody(getRoute('persona_new'))
        .done(function(response) { llenar(response); })
        .fail(function(dataFail) {
            console.log("FAIL: ", dataFail);
            loadModule('ganados', 'ganados', 'Index');
        })
        .always(function() {});
    }
    else{
        llenar(data);
        actualizarToken();
    }

    function llenar(valores){
        try{
            if (valores != null){
                APP.storage.set(codeSessionStorage, valores);
                // valores = $.parseHTML(valores);
                $('#form-ganados').html(valores);
                $('#form-ganados').ready(function(){
                    $('span.help-block').parent('.form-group').addClass('has-error');
                    $('div.has-error').children('.control-label').each(function(i,el){
                        console.log("valores: ", el);
                    });
                    // $('div.has-error').children('.control-label').append('<i class="fa fa-times-circle-o"></i>');
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
                console.log("FormData LIMPIAR:", $('form[name=persona]').serialize() + '&' + $('form[name=familia]').serialize());
            });

            $("#btn-ganados-registrar-guardar").on('click',function (e) {
                APP.storage.remove('ganados-familia-index');
                APP.storage.remove('ganados-familia-nuevo');
                e.preventDefault();
                $('#form-ganados').append('<div id="table-loader" class="overlay"><i class="fa fa-refresh fa-spin"></i></div>');
                var jqxhr = $.post(
                    getRoute('persona_new')
                    , $('form[name=persona]').serialize() + '&' + $('form[name=familia]').serialize()
                    , function(response, status, xhr) {
                        llenar(response);
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