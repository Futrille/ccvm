(function() {
    'use strict';

    $( "#btn-entrar" ).click(function() {
        $('form[name=login]').submit();
    });

    $("form[name=login]").submit(function(e) {
        e.preventDefault();
        console.log("submitted...", $('form[name=login]').serialize());
        var jqxhr = $.post( getRoute('login') , $('form[name=login]').serialize(), function(data, status, xhr) {
            console.log(data.status, data, xhr);
            if (data.status != undefined && data.status == 'success'){
                setMesageCode(MSG_NO_MESSAGE);
                window.location.href = getRoute();
            }else {
                setMesageCode(MSG_LOGIN_ERROR);
                printMessage(getMessageCode());
            }
            //else {//if (data != null && data.status != null && data.status == "success"){
                //setIdEntidad(data.response.id);
                //setMesageCode(MSG_SAVE_SUCCESS);
                //loadModule('ganados','ganados','Index');
            //}
        })
            .done(function() {

            })
            .fail(function() {

            })
            .always(function() {

            });
    });

})();