var asociacionDispositivo = function(req, res, sess) {
    
    
    console.log("estamos en asociacion");

    var dispositivosDelUsuario = [];

    //OBTENEMOS SESION
    sess = req.session;

    //existe la sesion
   // if ('email' in sess && typeof sess.email != 'undefined') {
 if (true) {
        //cargamos las querys del dispositivo
        var dev = require("../querys/devQuerys");

        //dispositivos asociados al usuario
        var devUsuario = dev.getUsuarioDev(sess.idUsuario);

        
        var getDev = require("../querys/devE0Querys").getDev('kjkjkj');
        
        	getDev.exec(function(err, ddev) {
        	    
        	    console.log(err);
        	    console.log(ddev);
        	    
        	});
   



    }
    else {

        //no hay sesion, NO asumimos un comportamiento inocente 
        //TODO HACER PENALIZACION A ESA IP
        res.render('logIn', {
            titulo: "Login"
        });

    }


}

module.exports.asociacionDispositivo = asociacionDispositivo;