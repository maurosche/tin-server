const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let likeSchema = new Schema({
    like: { 
        type: Boolean,
        default : true
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
    }                      
});

//likeSchema.index({ usuarioEmisor: 1, usuarioReceptor: 1 }, { unique: true })

module.exports = mongoose.model('like', likeSchema);