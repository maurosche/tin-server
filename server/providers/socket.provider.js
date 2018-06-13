const {io} = require('../server');

setInterval((io) => io.emit('time', new Date().toTimeString()), 1000);

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
    
    io.emit(usuario1,{
        tipo : 'chat',
        usuario : usuario2,
        msj
    });
};

module.exports = {
    enviarChat,
    enviarMatch
};