const jwt = require('jsonwebtoken');

// =====================
//  Verificar token
// =====================
let verificarToken = (req , res , next) =>{

    // let token = req.get('token');

    // jwt.verify(token , process.env.SEED, (err, decoded)=>{

    //     if (err) {
    //         return res.status(401).json({
    //             ok: false,
    //             err : {
    //                 message : 'token no válido'
    //             }
    //         });
    //     }

    //     req.usuario = decoded.usuario;
    //     next();
    // });
    next();//BORRAR
};

// =============================
//  Verificar token solo admin
// =============================
let verificarTokenAdmin = (req , res , next) =>{

    // let token = req.get('token');

    // jwt.verify(token , process.env.SEED, (err, decoded)=>{

    //     if (err) {
    //         return res.status(401).json({
    //             ok: false,
    //             err : {
    //                 message : 'token no válido'
    //             }
    //         });
    //     }

    //     if (decoded.email == 'mauro_sche@hotmail.com') {
    //         req.usuario = decoded.usuario;
    //         next();
    //     }
    //     else{
    //         return res.status(401).json({
    //             ok: false,
    //             err : {
    //                 message : 'No sos admin.'
    //             }
    //         });
    //     }

    // });

    next();//BORRAR
};

module.exports = {
    verificarToken,
    verificarTokenAdmin
};