const express = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { getUsuarios , postUsuario, putUsuario, login} = require('../providers/usuario.provider');
const { getChats} = require('../providers/chat.provider');

const { verificarToken,verificarTokenAdmin } = require('../middlewares/autenticacion');

const app = express();

let callbackError = (data,res)=>{

    //console.log('ERROR : ', data);

    res.json({
                ok:false,
                err:data
             });
};

// ===========================
//  Listar usuarios
// ===========================

app.get('/usuario', verificarTokenAdmin, function(req,res){

    let idUsuario = req.query.idUsuario || 0;

    getChats(idUsuario,(chats)=>{

        let idsChats = new Array();

        chats.forEach(element => {
            idsChats.push(element.usuarioChat[0]._id);
            console.log('EACH USUARIO : ', element.usuarioChat[0]._id);
        });

        getUsuarios(idUsuario,idsChats,(result)=>{

            res.json({ok:true,result });
    
        },(data)=>{callbackError(data,res)});

    },(data)=>{callbackError(data,res)});
})

// ===========================
//  Login
// ===========================

app.get('/usuarioLogin', verificarTokenAdmin, function(req,res){

    login((result)=>{

        res.json({ok:true,result });

    },(data)=>{callbackError(data,res)});

})

// ===========================
//  Agrega un usuario
// ===========================
app.post('/usuario', [verificarToken], function(req,res){

    var usuario = req.body;

    postUsuario(usuario,(result)=>{

        res.json({ok:true,result });

    },(data)=>{callbackError(data,res)});
    
})

// ===========================
//  Modifica un usuario
// ===========================
app.put('/usuario', [verificarToken], function(req,res){

    var usuario = req.body;

    putUsuario(usuario,(result)=>{

        res.json({ok:true,result });

    },(data)=>{callbackError(data,res)});
    
})

// ===========================
//  Borrar un usuario
// ===========================
app.delete('/usuario/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    deleteUsuario(id,(result)=>{

        res.json({ok:true,result });

    },(data)=>{callbackError(data,res)});

});

module.exports = app;