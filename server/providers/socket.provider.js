const {io} = require('../server');

io.on('connection', (client)=>{

    console.log('Usuario conectado');

    client.emit('enviarMensaje',{
        usuario : 'Admin',
        mensaje : 'Bienvenido a esta APP'
    });

    client.on('disconnect', ()=>{
        console.log('Usuario deconectado');
    })

    //escuchar cliente
    client.on('enviarMensaje',(data, callback)=>{

        console.log('Mensaje :' , data);

        client.broadcast.emit('enviarMensaje', data);

        //callback('todo ok en el server');

    });

});