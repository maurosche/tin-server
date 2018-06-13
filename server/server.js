require('./config/config');

const express = require('express');
const socketIO = require('socket.io')
const http = require('http');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

let server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');

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

// ========================
//   ROUTES API REST
// ========================
app.use( require('./routes/index'));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./providers/socket.provider');

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);

});