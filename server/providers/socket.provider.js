const {io} = require('../server.js');
const { getUsuario} = require('../providers/usuario.provider');

//setInterval(() => io.emit('time', new Date().toTimeString()),3000);
 
let enviarMatch = (usuario1,usuario2,callback,callbackError)=>{

    try 
    {

        getUsuario(usuario2,(data)=>{

            io.emit(usuario1,{
                tipo : 'match',
                obj : {
                    usuario : data
                }        
            });

        },()=>{});

        getUsuario(usuario1,(data)=>{

            io.emit(usuario2,{
                tipo : 'match',
                obj : {
                    usuario : data
                }        
            });

        },()=>{});

        console.log("MATCH ENVIADO POR SOCKET")

        callback();
    }
    catch(err){
        callbackError();
    }   
};

let enviarChat = (_id,usuario1,usuario2,msj,callback,callbackError)=>{
    
    try 
    {    
        getUsuario(usuario2,(data)=>{

            io.emit(usuario1,{
                tipo : 'chat',
                obj : {
                    _id,
                    usuario : data,
                    msj
                }
            });

        },()=>{});

        console.log("CHAT ENVIADO POR SOCKET")
        callback();
    }
    catch(err){
        callbackError();
    } 
};

let enviarVisto = (usuario1,usuario2,idMsj,callback,callbackError)=>{
    
    try 
    {    
        io.emit(usuario1,{
            tipo : 'visto',
            obj : {
                idUsuario : usuario2,
                idMsj
            }
        });
        callback();
    }
    catch(err){
        callbackError();
    } 
};

let enviarEntregado = (usuario1,usuario2,idMsj,callback,callbackError)=>{
    
    try 
    {    
        io.emit(usuario1,{
            tipo : 'entregado',
            obj : {
                idUsuario : usuario2,
                _id : idMsj
            }
        });
        callback();
    }
    catch(err){
        callbackError();
    } 
};


module.exports = {
    enviarChat,
    enviarMatch,
    enviarVisto
};