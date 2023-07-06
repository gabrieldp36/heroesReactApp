const jwt = require('jsonwebtoken');

const generacionJWT = (id, nombre, correo, admin, estado) => {
    return new Promise( (resolve, reject) => { 
        const payload = {id, nombre, correo, admin, estado};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '3h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token.');
            } else {
                resolve(token);
            };
        });
    });
};

module.exports = {
    generacionJWT,
};