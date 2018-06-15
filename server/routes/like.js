const express = require('express');

const Like= require('../models/like');
const { postLike , getLike} = require('../providers/like.provider');
const { crearMatch} = require('../providers/match.provider');

const { verificarToken } = require('../middlewares/autenticacion');

const app = express();


let callbackError = (data,res)=>{

    //console.log('ERROR : ', data);

    res.json({
                ok:false,
                err:data
             });
};

// ===========================
//  Agrega un like
// ===========================
app.post('/like', verificarToken, (req, res) => { 

    let body = req.body;
    let idUsuarioEmisor = body.idUsuarioEmisor || 0;
    let idUsuarioReceptor = body.idUsuarioReceptor || 0; 
    let like = body.like || 0 ;
    

    postLike(idUsuarioEmisor,idUsuarioReceptor,(result1)=>{

        //Si no le gusta salimos
        if (!like){
            return res.json({ok:true,match:false,result : "sin match" });
        }

        getLike(idUsuarioReceptor,idUsuarioEmisor,(result2)=>{

            //Si hay me gusta hay un MATCH!!!
            if (result2.length > 0) {
                crearMatch(idUsuarioEmisor,idUsuarioReceptor,(result2)=>{

                    res.json({ok:true,match:true,result : "con match!!!" });

                },(data)=>{callbackError(data,res)});
            }
            else{
                res.json({ok:true,match:false,result : "sin match" });
            }

        },(data)=>{callbackError(data,res)});        

    },(data)=>{callbackError(data,res)});

});

module.exports = app;