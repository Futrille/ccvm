(function() {
    'use strict';
    setTitle('Registrar Familia ');
    setTitleDescription(" Ingrese los datos de la Familia Conectada.");

    $("form[name=persona]").submit(function(e) {
        e.preventDefault();

        var jqxhr = $.post( getRoute('persona_new') , $('form[name=persona]').serialize(), function(data, status, xhr) {
            // validateSession(data);
            if (data != null && data.status != null && data.status == "error"){
                // setMesageCode(MSG_SAVE_ERROR);
                // printMessage(getMessageCode());
            }
            else {//if (data != null && data.status != null && data.status == "success"){
                setIdEntidad(data.response.id);
                // setMesageCode(MSG_SAVE_SUCCESS);
                loadModule('ganados','ganados','Index');
            }
        })
            .done(function() {
            })
            .fail(function() {
            })
            .always(function() {
            });
    });

    $('#btn-ganados-registrar-cancelar').click(function(){
        setIdEntidad(0);
        setMesageCode(MSG_NO_MESSAGE);
        loadModule('ganados','ganados','Index');
    });

})();