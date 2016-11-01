(function() {
    'use strict';
    setTitle('Registrar Familia ');
    setTitleDescription(" Ingrese los datos de la Familia Conectada.");

    var codeSessionStorage = 'ganados-familia-nuevo';
    var data = getFromStorage(codeSessionStorage);
    console.log("encriptado:", $.Cypher("encriptar","DANIEL FUTRILLEDANIEL FUTRILLEDANIEL FUTRILLEDANIEL FUTRILLEDANIEL FUTRILLE","20161028"));
    if (data == null){
        getBody(getRoute('persona_new'))
        .done(function(response) { llenar(response); })
        .fail(function(dataFail) {})
        .always(function() {});
    }
    else{
        llenar(data);
        actualizarToken();
    }

    function llenar(valores){
        try{
            if (valores != null){
                setToStorage(codeSessionStorage, valores);
                $('#form-ganados').html(valores);
                iniciarEventos();
            }
            else{
                removeStorage(codeSessionStorage);
            }
        }
        catch(e){
            console.log('Error [Ganados/Nuevo]: ' + e.message);
        }
        console.lg("LENNARS");
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

        $('#btn-ganados-registrar-cancelar').click(function(){
            setIdEntidad(0);
            setMesageCode(MSG_NO_MESSAGE);
            loadModule('ganados','ganados','Index');
        });
        // [name=persona]
        $("form[name=persona]").submit(function(e) {
            e.preventDefault();
            console.log("FormData:", $('form[name=persona]').serialize() + '&' + $('form[name=familia]').serialize());
            // var jqxhr = $.post( getRoute('persona_new') , $('form[name=persona]').serialize(), function(data, status, xhr) {
            //     // validateSession(data);
            //     if (data != null && data.status != null && data.status == "error"){
            //         // setMesageCode(MSG_SAVE_ERROR);
            //         // printMessage(getMessageCode());
            //     }
            //     else {//if (data != null && data.status != null && data.status == "success"){
            //         setIdEntidad(data.response.id);
            //         // setMesageCode(MSG_SAVE_SUCCESS);
            //         loadModule('ganados','ganados','Index');
            //     }
            // })
            //     .done(function() {
            //     })
            //     .fail(function() {
            //     })
            //     .always(function() {
            //     });
        });
    }

})();