const express = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { getUsuario ,getUsuarios , postUsuario, putUsuario, login} = require('../providers/usuario.provider');
const { getLikesPropios} = require('../providers/like.provider');
const { getFotosPerfil, postFotosPerfil} = require('../providers/foto.provider');

const { verificarToken,verificarTokenAdmin } = require('../middlewares/autenticacion');

const app = express();

let ObjectId = require('mongoose').Types.ObjectId; 

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

app.get('/usuarioMe', verificarTokenAdmin, function(req,res){

    let idUsuario = req.query.idUsuario || 0;
    let count = 0;
    let list = new Array();

    try {        


        getUsuario(idUsuario,ids,(result)=>{        

                    res.json({ok:true,result });


        },(data)=>{callbackError(data,res)});

    } catch (error) {
            
        callbackError('Error al traer usuario',res);
    }
})

// ===========================
//  Listar usuarios
// ===========================

app.get('/usuario', verificarTokenAdmin, function(req,res){

    let idUsuario = req.query.idUsuario || 0;
    let count = 0;
    let list = new Array();

    try {        

    //Traigo usuarios a los que ya le haya dado like
    getLikesPropios(idUsuario,(likes)=>{

        let ids = new Array();

        likes.forEach(element => {
            ids.push( element.usuarioReceptor._id);
        });

        ids.push(idUsuario);

        getUsuarios(idUsuario,ids,(result)=>{        

        for (let index = 0; index < result.length; index++) {

            getFotosPerfil(result[index],(user)=>{
                
                list.push(user);

                if (count == (result.length-1)) {

                    res.json({ok:true,result : list });
                }

                count++;

            },(data)=>{callbackError(data,res)});    
        }
    
        },(data)=>{callbackError(data,res)});

    },(data)=>{callbackError(data,res)});

        } catch (error) {
        
            callbackError('Error al traer usuario',res);
    }
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

        postFotosPerfil( usuario.idUsuario, usuario.fotos,(result)=>{

            res.json({ok:true, result });        
    
        },(data)=>{callbackError(data,res)});

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