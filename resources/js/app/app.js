(function() {
    'use strict';

    

    // var jqxhr = $.post( getRoute('homepage') , $('form[name=login]').serialize(), function(data, status, xhr) {
    //     console.log("data",data);
    //     if (data.status != undefined && data.status == 'success'){
    //         setMesageCode(MSG_NO_MESSAGE);
    //         //window.location.href = getRoute();
             cargarPanel();
    //     }else if (data.status == 'logout'){
    //         setMesageCode(MSG_LOGIN_ERROR);
    //         printMessage(getMessageCode());
    //         window.location.href = 'login.html';
    //     }
    // })
    // .done(function() {
    //
    // })
    // .fail(function() {
    //
    // })
    // .always(function() {
    //     //$.loader('close');
    // });

    function cargarPanel(){
     $('#ivm-header-menu').load('views/index/header-menu.html');
     $('#ivm-footer').load('views/index/footer.html');
     $('#ivm-side-menu').load('views/index/side-menu.html', hacerClick);
    }

    function hacerClick(){
        $('ul.sidebar-menu > li').on('click', function(){
            $.xhrPool.abortAll();
            $.each($('ul.sidebar-menu > li'), function(i, item) {
                $(item).removeClass('active');
            });
            $(this).addClass('active');
        });

         $("#btn-inicio").on('click', function(){
             loadModule('monitor','monitor','Index');
         });
         $( "#btn-inicio" ).trigger( "click" );

        $("#btn-niveles").on('click', function(){
            loadModule('nivel','nivel','Index');
        });

        $("#btn-registrar").on('click', function(){
            loadModule('ganados','ganados','Index');
        });
    }
})();




