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
                    },
                    //usuarioChat : { $eq : "$usuarioEmisor : $usuarioReceptor" }
                    usuarioEmisor: { $first: "$usuarioEmisor" },
                    usuarioReceptor: { $first: "$usuarioReceptor" }
                }
            },      
            {
                "$project": {
                "_id.usuarioEmisor2": {
                   $cond: {
                      if: { $eq: [ "5b1991bf1a102b00147b9aae", "$_id.usuarioEmisor" ] },
                      then: "$_id.usuarioEmisor",
                      else: "$_id.usuarioReceptor"
                   }
                },
                "_id.usuarioReceptor": 1,
                "_id.usuarioEmisor": 1
             }  
            },
            // {
            //     $group: {
            //         _id: "$_id",
            //         usuarioEmisor: { $first: "$usuarioEmisor" },
            //         usuarioReceptor: { $first: "$usuarioReceptor" }
            //     }
            // },
            // {$lookup: {from: 'usuarios', localField: '_id.usuarioEmisor', foreignField: '_id', as: 'usuarioEmisor'} },
            // {$lookup: {from: 'usuarios', localField: '_id.usuarioReceptor', foreignField: '_id', as: 'usuarioReceptor'} }
            ])
            .exec((err, chats) => {
    
                if (err) {
                    return callbackError(err);
                }     
    
                callback(chats);
            });
};
    
// ===========================
//  Obtener chat
// ===========================
let  getChat = (idUsuario1,idUsuario2,callback,callbackError)=> {

    let ObjectId = require('mongoose').Types.ObjectId; 
    let condicion = {
        $or:[
            {
                usuarioEmisor : new ObjectId(idUsuario1),
                usuarioReceptor : new ObjectId(idUsuario2)
            },
            {
                usuarioEmisor : new ObjectId(idUsuario2),
                usuarioReceptor : new ObjectId(idUsuario1)
            },
        ],
        borrado : false
    };   

    if(idUsuario1 == 0 || idUsuario2 == 0){
        return res.status(500).json({
            ok: false,
            err : "Usuario/s incorrecto/s"
        });
    }
    
    Chat.find(condicion)
        // .skip(desde)
        // .limit(5)
        .populate('usuarioEmisor')
        .populate('usuarioReceptor')
        .sort([['fecha', 'ascending']])
        .exec((err, chats) => {

            if (err) {
                return callbackError(err);
            }     

            callback(chats);
        });

};

// ===========================
//  Obtener chat
// ===========================
let  postChat = (idUsuarioEmisor,idUsuarioReceptor,mensaje,callback,callbackError)=> {

    let chat = new Chat({
        usuarioEmisor: idUsuarioEmisor,
        usuarioReceptor: idUsuarioReceptor,
        mensaje,
        fecha: new Date()
    });

    chat.save((err, chat) => {

        if (err) {
            return callbackError(err);
        }     

        callback(chat);
    });    
};

module.exports = {
    getChats,
    getChat,
    postChat
};