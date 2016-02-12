(function() {
    'use strict';

    getList(ROUTE.MODULES.GENERAL)
        .done(function(data) {
            console.log(data);
            $.each(data, function(i, item) {
                tablaActual.row.add( [
                    item.id,
                    item.codigo,
                    item.valor,
                    item.nombre,
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