const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            error: 'No se ha enviado un token en la petición.'
        });
    };
    try {
        // Validamos el token.
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Verificamos que el usuario exista y esté activo. En caso afirmativo, recuperamos su info.
        const unUsuario = await Usuario.findByPk(id);
        if (!unUsuario) {
            return res.status(401).json({error: `Token inválido.`});
        };
        if(!unUsuario.estado) {
            return res.status(401).json({error: `Token inválido.`});
        };
        req.usuarioAuth = unUsuario.dataValues;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Token inválido.'
        });
    };
};

module.exports = {
    validarJWT,
};