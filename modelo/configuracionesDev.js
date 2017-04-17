var mongoose = require('mongoose');

/*IMPOPRTANTE TODO*/

//ESTAS CONFIGURACIONES SON UNICAMENTE DE ENCENDER Y APAGAR
//VER DE DIFECRENCIARLAS DE POR EJEMPLO STREAM O NO O GRABAR O NO Y ESAS COSAS.

var configuracionesDev = new mongoose.Schema({
    descripcion: 'string',
    descripcionLarga: 'string'
});

//EJEMPLO DE INSERCION DE dispositivo
        /*var mongoose = require('mongoose');
        var configuracionDev = mongoose.model('configuracionesDev');
        var confDev = new configuracionDev({
            descripcion:'Encender en presencia',
            descripcionLarga: 'El dispositivo se enciende cuando el sensor determina que esta presente en el ambiente.'
        });
        
        confDev.save();*/

exports.configuracionesDev = configuracionesDev;