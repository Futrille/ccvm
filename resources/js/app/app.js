(function() {
    'use strict';
    APP.storage.removeAll();
//background-color: #ecf0f5;   #222d32
    $('.content-wrapper').css('background-color', '#222d32');
    $.get( getRoute('homepage') , null, null, 'json').done(function(response) {
        $('.content-wrapper').css('background-color', '#ecf0f5');
        if (validateSession(response)){
            cargarPanel();
        }
    });


    function cargarPanel(){
        $('#ivm-header-menu').load('views/index/header-menu.html', postHeader);
        $('#ivm-footer').load('views/index/footer.html');
        $('#ivm-side-menu').load('views/index/side-menu.html', hacerClick);
    }

    function postHeader(){
        $("#logout").on('click', function(){
            var jqXHR = $.get(getRoute('logout'),null,null,'json');
            window.location.href = getRoute() + '/login.html';
        });
    }

    function hacerClick(){
        $('ul.sidebar-menu > li').on('click', function(){
            
            $.each($('ul.sidebar-menu > li'), function(i, item) {
                $(item).removeClass('active');
            });
            $(this).addClass('active');
        });

         $("#btn-monitor").on('click', function(){
             loadModule('monitor','monitor','Index');
         });
        // $( "#btn-inicio" ).trigger( "click" );

        $("#btn-niveles").on('click', function(){
            loadModule('nivel','nivel','Index');
        });

        $("#btn-registrar").on('click', function(){
            loadModule('ganados','ganados','Index');
        });
    }
    
})();




