var mkdirp = require('mkdirp');
const fs = require('fs');
var getDirName = require('path').dirname;
const path = require('path');

// ===========================
//  Obtener fotos
// ===========================
let  getFotosPerfil = (idUsuario,callback,callbackError)=> {

     let pathImagen = path.resolve(__dirname, `../../uploads/perfil/`);// + idUsuario );

    // fs.readdir(pathImagen, {encoding : "base64"},(err,data)=>{

    //     console.log('DATAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ERROR:',err);
    //     console.log('DATAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:',data);

    // })

    console.log('=================pathImagen : ', pathImagen);  

var fsReaddir = require('fs-readdir');
var through2 = require('through2');
 
// callback api
fsReaddir(pathImagen, function _cb(err, filepaths) {
  // as usual
  console.log('callback err:', err)
  console.log('callback res:', filepaths)
});
 
// as stream
var stream = fsReaddir(pathImagen)
.on('error', function(err) {
  console.log('error:', err);
})
.on('finish', function(obj) {
  console.log('finish:', obj);
})
.on('data', function(obj) {
  console.log('data:', obj);
})
.on('folder', function(folder) {
  console.log('folder:', folder);
})
.on('file', function(file) {
  console.log('file:', file);
})
.pipe(through2.obj(function(objArray, enc, next) {
  objArray = objArray.map(function(fp) {
    return path.basename(fp);
  })
  console.log('pipe1:', objArray);
  this.push(objArray)
  next();
})).pipe(through2.obj(function(modified, enc, next) {
  console.log('pipe2:', modified);
  this.push(modified)
  next();
}))

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
