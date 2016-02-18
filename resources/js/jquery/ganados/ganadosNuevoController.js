(function() {
    'use strict';

    $('#sandbox-container .input-group.date').datepicker({
        format: "dd/mm/yyyy",
        startDate: "01/01/1940",
        endDate: "10/02/2016",
        startView: 2,
        todayBtn: "linked",
        language: "es",
        autoclose: true,
        todayHighlight: true,
        datesDisabled: ['02/06/2016', '02/21/2016'],
        toggleActive: true,
        //defaultViewDate: { year: 1977, month: 04, day: 25 },
    });

    $("form[name=persona]").submit(function(e) {
        e.preventDefault();
        alert("mensaje");


        var jqxhr = $.post( ROUTE.MODULES.GANADOS_NEW , $('form[name=persona]').serialize(), function(data, status, xhr) {
            console.log("success");
            console.log(data);
            if (data != null && data.status != null && data.status == "ERROR"){
                $("#notificaciones").html('<div class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. <a href="#" class="alert-link">Alert Link</a>.' +
            '</div>');
            }
            //var ct = xhr.getResponseHeader("content-type") || "";
            //
            //if (ct.indexOf('html') > -1) {
            //    console.log("Es html...");
            //    //$("#page-wrapper").html(data);
            //    $("#page-wrapper").load(ROUTE.MODULES.GANADOS_NEW, {
            //        "apiKey":"77fa53ff60e8f41e40260b0dad826d76"
            //    }, function (response, status, xhr) {
            //        $.cachedScript("resources/js/jquery/ganados/ganadosNuevoController.js").done(function (script, textStatus) {
            //            console.log("Script cargado: " + "resources/js/jquery/ganados/ganadosNuevoController.js");
            //            $.loader('close');
            //        });
            //    });
            //}
            //
            //if (ct.indexOf('json') > -1) {
            //    console.log("ES un Json");
            //    // handle json here
            //}
        })
            .done(function() {
                console.log( "done success" );
            })
            .fail(function() {
                console.log( "error" );
            })
            .always(function() {
                console.log( "finished" );
            });
    });

})();