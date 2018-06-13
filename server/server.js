require('./config/config');

const path = require('path');

const express = require('express');

const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

//Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

app.use( require('./routes/index'));

// ========================
//   MONGOO BD
// ========================
mongoose.connect(process.env.urlDB, (err,res)=>{
     if (err) 
     {
        console.log("ERROR EN BASE MONGOO : ",err);
        throw err;
     }
     console.log("CONEXION MONGOO OK!");
});

// ========================
//   REST API
// ========================
// app.listen(3000 ,(err) => {

//     if (err) 
//     {
//         console.log("ERROR EN REST API : ",err);
//         throw err;
//     }
    
//     console.log('REST API escuchando en puerto: ',3000);
// });

const http = require('http');
const appSocket = express();
const socketIO = require('socket.io');
let server = http.createServer(app);
//module.exports.io = socketIO(server);
//require('./providers/socket.provider'); 

module.export = {io : socketIO(server),
    texto : 'hola mundo'};
    
require('./providers/socket.provider'); 

server.listen(process.env.PORT, (err) => {

    if (err) 
    {
        console.log("ERROR EN SOCKETS : ",err);
        throw err;
    }

    console.log('SOCKETS escuchando en puerto: ', process.env.PORT);

});
