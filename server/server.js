require('./config/config');

const express = require('express');
const socketIO = require('socket.io')
const http = require('http');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const publicPath = path.resolve(__dirname, '../uploads');
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

let server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//app.use(express.static(publicPath));

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('*', function (req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

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

// ========================
//   ROUTES API REST
// ========================
app.use( require('./routes/index'));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

