(function() {
    'use strict';
    try {
        var codeSessionStorage = 'cantidad';
        var cantidad = APP.storage.get(codeSessionStorage, '-');

        if (cantidad == '-') {
            getList(getRoute('persona_count'))
                .done(function (response) {
                    try {
                        llenar(response.data);
                    }
                    catch (e) {
                        console.log("Error [Monitor/Index]: " + e.message);
                    }
                })
                .fail(function (dataFail) {
                })
                .always(function () {
                });
        }
        else {
            $('#ganados_cantidad').html(cantidad);
        }
    }
    catch(e){
        console.log("Error [Monitor/Index]:" + e.message);
    }
    function llenar(valores){
        if (valores != null){
            APP.storage.set(codeSessionStorage, valores);
            $('#ganados_cantidad').html(valores);
            iniciarEventos();
        }
        else{
            APP.storage.remove(codeSessionStorage);
        }
    }
    
    
    function iniciarEventos(){
        
    }
    // $("#consultar-nivel-1").on('click', function(){
    //     loadModule('ganados','ganados','Index');
    // });

})();