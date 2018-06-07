const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files)
    {
        return res.status(400).json({
            ok:false,
            messaje : "No hay archivos"
        });
    }      

    //valida tipo
    let tiposValidos = ['usuarios','productos'];

    if (tiposValidos.indexOf(tipo)<0) {
        return res.status(400).json({
            ok:false,
            err: {
                message : "Los tipos permitidos son " + tiposValidos.join(', ')
            }
        });
    }
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    let extensionesValidas = ['png','jpg','gif','jpeg'];
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length -1];

    if (extensionesValidas.indexOf(extension)<0) {
        return res.status(400).json({
            ok:false,
            err: {
                message : "Las extensiones permitidas son " + extensionesValidas.join(', ')
            }
        });
    }

    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
   
    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
        
      if (err)
        return res.status(500).json({
            ok:false,
            err
        });

        if (tipo === "usuarios") {
            imagenUsuario(id,res,nombreArchivo);    
        }
        else {
            imagenProducto(id,res,nombreArchivo);
        }

      });
});


function imagenUsuario(id, res, nombreArchivo){


    Usuario.findById(id,(err,usuarioBD)=>{

        if (err) {

            borraArchivo(nombreArchivo,'usuarios');

            return res.status(500).json({
                ok:false,
                err
            }); 
        }

        if (!usuarioBD) {

            borraArchivo(nombreArchivo,'usuarios');

            return res.status(400).json({
                ok:false,
                err: {
                    message :'Usuario no existe'
                }
            }); 
        }
        
        borraArchivo(usuarioBD.img,'usuarios');

        usuarioBD.img  = nombreArchivo;

        usuarioBD.save((err, usuarioGuardado)=>{

            res.json({
                 ok:true,
                 usuario : usuarioGuardado,
                 archivo : nombreArchivo
            });

        });

    });
  }

  function imagenProducto(id,res,nombreArchivo){

    
    Producto.findById(id,(err,productoBD)=>{

        if (err) {

            borraArchivo(nombreArchivo,'productos');

            return res.status(500).json({
                ok:false,
                err
            }); 
        }

        if (!productoBD) {

            borraArchivo(nombreArchivo,'productos');

            return res.status(400).json({
                ok:false,
                err: {
                    message :'Producto no existe'
                }
            }); 
        }

        borraArchivo(productoBD.img,'productos');

        productoBD.img  = nombreArchivo;

        productoBD.save((err, productoGuardado)=>{

            res.json({
                ok:true,
                producto : productoGuardado,
                archivo : nombreArchivo
            });

        });

    });
  }

function borraArchivo(nombreImagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }


}



module.exports = app;