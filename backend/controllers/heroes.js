const {response, request } = require('express');
const  Heroe = require('../models/heroe');

// Heroes Get.
const heroesGet = async (req = request, res = response) => {
    try {
        const data = await Heroe.findAll();
        res.json(data);
    } catch (error) {
       console.log(error);
       res.status(500).json({error: 'Ha ocurrido un error al ejecutar la consulta.'}); 
    };
};

// Heroes Get por Id.
const heroesById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const unHeroe = await Heroe.findByPk(id, { include: 'usuario', });
        if (!unHeroe) {
            return res.status(404).json({error: `No se encontró un héroe con ID ${id}.`});
        } 
        res.json(unHeroe);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Ha ocurrido un error al ejecutar la consulta.'});
    };
};

// Heroes Post.
const heroesPost = async (req = request, res = response) => {
    try {
        const unHeroe = Heroe.build(req.body);
        await unHeroe.validate();
        const unHeroeValidado = await Heroe.create(req.body);
        res.json({id:unHeroeValidado.id});
    } catch (error) {
        console.log(error);
        res.status(409).json({ errores: error.errors.map( (err) => err.message )});
    };
};

// Heroes patch.
const heroesPatch = async (req = request, res = response) => {
    const { id } = req.params;
    delete req.body.usuarioId;
    const usuarioAuth = req.usuarioAuth;
    try {
        const unHeroe = await Heroe.findByPk(id, {include: 'usuario' });
        if (!unHeroe) {
            res.status(404).json({error: `No se encontró un héroe con ID ${id}.`});
        } else {
            if( usuarioAuth.admin || usuarioAuth.id == unHeroe.usuario.id ) {
                const unHeroe = Heroe.build(req.body);
                await unHeroe.validate({skip:'usuarioId'});
                await Heroe.update(req.body, { where: { id } } );
                res.json({ id: id });
            } else {
                res.status(401).json( {error: 'Se requiere el envío de un token propio'} );
            };
        };
    } catch (error) {
        console.log(error);
        res.status(409).json({ errores: error.errors.map( (err) => err.message )});
    };
};

// Héroes delete.
const heroesDelete = async (req = request, res = response) => {
    const { id } = req.params;
    const usuarioAuth = req.usuarioAuth;
    try {
        const unHeroe = await Heroe.findOne({ where: { id }, include: 'usuario' });
        if (!unHeroe) {
            return res.status(404).json({error: `No se encontró un usuario con ID ${id}.`});
        };
        if( usuarioAuth.admin || usuarioAuth.id == unHeroe.usuario.id ) {
            await unHeroe.destroy();
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
    heroesGet,
    heroesById,
    heroesPost,
    heroesPatch,
    heroesDelete
};