const Like = require('../models/trip');
let ObjectId = require('mongoose').Types.ObjectId; 

// ===========================
//  Agregar likes
// ===========================
let  postTrip = (t,callback,callbackError)=> {

    let trip = new Trip({
        nombre : t.nombre,
        lugar : t.lugar,
        lat : t.lat,
        lng :t.lng,
        pais : t.pais,
        provincia : t.provincia,
        usuario : t.usuario,
        fechaDesde : t.fechaDesde, 
        fechaHasta : t.fechaHasta,
        descripcion : t.descripcion,
        borrado: false
      });

      trip.save((err, result) => {

        if (err) {
            return callbackError(err);
        }

        callback(result);
    });
};

// ===========================
//  Obtener likes
// ===========================
let  getTrips = (idUsuario,callback,callbackError)=> {

    let condicion = {
        usuario : new ObjectId(idUsuario),
        borrado : false
    };   
    
    Trip.find(condicion)
        //.populate('usuario')
        .exec((err, result) => {

            if (err) {
                return callbackError(err);
            }

            callback(result);
        })
};

 
module.exports = {
    getTrips,
    postTrip
};