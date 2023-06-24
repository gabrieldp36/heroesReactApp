const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/config/config.js')
const bcrypt = require('bcrypt')
const Heroe = require('./heroe');

const Usuario = sequelize.define('usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El campo nombre es obligatorio' },
      notEmpty: { msg: 'El campo nombre no puede estar vacío' },
    },
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'El correo ya está registrado en la base de datos' },
    validate: {
      notNull: { msg: 'El campo correo es obligatorio' },
      notEmpty: { msg: 'El campo correo no puede estar vacío' },
      isEmail: { msg: 'ingrese un correo válido' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El campo password es obligatorio' },
      notEmpty: { msg: 'El campo password no puede estar vacío' },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        msg: 'La contraseña debe contener mínimo 8 caractéres, al menos una letra mayúscula, una letra minúscula y un número'
      },
    },
  },
  url_foto: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    validate: {}
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
},
{
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  hooks: {
    beforeCreate: (unUsuario) => {
      unUsuario.password = bcrypt.hashSync(unUsuario.password, 10);
    },
    beforeUpdate: function (unUsuario) {
      if(unUsuario.password) {
        unUsuario.password = bcrypt.hashSync(unUsuario.password, 10);
      }
    },
    beforeBulkCreate: (usuarios) => {
      usuarios.forEach((unUsuario) => unUsuario.password = bcrypt.hashSync(unUsuario.password, 10));
    },
  },
});

Usuario.prototype.verificar = function (password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
};

// Relaciones.
Usuario.hasMany(Heroe, {foreignKey: {name:'usuarioId', allowNull: false}, as: 'heroes', onDelete: 'CASCADE'});
Heroe.belongsTo(Usuario, {foreignKey: {name:'usuarioId', allowNull: false}, as: 'usuario', onDelete: 'CASCADE'});

module.exports = Usuario