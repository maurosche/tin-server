var socket = io();

//escuhar
socket.on('connect',function(){

    console.log('Conectado al servidor');

});

socket.on('disconnect',function(){

    console.log('Perdimos conexión al servidor');

});

//enviar info
socket.emit('enviarMensaje',{
    usuario : 'Mauro',
    mensaje : 'Hola mundo'
}, function(rta){

    console.log(rta);
    
});

//escuhar
socket.on('enviarMensaje',function(data){

    console.log(data);

});