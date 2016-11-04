
function AppStorage(){

    this.on = false;

    this.clave = $.Cypher('en',(new Date()).getMilliseconds() + '',(new Date()).getMilliseconds() + '');

    this.get = function(clave, defaultValue){
        if (defaultValue == undefined){
            defaultValue = null;
        }
        if (this.on){
            clave = $.Cypher("en",clave+'',this.clave);
            // var preResultado = sessionStorage.getItem(clave) != null ? sessionStorage.getItem(clave) : defaultValue;
            // if (preResultado != defaultValue){
            //     var values = preResultado.split('-');
            //     resultado = values[0];
            //     if (($.now() - values[1]) / 1000 > APP.MAX_SEG_SESSION){
            //         resultado = defaultValue;
            //         sessionStorage.removeItem(clave);
            //     }
            // }
            // else{
            //     resultado = preResultado;
            // }
            return sessionStorage.getItem(clave) != null ? $.Cypher("de",sessionStorage.getItem(clave),this.clave)  : defaultValue;
        }
        return sessionStorage.getItem(clave) != null ? sessionStorage.getItem(clave)  : defaultValue;

        // if (defaultValue === undefined){
        //     defaultValue = null;
        // }
        // var res = $.cookie(clave);
        // return res === undefined || res == null ? defaultValue : res;
    };

    this.set = function(clave, valor){
        if (this.on){
            sessionStorage.setItem($.Cypher("en",clave+'',this.clave), $.Cypher("en",valor+'',this.clave));
        }
        sessionStorage.setItem(clave+'', valor+'');
        // var time = new Date();
        // time.setSeconds(time.getSeconds() + 30);
        // $.cookie(clave, valor, {expires: new Date(2016, 11, 02, 16, 00, 00)});
    };

    this.remove = function(clave){
        if (this.on){
            sessionStorage.removeItem($.Cypher("en",clave+'',this.clave));
        }
        sessionStorage.removeItem(clave+'');
        // $.removeCookie(clave);
    };

    this.removeAll = function(){
        sessionStorage.clear();
        // var cookies = $.cookie();
        // for(var cookie in cookies) {
        //     $.removeCookie(cookie);
        // }
    };
}