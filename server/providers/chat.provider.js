const Chat = require('../models/chat');
let ObjectId = require('mongoose').Types.ObjectId; 

// ===========================
//  Obtener chats
// ===========================
let  getChats = (idUsuario,callback,callbackError)=> {

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
                "$project": {
                "usuarioChat": {
                   $cond: {
                      if: { $eq: [ new ObjectId(idUsuario), "$usuarioEmisor" ] },
                      then: "$usuarioReceptor",
                      else: "$usuarioEmisor"
                   }
                },
                "usuarioReceptor" : 1,
                "usuarioEmisor" : 1,
                "mensaje" : 1,
                "visto" : 1
                }
            },  
            {
                "$group": {
                    "_id": {
                        "usuarioChat": "$usuarioChat"
                    },
                    "usuarioChat": { $first : "$usuarioChat"},
                    "mensaje": {$last : "$mensaje"},
                    "visto": {$last : "$visto"  },
                    "mensajesPendientes": {
                        "$sum": { "$cond": [ {"$and" : [
                                                        { "$eq": [ "$visto", false ] },
                                                        { "$eq":[ "$usuarioReceptor" , new ObjectId(idUsuario)] }
                                                       ]},
                                                        1,  
                                                        0
                        ]}
                    }             
                }
            }, 
            {$lookup: {from: 'usuarios', localField: 'usuarioChat', foreignField: '_id', as: 'usuarioChat'} } 
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

// ===========================
//  Poner chat en visto
// ===========================
let  vistoChat = (idUsuarioEmisor,idUsuarioReceptor,callback,callbackError)=> {

    Chat.updateMany(
      { usuarioEmisor : new ObjectId(idUsuarioEmisor), 
        usuarioReceptor : new ObjectId(idUsuarioReceptor)} ,
     { $set: { "visto" : true } },
        (data)=>{ 

            callback(data);     
        
        });  
};

// ===========================
//  Poner chats en entregado
// ===========================
let  entregadoChat = (idUsuario,callback,callbackError)=> {

    Chat.updateMany(
      { usuarioReceptor : new ObjectId(idUsuario)} ,
     { $set: { "entregado" : true } },
        (data)=>{ 

            callback(data);     
        
        });  
};

module.exports = {
    getChats,
    getChat,
    postChat,
    entregadoChat,
    vistoChat
};