(function() {
    'use strict';

    var ROUTE = {
        PROTOCOL:   'http://',
        SERVER:     'localhost',
        BASE:       '/iglesys/web',
        APP_ENV:    '/app_dev.php',
        PUBLIC:     ROUTE.PROTOCOL + ROUTE.SERVER + ROUTE.BASE + ROUTE.APP_ENV,
        LOCAL:       '..' + ROUTE.BASE + ROUTE.APP_ENV,
        MODULES:    {
            GANADOS: ROUTE.LOCAL + '/ganados',
        },
    };


})();