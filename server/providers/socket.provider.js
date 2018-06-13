const {io,texto} = require('../server.js');

setInterval(() => io.emit('time', new Date().toTimeString()), 10000);
 
let enviarMatch = (usuario1,usuario2)=>{

    io.emit(usuario1,{
        tipo : 'match',
        usuario : usuario2
    });
    io.emit(usuario2,{
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