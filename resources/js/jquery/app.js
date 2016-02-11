(function() {
    'use strict';

    var req = $.post(
        ROUTE.MODULES.GANADOS,
        {
            apiKey:'77fa53ff60e8f41e40260b0dad826d76'
        },
        function(req){
            console.log(req);
            $("#page-wrapper").append(req);
        },
        'html'
    );

})();