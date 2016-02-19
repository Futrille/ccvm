(function() {
    'use strict';

    $("form[name=persona]").submit(function(e) {
        e.preventDefault();


        var jqxhr = $.post( ROUTE.MODULES.GANADOS_EDIT , $('form[name=persona]').serialize(), function(data, status, xhr) {
            if (data != null && data.status != null && data.status == "error"){
                $("#notificaciones").html(
                    '<div class="col-lg-12"><div class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                    (data.message != null ? data.message : '¡Error al guardar!') +
                    '</div></div>'
                );
            }
            else if (data != null && data.status != null && data.status == "success"){
                loadModule('ganados','ganados','Editar', data.response.id);
                $("#notificaciones").html(
                    '<div class="col-lg-12"><div class="alert alert-success alert-dismissable">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                    (data.message != null ? data.message : '¡Se ha guardado el registro satisfactoriamente!') +
                    '</div></div>'
                );
            }
        })
            .done(function() {
            })
            .fail(function() {
            })
            .always(function() {
            });
    });

})();