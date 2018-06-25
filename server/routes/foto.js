const express = require('express');

const { postFotosPerfil   } = require('../providers/foto.provider');

const { verificarToken,verificarAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

let callbackError = (data,res)=>{

    //console.log('ERROR : ', data);

    res.json({
                ok:false,
                err:data
             });
};

// ===========================
//  Agrega fotos de perfil
// ===========================
app.post('/postFotosPerfil', verificarToken, (req, res) => {

    let body = req.body;

    postFotosPerfil( body.idUsuario, body.fotosList,(result)=>{

        res.json({ok:true, result });        

    },(data)=>{callbackError(data,res)});
});

// ===========================
// GET FOTO
// ===========================
app.get('/foto/:idUser/:img', (req,res)=>{

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