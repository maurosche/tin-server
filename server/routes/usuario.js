const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { getUsuarios , postUsuario, login} = require('../providers/usuario.provider');

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

    postUsuario(usuario,(result)=>{

        res.json({ok:true,result });

    },(data)=>{callbackError(data,res)});
    
})

// // ===========================
// //  Modificar un usuario
// // ===========================
// app.put('/usuario/:id', [verificarToken],function(req,res){

//     return res.status(400).json({
//         ok:false,
//         err : {
//             mensaje : 'En desarrollo'
//         }
//     });

//     // let id = req.params.id;
//     // let body =  _.pick(req.body, ['nombre','email','img']);

//     // Usuario.findByIdAndUpdate(id,body, {new:true,runValidators:true},(err,usuarioDB) =>{

//     //     if(err)
//     //     {
//     //         return res.status(400).json({
//     //             ok:false,
//     //             err
//     //         });
//     //     }

//     //     res.json({
//     //         ok: true,
//     //         usuario : usuarioDB
//     //     });
//     // });   
// })

// // ===========================
// //  Borrar un usuario
// // ===========================
// app.delete('/usuario/:id', verificarToken, (req, res) => {

//     let id = req.params.id;

//     usuario.findById(id, (err, usuarioDB) => {

//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         }

//         if (!usuarioDB) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'ID no existe'
//                 }
//             });
//         }

//         usuarioDB.borrado = true;

//         usuarioDB.save((err, usuarioBorrado) => {

//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     err
//                 });
//             }

//             res.json({
//                 ok: true,
//                 usuario: usuarioBorrado,
//                 mensaje: 'Borrado con éxito'
//             });

//         })

//     })
// });

module.exports = app;