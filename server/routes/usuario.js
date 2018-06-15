const express = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { getUsuarios , postUsuario, putUsuario, login} = require('../providers/usuario.provider');

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

    getUsuarios((result)=>{

        res.json({ok:true,result });

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

    usuario.kmConfig = 80;
    usuario.edadDesdeConfig = 18;
    usuario.edadHastaConfig = 80
    usuario.notifMensajeConfig = true;
    usuario.notifMatchConfig = true;

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