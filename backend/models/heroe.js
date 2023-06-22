const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/config/config.js')

const Heroe = sequelize.define('heroes', {
    superhero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Existe un héroe registrado en la base de datos con el mismo nombre' },
      validate: {
        notNull: { msg: 'El campo superhero es obligatorio' },
        notEmpty: { msg: 'El campo superhero es obligatorio' },
      },
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'El campo publisher es obligatorio' },
          notEmpty: { msg: 'El campo publisher es obligatorio' },
        },
    },
    alter_ego: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'El campo alter_ego es obligatorio' },
          notEmpty: { msg: 'El campo alter_ego es obligatorio' },
        },
    },
    first_appearance: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
        validate: {},
    },
    characters: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
        validate: {},
    },
    habilities: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'El campo habilities es obligatorio' },
          notEmpty: { msg: 'El campo habilities es obligatorio' },
        },
    },
    alt_img: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
        validate: {},
    },
    assets_img: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

module.exports = Heroe;