const {response, request } = require('express');
const Comentario = require('../models/comentario');
const Usuario = require('../models/usuario');
const Heroe = require('../models/heroe');

// Comentarios Get.
const comentariosGet = async (req = request, res = response) => {
    try {
        const data = await Comentario.findAll({attributes: ['id', 'heroeId', 'usuarioId', 'descripcion']});
        res.json(data);
    } catch (error) {
       console.log(error);
       res.status(500).json({error: 'Ha ocurrido un error al ejecutar la consulta.'}); 
    };
};

// Comentarios Get por Id.
const comentariosById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const unComentario = await Comentario.findByPk(id, { include: ['heroe', 'usuario'] });
        if (!unComentario) {
            return res.status(404).json({error: `No se encontró un comentario con ID ${id}.`});
        };
        res.json(unComentario);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Ha ocurrido un error al ejecutar la consulta.'});
    };
};

// Comentarios por Héroe.
const comentariosHeroes = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const unHeroe = await Heroe.findByPk(id);
        if (!unHeroe) {
            return res.status(404).json({error: `No se encontró un héroe con ID ${id}.`});
        };
        const data = await Comentario.findAll({ 
            where: {heroeId: id}, 
            order:[ ['id','DESC'] ],
            include: {model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'url_foto']},
        });
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Ha ocurrido un error al ejecutar la consulta.'});
    };
};

// Comentarios Post.
const comentariosPost = async (req = request, res = response) => {
    try {
        const unUsuario = await Usuario.findByPk(req.body.usuarioId);
        const unHeroe = await Heroe.findByPk(req.body.heroeId);
        if (!unUsuario) {
            const mensaje = (req.body.usuarioId) ? `No se encontró un usuario con ID ${req.body.usuarioId}.` : 'No se ha enviado el id del usuario.'
            return res.status(404).json({error: mensaje});
        };
        if (!unHeroe) {
            const mensaje = (req.body.heroeId) ? `No se encontró un héroe con ID ${req.body.heroeId}.` : 'No se ha enviado el id del héroe.'
            return res.status(404).json({error: mensaje});
        };
        const unComentario = Comentario.build(req.body);
        await unComentario.validate();
        const unComentarioValidado = await Comentario.create(req.body);
        res.json( {id:unComentarioValidado.id} );
    } catch (error) {
        console.log(error);
        res.status(409).json({ errores: error.errors.map( (err) => err.message )});
    };
};

// Comentarios Patch.
const comentariosPatch = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const unUsuario = await Usuario.findByPk(req.body.usuarioId);
        const unHeroe = await Heroe.findByPk(req.body.heroeId);
        const unComentario = await Comentario.findOne({ where: { id: id }, include: 'usuario' });
        const usuarioAuth = req.usuarioAuth;
        if (!unUsuario) {
            const mensaje = (req.body.usuarioId) ? `No se encontró un usuario con ID ${req.body.usuarioId}.` : 'No se ha enviado el id del usuario.'
            return res.status(404).json({error: mensaje});
        };
        if (!unHeroe) {
            const mensaje = (req.body.heroeId) ? `No se encontró un héroe con ID ${req.body.heroeId}.` : 'No se ha enviado el id del héroe.'
            return res.status(404).json({error: mensaje});
        };
        if (!unComentario) {
            return res.status(404).json({error: `No se encontró un comentario con ID ${id}.`});
        };
        if( usuarioAuth.admin || usuarioAuth.id == unComentario.usuario.id ) {
            const comentario = Comentario.build(req.body);
            await comentario.validate();
            await Comentario.update({descripcion: req.body.descripcion}, { where: {id: id} });
            res.json({ id: id });
        } else {
            res.status(401).json( {error: 'Se requiere el envío de un token propio'} );
        };
    } catch (error) {
        console.log(error);
        res.status(409).json({ errores: error.errors.map( (err) => err.message )});
    };
};

// Comentarios delete.
const comentariosDelete = async (req = request, res = response) => {
    const { id } = req.params;
    const usuarioAuth = req.usuarioAuth;
    try {
        const unComentario = await Comentario.findOne({ where: { id: id }, include: 'usuario' });
        if (!unComentario) {
            return res.status(404).json({error: `No se encontró un comentario con ID ${id}.`});
        };
        if( usuarioAuth.admin || usuarioAuth.id == unComentario.usuario.id ) {
            await unComentario.destroy();
            res.json('ok');
        } else {
            res.status(401).json( {error: 'Se requiere el envío de un token propio'} );
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error en el servidor. Consulte con el administrador'});
    };
};

module.exports = {
  comentariosGet,
  comentariosById,
  comentariosHeroes,
  comentariosPost,
  comentariosPatch,
  comentariosDelete,
};