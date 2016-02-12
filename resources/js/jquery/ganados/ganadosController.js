(function() {
    'use strict';



    getGanados().done(function(data) {
        $.each(data, function(i, item) {
            tablaActual.row.add( [
                item.id,
                item.codigo,
                item.nombre,
                item.valor,
                item.orden,
                item.descripcion,
            ] ).draw( false );
        });
    })
    .fail(function(dataFail) {

    })
    .always(function() {
            $.loader('close');
    });

})();