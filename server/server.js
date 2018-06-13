require('./config/config');

const express = require('express');
const socketIO = require('socket.io')
const http = require('http');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const publicPath = path.resolve(__dirname, '../public');
const bodyParser = require('body-parser');

let server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static(publicPath));

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

// IO = esta es la comunicacion del backend
//module.exports.io = socketIO(server);
//require('./providers/socket.provider');

// ========================
//   ROUTES API REST
// ========================
app.use( require('./routes/index'));

app.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

// server.listen(process.env.PORT, (err) => {
//     if (err) throw new Error(err);
//     console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
// });
