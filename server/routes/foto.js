const express = require('express');

const { postFotosPerfil   } = require('../providers/foto.provider');

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
//  Agrega fotos de perfil
// ===========================
app.post('/postFotosPerfil', verificarToken, (req, res) => {

    let body = req.body;

    postFotosPerfil( body.idUsuario, body.fotosList,(result)=>{

        res.json({ok:true, result  });

    },(data)=>{callbackError(data,res)});
});


module.exports = app;