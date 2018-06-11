const {io} = require('../server-sockets');

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

io.on('connection', (client)=>{


});