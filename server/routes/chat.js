const express = require('express');

const Chat = require('../models/chat');
const Usuario = require('../models/usuario');
const { getChats, getChat, postChat, vistoChat, entregadoChat, entregadoAllChat} = require('../providers/chat.provider');
const { enviarChat, enviarVisto  } = require('../providers/socket.provider');

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
        vistoChat( idUsuario2, idUsuario1,()=>{    
           
            getChat(idUsuario2, idUsuario1,(chats)=>{       
                
                getChat(idUsuario1,idUsuario2,(result)=>{

                    res.json({ok:true,result });

                    //Enviamos socket de visto
                    let ultimoChat = chats[chats.length-1];    
                    
                    enviarVisto(idUsuario2, idUsuario1,ultimoChat._id,()=>{});

                },(data)=>{callbackError(data,res)});
    
            },(data)=>{callbackError(data,res)});
    
        },(data)=>{callbackError(data,res)});
});

// ===========================
//  Agrega un chat
// ===========================
app.post('/chat', verificarToken, (req, res) => {

    let body = req.body;

    postChat( body.idUsuarioEmisor, body.idUsuarioReceptor,body.mensaje,(result)=>{

        enviarChat(body.idUsuarioReceptor,body.idUsuarioEmisor,body.mensaje,()=>{

            res.json({ok:true,result });

        },(data)=>{callbackError(data,res)});

    },(data)=>{callbackError(data,res)});

});

// ===========================
//  Pone el "visto"
// ===========================
app.put('/chatVisto', verificarToken, (req, res) => {

    let body = req.body;

    vistoChat( body.idUsuarioEmisor, body.idUsuarioReceptor ,(result)=>{

        res.json({ok:true,result });

        //Enviamos socket
        getChat(body.idUsuarioEmisor,body.idUsuarioReceptor,(chats)=>{               

            let ultimoChat = chats[chats.length-1];

            enviarVisto(body.idUsuarioEmisor,body.idUsuarioReceptor,ultimoChat._id,()=>{});

        },(data)=>{callbackError(data,res)});

    },(data)=>{callbackError(data,res)});

});

// ===========================
//  Pone como "entregado"
// ===========================
app.put('/chatEntregado', verificarToken, (req, res) => {

    let body = req.body;

    entregadoChat( body.idUsuarioEmisor, body.idUsuarioReceptor ,(result)=>{

        res.json({ok:true,result });

        //Enviamos socket

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