// ========================
//   PUERTO REST API
// ========================
process.env.PORT = process.env.PORT || 30000;

// ========================
//   PUERTO SOCKETS
// ========================
process.env.PORT_SOCKETS = process.env.PORT_SOCKETS || 30001;

// ========================
//   ENTORNO
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
//   VENCIMIENTO DEL TOKEN
// ========================
process.env.CADUCIDAD_TOKEN = '1d';

// ========================
//   SEED
// ========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ========================
//   SEED
// ========================
process.env.urlFotos = 'https://tinder-server-node.herokuapp.com/';

// ========================
//   MONGO DB
// ========================
let urlDB = '';

// if ( process.env.NODE_ENV == 'dev') {
//     urlDB = 'mongodb://localhost:27017/tinder';
// } else{
      urlDB = 'mongodb://maurosche:39523952m@ds151970.mlab.com:51970/tinder';
// }


process.env.urlDB = urlDB;




