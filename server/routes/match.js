const express = require('express');

const Match= require('../models/match');
const { getChats} = require('../providers/chat.provider');
const { getMatchs,postMatch} = require('../providers/match.provider');
const { enviarMatch} = require('../providers/socket.provider');

const { verificarToken } = require('../middlewares/autenticacion'); 

const app = express();

let callbackError = (data,res)=>{

    //console.log('ERROR : ', data);

    res.json({
                ok:false,
                err:data
             });
};

// // ===========================
// //  Obtener matches
// // ===========================
// app.get('/match', verificarToken, (req, res) => {

//     let idUsuario = req.query.idUsuario || 0;

//     //Si ya hay un chat con ese usuario no lo mostramos
//     getChats(idUsuario,(chats)=>{        

//         getMatchs(idUsuario,(matchs)=>{

//             let list = new Array();

//             matchs.forEach(match => {

//                  if  (!chats.find(chat=> 
//                        ( String(chat._id.usuarioEmisor) == String(match.usuario1._id) && String(chat._id.usuarioReceptor) == String(match.usuario2._id) ||
//                        (String(chat._id.usuarioEmisor) == String(match.usuario2._id) && String(chat._id.usuarioReceptor) == String(match.usuario1._id) ))
//                     ))
//                     {
//                         let usuarioMatch = match.usuario1._id == idUsuario ? match.usuario2: match.usuario1;
//                         list.push({usuarioMatch , match});
//                     }
                
//             });

//             res.json({ok:true,result : list});

//         },(data)=>{callbackError(data,res)});

//     },(data)=>{callbackError(data,res)});

// });

app.get('/match', verificarToken, (req, res) => {

    let idUsuario = req.query.idUsuario || 0;
 
    console.log(idUsuario);
 
    //Si ya hay un chat con ese usuario no lo mostramos
    getChats(idUsuario,(chats)=>{       
 
        getMatchs(idUsuario,(matchs)=>{
 
            let list = new Array();
 
            matchs.forEach(match => {
 
                 if  (!chats.find(chat=>
                       ( String(chat.usuarioEmisor[0]._id) == String(match.usuario1._id) && String(chat.usuarioReceptor[0]._id) == String(match.usuario2._id) ||
                       (String(chat.usuarioEmisor[0]._id) == String(match.usuario2._id) && String(chat.usuarioReceptor[0]._id) == String(match.usuario1._id) ))
                    ))
                    {
                        let usuarioMatch = match.usuario1._id == idUsuario ? match.usuario2: match.usuario1;
                        list.push({usuarioMatch , match});
                    }
               
            });

            res.json({ok:true,result : list});

        },(data)=>{callbackError(data,res)});

    },(data)=>{callbackError(data,res)});
});

// ===========================
//  Agrega un match
// ===========================
app.post('/match', verificarToken, (req, res) => { 

    let body = req.body;
    let idUsuario1 = body.idUsuario1 || 0;
    let idUsuario2 = body.idUsuario2 || 0; 

        postMatch(idUsuario1,idUsuario2,(result)=>{

            enviarMatch(idUsuario1,idUsuario2);
            res.json({ok:true,result });

        },(data)=>{callbackError(data,res)});

});


// // ===========================
// //  Borrar un match
// // ===========================
// app.delete('/match', verificarToken, (req, res) => {

//     let ObjectId = require('mongoose').Types.ObjectId; 
//     let idUsuario1 = req.query.idUsuario1 || 0;
//     let idUsuario2 = req.query.idUsuario2 || 0;    

//     if(idUsuario1 == 0 || idUsuario2 == 0){
//         return res.status(500).json({
//             ok: false,
//             err : "Usuario/s incorrecto/s"
//         });
//     }
    
//     Match.find(
//               { 'usuario1' : new ObjectId(idUsuario1),
//                 'usuario2' : new ObjectId(idUsuario2)
//               })
//     .exec((err, result) => {

//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         }

//         if (!result) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'ID no existe'
//                 }
//             });
//         }

//         //Borramos el único que debería existir
//         let matchDB = result[0];

//         matchDB.borrado = true;

//         matchDB.save((err, matchBorrado) => {

//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     err
//                 });
//             }

//             res.json({
//                 ok: true,
//                 match: matchBorrado,
//                 mensaje: 'match borrado'
//             });
//         })
//     })   
// });


module.exports = app;