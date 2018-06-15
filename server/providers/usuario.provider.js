const _ = require('underscore');
const Usuario = require('../models/usuario');

// ===========================
//  Obtener usuarios
// ===========================
let getUsuarios = (callback,callbackError)=> {

    console.log("GETUSUARIOS===================");
    Usuario.find({borrado:false} , 'id nombre email img kmConfig edadDesdeConfig edadHastaConfig notifMensajeConfig notifMatchConfig')
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
    
     let id = usuario._id;
     usuario.fechaEdicion = new Date();
     let usr =  _.pick(req.body, ['fechaEdicion','kmConfig','edadDesdeConfig','edadHastaConfig','notifMensajeConfig',
                                  'notifMatchConfig']);
     Usuario.findByIdAndUpdate(id,usuario, {new:true,runValidators:true},(err,data) =>{    
    
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
    login
};