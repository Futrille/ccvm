(function() {
    'use strict';

    $("form[name=persona]").submit(function(e) {
        e.preventDefault();
        console.log("ID:" + getIdEntidad(), $('form[name=persona]').serialize());

        var jqxhr = $.post( getRoute('persona_edit', getIdEntidad()) , $('form[name=persona]').serialize(), function(data, status, xhr) {
            if (data != null && data.status != null && data.status == "error"){
                $("#notificaciones").html(
                    '<div class="col-lg-12"><div class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                    (data.message != null ? data.message : '¡Error al guardar!') +
                    '</div></div>'
                );
            }
            else if (data != null && data.status != null && data.status == "success"){
                loadModule('ganados','ganados','Editar', getIdEntidad());
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

    $("form[name=form]").submit(function(e) {
        e.preventDefault();
        var jqxhr = $.post( getRoute('persona_delete', getIdEntidad()) , $('form[name=form]').serialize(), function(data, status, xhr) {
            if (data != null && data.status != null && data.status == "error"){
                $("#notificaciones").html(
                    '<div class="col-lg-12"><div class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                    (data.message != null ? data.message : '¡Error al Eliminar!') +
                    '</div></div>'
                );
            }
            else if (data != null && data.status != null && data.status == "success"){
                setIdEntidad(0);
                loadModule('ganados','ganados','Index');
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