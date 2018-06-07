const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificarToken,verificarTokenAdmin } = require('../middlewares/autenticacion');

const app = express();

// ===========================
//  Listar usuarios
// ===========================

app.get('/usuario', verificarTokenAdmin, function(req,res){

    Usuario.find({borrado:false} , 'id nombre email img')
                    .exec(
                            (err, usuarios) => {

                                if (err) {
                                    return res.status(400).json({
                                        ok:false,
                                        err
                                    });
                                }

                                Usuario.count({borrado:false})
                                            .exec((err,count)=>{
                                                res.json({
                                                    ok:true,
                                                    usuarios,
                                                    count
                                                });
                                            })
                                
                         
                            }
    );
})

// ===========================
//  Agrega un usuario
// ===========================
app.post('/usuario', [verificarToken], function(req,res){

    var body = req.body;

    let usuario = new Usuario({
        nombre : body.nombre,
        apellido : body.apellido,
        email : body.email,
        password : bcrypt.hashSync(body.password,10),
        img : body.img,
        facebook : body.facebook,
        fechaNacimiento : body.fechaNacimiento,
        kmConfig : body.kmConfig,
        edadDesdeConfig : body.edadDesdeConfig,
        edadHastaConfig : body.edadHastaConfig,
        notifMensajeConfig : body.notifMensajeConfig,
        notifMatchConfig : body.notifMatchConfig,
        fechaAlta : body.fechaAlta,
        fechaEdicion : body.fechaEdicion
    });

    usuario.save( (err, usuarioDB)=> {

        if(err)
        {
            return res.status(400).json({
                ok:false,
                err
             });
        }

        res.json({
            ok: true,
            usuario : usuarioDB
        });
    });
})

// ===========================
//  Modificar un usuario
// ===========================
app.put('/usuario/:id', [verificarToken],function(req,res){

    return res.status(400).json({
        ok:false,
        err : {
            mensaje : 'En desarrollo'
        }
    });

    // let id = req.params.id;
    // let body =  _.pick(req.body, ['nombre','email','img']);

    // Usuario.findByIdAndUpdate(id,body, {new:true,runValidators:true},(err,usuarioDB) =>{

    //     if(err)
    //     {
    //         return res.status(400).json({
    //             ok:false,
    //             err
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario : usuarioDB
    //     });
    // });   
})

// ===========================
//  Borrar un usuario
// ===========================
app.delete('/usuario/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        usuarioDB.borrado = true;

        usuarioDB.save((err, usuarioBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioBorrado,
                mensaje: 'Borrado con éxito'
            });

        })

    })
});

module.exports = app;