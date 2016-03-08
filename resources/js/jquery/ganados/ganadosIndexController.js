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
            validateSession(data);
            $.each(data.resumen, function(i, item) {
                $('#ganados-resumen-tipo-' + item.id).html(item.cantidad);
            });

            $.each(data.response, function(i, item) {
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
        })
        .fail(function(dataFail) {
        })
        .always(function() {
            $.loader('close');
        });

    $('#btn-ganados-index-registrar').click(function(){
        loadModule('ganados','ganados','Nuevo');
    });
})();