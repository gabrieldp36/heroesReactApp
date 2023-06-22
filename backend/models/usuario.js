const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/config/config.js')
const bcrypt = require('bcrypt')

const Usuario = sequelize.define('usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El campo nombre es obligatorio' },
      notEmpty: { msg: 'El campo nombre es obligatorio' },
    },
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'El correo ya está registrado en la base de datos' },
    validate: {
      notNull: { msg: 'El campo correo es obligatorio' },
      notEmpty: { msg: 'El campo correo es obligatorio' },
      isEmail: { msg: 'ingrese un correo válido' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El campo password es obligatorio' },
      notEmpty: { msg: 'El campo password es obligatorio' },
      len: {
        args: [8],
        msg: 'La password debe contener al menos 8 caracteres',
      },
    },
  },
  url_foto: {
    type: DataTypes.STRING,
    allowNull: true,
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

module.exports = Usuario