var mkdirp = require('mkdirp');
const fs = require('fs');
var getDirName = require('path').dirname;
const path = require('path');

// ===========================
//  Obtener fotos
// ===========================
let  getFotosPerfil = (idUsuario,callback,callbackError)=> {

let path = './uploads/perfil/' + idUsuario ;

    let list = new Array();

    if(fs.exists(path))
    {
        fs.readdir(path,(err,data)=>{

            if(err){
                callbackError(err);
                console.log('Error al leer directorio : ',err);
            }
            
            data.forEach(element => {
    
                list.push(element);
                
            });
    
            callback(list);
        })
    }
    else
    {
        callbackError('No existe!!!');
    }
};

// ===========================
//  Agrega fotos de perfil
// ===========================
let  postFotosPerfil = (idUsuario,fotosList,callback,callbackError)=> {

    let fotosListEnDisco = new Array();
 
    for(var i = 0; i < fotosList.length;i++){
        
        let extension = fotosList[i].indexOf('jpeg') < 0 ? 'png' : 'jpeg';      
        let nombreArchivo = `${Math.floor((Math.random() * 1000) + 1)}-${new Date().getMilliseconds()}.${extension}`;  
        let pathImagen = path.resolve(__dirname, `../../uploads/perfil/` + idUsuario + `/${ nombreArchivo }`);
        let base64Data = fotosList[i].split(';base64,').pop();

        console.log('=================pathImagen : ', pathImagen);       
      
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
  
      fs.writeFile(path, contents, {encoding: 'base64'}, function(err) {
    });
  });
}


module.exports = {
    postFotosPerfil,
    getFotosPerfil
};
