(function() {
    'use strict';

    getList(getRoute('persona_count'))
        .done(function(data) {
            validateSession(data);
            if (data != null){
                $('#ganados_cantidad').html(data.response);
            }
        })
        .fail(function(dataFail) {

        })
        .always(function() {
            // $.loader('close');
        });


})();