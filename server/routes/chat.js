const express = require('express');

const Chat = require('../models/chat');
const Usuario = require('../models/usuario');
const { getChats} = require('../providers/chat.provider');

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

    //Si ya hay un chat con ese usuario no lo mostramos
    getChats(idUsuario,(result)=>{       


        res.json({ok:true,result });

    },(data)=>{callbackError(data,res)});

});

// ===========================
//  Obtener chat
// ===========================
app.get('/chat', verificarToken, (req, res) => {

    let ObjectId = require('mongoose').Types.ObjectId; 
    let idUsuarioEmisor = req.query.idUsuarioEmisor || 0;
    let idUsuarioReceptor = req.query.idUsuarioReceptor || 0; 
    let condicion = {
        $or:[
            {
                usuarioEmisor : new ObjectId(idUsuarioEmisor),
                usuarioReceptor : new ObjectId(idUsuarioReceptor)
            },
            {
                usuarioEmisor : new ObjectId(idUsuarioReceptor),
                usuarioReceptor : new ObjectId(idUsuarioEmisor)
            },
        ],
        borrado : false
    };   

    if(idUsuarioEmisor == 0 || idUsuarioReceptor == 0){
        return res.status(500).json({
            ok: false,
            err : "Usuario/s incorrecto/s"
        });
    }
    
    Chat.find(condicion)
        // .skip(desde)
        // .limit(5)
        .populate('usuarioEmisor')
        .populate('usuarioReceptor')
        .sort([['fecha', 'ascending']])
        .exec((err, chats) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                chats
            });
        })
});


// ===========================
//  Agrega un chat
// ===========================
app.post('/chat', verificarToken, (req, res) => { 

    let body = req.body;

    let chat = new Chat({
        usuarioEmisor: body.idUsuarioEmisor,
        usuarioReceptor: body.idUsuarioReceptor,
        mensaje : body.mensaje,
        fecha: new Date()
    });

    chat.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

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