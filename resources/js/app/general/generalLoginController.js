(function() {
    'use strict';

    // $( "#btn-entrar" ).click(function(e) {
    //     e.preventDefault();
    //     console.log("login...");
    //     //$('form[name=login]').submit();
    // });

    $("form[name=login]").submit(function(e) {
        e.preventDefault();
        var jqxhr = $.post( getRoute('login') , $('form[name=login]').serialize(), function(response, status, xhr) {
            if (response.status != undefined && response.status == 0){
                // setMesageCode(MSG_NO_MESSAGE);
                window.location.href = getRoute();
            }else {
                // setMesageCode(MSG_LOGIN_ERROR);
                // printMessage(getMessageCode());
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