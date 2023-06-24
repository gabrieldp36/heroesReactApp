const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/config/config.js');
const Usuario = require('./usuario');
const Heroe = require('./heroe');

const Comentario = sequelize.define('comentatios', { 
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'El campo descripcion es obligatorio' },
          notEmpty: { msg: 'El campo descripcion no puede estar vacío' },
        },
    },
},
{
    defaultScope: {
        attributes: { exclude: ['heroeId', 'usuarioId'] },
    },
});

Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId', targetKey: 'id', as: 'usuario', onDelete: 'CASCADE'});
Comentario.belongsTo(Heroe, { foreignKey: 'heroeId', targetKey: 'id', as: 'heroe', onDelete: 'CASCADE'});

module.exports = Comentario;