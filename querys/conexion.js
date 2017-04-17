var mongoose = require('mongoose');
var c = require("../conf/conf");

var db = mongoose.createConnection(c.conf.strConexion);

//var dbE0 = mongoose.createConnection(c.conf.strConexionE0);


db.on('error', console.error.bind(console, 'Error en la connexion: '));
db.once('open', function() {
   console.log('Conectamos a la base Eusers correctamente');
});

//dbE0.on('error', console.error.bind(console, 'Error en la connexion: '));
//dbE0.once('open', function() {
//    console.log('Conectamos a la base E0 correctamente');
//});

//Cargamos Modelos De Eusers
var usuarioSchema = require('../modelo/usuario').usuario;
var usuarioDevSchema = require('../modelo/usuarioDev').usuarioDev;
var configuracionesDevSchema = require('../modelo/configuracionesDev.js').configuracionesDev;

//Cargamos los modelos de E0
//var dispositivoSchema = require('../modelo/dispositivosE0').dispositivo;


//Iniciamos Modelos de Eusers
var usuario = db.model('usuario', usuarioSchema);
var configuracionesDev = db.model('configuracionesDev', configuracionesDevSchema);
var usuarioDev = db.model('usuarioDev', usuarioDevSchema);

//Iniciamos Modelos de E0
//usa la conexion dbE0, es el único cambio
//var dispositivo = dbE0.model('dispositivo' , dispositivoSchema);


//modelos de Euserd
exports.usuario = usuario;
exports.configuracionesDev = configuracionesDev;
exports.usuarioDev = usuarioDev;
//modelos de E0
//exports.dispositivo = dispositivo;