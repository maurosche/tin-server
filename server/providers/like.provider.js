const Like = require('../models/like');

// ===========================
//  Agregar likes
// ===========================
let  postLike = (idUsuarioEmisor,idUsuarioReceptor,callback,callbackError)=> {

    let ObjectId = require('mongoose').Types.ObjectId;  

    let like = new Like({
        usuarioEmisor: idUsuarioEmisor,
        usuarioReceptor: idUsuarioReceptor,
        fecha : new Date()
    });

    like.save((err, result) => {

        if (err) {
            return callbackError(err);
        }

        callback(result);
    });
};

// ===========================
//  Obtener likes
// ===========================
let  getLike = (idUsuarioEmisor,idUsuarioReceptor,callback,callbackError)=> {

    let ObjectId = require('mongoose').Types.ObjectId; 

    let condicion = {
        usuarioEmisor : new ObjectId(idUsuarioEmisor),
        usuarioReceptor : new ObjectId(idUsuarioReceptor) ,
        like : true
    };   
    
    Like.find(condicion)
        .populate('usuarioEmisor')
        .populate('usuarioReceptor')
        .exec((err, result) => {

            if (err) {
                return callbackError(err);
            }

            callback(result);
        })
};

module.exports = {
    postLike,
    getLike
};