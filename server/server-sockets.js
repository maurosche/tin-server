// ========================
//   SOCKETS
// ========================
require('./config/config');
const express = require('express');
const http = require('http');
const appSocket = express2();
const socketIO = require('socket.io');
let serverScoket = http.createServer(appSocket);
module.exports.io = socketIO(serverScoket);
require('./providers/socket.provider');

serverScoket.listen(process.env.PORT_SOCKETS, (err) => {

    if (err) 
    {
        console.log("ERROR EN SOCKETS : ",err);
        throw err;
    }

    console.log('SOCKETS escuchando en puerto: ', process.env.PORT_SOCKETS);

});