const express = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { getUsuarios , postUsuario, putUsuario, login} = require('../providers/usuario.provider');
const { getLikesPropios} = require('../providers/like.provider');
const { getFotosPerfil} = require('../providers/foto.provider');

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
    let list = new Array();
    //Traigo usuarios a los que no le haya dado like
    getLikesPropios(idUsuario,(likes)=>{

        let ids = new Array();

        likes.forEach(element => {
            ids.push(element.usuarioReceptor._id);
        });

        ids.push(idUsuario);

        getUsuarios(idUsuario,ids,(result)=>{

        for (let index = 0; index < result.length; index++) {

            getFotosPerfil(result[index]._id,(fotos)=>{

                let user = result[index];
                user.fotos = new Array();

                fotos.forEach(element => {
                    user.fotos.push(element);
                });

                console.log("FOTOSSSSSSSSSSSSSSSSSSSSS user : ", user);
                list.push(user);

                if (index+1 == result.length) {
                    res.json({ok:true,result : list });
                }


            },(data)=>{callbackError(data,res)});    
        }
    
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