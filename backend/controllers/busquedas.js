const {response, request } = require('express');
const { Op } = require("sequelize");
const  Heroe = require('../models/heroe');
const Usuario = require('../models/usuario');

const heroesBusquedas = async (req = request, res = response) => {
    const { termino } = req.query;
    let { limite } = req.query;
    limite = Number(limite);
    try {
        const data = await Heroe.findAll({ 
            where: { 
                [Op.or]: [
                    { superhero: { [Op.like]: `%${termino}%` } },
                    { alter_ego: { [Op.like]: `%${termino}%` } },
                    { characters: { [Op.like]: `%${termino}%` } },
                    { habilities: { [Op.like]: `%${termino}%` } },
                ]
            }, 
            limit: limite,
            include: { model: Usuario, as: 'usuario', attributes: ['id'] }
        });
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error en el servidor. Consulte con el administrador'});
    };
};

module.exports = {
    heroesBusquedas,
};