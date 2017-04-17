var dispositivo = require('../querys/conexion').dispositivo;

var getDev = function(hash) {

	//TDOO: ver que hacer con esto porque falla
	//h A veces es string y a veces es un objet o no se que.

	var query = dispositivo.findOne({
		hash: "265e1640d83a93fd71ec89a0f0a623e62a584200e2d80fc2000d8e3be6185e71"
	});
	
	//var query = dev.find();
	
	return query;

}

module.exports.getDev = getDev;