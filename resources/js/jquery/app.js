(function() {
    'use strict';
    var ROUTE = {
        PROTOCOL:   'http://',
        SERVER:     'localhost',
        BASE:       '/iglesys/web',
        APP_ENV:    '/app_dev.php',
        //PUBLIC:     this.PROTOCOL + this.SERVER + this.BASE + this.APP_ENV,
        //LOCAL:       '..' + this.BASE + this.APP_ENV,
        MODULES:    {
            GANADOS: '/iglesys/web/app_dev.php/ganados',
        },
    };

    $(document).ready(function() {

    });

    var ganadosList = $.get(
        ROUTE.MODULES.GANADOS,
        {
            apiKey:'77fa53ff60e8f41e40260b0dad826d76'
        },
        function(req){
            console.log(req);
            $("#page-wrapper").append(req);
        },
        'json'
    );

})();