var usuario = require('../querys/conexion').usuario;
var crypto = require('crypto');

var getUsuario = function (email) {
    
//EJEMPLO DE INSERCION DE USUARIO
/*var nusuario = new usuario({
    ip: '',
    email: 'andresbertuccio@gmail.com',
    pass: 'd07c28482be8b4bc22f67b5367446dc6b7f0f2aec688438056c6aa6738bf175b',
    random: '1234'
});

nusuario.save();  */

var query = usuario.findOne({email: email});
return query;

}

var getHashPassUsuario = function (usuario, passEnviado) {
  var random = usuario.random; //Random del potencial usuario ingresado
  var pass = passEnviado;
  
var hashPass = crypto.createHash('sha256').update(random+pass).digest('hex');

return hashPass;
 
}

module.exports.getUsuario = getUsuario;
module.exports.getHashPassUsuario = getHashPassUsuario;