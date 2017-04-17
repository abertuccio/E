 var login = function(req, res, sess) {

     //Si existe sesion vieja
     if ('email' in sess) {
         //quitamos la sesion 
         req.session.destroy();
     }

     //cargamos validaciones
     var v = require('../validaciones/validacionlogin.js');

     //obtenemos el post
     var pass = req.body.password;
     var email = req.body.email;

     //realizamos validacion
     v.validacion(email, pass, function(err) {
         if (!err) {

             //USUARIO VÁLIDO

             //TODO no está bien ir a buscar nuevamente el usuario
             //TODO no esta bien la misma query en login y en usuario
             var usuario = require('../querys/usuarioQuerys').getUsuario(email);
             
             usuario.exec(function(err, usuario) {
             
              if(!err){
               
             //INICIAMOS SESION
             sess = req.session;
             sess.email = usuario.email;
             sess.idUsuario = usuario._id;
             
             res.redirect('/panelUsuarios');  
               
              }
              
             });
             
             
             

             

         }
         else {

             //USUARIO INVALIDO

             res.render('logIn', {
                 error: "La combinación de email y password no es correcta",
                 titulo: "Login"
             });

         }
     });

 }

 module.exports.login = login;