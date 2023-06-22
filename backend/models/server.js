const express = require('express');
const cors = require('cors');
const { sequelize, popular } = require('../db/config/config');
const Usuario  = require('../models/usuario');
const Heroe = require('../models/heroe');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/auth',
            usuarios: '/usuarios',
            heroes: '/heroes'
        };
        // Conección a la base de datos.
        this.conectarDB();
        // Middlewares.
        this.middlewares();
        // Rutas de mi aplicación.
        this.routes();
        // Listen.
        this.listen();
    };

    conectarDB() {
        sequelize.sync().then( async () => {
            await popular(Usuario, Heroe);
            console.log('Base de datos online.');
        }).catch((error) => {
            console.log('Error al sincronizar la base de datos:', error);
        });
    };

    middlewares() {
        // Cors.
        this.app.use( cors() );
        // Lectura y parseo del body.
        this.app.use( express.json() );
        // Directorio público.
        this.app.use( express.static ('public') );
    };

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.usuarios, require('../routes/usuarios') );
        this.app.use( this.paths.heroes, require('../routes/heroes') );
        this.app.get('/', (req, res) => {
            res.sendFile('../public/index.html');
        });
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}.`);
        });
    };
};

module.exports = Server;