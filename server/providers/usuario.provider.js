const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
let ObjectId = require('mongoose').Types.ObjectId; 

// ===========================
//  Obtener usuarios
// ===========================
let getUsuarios = (idUsuario,ids,callback,callbackError)=> {
    
    let condition =  idUsuario == 0 ? {borrado:false} : {borrado:false , _id : { $nin : ids}};

    Usuario.aggregate([
            { "$match": condition },
            {
                "$project": {
                "trips": {
                   $cond: {
                      if: { $eq: [ "Argentina", "$pais" ] },
                      then: "ES EN ARGENTINA",
                      else: "NO ES EN ARGENTINA!!!!!!!!!!!!!!!!!!!!"
                   }
                }
                }
            },
            { $lookup: {from: 'trips', localField: '_id', foreignField: 'usuario', as: 'trips'}}  
        ])
        .exec((err, usuarios) => {

        if (err) {
            return callbackError(err);
        }

        callback(usuarios);
    });

    // Usuario.find( condition, 'id nombre apellido img')
    //     .exec((err, data) => {

    //         if (err) {
    //             return callbackError(err);
    //         }     

    //         let list = new Array();

    //         data.forEach(element => {
    //             list.push({
    //                 _id : element._id,
    //                 nombre : element.nombre,
    //                 apellido : element.apellido,
    //                 img : element.img,
    //                 fotos : []
    //             });
    //         });        

    //         callback(list);
    //     });
};

// ===========================
//  Obtener usuario
// ===========================
let getUsuario = (idUsuario,callback,callbackError)=> {

    let condition =  idUsuario == 0 ? {borrado:false} : {borrado:false , _id : { $ne : idUsuario}};

    Usuario.findById( idUsuario, 'id nombre apellido img kmConfig edadDesdeConfig edadHastaConfig fechaNacimiento notifMensajeConfig notifMatchConfig')
        .exec((err, data) => {

            if (err) {
                return callbackError(err);
            }     

            let usuario = {
                _id : data._id,
                nombre : data.nombre,
                apellido : data.apellido,
                img : data.img,
                kmConfig: data.kmConfig,
                edadDesdeConfig: data.edadDesdeConfig,
                edadHastaConfig: data.edadHastaConfig,
                notifMensajeConfig: data.notifMensajeConfig,
                notifMatchConfig: data.notifMatchConfig,
                fotos : []
            }

            callback(usuario);
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