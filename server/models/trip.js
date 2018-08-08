const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let matchSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, 
                     ref: 'usuario' 
    },
    nombre: { type: String
    },
    descripcion: { type: String
    },
    lugar: { type: String
    },
    lat: { type: String
    },
    lng: { type: String
    },
    pais: { type: String
    },
    provincia: { type: String
    },
    fechaDesde :{
        type : Date
    },
    fechaHasta :{
        type : Date
    },
    borrado: {
        type : Boolean,
        default : false
    }                      
});

module.exports = mongoose.model('trip', matchSchema);