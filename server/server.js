require('./config/config');

const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// Add headers
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

mongoose.connect(process.env.urlDB, (err,res)=>{
     if (err) throw err;

     console.log("CONEXION OK!!");
});

app.listen(process.env.PORT ,() => {
    console.log('Escuhando en puerto: ', process.env.PORT);
});