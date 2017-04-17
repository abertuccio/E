var mongoose = require('mongoose');

var usuarioDev = new mongoose.Schema({
    idUsuario: 'string',
    idDev: 'string',
    idConfiguracionDev: 'string',
    nombrePersonalizado: 'string'
});

exports.usuarioDev = usuarioDev;