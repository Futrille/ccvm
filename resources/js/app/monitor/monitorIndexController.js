(function() {
    'use strict';

    getList(getRoute('persona_count'))
        .done(function(data) {
            validateSession(data);
            if (data != null){
                $('#ganados_cantidad').html(data.response);
            }
        })
        .fail(function(dataFail) {})
        .always(function() {
            // if ($('#ganados_cantidad').html() ){
            //     $('#ganados_cantidad').html("-");
            // }
        });

    $("#consultar-nivel-1").on('click', function(){
        loadModule('ganados','ganados','Index');
    });
})();