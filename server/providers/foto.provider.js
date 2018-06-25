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

    console.log('================= fotosList.length : ',  fotosList.length);
 
    for(var i = 0; i < fotosList.length;i++){
        
        let extension = 'jpeg'; 
        let nombreArchivo = `${new Date().getMilliseconds()}.${extension}`;  
        let pathImagen = path.resolve(__dirname, `../../uploads/perfil/` + idUsuario + `/${ nombreArchivo }`);
        //let pathImagen =`${ nombreArchivo }`;
        
        console.log('=================pathImagen : ', pathImagen);
        console.log('=================fotosList[i] : ', fotosList[i]); 


        fs.writeFile(pathImagen, fotosList[i], function (err) {

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
    }  

    callback(fotosListEnDisco);

};


module.exports = {
    postFotosPerfil
};