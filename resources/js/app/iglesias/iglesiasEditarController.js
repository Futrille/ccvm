(function() {
    'use strict';
    
    //
    // $("form[name=persona]").submit(function(e) {
    //     e.preventDefault();
    //     console.log("ID:" + getIdEntidad(), $('form[name=persona]').serialize());
    //
    //     var jqxhr = $.post( getRoute('persona_edit', getIdEntidad()) , $('form[name=persona]').serialize(), function(data, status, xhr) {
    //         validateSession(data);
    //         if (data != null && data.status != null && data.status == "error"){
    //             setMesageCode(MSG_SAVE_ERROR);
    //             printMessage(getMessageCode());
    //         }
    //         else if (data != null && data.status != null && data.status == "success"){
    //             setMesageCode(MSG_SAVE_SUCCESS);
    //             loadModule('ganados','ganados','Index');
    //         }
    //     })
    //     .done(function() {
    //     })
    //     .fail(function() {
    //     })
    //     .always(function() {
    //     });
    // });
    //
    // $("form[name=form]").submit(function(e) {
    //     e.preventDefault();
    //     var jqxhr = $.post( getRoute('persona_delete', getIdEntidad()) , $('form[name=form]').serialize(), function(data, status, xhr) {
    //         validateSession(data);
    //         if (data != null && data.status != null && data.status == "error"){
    //             setMesageCode(MSG_DELETE_ERROR);
    //             printMessage(getMessageCode());
    //         }
    //         else if (data != null && data.status != null && data.status == "success"){
    //             setIdEntidad(0);
    //             setMesageCode(MSG_DELETE_SUCCESS);
    //             loadModule('ganados','ganados','Index');
    //         }
    //     })
    //         .done(function() {
    //         })
    //         .fail(function() {
    //         })
    //         .always(function() {
    //         });
    // });
    //
    // $('#btn-ganados-editar-cancelar').click(function(){
    //     setIdEntidad(0);
    //     setMesageCode(MSG_NO_MESSAGE);
    //     loadModule('ganados','ganados','Index');
    // });

})();