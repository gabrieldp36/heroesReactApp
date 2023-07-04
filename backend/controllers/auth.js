const {response, request } = require('express');
const { generacionJWT } = require('../helpers/gerenacion-jwt');
const Usuario = require('../models/usuario');

const loguearUsuario = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        const unUsuario = await Usuario.findOne( { 
            attributes: ['id', 'nombre', 'correo', 'password', 'url_foto', 'admin', 'estado'],
            where: { 
                correo: correo || '', 
            },
        });
        if( !unUsuario.estado) {
            return res.status(401).json({error: 'Usuario bloqueado o eliminado. Consulte con el administrador.'});
        };
        if ( unUsuario && unUsuario.verificar(password, unUsuario.password) ) {
            const token = await generacionJWT(unUsuario.id, unUsuario.nombre, unUsuario.correo, unUsuario.url_foto, unUsuario.admin, unUsuario.estado);
            const {...usuario} = unUsuario.dataValues;
            delete usuario.password;
            res.json({ usuario, token }); 
        } else {
            res.status(401).json({error: `Email y/o password incorrectos.`});
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error en el servidor. Consulte al administrador.'});
    };
};

const verificarToken = (req = request, res = response) => {
    const {...usuario} = req.usuarioAuth;
    delete usuario.password;
    res.json(usuario); 
};

module.exports = {
    loguearUsuario,
    verificarToken,
};