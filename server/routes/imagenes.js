const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.get('/imagen/:idUser/:img', (req,res)=>{

    let idUser = req.params.idUser;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname,`../../uploads/${idUser}/${img}`);
    let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg');

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else{
        res.sendFile(noImagePath);
    }
});

module.exports = app;