(function() {
    'use strict';
    APP.storage.removeAll();
    $("form[name=login]").submit(function(e) {
        // $(document).ajaxStart(function() { Pace.restart(); });
        e.preventDefault();
        APP.storage.removeAll();
        var jqxhr = $.post( getRoute('login') , $('form[name=login]').serialize(), null)
        .done(function(response) {
            if (response.status != undefined && response.status == 0 && response.message == 'login'){
                // setMesageCode(MSG_NO_MESSAGE);
                APP.storage.set('session', (new Date()).getTime() + '');
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
        .fail(function(dataFail){
            APP.storage.removeAll();
            console.log("DataFail Login:", dataFail);
        });
    });

})();