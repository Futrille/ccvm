
function Message() {
    //No print message
    this.MSG_NO_MESSAGE         = 0;

    //Messages for Save Actions
    //Success
    this.MSG_SAVE_SUCCESS       = 1;
    //Error
    this.MSG_SAVE_ERROR         = 2;

    //Messages for Delete Actions
    //Success
    this.MSG_DELETE_SUCCESS     = 3;
    //Error
    this.MSG_DELETE_ERROR       = 4;

    //Login Actions
    //Error
    this.MSG_LOGIN_ERROR        = 5;


    this.code = this.MSG_NO_MESSAGE;

    /**
     * Get the code to show configured message
     * @returns {number}
     */
    this.getMessageCode = function () {
        return this.code;
    };

    /**
     * Set the code to configure message
     * @param code
     * @returns {number}
     */
    this.setMesageCode = function(code) {
        this.code = code;
        return this.code;
    };

    /**
     *
     * @param messageCode   Message code
     * @param message       Alt Message to show
     */
    this.printMessage = function(messageCode, message) {
        var messagePrint    = '';
        var classPrint      = 'alert alert-success alert-dismissable';
        var icon            = 'icon fa fa-check';

        switch (messageCode) {
            case this.MSG_NO_MESSAGE:
                messagePrint    = '';
                classPrint      = '';
                icon            = '';
                break;
            case this.MSG_SAVE_SUCCESS:
                messagePrint    = (message != null && message != '' ? message : 'Registro Guardado Satisfactoriamente');
                classPrint      = 'alert alert-success alert-dismissable';
                icon            = 'icon fa fa-check';
                break;
            case this.MSG_SAVE_ERROR:
                messagePrint    = 'Error al Guardar.';
                classPrint      = 'alert alert-danger alert-dismissable';
                icon            = 'icon fa fa-ban';
                break;
            case this.MSG_DELETE_SUCCESS:
                messagePrint    = (message != null && message != '' ? message : 'Registro Eliminado Satisfactoriamente');
                classPrint      = 'alert alert-success alert-dismissable';
                icon            = 'icon fa fa-check';
                break;
            case this.MSG_DELETE_ERROR:
                messagePrint    = 'Error al Eliminar.';
                classPrint      = 'alert alert-danger alert-dismissable';
                icon            = 'icon fa fa-ban';
                break;
            case this.MSG_LOGIN_ERROR:
                messagePrint    = 'Error al Iniciar Sesi&oacute;n.';
                classPrint      = 'alert alert-danger alert-dismissable';
                icon            = 'icon fa fa-ban';
                break;
            default:

        }

        if (messageCode != this.MSG_NO_MESSAGE) {
            $("#notificaciones").html(
                '<div class="' + classPrint + '">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                '<h4><i class="icon fa fa-check"></i></h4>' +
                messagePrint +
                '</div>'
            );
            APP.msg.setMesageCode(this.MSG_NO_MESSAGE);
        }
        else {
            $("#notificaciones").html('');
        }
    }

}