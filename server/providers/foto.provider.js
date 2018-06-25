var mkdirp = require('mkdirp');
const fs = require('fs');
var getDirName = require('path').dirname;
const path = require('path');

// ===========================
//  Obtener fotos
// ===========================
let  getFotos = (idUsuario,callback,callbackError)=> {

};

// ===========================
//  Agrega fotos de perfil
// ===========================
let  postFotosPerfil = (idUsuario,fotosList,callback,callbackError)=> {

    let fotosListEnDisco = new Array();

    console.log('================= fotosList.length : ',  fotosList.length);
 
    for(var i = 0; i < fotosList.length;i++){
        
        let extension = 'jpeg'; 
        let nombreArchivo = `${new Date().getMilliseconds()}.${extension}`;  
        let pathImagen = path.resolve(__dirname, `../../uploads/perfil/` + idUsuario + `/${ nombreArchivo }`);
        //let pathImagen = `./tmp/${ nombreArchivo }`;
        //let pathImagen = path.resolve(__dirname, `../../uploads/${ nombreArchivo }`);
        var base64Data = fotosList[i].replace(/^data:image\/png;base64,/, "");
    
        console.log('=================pathImagen : ', pathImagen);

        //fs.writeFile(pathImagen, base64Data, 'base64', function(err) {
        writeFile(pathImagen, base64Data, function(err) {

            if (err) 
            {
                console.log('ERROR!',err);
                //return callbackError(err);
            }
            else
            {
                fotosListEnDisco.push(pathImagen);
                console.log('GUARDADO!');
            }            
        });
    }  

    callback(fotosListEnDisco);

};

let writeFile = (path, contents, cb) => {
    mkdirp(getDirName(path), function (err) {
      if (err) return cb(err);
  
      fs.writeFile(path, contents, cb);
    });
  }


module.exports = {
    postFotosPerfil
};