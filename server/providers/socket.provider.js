const {io} = require('../server-sockets');

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// io.on('connection', (client)=>{
// });

let enviarMatch = (usuario1,usuario2)=>{

    io.emit(usuario1._id,{
        tipo : 'match',
        usuario : usuario2
    });
    io.emit(usuario2._id,{
        tipo : 'match',
        usuario : usuario1
    });
};

let enviarChat = (usuario1,usuario2,msj)=>{
    
    io.emit(usuario2._id,{
        tipo : 'chat',
        usuario : usuario1,
        msj
    });
};

module.exports = {
    enviarChat,
    enviarMatch
};