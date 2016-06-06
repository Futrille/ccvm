(function() {
    'use strict';

    //$.loader({ className:"blue-with-image-2", content:'' });
    var jqxhr = $.post( getRoute('homepage') , $('form[name=login]').serialize(), function(data, status, xhr) {
        console.log(data);
        if (data.status != undefined && data.status == 'success'){
            setMesageCode(MSG_NO_MESSAGE);
            //window.location.href = getRoute(
            //cargarPanel();
        }else {
            setMesageCode(MSG_LOGIN_ERROR);
            printMessage(getMessageCode());
            window.location.href = 'login.html';
        }
    })
        .done(function() {

        })
        .fail(function() {

        })
        .always(function() {
            //$.loader('close');
        });
    function cargarPanel(){
        $('#wrapper').load('views/index/side-menu.html', hacerClick);
    }

    function hacerClick(){
        $("#btn-inicio").on('click', function(){
            console.log('se hizo click');
            $.loader('close');
            loadModule('monitor','monitor','Index');
        });
        $( "#btn-inicio" ).trigger( "click" );
    }
})();




