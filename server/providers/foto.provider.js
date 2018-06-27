var mkdirp = require('mkdirp');
const fs = require('fs');
var getDirName = require('path').dirname;
const path = require('path');

// ===========================
//  Obtener fotos
// ===========================
let  getFotosPerfil = (usuario,callback,callbackError)=> {

    let pathFotosPerfil = './uploads/perfil/' + idUsuario ;

    let list = new Array();

        fs.readdir(pathFotosPerfil,(err,dir)=>{

            if(err){
                console.log('Error al leer directorio : ',err);
                return callback({usuario});
            } 

            if(!dir || dir.length == 0){
                return callback({usuario});
            }
            
            dir.forEach(element => {

                let archivo = process.env.urlFotos + 'fotoPerfil/' + idUsuario + '/' +  element;

                list.push(archivo);

                    // //read image file
                    // fs.readFile( archivo, (err, data)=>{
                        
                    //     //error handle
                    //     if(err) console.log('ERROR : ', err);
                        
                    //     //get image file extension name
                    //     let extensionName = path.extname(archivo);
                        
                    //     //convert image file to base64-encoded string
                    //     let base64Image = new Buffer(data, 'binary').toString('base64');
                        
                    //     //combine all strings
                    //     let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;                        

                    //     //send image src string into jade compiler
                    //     list.push( imgSrcString );

                    //     if(dir.length == list.length){
                    //         return callback({idUsuario , fotos : list});
                    //     }
                    // })
            });

            usuario.fotos = list;
            return callback({usuario});
        });
         
};

// ===========================
//  Obtener fotos
// ===========================
let  getFotoPerfil = (idUsuario, img,callback,callbackError)=> {


    //let pathImg = './uploads/perfil/' + idUsuario + '/' + img ;
    let pathImg = path.resolve(__dirname,`../../uploads/perfil/${idUsuario}/${img}`);
    let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg');

    console.log('1==================================pathImg: ', pathImg);
    

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
      
        writeFile(pathImagen, base64Data, function(){

            console.log('GUARDADO!'); 

        }, function(err) {
            console.log(err);
        });
    }

    return callback(fotosListEnDisco);
};

let writeFile = (path, contents,callback,callbackError) => {
    mkdirp(getDirName(path), function (err) {
      if (err) return cb(err);
  
      fs.writeFile(path, contents, {encoding: 'base64'}, callback);
  });
}


module.exports = {
    postFotosPerfil,
    getFotosPerfil,
    getFotoPerfil
};
