const express = require('express');
const socketIO = require('socket.io')
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const bodyParser = require('body-parser');

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

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./providers/socket.provider');

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);

});