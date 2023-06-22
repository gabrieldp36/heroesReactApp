const { Cursada } = require('../models/cursada');
const { Alumno } = require('../models/alumno');
// Relacionamos a los modelos alumno y cursada. 
// Un alumno puede tener varias cursadas.
Alumno.hasMany(Cursada, {foreignKey: 'alumnoId', as: 'cursadas'});
// Una cursada pertenece a un alumno en particular.
Cursada.belongsTo(Alumno, {foreignKey: 'alumnoId', as: 'alumno'});