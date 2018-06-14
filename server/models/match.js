const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let matchSchema = new Schema({
    usuario1: { type: Schema.Types.ObjectId, 
                     ref: 'usuario' 
    },
    usuario2: { 
                       type: Schema.Types.ObjectId, 
                       ref: 'usuario' 
    },
    fecha :{
        type : Date
    },
    borrado: {
        type : Boolean,
        default : false
    }                      
});

//matchSchema.index({ usuario1: 1, usuario2: 1 }, { unique: true })

module.exports = mongoose.model('match', matchSchema);