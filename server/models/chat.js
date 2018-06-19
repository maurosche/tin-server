const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let chatSchema = new Schema({
    mensaje: { type: String
    },
    usuarioEmisor: { type: Schema.Types.ObjectId, 
                     ref: 'usuario' 
    },
    usuarioReceptor: { 
                       type: Schema.Types.ObjectId, 
                       ref: 'usuario' 
    },
    fecha :{
        type : Date
    },
    visto: {
        type : Boolean,
        default : false
    },    
    borrado: {
        type : Boolean,
        default : false
    }                     
});


module.exports = mongoose.model('chat', chatSchema);