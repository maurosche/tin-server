const express = require('express');

const Chat = require('../models/chat');
const Usuario = require('../models/usuario');
const { getChats, getChat, postChat, vistoChat, vistoChats, entregadoChat, entregadoAllChat} = require('../providers/chat.provider');
const { enviarChat, enviarVisto, enviarEntregado   } = require('../providers/socket.provider');

const { verificarToken,verificarAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

let callbackError = (data,res)=>{

    //console.log('ERROR : ', data);

    res.json({
                ok:false,
                err:data
             });
};

// ===========================
//  Obtener chats
// ===========================
app.get('/chatList', verificarToken, (req, res) => {

    let idUsuario = req.query.idUsuario || 0; 
    
    //Cambio el estado a entregado a todos los mensajes del usuario
    entregadoAllChat(idUsuario,(result)=>{     

        //Si ya hay un chat con ese usuario no lo mostramos
        getChats(idUsuario,(result)=>{     

            res.json({ok:true,result });

        },(data)=>{callbackError(data,res)});

    },(data)=>{callbackError(data,res)});


});

// ===========================
//  Obtener chat
// ===========================
app.get('/chat', verificarToken, (req, res) => {

    let idUsuario1 = req.query.idUsuarioEmisor || 0;
    let idUsuario2 = req.query.idUsuarioReceptor || 0;

        //CLAVAMOS VISTO
        vistoChats( idUsuario2, idUsuario1,()=>{    
           
            getChat(idUsuario2, idUsuario1,(chats)=>{       
                
                getChat(idUsuario1,idUsuario2,(result)=>{

                    res.json({ok:true,result });                     
                    
                    if(chats.length > 0)
                    {
                        //Enviamos socket de visto
                        let ultimoChat = chats[chats.length-1]; 

                        enviarVisto(idUsuario2, idUsuario1,ultimoChat._id,()=>{});
                    }                   

                },(data)=>{callbackError(data,res)});
    
            },(data)=>{callbackError(data,res)});
    
        },(data)=>{callbackError(data,res)});
});

// ===========================
//  Agrega un chat
// ===========================
app.post('/chat', verificarToken, (req, res) => {

    let body = req.body;

    postChat( body.idUsuarioEmisor, body.idUsuarioReceptor,body.mensaje,(chat)=>{

        enviarChat(chat._id,body.idUsuarioReceptor,body.idUsuarioEmisor,body.mensaje,()=>{

            res.json({ok:true, result :chat });

        },(data)=>{callbackError(data,res)});

    },(data)=>{callbackError(data,res)});

});

// ===========================
//  Pone el "visto"
// ===========================
app.put('/chatVisto', verificarToken, (req, res) => {

    let body = req.body;

    vistoChat( body.idMsj ,(result)=>{

        res.json({ok:true,result });

        //Enivamos socket
        enviarVisto(body.idUsuarioEmisor,body.idUsuarioReceptor, body.idMsj,()=>{});

    },(data)=>{callbackError(data,res)});

});

// ===========================
//  Pone como "entregado"
// ===========================
app.put('/chatEntregado', verificarToken, (req, res) => {

    let body = req.body;

    entregadoChat( body.idMsj ,(result)=>{        

        res.json({ok:true,result });

        //Enviamos socket
        enviarEntregado(body.idUsuarioEmisor, body.idUsuarioReceptor,body.idMsj,()=>{},()=>{});

    },(data)=>{callbackError(data,res)});

});

// ===========================
//  Borrar un chat
// ===========================
app.delete('/chat/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    chat.findById(id, (err, chatDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!chatDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        chatDB.borrado = true;

        chatDB.save((err, chatBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                chat: chatBorrado,
                mensaje: 'chat borrado'
            });

        })

    })
});


module.exports = app;