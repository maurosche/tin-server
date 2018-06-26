var mkdirp = require('mkdirp');
const fs = require('fs');
var getDirName = require('path').dirname;
const path = require('path');

// ===========================
//  Obtener fotos
// ===========================
let  getFotosPerfil = (idUsuario,callback,callbackError)=> {

    let pathFotosPerfil = './uploads/perfil/' + idUsuario ;

    let list = new Array();

        if(!fs.exists(pathFotosPerfil))
        {
            return callback('No hay fotos');
        }

        fs.readdir(pathFotosPerfil,(err,dir)=>{

            if(err){
                callbackError(err);
                console.log('Error al leer directorio : ',err);
            } 

            if(!dir || dir.length == 0){
                return callback('No hay fotos');
            }
            
            dir.forEach(element => {

                let archivo = pathFotosPerfil + '/' + element;

                    //read image file
                    fs.readFile( archivo, (err, data)=>{
                        
                        //error handle
                        if(err) console.log('ERROR : ', err);
                        
                        //get image file extension name
                        let extensionName = path.extname(archivo);
                        
                        //convert image file to base64-encoded string
                        let base64Image = new Buffer(data, 'binary').toString('base64');
                        
                        //combine all strings
                        let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
                        
                        console.log('src : ',imgSrcString);

                        //send image src string into jade compiler
                        list.push( imgSrcString );

                        if(dir.length == list.length){
                            callback(list);
                        }
                    })
            });
        })
};

// ===========================
//  Obtener fotos
// ===========================
let  getFotoPerfil = (idUsuario, img,callback,callbackError)=> {


    let pathImg = './uploads/perfil/' + idUsuario + '/' + img ;
    //let pathImg = path.resolve(__dirname,`../../uploads/perfil/${idUsuario}/${img}`);
    let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg');

    if (fs.existsSync(pathImg)) {
        callback(pathImg);
    }
    else{
        callback(noImagePath);
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
        //let pathImagen = path.resolve(__dirname, `../../uploads/perfil/` + idUsuario + `/${ nombreArchivo }`);
        let pathImagen = './uploads/perfil/' + idUsuario + '/' + nombreArchivo ;
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
    getFotosPerfil,
    getFotoPerfil
};
