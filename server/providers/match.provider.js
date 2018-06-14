const Match = require('../models/match');
const { enviarMatch} = require('../providers/socket.provider');

// ===========================
//  Obtener matchs
// ===========================
let  getMatchs = (idUsuario,callback,callbackError)=> {

    let ObjectId = require('mongoose').Types.ObjectId; 

    let condicion = {
        $or:[
            { usuario1 : new ObjectId(idUsuario)},
            { usuario2 : new ObjectId(idUsuario)}
        ],
        borrado : false
    };   
    
    Match.find(condicion)
        .populate('usuario1')
        .populate('usuario2')
        .sort([['fecha', 'ascending']])
        .exec((err, result) => {

            if (err) {
                return callbackError(err);
            }

            callback(result);
        })
};

// =================================
//  Inserta match y envia socket
// =================================
let crearMatch = (idUsuario1,idUsuario2) =>{

    this.postMatch(idUsuario1,idUsuario2,(result)=>{

        enviarMatch(idUsuario1,idUsuario2);
        res.json({ok:true,result });

    },(data)=>{callbackError(data,res)});
};

// ===========================
//  Agregar matchs
// ===========================
let  postMatch = (idUsuario1,idUsuario2,callback,callbackError)=> {

    let ObjectId = require('mongoose').Types.ObjectId;  

    let match = new Match({
        usuario1: idUsuario1,
        usuario2: idUsuario2,
        fecha : new Date()
    });

    match.save((err, result) => {

        if (err) {
            return callbackError(err);
        }

        callback(result);

    });

};

module.exports = {
    getMatchs,
    postMatch
};