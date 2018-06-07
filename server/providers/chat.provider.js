const Chat = require('../models/chat');

// ===========================
//  Obtener chats
// ===========================
let  getChats = (idUsuario,callback,callbackError)=> {

    let ObjectId = require('mongoose').Types.ObjectId; 
    let condicion = {
                        $or:[
                            {usuarioEmisor : new ObjectId(idUsuario)},
                            {usuarioReceptor : new ObjectId(idUsuario)}
                        ],
                        borrado : false
                    };

    if(idUsuario == 0 ){
        callbackError( "Usuario incorrecto");
    }

    Chat.aggregate([
        { "$match": condicion },
        {
            "$group": {
                "_id": { 
                    "usuarioEmisor": "$usuarioEmisor", 
                    "usuarioReceptor" : "$usuarioReceptor"
                }
            }
        }
        ])
        .exec((err, chats) => {

            if (err) {
                return callbackError(err);
            }     

            callback(chats);
        });
};

module.exports = {
    getChats,
};