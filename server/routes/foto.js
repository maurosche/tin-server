const express = require('express');
const { postFotosPerfil ,getFotosPerfil, getFotoPerfil  } = require('../providers/foto.provider');
const { verificarToken,verificarAdmin_Role } = require('../middlewares/autenticacion');
const app = express();
const fs = require('fs');
const path = require('path');

let callbackError = (data,res)=>{

    //console.log('ERROR : ', data);

    res.json({
                ok:false,
                err:data
             });
};

// ===========================
//  Agrega fotos de perfil
// ===========================
app.post('/fotosPerfil', verificarToken, (req, res) => {

    let body = req.body;

    postFotosPerfil( body.idUsuario, body.fotosList,(result)=>{

        res.json({ok:true, result });        

    },(data)=>{callbackError(data,res)});
});

// ====================================
//  Obtiene todas las fotos de perfil
// ====================================
app.get('/fotosPerfil', verificarToken, (req, res) => {

    let usuario = {_id : req.query.idUsuario || 0 }; 

    getFotosPerfil( usuario,(result)=>{

        res.json({ok:true, result });        

    },(data)=>{callbackError(data,res)});
});


// ===========================
// GET FOTO
// ===========================
app.get('/fotoPerfil/:idUser/:img', (req,res)=>{

    let idUser = req.params.idUser;
    let img = req.params.img;

    getFotoPerfil( idUser,img,(result)=>{

        res.sendFile(result);       

    },(data)=>{callbackError(data,res)});
});



module.exports = app;