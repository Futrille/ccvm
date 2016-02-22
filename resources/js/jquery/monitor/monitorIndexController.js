(function() {
    'use strict';

    $.loader({ className:"blue-with-image-2", content:'' });
    getList(getRoute('persona_count'))
        .done(function(data) {
            if (data != null){
                $('#ganados_cantidad').html(data.response);
            }
        })
        .fail(function(dataFail) {

        })
        .always(function() {
            $.loader('close');
        });


})();