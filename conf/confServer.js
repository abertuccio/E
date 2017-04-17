var confServer = function(app, sess, session, router, express, path, c){

var express = require("express");

//CONFIGURAMOS express-session PARA MANEJO DE SESIONES
app.use(session({
    secret: 'jndkjasd', //TODO no se si tiene que cambiar siempre o que.
    resave: true, //TODO no se que significa esto, averiguar
    saveUninitialized: true, //TODO idem anterior
    cookie: {
        maxAge: 60000
    }
}));

//CONFIGURAMOS RUTA DE ARCHIVOS ESTATICOS
router.use('/static', express.static('public'));

//CONFIGURAMOS EJS, EL MIDDLEWARE POR EL QUE ENVIAMOS COSAS A LA VISTA
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//CONFIGURAMOS MANEJO DE ERRORES NO CATCHEADOS
//TODO: IMPLEMENTAR
app.use(function(error, req, res, next) {
    //Catch errores
    //TODO ver que hacer con los errores
    if (error) {
        console.log("hubo un error");
    }
    else {
        next();
    }
});

/*=========VARIAS COSAS IMPORTANTES=========*/

//CONFIGURACION DE RUTEO, todos los "/" los maneja router
app.use("/", router);

//CONFIGURACION DE 404
app.use("*", function(req, res) {
    res.sendFile(path + "404.html");
});
console.log("----------------------------------------------------------------------------------------------------------");
console.log(c.conf.puerto);
console.log("----------------------------------------------------------------------------------------------------------");
//CREACION DEL SERVIDOR
app.listen(c.conf.puerto, c.conf.ip, function() {
    console.log("Live at Port 3000");
});
    
}

module.exports.confServer = confServer;