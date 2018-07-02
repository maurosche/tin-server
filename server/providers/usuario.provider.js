const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

// ===========================
//  Obtener usuarios
// ===========================
let getUsuarios = (idUsuario,ids,callback,callbackError)=> {

    let condition =  idUsuario == 0 ? {borrado:false} : {borrado:false , _id : { $nin : ids}};

    //Usuario.find( condition, 'id nombre apellido email img kmConfig edadDesdeConfig edadHastaConfig notifMensajeConfig notifMatchConfig')
    // .exec((err, data) => {

    //     if (err) {
    //         return callbackError(err);
    //     }     

    //     callback(data);
    // });

    Usuario.aggregate([
        // Match your posts
        { "$match": condition},    
        // Project the fields you want, notice the logical conditions
        { "$project": {
            "fotos": 1,
            "nombre" : 1,
            "apellido" : 1, 
            "email" : 1,
            "img" : 1
            }
        }])
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