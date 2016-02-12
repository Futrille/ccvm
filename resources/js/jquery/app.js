

//loadModule('monitor','dashboard');

function loadModule(modulo,accion){
    $.loader({
        className:"blue-with-image-2",
        content:''
    });
    $("#page-wrapper").load("views/" + modulo + "/" + accion + ".html", function(response, status, xhr){
        //console.log(status, xhr);
        $.loader('close');
    });
};

