var socket = require('socket.io'), http = require('http'),
  server = http.createServer(), socket = socket.listen(server);


socket.on('message', function(data) {

   console.log('DATA : ', data);
   
//    connection.on('message', function(msg){
//      socket.emit('message', msg);
//    });

});

setInterval(() => socket.emit('message', new Date().toTimeString()), 1000);

server.listen(process.env.PORT, function(){
console.log('Server started');
});







// const express = require('express');
// const socketIO = require('socket.io')
// const http = require('http');

// const path = require('path');

// const app = express();
// let server = http.createServer(app);

// const publicPath = path.resolve(__dirname, '../public');
// const port = process.env.PORT || 3000;

// app.use(express.static(publicPath));

// // IO = esta es la comunicacion del backend
// module.exports.io = socketIO(server);
// require('./providers/socket.provider');

// server.listen(port, (err) => {

//     if (err) throw new Error(err);

//     console.log(`Servidor corriendo en puerto ${ port }`);

// });