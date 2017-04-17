var panelUsuarios = function(req, res, sess) {

    var dispositivosDelUsuario = [];
    var configuracionesPosibles = [];

    //OBTENEMOS SESION
    sess = req.session;

    //existe la sesion
    if ('email' in sess && typeof sess.email != 'undefined') {

        //cargamos las querys del dispositivo
        var dev = require("../querys/devQuerys");

        //dispositivos asociados al usuario
        var devUsuario = dev.getUsuarioDev(sess.idUsuario);

        //obtenemos los dispositivos asociados si existen
        devUsuario.exec(function(err, devUsuario) {

            if (!err) {

                //cargamos la variable que va a ir a la vista        
                dispositivosDelUsuario = devUsuario;

                //ejemplo insersion devUsuario
                //dev.setUsuarioDev(sess.idUsuario, '12155122klmkf465', '56be139784e956e50f3246b8'); //manual


                //Buscamos las configuraciones posibles
                //Solo si tiene dispositivos    
                if (dispositivosDelUsuario.length != 0) {

                    var configuracionesDev = dev.getConfiguracionesDev();

                    configuracionesDev.exec(function(err, configuracionesDev) {

                        if (!err) {

                            configuracionesPosibles = configuracionesDev;

                            //MANDAMOS LAS VARIABLES Y CARGAMOS HTML

                            res.render('panelUsuarios', {
                                titulo: "Panel de usuarios",
                                sesion: true,
                                dispositivosDelUsuario: dispositivosDelUsuario,
                                configuracionesPosibles: configuracionesPosibles
                            });

                        }
                        else {
                            //todo catchear el error
                            console.log(err);
                        }

                    });

                }
                else {
                    //SI BNO HAY DISPOSITIVOS HACEMOS LO MISMO
                    res.render('panelUsuarios', {
                        titulo: "Panel de usuarios",
                        sesion: true,
                        dispositivosDelUsuario: dispositivosDelUsuario,
                        configuracionesPosibles: configuracionesPosibles
                    });

                }


            } //TODO CATCHEAR EL ERROR
            else {
                console.log(err);
            }

        });



    }
    else {

        //no hay sesion, asumimos un comportamiento inocente    
        res.render('logIn', {
            titulo: "Login"
        });

    }


}

module.exports.panelUsuarios = panelUsuarios;