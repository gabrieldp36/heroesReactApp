const { Sequelize, DataTypes } = require('sequelize');

/*****************************************Configuración Sequelize******************************************/

const sequelize = new Sequelize({
    storage: './db/db_heroes_react.db',
    dialect: 'sqlite',
    define: {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
        },
    },
});

/******************************************Poulado de la base de datos******************************************/

const popular = async (Usuario, Heroe, Comentario) => {
  const countUsuarios = await Usuario.count();
  const countHeroes = await Heroe.count();
  const countComentarios = await Comentario.count();
  if(countUsuarios == 0 && countHeroes == 0 && countComentarios == 0) {
    const usuarios = [
      {
        nombre: 'Spike Spiegel',
        correo: 'admin@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://imgix.ranker.com/user_node_img/50088/1001742623/original/whatever-happens-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=650',
        admin: true,
        estado: true
      },
      {
        nombre: 'Hitokiri Battousai',
        correo: 'admin2@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://somoskudasai.com/wp-content/uploads/2022/12/portada_rurouni-kenshin-6.jpg',
        admin: true,
        estado: true
      },
      {
        nombre: 'Rogelio Pérez',
        correo: 'rogelio@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Paula Pratt',
        correo: 'pau@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Manuel Rodríguez',
        correo: 'manu@gmail.com',
        password: 'A56456a9',
        url_foto: '',
        admin: false,
        estado: true
      },
      {
        nombre: 'Carolina Gómez',
        correo: 'caro@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=489&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Valentina Taboada',
        correo: 'valen@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Martín Palermo',
        correo: 'martin@gmail.com',
        password: 'A56456a9',
        url_foto: '',
        admin: false,
        estado: true
      },
      {
        nombre: 'Tomás Canaletti',
        correo: 'tomas@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Paulo Juez',
        correo: 'paulo@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Lionel Ricardo',
        correo: 'lionel@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Martina Alonzo',
        correo: 'martu@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1554423443-d9b73c9b7ced?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=518&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Delfina Sanz',
        correo: 'delfi@gmail.com',
        password: 'A56456a9',
        url_foto: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        admin: false,
        estado: true
      },
      {
        nombre: 'Pia Marín',
        correo: 'pia@gmail.com',
        password: 'A56456a9',
        url_foto: '',
        admin: false,
        estado: true
      }
    ];
    const heroes =[
        {
          superhero: 'Batman',
          publisher: 'DC Comics',
          alter_ego: 'Bruce Wayne',
          first_appearance: 'Detective Comics #27',
          characters: 'Bruce Wayne',
          habilities: 'Detective, intelecto nivel genio, brillante estratega y acróbata experto, dominio de artes marciales y técnicas de sigilo e intimidación, escapismo, uso de equipamiento, dispositivos y armamento de alta tecnología',
          alt_img: '',
          assets_img: 1,
          usuarioId: 1
        },
        {
          superhero: 'Superman',
          publisher: 'DC Comics',
          alter_ego: 'Kal-El',
          first_appearance: 'Action Comics #1',
          characters: 'Kal-El',
          habilities: 'Súper fuerza, velocidad, resistencia, agilidad, reflejos, durabilidad, sentidos y longevidad, poderes oculares, agudeza sobrehumana, visión de calor, visión del espectro, electromagnético, visión microscópica, visión de rayos x, visión telescópica, visión infrarroja, aliento sobrehumano, aliento helado, aliento de viento, invulnerabilidad, factor de curación rápida y vuelo',
          alt_img: '',
          assets_img: 1,
          usuarioId: 1
        },
        {
          superhero: 'Flash',
          publisher: 'DC Comics',
          alter_ego: 'Jay Garrick',
          first_appearance: 'Flash Comics #1',
          characters: 'Jay Garrick, Barry Allen, Wally West, Bart Allen',
          habilities: 'Sus poderes se basan en la Súper-velocidad, los cuales obtiene de la “Fuerza de velocidad”. Entre ellos se destacan: capacidad de correr más rápido que la luz, reflejos sobrehumanos, factor curativo que le otorga regeneración casi instantánea, puede traspasar materia, crear remanentes del tiempo con su gran velocidad, lanzar energía con sus manos y viajar en el tiempo con su super-velocidad',
          alt_img: '',
          assets_img: 1,
          usuarioId: 1
        },
        {
          superhero: 'Green Lantern',
          publisher: 'DC Comics',
          alter_ego: 'Alan Scott',
          first_appearance: 'All-American Comics #16',
          characters: 'Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz',
          habilities: 'Gracias al anillo de poder que posee, tiene la capacidad de crear manifestaciones de luz sólida mediante la utilización del pensamiento',
          alt_img: '',
          assets_img: 1,
          usuarioId: 1
        },
        {
          superhero: 'Wonder Woman',
          publisher: 'DC Comics',
          alter_ego: 'Princess Diana',
          first_appearance: 'All Star Comics #8',
          characters: 'Princess Diana',
          habilities: 'Súper vuelo, súper fuerza, súper velocidad, inmortalidad, factor de curación, reflejos, resistencia, habilidad de lucha altamente desarrollada, capacidad de hablar con los animales y en el idioma de cualquier persona que se encuentre',
          alt_img: '',
          assets_img: 1,
          usuarioId: 1
        },
        {
          superhero: 'Green Arrow',
          publisher: 'DC Comics',
          alter_ego: 'Oliver Queen',
          first_appearance: 'More Fun Comics #73',
          characters: 'Oliver Queen',
          habilities: 'Posee una gran habilidad como arquero y tiene un amplio arsenal de flechas. Es experto en las artes marciales, habilidades ninjas y la espada. Excelente rastreador, manejo de armas y piloto aviador. Amplios recursos financieros. Inmejorable estratega',
          alt_img: '',
          assets_img: 1,
          usuarioId: 1
        },
        {
          superhero: 'Martian Manhunter',
          publisher: 'DC Comics',
          alter_ego: 'J\'onn J\'onzz',
          first_appearance: 'Detective Comics #225',
          characters: 'Martian Manhunter',
          habilities: 'Súper fuerza, velocidad sobrehumana, telepatía, telekinesis, regeneración acelerada, intangibilidad, invisibilidad, cambio de forma, capacidad de volar, visión láser y nueve sentidos aumentados',
          alt_img: '',
          assets_img: 1,
          usuarioId: 1
        },
        {
          superhero: 'Robin/Nightwing',
          publisher: 'DC Comics',
          alter_ego: 'Dick Grayson',
          first_appearance: 'Detective Comics #38',
          characters: 'Dick Grayson',
          habilities: 'Artista marcial experto, estrategias de combate, tecnología avanzada y habilidad gimnástica',
          alt_img: '',
          assets_img: 1,
          usuarioId: 3
        },
        {
          superhero: 'Blue Beetle',
          publisher: 'DC Comics',
          alter_ego: 'Dan Garret',
          first_appearance: 'Mystery Men Comics #1',
          characters: 'Dan Garret, Ted Kord, Jaime Reyes',
          habilities: 'Su armadura alienígena le concede la capacidad de volar, resistencia y durabilidad mejoradas, creación de armas y traducción de idiomas alienígenas',
          alt_img: '',
          assets_img: 1,
          usuarioId: 3
        },
        {
          superhero: 'Black Canary',
          publisher: 'DC Comics',
          alter_ego: 'Dinah Drake',
          first_appearance: 'Flash Comics #86',
          characters: 'Dinah Drake, Dinah Lance',
          habilities: 'Experta en artes marciales, grito ultrasónico, tenaz aviadora y motociclista, gran estratega, reflejos, resistencia y agilidad sobrehumanos',
          alt_img: '',
          assets_img: 1,
          usuarioId: 3
        },
        {
          superhero: 'Spider Man',
          publisher: 'Marvel Comics',
          alter_ego: 'Peter Benjamin Parker',
          first_appearance: 'Amazing Fantasy #15',
          characters: 'Peter Benjamin Parker',
          habilities: 'Intelecto nivel genio, competente científico e inventor, fuerza, velocidad, agilidad, sentidos, reflejos, coordinación, equilibrio y resistencia sobrehumanos, sentido arácnido, se aferra a la mayoría de las superficies sólidas, utiliza muñequeras para disparar telarañas',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Captain America',
          publisher: 'Marvel Comics',
          alter_ego: 'Steve Rogers',
          first_appearance: 'Captain America Comics #1',
          characters: 'Steve Rogers',
          habilities: 'Sentidos, agilidad, velocidad y fuerza sobrehumanas, gran habilidad con su escudo, instinto de liderazgo, gran resistencia, inmune a gases y enfermedades, curación y regeneración acelerada, genio táctico, artista marcial, acróbata experto',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Iron Man',
          publisher: 'Marvel Comics',
          alter_ego: 'Tony Stark',
          first_appearance: 'Tales of Suspense #39',
          characters: 'Tony Stark',
          habilities: 'Cómo Tony Stark: intelecto nivel genio, experto científico e ingeniero. Cómo Iron Man: fuerza sobrehumana y durabilidad, vuelo supersónico, repulsor de energía y misiles de proyección, regenerativo soporte vital, uso de equipamiento, dispositivos y armamento de alta tecnología',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Thor',
          publisher: 'Marvel Comics',
          alter_ego: 'Thor Odinson',
          first_appearance: 'Journey into Mystery #83',
          characters: 'Thor Odinson',
          habilities: 'Fuerza sobrehumana, velocidad, durabilidad y longevidad. Habilidades a través de Mjolnir: teletransportación interdimensional, manipulación eléctrica, vuelo y manipulación del tiempo',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Hulk',
          publisher: 'Marvel Comics',
          alter_ego: 'Bruce Banner',
          first_appearance: 'The Incredible Hulk #1',
          characters: 'Bruce Banner',
          habilities: 'Súper fuerza, velocidad, resistencia y salto, invulnerabilidad, longevidad, factor de curación rápida, capacidad de respirar bajo el agua, respirar en el espacio y ver fantasmas y otras entidades astrales. Todas sus habilidades aumentan en relación a su furia y emociones negativas tales como la ira, el miedo, e incluso los celos',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Wolverine',
          publisher: 'Marvel Comics',
          alter_ego: 'James Logan',
          first_appearance: 'The Incredible Hulk #180',
          characters: 'James Logan',
          habilities: 'Factor de curación mutante, regeneración intensificada, resistencia a poderes psíquicos, garras retráctiles, esqueleto recubierto de adamantium, sentidos animales, capacidad física sobrehumana',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Daredevil',
          publisher: 'Marvel Comics',
          alter_ego: 'Matthew Michael Murdock',
          first_appearance: 'Daredevil #1',
          characters: 'Matthew Michael Murdock',
          habilities: 'Ecolocalización, acróbata experto y maestro en artes marciales, tirador de precisión perfecta carencia del sentido del miedo',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Hawkeye',
          publisher: 'Marvel Comics',
          alter_ego: 'Clinton Francis Barton',
          first_appearance: 'Tales of Suspense #57',
          characters: 'Clinton Francis Barton',
          habilities: 'Arquero excepcional, con una puntería perfecta, excelente percepción y reflejos extraordinarios. Acróbata experto. Buen combatiente cuerpo a cuerpo. Arcos fabricados por industrias Stark, uno corto, otro largo y otro compuesto. Flechas multiusos',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Cyclops',
          publisher: 'Marvel Comics',
          alter_ego: 'Scott Summers',
          first_appearance: 'X-Men #1',
          characters: 'Scott Summers',
          habilities: 'Rayos ópticos contusivos de energía solar, maestro táctico, artista marcial experto, excelente combatiente cuerpo a cuerpo e inmunidad a los poderes de sus hermanos',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
        {
          superhero: 'Silver Surfer',
          publisher: 'Marvel Comics',
          alter_ego: 'Norrin Radd',
          first_appearance: 'The Fantastic Four #48',
          characters: 'Norrin Radd',
          habilities: 'Puede volar también sin su tabla, agilidad, fuerza y reflejos sobrehumanos, piel plateada casi impenetrable, absorbe energía cósmica de gran potencia,  tiene la capacidad rastrear pequeños objetos perdidos en el espacio, puede transformar la materia en energía cósmica y viceversa, crear armas o utensilios, curar heridas, ver el pasado, regenerarse, posee manipulación molecular y transportación interdimensional',
          alt_img: '',
          assets_img: 1,
          usuarioId: 2
        },
    ];
    const comentarios = [
      {
        usuarioId: 6,
        heroeId: 1,
        descripcion: 'The GOAT...'
      },
      {
        usuarioId: 7,
        heroeId: 1,
        descripcion: 'Nuestra mayor gloria no consiste en no caer nunca... sino en caer y levantarnos constantemente'
      },
      {
        usuarioId: 8,
        heroeId: 1,
        descripcion: 'Smoke Machine!'
      },
      {
        usuarioId: 9,
        heroeId: 1,
        descripcion: 'Muy buen héroe, buen aporte.'
      },
      {
        usuarioId: 10,
        heroeId: 1,
        descripcion: 'No te la bancas batman...'
      },
      {
        usuarioId: 4,
        heroeId: 1,
        descripcion: 'No naciste para morir siendo igual que los demás...'
      },
      {
        usuarioId: 5,
        heroeId: 1,
        descripcion: 'El más flojito... Wolverine se lo morfa...'
      },
      {
        usuarioId: 3,
        heroeId: 1,
        descripcion: 'El batman de crónica... El mejor de todo los tiempos!!'
      },
      {
        usuarioId: 1,
        heroeId: 1,
        descripcion: 'Batman el auténtico caballero de la noche!!'
      },
      {
        usuarioId: 2,
        heroeId: 1,
        descripcion: '¿Qué le regaló batman a su mamá en su cumpleaños? Una Bati-Dora...'
      },
      {
        usuarioId: 1,
        heroeId: 2,
        descripcion: 'Superman el más groso!!'
      },
      {
        usuarioId: 8,
        heroeId: 2,
        descripcion: 'Kryptonita...'
      },
      {
        usuarioId: 4,
        heroeId: 2,
        descripcion: 'Todo gran poder conlleva una gran responsabilidad'
      },
      {
        usuarioId: 2,
        heroeId: 2,
        descripcion: 'Lo peor de ser fuerte es que nadie te pregunta si estás bien... Crack'
      }
    ];    
    await Usuario.bulkCreate(usuarios, { validate: false });
    await Heroe.bulkCreate(heroes, { validate: true });
    await Comentario.bulkCreate(comentarios, { validate: true });
  };
};

module.exports = {
    sequelize,
    DataTypes,
    popular
};