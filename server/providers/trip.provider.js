const Trip = require('../models/trip');
let ObjectId = require('mongoose').Types.ObjectId; 
const _ = require('underscore');

// ===========================
//  Agregar trip
// ===========================
let  postTrip = (t,callback,callbackError)=> {

    let trip = new Trip({
        nombre : t.nombre,
        lugar : t.lugar,
        lat : t.lat,
        lng :t.lng,
        pais : t.pais,
        provincia : t.provincia,
        usuario : ObjectId(t.usuario),
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
//  Modifica un trip
// ===========================
let putTrip = (trip,callback,callbackError)=> {

    let tripEdit =  trip;//_.pick(trip, ['fechaEdicion']);

    Trip.findByIdAndUpdate(tripEdit._id,tripEdit,{new:true},(err,data) =>{    
   
       if (err) {
           return callbackError(err);
       }     
   
       callback(data);
   });
}; 

// ===========================
//  Delete trip
// ===========================
let deleteTrip = (idTrip,callback,callbackError)=> {

    Trip.findByIdAndUpdate(idTrip,{borrado:true},{new:true},(err,data) =>{    
   
       if (err) {
           return callbackError(err);
       }     
   
       callback(data);
   });
};


// ===========================
//  get trips
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
    postTrip,
    putTrip,
    deleteTrip
};