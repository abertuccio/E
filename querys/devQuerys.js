var configuracionesDev = require('../querys/conexion').configuracionesDev;
var usuarioDev = require('../querys/conexion').usuarioDev;

var getConfiguracionesDev = function(){
    
    var query = configuracionesDev.find(); 
    return query;
    
}

var getUsuarioDev = function(idUsuario){
    
    var query = usuarioDev.find({idUsuario:idUsuario});
    return query;
    
}


var setUsuarioDev = function(idUsuario, idDev, idConfiguracionDev){
    
   var nusuarioDev = new usuarioDev({
    idUsuario: idUsuario,
    idDev: idDev,
    idConfiguracionDev: idConfiguracionDev
});

nusuarioDev.save(); 
    
}

module.exports.getConfiguracionesDev = getConfiguracionesDev;
module.exports.getUsuarioDev = getUsuarioDev;
module.exports.setUsuarioDev = setUsuarioDev;