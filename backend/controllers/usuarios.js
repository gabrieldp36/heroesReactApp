const {response, request } = require('express');
const  Usuario = require('../models/usuario');

// Usuario Get.
 const usuariosGet = async (req = request, res = response) => {
    const usuarioAuth = req.usuarioAuth;
    try {
        if(usuarioAuth.admin) {
            const data = await Usuario.findAll();
            res.json(data);
        } else {
            res.status(401).json( {msg: 'Sólo un administrador puede utilizar este servicio'} );
        };
    } catch (error) {
       console.log(error);
       res.status(500).json({error: 'Ha ocurrido un error al ejecutar la consulta.'}); 
    };
};

// Usuario Get por Id.
const usuariosById = async (req = request, res = response) => {
    const { id } = req.params;
    const usuarioAuth = req.usuarioAuth;
    try {
        const unUsuario = await Usuario.findByPk(id);
        if (!unUsuario) {
            res.status(404).json({error: `No se encontró un usuario con ID ${id}.`});
        } else {
            if( usuarioAuth.admin || usuarioAuth.id == id) {
                res.json(unUsuario);
            } else {
                res.status(401).json( {msg: 'Se requiere el envío de un token propio'} );
            };
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Ha ocurrido un error al ejecutar la consulta.'});
    };
};

// Usuarios post.
const usuariosPost = async (req = request, res = response) => {
    try {
        const unUsuario = Usuario.build(req.body);
        await unUsuario.validate();
        const unUsuarioValidado = await Usuario.create(req.body, { individualHooks: true } );
        res.json({id:unUsuarioValidado.id});
    } catch (error) {
        console.log(error);
        res.status(409).json({ errores: error.errors.map( (err) => err.message )});
    };
};

// Usuarios patch.
const usuariosPatch = async (req = request, res = response) => {
    const { id } = req.params;
    const { password } = req.body;
    const usuarioAuth = req.usuarioAuth;
    try {
        const unUsuario = await Usuario.findByPk(id);
        if (!unUsuario) {
            res.status(404).json({error: `No se encontró un usuario con ID ${id}.`});
        } else {
            if( usuarioAuth.admin || usuarioAuth.id == id) {
                if(!password) {
                    const unUsuario = Usuario.build(req.body);
                    await unUsuario.validate({skip:['password']});
                } else {
                    const unUsuario = Usuario.build(req.body);
                    await unUsuario.validate();
                };
                await Usuario.update(req.body, { where: { id }, individualHooks: true } );
                res.json({ id: id });
            }  else {
                res.status(401).json( {msg: 'Se requiere el envío de un token propio'} );
            };
        };
    } catch (error) {
        console.log(error);
        res.status(409).json({ errores: error.errors.map( (err) => err.message )});
    };
};

// Usuarios delete.
const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;
    const usuarioAuth = req.usuarioAuth;
    try {
        const unUsuario = await Usuario.findOne({ where: { id } });
        if (!unUsuario) {
            return res.status(404).json({error: `No se encontró un usuario con ID ${id}.`});
        };
        if( usuarioAuth.admin || usuarioAuth.id == id ) {
            await Usuario.update({ estado:false }, { where: { id } } );
            res.json('ok');
        } else {
            res.status(401).json( {msg: 'Se requiere el envío de un token propio'} );
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error en el servidor. Consulte con el administrador'});
    };
};

// Reactivar usuarios.
const usuariosReactivar = async (req = request, res = response) => {
    const { id } = req.params;
    const usuarioAuth = req.usuarioAuth;
    try {
        const unUsuario = await Usuario.findOne({ where: { id } });
        if (!unUsuario) {
            return res.status(404).json({error: `No se encontró un usuario con ID ${id}.`});
        };
        if( usuarioAuth.admin ) {
            await Usuario.update({ estado:true }, { where: { id } });
            res.json('ok');
        } else {
            res.status(401).json( {msg: 'Sólo un administrador puede utilizar este servicio'} );
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error en el servidor. Consulte con el administrador'});
    };
};

module.exports = {
    usuariosGet,
    usuariosById,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
    usuariosReactivar
};