const express = require('express');
const socketIO = require('socket.io')
const http = require('http');

const path = require('path');

const app = express();
let server = http.Server(app);//http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = 3000;//process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./providers/socket.provider');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});