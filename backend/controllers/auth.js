const {response, request } = require('express');
const { generacionJWT } = require('../helpers/gerenacion-jwt');
const Usuario = require('../models/usuario');

const loguearUsuario = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        const unUsuario = await Usuario.findOne( { 
            attributes: ['id', 'nombre', 'correo', 'password', 'admin', 'estado'],
            where: { 
                correo: correo || '', 
            },
        });
        if ( unUsuario && unUsuario.verificar(password, unUsuario.password) ) {
            const token = await generacionJWT(unUsuario.id, unUsuario.nombre, unUsuario.correo, unUsuario.admin, unUsuario.estado);
            res.json({ token }); 
        } else {
            res.status(404).json({error: `Email y/o password incorrectos.`});
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error en el servidor. Consulte al administrador.'});
    };
};

module.exports = {
    loguearUsuario,
};