const fs = require('fs');
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

    fotosList.forEach(f => {        
        
        let nombreCortado = f.nombre.split('.');
        let extension = nombreCortado[nombreCortado.length -1]; 
        let nombreArchivo = `${new Date().getMilliseconds()}.${extension}`;  
        let pathImagen = path.resolve(__dirname, `../../uploads/perfil/` + idUsuario + `/${ nombreArchivo }`);
        
        console.log('=================pathImagen : ', pathImagen);

        fs.appendFile(pathImagen, f.src, function (err) {
            if (err) 
            {
                return callbackError(err);
            }
            else
            {
                fotosListEnDisco.push(pathImagen);
                console.log('GUARDADO!');
            }            
        });
    });  

    callback(fotosListEnDisco);

};


module.exports = {
    postFotosPerfil
};