(function() {
    'use strict';
    var tablaActual = $('#table-example').DataTable({
        responsive: true,
        "language": {
            "url": "dataTables.spanish.lang"
        }
    });
    getList(ROUTE.MODULES.GANADOS)
        .done(function(data) {
            console.log(data);
            $.each(data, function(i, item) {
                tablaActual.row.add( [
                    item.cedula,
                    item.nombres,
                    item.apellidos,
                    item.sexo,
                    item.nacionalidad,
                    item.iglesia.nombre,
                    item.idEstatus.nombre,
                    item.idEsCompleto.nombre,
                ] ).draw( false );
            });
        })
        .fail(function(dataFail) {

        })
        .always(function() {
            $.loader('close');
        });

})();