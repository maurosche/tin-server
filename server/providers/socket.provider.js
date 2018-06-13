const {io,texto} = require('../server.js');

setInterval(() => io.emit('time', new Date().toTimeString()), 10000);
 
let enviarMatch = (usuario1,usuario2)=>{
    console.log('USUARIO MATCH :' , usuario1);
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