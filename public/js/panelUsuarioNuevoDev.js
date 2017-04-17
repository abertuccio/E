$(document).ready(function(){
   
   var cambioProtocoloAceptado = window.location.search;
   
   if(cambioProtocoloAceptado == "?scan"){
       $('#aceptacion').modal('show');
   }
   
});

$(".busquedaDevLocal").click(function() {

    //Tratamos de averiguar la ip local
    //este método es polemico
     window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
        var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
        pc.createDataChannel("");    //create a bogus data channel
        pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
        pc.onicecandidate = function(ice){  //listen for candidate events
            if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
            var ipPC = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
            
           
            //HACER AJAX A LAS IPS DE ESTE RANGO
            
            var rango = ipPC.split(".");
            rango.splice(2,3);
            rango = rango.join(".");
            
            var i4 = 0;
            var i3 = 0;
            var url = "";
            var i = 0;
            var p = 0;
            
            
            /*global bloque*/ bloque = setInterval(function() {

            if (i4 <= 254) {
                url = "http://" + rango +"."+i3+"."+i4++;
                $("#intentoIp").html("Intentando: "+url);
               makeCorsRequest(url);
               i++;
               console.log(i);
                
                if (i == 655) {
                    p = p + 1;
                    $(".progress-bar").attr("aria-valuenow",p);
                    $(".progress-bar").attr("style", "width:"+p+"%");
                    $(".progress-bar").html(p+"%");
                    i = 0;
                }
            }
            else {
                i3 = i3 + 1;
                i4 = 0;
                if(i3 == 255){
                clearInterval(bloque);    
                }
            }

        }, 100);
            
            
            
            pc.onicecandidate = noop;
            
        };

    //RECORREMOS LOS RANGOS Y ESTABLECEMOS EN RELACION AL TIMEOUT DETERMINAMOS QUE RANGOS DE IP TENEMOS

/*
    var rangos = ['192.168.0.1', '169.254.0.1', '172.16.0.1', '10.0.0.1']; 
    var url = null;
   
   rangos.forEach(function(rango){
       
       url = "http://" + rango;
       makeCorsRequest(url);
                
   });
   */
   
   /* var i = 0;
    var b = 0;
    var p = 0;
    var r = 0;
    var url = null;

        var bloque = setInterval(function() {

            if (i <= 1) {
                url = "http://" + rangos[r] + "0." + i++;
                makeCorsRequest(url);
                console.log(url);
                b = b + 1;
                if (b == 10 && p <= 99) {
                    p = p + 1;
                    b = 0;
                    $(".progress-bar").attr("aria-valuenow",p);
                    $(".progress-bar").attr("style", "width:"+p+"%");
                    $(".progress-bar").html(p+"%");
                }
            }
            else {
                r = r + 1;
                i = 0;
                if (r>3){
                clearInterval(bloque);
                }
            }

        }, 500);

        i = 0;
        url = null;


    });*/


    //FUNCIONES DE CORS

    // Create the XHR object.
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        }
        else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        }
        else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }

    //TODO Evaluar la respuesta aca 
    function getTitle(text) {
        //return text.match('<title>(.*)?</title>')[1];
        console.log(text);
    }

    // Make the actual CORS request.
    function makeCorsRequest(url) {

        var xhr = createCORSRequest('GET', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }
        
        xhr.timeout = 500;
        
        xhr.ontimeout = function (e) {
        console.log(url+" timeout");
        };

        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;
            var title = getTitle(text);
            $(".modal-body").append("<div class='alert alert-success' role='alert'><span class='glyphicon glyphicon-star' aria-hidden='true'></span> <b>Nuevo Dispositivo Asociado:</b> "+url+"</div>");
            //TODO AGREGAR DISPOSITIVO A LA BASE
            //CUANDO ESTA OK AGREGAR AL HTML
        };

        xhr.onerror = function() {
            console.log(url + ' no es un dispositivo');
        };

        xhr.send();
    }
    
$('.devText').bind('keydown', function(event) {

    //TODO grabar cambio de nombre  de dispositivo
    
    
});

});

$('.cambioProtocoloAceptado').click(function(){
    window.location="http://"+window.location.host+"/panelUsuarios?scan";
});

$('.nuevosDispositivos').click(function(){
    
    if (window.location.protocol == 'https:') {

        //TODO debemos recargar la página en http, y lanzar el escaneo.
        $('#aceptacion').modal('hide');
        $('#cambioProtocolo').modal('show');
        //window.locationf="http://www.cristalab.com";

    }
    else{
    $('#aceptacion').modal('show');    
    }
    
});


$(".cancelarBusqueda").click(function(){
    clearInterval(bloque); 
});