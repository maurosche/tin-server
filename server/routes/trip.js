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

// ===========================
//  Obtener trip
// ===========================
app.get('/trip', verificarToken, (req, res) => {

    let idUsuario = req.query.idUsuario || 0;

    //Si ya hay un chat con ese usuario no lo mostramos
    getTrips(idUsuario,(data)=>{        

        res.json({ok:true,result : data});

    },(data)=>{callbackError(data,res)});

});

// ===========================
//  Agrega un trip
// ===========================
app.post('/trip', verificarToken, (req, res) => { 

    let trip = req.body;

        postTrip(trip,(result)=>{

            res.json({ok:true,result : data});

        },(data)=>{callbackError(data,res)});
});

module.exports = app;