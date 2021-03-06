const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required : [true, 'El campo nombre es requerido']
    },
    apellido:{
        type: String,
        required : [true, 'El campo apellido es requerido']
    },
    email:{
        type: String,
        unique: true,
        required : [true, 'El campo email es requerido']
    },
    password:{
        type: String,
        required : [true, 'El campo password es requerido']
    },
    img : {
        type : String,
        required :false
    },
    facebook: {
        type : Boolean,
        default : false
    },
    fechaNacimiento : {
        type : Date
    },
    kmConfig : {
        type : Number,
        default : 80
    },
    edadDesdeConfig : {
        type : Number,
        default: 18
    },
    edadHastaConfig : {
        type : Number,
        default : 80
    },
    notifMensajeConfig : {
        type : Boolean,
        default : true
    },
    notifMatchConfig : {
        type : Boolean,
        default : true
    },
    fechaAlta : {
        type : Date
    },
    fechaEdicion : {
        type : Date
    },
    borrado: {
        type : Boolean,
        default : false
    }

});

module.exports = mongoose.model('usuario', usuarioSchema);