const { Sequelize, DataTypes } = require('sequelize');

/*****************************************Configuración Sequelize******************************************/

const sequelize = new Sequelize({
    storage: './db/db_heroes_react.db',
    dialect: 'sqlite',
    define: {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
    },
});

/******************************************Poulado de la base de datos******************************************/

const popular = async (Usuario) => {
    const countUsuarios = await Usuario.count();
    if(countUsuarios == 0) {
        const usuarios = [
            { nombre: 'Spike Spiegel', correo: 'admin@gmail.com', password: '12345678', url_foto:'https://imgix.ranker.com/user_node_img/50088/1001742623/original/whatever-happens-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=650', admin: true },
            { nombre: 'Paula Pérez', correo: 'pau@gmail.com', password: '12345678', url_foto:'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
            { nombre: 'Florencia Pratt', correo: 'flor@gmail.com', password: '12345678', url_foto:'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=489&q=80' },
            { nombre: 'Carolina Peralta', correo: 'caro@gmail.com', password: '12345678', url_foto:'https://images.unsplash.com/photo-1554423443-d9b73c9b7ced?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=518&q=80' },
            { nombre: 'Pedro Taboada', correo: 'valen@gmail.com', password: '12345678', url_foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }
        ];
        await Usuario.bulkCreate(usuarios, { validate: true });
    };
};

module.exports = {
    sequelize,
    DataTypes,
    popular
};