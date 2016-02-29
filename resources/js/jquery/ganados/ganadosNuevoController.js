(function() {
    'use strict';

    //$('#sandbox-container .input-group.date').datepicker({
    //    format: "dd/mm/yyyy",
    //    startDate: "01/01/1940",
    //    endDate: "10/02/2016",
    //    startView: 2,
    //    todayBtn: "linked",
    //    language: "es",
    //    autoclose: true,
    //    todayHighlight: true,
    //    datesDisabled: ['02/06/2016', '02/21/2016'],
    //    toggleActive: true,
    //    //defaultViewDate: { year: 1977, month: 04, day: 25 },
    //});

    $("form[name=persona]").submit(function(e) {
        e.preventDefault();


        var jqxhr = $.post( getRoute('persona_new') , $('form[name=persona]').serialize(), function(data, status, xhr) {
            console.log(data);
            if (data != null && data.status != null && data.status == "error"){
                setMesageCode(MSG_SAVE_ERROR);
                printMessage(getMessageCode());
            }
            else {//if (data != null && data.status != null && data.status == "success"){
                setIdEntidad(data.response.id);
                setMesageCode(MSG_SAVE_SUCCESS);
                loadModule('ganados','ganados','Editar');
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