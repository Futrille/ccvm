(function() {
    'use strict';

    $('.overlay').hide();
    APP.storage.removeAll();
    
    $("form").submit(function(e) {
        $('.overlay').show();
        e.preventDefault();
        APP.storage.removeAll();
        
        $.post( getRoute('login') , '_username=' + $('#valor1').val() + '&_password=' + $('#valor2').val(), null)
        .done(function(response) {
            if (response.status != undefined && response.status == 0 && response.message == 'login'){
                // setMesageCode(MSG_NO_MESSAGE);
                APP.storage.set('session', (new Date()).getTime() + '');
                window.location.href = getRoute();
            }else {
                $('.overlay').hide();
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
            $('.overlay').hide();
            APP.storage.removeAll();
            console.log("DataFail Login:", dataFail);
        });
    });

})();