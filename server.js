var c = require("./conf/conf");
var db = require('./querys/conexion');
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var v = require('./validaciones/validacionlogin.js');


/*=========CONFIGURACIONES VARIAS=========*/

//variable global para acceso a sesion
var sess = {};

//CONFIGURAMOS PARSER DE POSTS
var parser = bodyParser.urlencoded({
    extended: false
});

//CONFIGURAMOS SESION, MIDDLEWARES, ERROR
require("./conf/confServer.js").confServer(app, sess, session, router, express, path, c);


/*=========COMPORTAMIENTO DE REQUESTS=========*/

//COMPORTAMIENTO INDEX
router.get("/", function(req, res) {
    
    //OBTENEMOS SESION
    sess = req.session;
    
    //si existe una sesion
    if ('email' in sess && typeof sess.email != 'undefined') {
        //lo mandamos directamente al panel
        res.redirect('/panelUsuarios');
    }
    else {
        res.render('index', {
            titulo: 'e'
        });
    }
    
});


//COMPORTAMIENTO LOGIN GET, PRIMER INGRESO
router.get("/login", function(req, res) {
    
    //OBTENEMOS SESION
    sess = req.session;

    //si existe una sesion
    if ('email' in sess && typeof sess.email != 'undefined') {
        //lo mandamos directamente al panel
        res.redirect('/panelUsuarios');
    }
    else {
        res.render('logIn', {
            titulo: 'Login'
        });
    }
});


//COMPORTAMIENTO LOGIN POST, ENVIO DE FORMULARIO
router.post("/login", parser, function(req, res) {

    require("./controladores/login.js").login(req, res, sess);

});


//COMPORTAMIENTO AREA DE USUARIOS LOGUEADOS
router.get("/panelUsuarios", function(req, res) {

    require("./controladores/panelUsuarios.js").panelUsuarios(req, res, sess);
    
});


//COMPORTAMIENTO LOG OUT
router.get("/cerrarSesion", function(req, res) {
    //cerramos la sesion, lo mandamos al login
    req.session.destroy();

    res.render('logIn', {
        error: "Ha cerrado la sesión.",
        titulo: "Login"
    });
});


//COMPORTAMIENTO FORMULARIO DE REGISTRO, PRIMERA VEZ
router.get("/registrarse", function(req, res) {

    res.render('registro', {
        titulo: "Registrarse"
    });

});

//COMPORTAMIENTO FORMULARIO DE REGISTRO, ENVIO DE POST
router.post("/registrarse", parser, function(req, res) {
    
    require("./controladores/registro.js").registro(req, res);

});

//COMPORTAMIENTO ASOCIACION DE DISPOSITIVO, ENVIO DE POST
router.get("/asociacion", parser, function(req, res) {
    
   require("./controladores/asociacionDispositivo.js").asociacionDispositivo(req, res, sess);

});

//COMPORTAMIENTO AYUDA
router.get("/ayuda", function(req, res) {
    
    //OBTENEMOS SESION
    sess = req.session;
    
    //si existe una sesion
    if ('email' in sess && typeof sess.email != 'undefined') {        
        var sesion = true; 
    }   
        res.render('ayuda', {
        titulo: "Ayuda",
        sesion:sesion
    });
        
    
    
});
    
//COMPORTAMIENTO COMPRAR
router.get("/comprar", function(req, res) {
    
    //OBTENEMOS SESION
    sess = req.session;
    
    //si existe una sesion
    if ('email' in sess && typeof sess.email != 'undefined') {        
        var sesion = true; 
    }   
        res.render('comprar', {
        titulo: "Comprar",
        sesion:sesion
    });
        
    
    
});    
