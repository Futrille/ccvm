(function() {
    'use strict';
    var tablaActual = $('#table-example').DataTable({
        responsive: true,
        "language": {
            "url": "dataTables.spanish.lang"
        }
    });

    function getFecha(timestamp){
        var a = new Date(timestamp * 1000);
        var months = ['Ene','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = "0" + a.getMonth();
        var date = "0" + a.getDate();

        var time = date.substr(-2) + '/' + month.substr(-2) + '/' + year;
        return time;
    }

    getList(getRoute('persona_index'))
        .done(function(data) {
            console.log("data", data);
            validateSession(data);
            $.each(data.resumen, function(i, item) {
                $('#ganados-resumen-tipo-' + item.id).html(item.cantidad);
            });

            $.each(data.response, function(i, item) {
                tablaActual.row.add( [
                    item.idRolFamilia.nombre,
                    '<a id="persona_' + item.id + '" name="lista_editar" href="javascript:loadModule(\'ganados\',\'ganados\',\'Editar\',' + item.id + ');">' + item.nombres + '</a>',
                    item.telefono,
                    item.correo,
                    item.metodoGanar.nombre,
                    getFecha(item.fechaGanado.timestamp),
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