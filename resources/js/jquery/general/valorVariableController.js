(function() {
    'use strict';

    var tablaActual = $('#table-example').DataTable({
        responsive: true
    });

    getList(getRoute('valorvariable_index'))
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