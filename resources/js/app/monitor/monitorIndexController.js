(function() {
    'use strict';
    var cantidad = getFromSessionStorage('cantidad', '-');

    if (cantidad == '-'){
        getList(getRoute('persona_count'))
            .done(function (data) {
                // validateSession(data);
                try {
                    if (data != null) {
                        cantidad = data.response;
                        setToSessionStorage('cantidad', cantidad);
                    }
                }
                catch (e) {
                    console.log("Error [Monitor/Index]: " + e.message);
                }
            })
            .fail(function (dataFail) {
            })
            .always(function () {
                $('#ganados_cantidad').html(cantidad);
            });
    }
    else{
        $('#ganados_cantidad').html(cantidad);
    }

    // $("#consultar-nivel-1").on('click', function(){
    //     loadModule('ganados','ganados','Index');
    // });

})();