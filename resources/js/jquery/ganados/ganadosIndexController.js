(function() {
    'use strict';
    var tablaActual = $('#table-example').DataTable({
        responsive: true,
        "language": {
            "url": "dataTables.spanish.lang"
        }
    });
    getList(getRoute('persona_index'))
        .done(function(data) {
            console.log(data);
            $.each(data, function(i, item) {
                tablaActual.row.add( [
                    item.cedula,
                    '<a id="persona_' + item.id + '" name="lista_editar" href="javascript:loadModule(\'ganados\',\'ganados\',\'Editar\',' + item.id + ');">' + item.nombres + '</a>',
                    item.apellidos,
                    item.sexo,
                    item.nacionalidad,
                    item.iglesia.nombre,
                    item.idEstatus.nombre,
                    item.idEsCompleto.nombre,
                ] ).draw( false );
            });
            console.log('prueba...');
        })
        .fail(function(dataFail) {

        })
        .always(function() {
            $.loader('close');
        });


})();