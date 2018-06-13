const {io,texto} = require('../server.js');

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// io.on('connection', (client)=>{

//     setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
//     enviarMatch({_id:'5b1991bf1a102b00147b9aae'},{_id:'5b1991bf1a102b00147b9aae'});
// });
 
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