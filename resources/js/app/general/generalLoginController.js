(function() {
    'use strict';

    $('.overlay').hide();
    APP.storage.removeAll();
    
    $("form").submit(function(e) {
        $('.overlay').show();
        e.preventDefault();
        APP.storage.removeAll();


        console.log("Encriptar:",encripta("daniel"));
        $.post( getRoute('login') , 'jl6sb4tuibfa874wbw=' + $('#valor1').val() + '&kjbf8764fwf876ewfe=' + $('#valor2').val(), null)
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
            //APP.APP.setIdEntidad(data.response.id);
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

    function encripta(str) {
        var encoded = "";
        for (var i=0; i<str.length;i++) {
            var a = str.charCodeAt(i);
            var b = a ^ 123;    // bitwise XOR with any number, e.g. 123
            encoded = encoded+String.fromCharCode(b);
        }
        console.log(encoded);
        return encoded;
    }

})();