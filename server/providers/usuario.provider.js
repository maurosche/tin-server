const Usuario = require('../models/usuario');

// ===========================
//  Obtener usuarios
// ===========================
let getUsuarios = (callback,callbackError)=> {

    Usuario.find({borrado:false} , 'id nombre email img')
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

module.exports = {
    getUsuarios,
    postUsuario,
    login
};