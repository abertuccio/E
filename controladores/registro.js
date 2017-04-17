var registro = function(req, res){
    
    //cargamos las validaciones
    var v = require('../validaciones/validacionlogin');
    var us = require("../querys/usuarioQuerys"); 

    //obtenemos los parametros enviados
    var pass = req.body.password;
    var email = req.body.email;

    //validamos los parametros
    v.validacionReg(email, pass, function(err) {
        if (!err) {

            //se crea el usuario
            us.setUsuario(email, pass); 
            
            res.render('logIn', {
                msg: "Usuario creado: Ingrese el email y password recien creado",
                titulo: "Login"
            });

        }
        else {

            res.render('registro', {
                titulo: "Regirtro",
                error: err//IMPORTANTE: En este caso el error generado lo mostramos tal cual.
            });

        }
    });
    
}

module.exports.registro = registro;