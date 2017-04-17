var vMail = function(mail) {
    return true;
}

var vPass = function(passEnviado) {
    return true;
}

var validacion = function(email, passEnviado, next) {

    if (vMail(email) && vPass(passEnviado)) {

        var lq = require('../querys/loginQuerys');

        var getUsuario = lq.getUsuario(email);


        getUsuario.exec(function(err, usuario) {


            if (usuario) {

                var hash = lq.getHashPassUsuario(usuario, passEnviado);

                if (hash == usuario.pass) {
                    console.log("Parece que anda");
                    next(null);
                }
                else {
                    console.log("El pass es incorrecto");
                    next("El pass es incorrecto");
                }

            }
            else {
                console.log("No existe el usuario");
                next("No existe el usuario");
            }



        });

    }
    else {
        console.log("Falta o esta mal algún parámetro");
        next("Falta o es inválido algun parametro");
    }

}

var validacionReg = function(email, pass, next){
    //validamos formato
    if (vMail(email) && vPass(pass)) {
        
         var lq = require('../querys/usuarioQuerys');

         //validamos que el usuario no exista
         var getUsuario = lq.getUsuario(email);
          getUsuario.exec(function(err, usuario){
             
             if(!err){
             
             if(usuario){
                 next("El usuario ya existe");//este error va al frontend
             }
             else{
                 next();
             }
             
             }
             else{
                 //TODO: Alertar en estos casos
                 next("Hubo un error en la obtencion de datos");//este error va al frontend
             }
              
          });
        
    }
    else{
        next("Los parmetros no son validos");//este error va al frontend
    }
}

module.exports.validacion = validacion;
module.exports.validacionReg = validacionReg;