const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
let ObjectId = require('mongoose').Types.ObjectId; 

// ===========================
//  Obtener usuarios
// ===========================
let getUsuarios = (idUsuario,ids,callback,callbackError)=> {

    let condition =  idUsuario == 0 ? {borrado:false} : {borrado:false , _id : { $nin : ids}};

    // Usuario.aggregate([
    //     // Match your posts
    //     { "$match": condition},    
    //     // Project the fields you want, notice the logical conditions
    //     { "$project": {
    //         "_id": 1,
    //         "fotos": 1,
    //         "nombre" : 1,
    //         "apellido" : 1, 
    //         "email" : 1,
    //         "img" : 1
    //         }
    //     }])
    Usuario.find( condition, 'id nombre apellido img')
        .exec((err, data) => {

            if (err) {
                return callbackError(err);
            }     

            let list = new Array();

            data.forEach(element => {
                list.push({
                    _id : element._id,
                    nombre : element.nombre,
                    apellido : element.apellido,
                    img : element.img,
                    fotos : []
                });
            });        

            callback(list);
        });
};

// ===========================
//  Obtener usuario
// ===========================
let getUsuario = (idUsuario,callback,callbackError)=> {

    console.log("GETUSUARIOS===================", idUsuario);
    let condition =  idUsuario == 0 ? {borrado:false} : {borrado:false , _id : { $ne : idUsuario}};

    Usuario.findById( idUsuario, 'id nombre apellido img')
        .exec((err, data) => {

            if (err) {
                return callbackError(err);
            }     

            callback(data);
        });
};

// ===========================
//  Obtener usuario
// ===========================
let login = (email,password,callback,callbackError)=> {

    Usuario.findOne({borrado:false,email:email,password:password} , 'id nombre email img')
        .exec((err, data) => {

            if (err) {
                return callbackError(err);
            }     

            callback(data);
        });
};

// ===========================
//  Agregar usuario
// ===========================
let postUsuario = (usuario,callback,callbackError)=> {
    
let usr = new Usuario({
    nombre : usuario.nombre,
    apellido : usuario.apellido,
    email : usuario.email,
    password : bcrypt.hashSync(usuario.password,10),
    img : usuario.img,
    facebook : usuario.facebook,
    fechaNacimiento : usuario.fechaNacimiento,
    kmConfig : usuario.kmConfig,
    edadDesdeConfig : usuario.edadDesdeConfig,
    edadHastaConfig : usuario.edadHastaConfig,
    notifMensajeConfig : usuario.notifMensajeConfig,
    notifMatchConfig : usuario.notifMatchConfig,
    fechaAlta : new Date(),
    fechaEdicion : new Date()
});

usr.save( (err, data)=> {

    if (err) {
        return callbackError(err);
    }     

    callback(data);
});
};

// ===========================
//  Modifica usuario
// ===========================
let putUsuario = (usuario,callback,callbackError)=> {

     usuario.fechaEdicion = new Date();

     let usuarioEdit =  _.pick(usuario, ['fechaEdicion','kmConfig','edadDesdeConfig','edadHastaConfig','notifMensajeConfig',
                                  'notifMatchConfig']);
     Usuario.findByIdAndUpdate(usuario._id,usuarioEdit, {new:true,runValidators:true},(err,data) =>{    
    
        if (err) {
            return callbackError(err);
        }     
    
        callback(data);
    });
 };

 
// ===========================
//  Borra usuario
// ===========================
let deleteUsuario = (id,callback,callbackError)=> {
    
     Usuario.findByIdAndUpdate(id,{borrado : true}, {new:true,runValidators:true},(err,data) =>{    
    
        if (err) {
            return callbackError(err);
        }     
    
        callback(data);
    });
    };

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    getUsuario,
    login
};