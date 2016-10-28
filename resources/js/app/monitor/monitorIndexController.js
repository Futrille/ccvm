// (function() {
//     'use strict';


    $.get(url,{
            apiKey:'77fa53ff60e8f41e40260b0dad826d76',
            "_": $.now()
        },null,'json'
    )
        .done(function(data) {
            // validateSession(data);
            if (data != null){
                $('#ganados_cantidad').html(data.response);
            }
        });

    // getList(getRoute('persona_count'))
        .done(function(data) {
            // validateSession(data);
            if (data != null){
                $('#ganados_cantidad').html(data.response);
            }
        })
    //     .fail(function(dataFail) {})
    //     .always(function() {
    //         // if ($('#ganados_cantidad').html() ){
    //         //     $('#ganados_cantidad').html("-");
    //         // }
    //     });

    // $("#consultar-nivel-1").on('click', function(){
    //     loadModule('ganados','ganados','Index');
    // });
    //
    // $("#btn-niveles").on('click', function(){
    //     loadModule('nivel','nivel','Index');
    // });
// })();