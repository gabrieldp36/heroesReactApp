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

const popular = async (Usuario, Heroe) => {
    const countUsuarios = await Usuario.count();
    const countHeroes = await Heroe.count();
    if(countUsuarios == 0 && countHeroes == 0) {
        const usuarios = [
            { nombre: 'Spike Spiegel', correo: 'admin@gmail.com', password: '12345678', url_foto:'https://imgix.ranker.com/user_node_img/50088/1001742623/original/whatever-happens-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=650', admin: true },
            { nombre: 'Paula Pérez', correo: 'pau@gmail.com', password: '12345678', url_foto:'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
            { nombre: 'Florencia Pratt', correo: 'flor@gmail.com', password: '12345678', url_foto:'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=489&q=80' },
            { nombre: 'Carolina Peralta', correo: 'caro@gmail.com', password: '12345678', url_foto:'https://images.unsplash.com/photo-1554423443-d9b73c9b7ced?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=518&q=80' },
            { nombre: 'Pedro Taboada', correo: 'valen@gmail.com', password: '12345678', url_foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }
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
              superhero: 'John C.',
              publisher: 'DC Comics',
              alter_ego: 'John Constantine',
              first_appearance: 'The Saga of the Swamp Thing #37',
              characters: 'John Constantine',
              habilities: 'Gran hechicero, conocimiento de lo oculto, manipulación y astucia. Proyección astral, predicción, control sobre demonios, piromancia, invisibilidad, desplazamiento temporal y dimensional',
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
              usuarioId: 1
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
              usuarioId: 1
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
              usuarioId: 1
            },
            {
              superhero: 'Aquaman',
              publisher: 'DC Comics',
              alter_ego: 'Arthur Curry',
              first_appearance: 'More Fun Comics #73',
              characters: 'Arthur Curry',
              habilities: 'Adaptación acuática-anfibia, telepatía, dominación psiónica de la vida marina, factor de curación, sentidos mejorados. Fuerza, agilidad, destreza, velocidad, resistencia y durabilidad sobrehumanas. Portador del tridente de Poseidón. Camuflaje submarino, creación y lanzamiento de rayos de agua dura',
              alt_img: '',
              assets_img: 1,
              usuarioId: 1
            },
            {
              superhero: 'Cyborg',
              publisher: 'DC Comics',
              alter_ego: 'Victor Stone',
              first_appearance: 'DC Comics Presents #26',
              characters: 'Victor Stone',
              habilities: 'Intelecto nivel genio, experto en combate cuerpo a cuerpo, fuerza sobrehumana, inmersión en el ciberespacio, tecnopatía, capacidad de volar, sensores y armamento avanzado',
              alt_img: '',
              assets_img: 1,
              usuarioId: 1
            },
            {
              superhero: 'Catwoman',
              publisher: 'DC Comics',
              alter_ego: 'Selina Kyle',
              first_appearance: 'DC Comics Batman #1',
              characters: 'Selina Kyle',
              habilities: 'Gran atleta, experta ladrona, agilidad propia de un gato, excelente combatiendo mano a mano. Utiliza un látigo como arma',
              alt_img: '',
              assets_img: 1,
              usuarioId: 1
            },
            {
              superhero: 'Raven',
              publisher: 'DC Comics',
              alter_ego: 'Rachel Roth',
              first_appearance: 'DC Comics Presents #26',
              characters: 'Rachel Roth',
              habilities: 'Empatía, manipulación emocional, curación empática, telequinesis, teletransportación, vuelo, control de la energía mística y proyección astral',
              alt_img: '',
              assets_img: 1,
              usuarioId: 1
            },
            {
              superhero: 'Etrigan',
              publisher: 'DC Comics',
              alter_ego: 'Jason Blood',
              first_appearance: 'DC Comics The Demon #1',
              characters: 'Jason Blood',
              habilities: 'Atributos físicos y poderes sensoriales sobrehumanos, capacidad de regeneración, poderes mágicos, precognición, telepatía, inmortalidad, puede lanzar llamas de fuego místico y tiene la capacidad de volar',
              alt_img: '',
              assets_img: 1,
              usuarioId: 1
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
            {
              superhero: 'Dr. Strange',
              publisher: 'Marvel Comics',
              alter_ego: 'Stephen Strange',
              first_appearance: 'Strange Tales #110',
              characters: 'Stephen Strange, Stephen Sanders, Vincent Stevens',
              habilities: 'Poderes místicos tales como teletransportación, generación de ilusiones y proyección de energía. Puede invocar las llamas de los Faltine, las bandas carmesíes de Cyttorak y el escudo de los serafin. Tiene la capacidad de practicar el viaje astral, durante el cual es invisible e intangible, y solo puede ser dañado mediante rituales místicos más elaborados, sin embargo su cuerpo es vulnerable por estar en un trance similar a la muerte. En caso de que su cuerpo físico muriese durante dicho viaje, Stephen estaría en forma astral por siempre. Posee una esperanza de vida prolongada por el Ankh de la Vida y es dueño del Ojo de Agamotto',
              alt_img: '',
              assets_img: 1,
              usuarioId: 2
            },
            {
              superhero: 'Black Widow',
              publisher: 'Marvel Comics',
              alter_ego: 'Natasha Romanoff',
              first_appearance: 'Tales of Suspense #52',
              characters: 'Natasha Romanoff, Natalie Rushman, Laura Matthers, Mary Farrell, Oktober, Yelena Belova',
              habilities: 'Experta táctica, excelente combatiente cuerpo a cuerpo y agente secreta. Envejecimiento lento y sistema inmunológico súper mejorado. Tiradora experta y gran dominio de armas de filo e impacto',
              alt_img: '',
              assets_img: 1,
              usuarioId: 2
            },
            {
              superhero: 'Vision',
              publisher: 'Marvel Comics',
              alter_ego: 'Victor Shade',
              first_appearance: 'Avengers #57',
              characters: 'Victor Shade',
              habilities: 'Habilidades físicas sobrehumanas, inteligencia superior, vuelo, control de densidad, intangibilidad, regeneración, proyección de energía solar, tecnopatía',
              alt_img: '',
              assets_img: 1,
              usuarioId: 2
            },
            {
              superhero: 'Star Lord',
              publisher: 'Marvel Comics',
              alter_ego: 'Peter Jason Quill',
              first_appearance: 'Marvel Spotlight (vol. 2) #6',
              characters: 'Peter Jason Quill',
              habilities: 'Fuerza sobrehumana y vuelo (gracias a su traje). Arma elemental y tirador experto',
              alt_img: '',
              assets_img: 1,
              usuarioId: 2
            },
            {
              superhero: 'Ant Man',
              publisher: 'Marvel Comics',
              alter_ego: 'Scott Lang',
              first_appearance: 'Tales to Astonish #27',
              characters: 'Scott Lang, Hank Pym, Eric O\'Grady',
              habilities: 'Cambios de tamaño desde casi microscópico a ~ 100 pies. Mantiene la fuerza del tamaño normal en estado reducido. Proyección de bioenergía, también conocida como Bio-Sting. Fuerza y agilidad',
              alt_img: '',
              assets_img: 1,
              usuarioId: 2
            },
            {
              superhero: 'Groot',
              publisher: 'Marvel Comics',
              alter_ego: 'Monarca Planeta X',
              first_appearance: 'Tales to Astonish #13',
              characters: 'Monarca Planeta X',
              habilities: 'Succión de madera, resistente al fuego, capacidad de controlar los árboles, factor de curación acelerado y posee nivel intelectual de genio',
              alt_img: 'https://i.pinimg.com/564x/ed/6a/ee/ed6aeeb286bcb02c85cf2ae92fb9be3d.jpg',
              assets_img: 0,
              usuarioId: 3
            },
            {
              superhero: 'Storm',
              publisher: 'Marvel Comics',
              alter_ego: 'Ororo Iqadi Munroe',
              first_appearance: 'Giant Size X-Men #1',
              characters: 'Ororo Iqadi Munroe',
              habilities: 'Capacidad psiónica de controlar todos los aspectos naturales del universo, entre ellos el clima. Puede manipular el viento, crear relámpagos y generar todo tipo de fenómenos climáticos naturales. Además, Storm puede reducir o elevar la temperatura de su ambiente. También puede manipular el viento para elevarse a sí misma y volar a altas velocidades. Es inmune a los efectos del clima, a los relámpagos, al calor extremo y al frío. Entre las manifestaciones más insólitas de su poder se encuentra la fusión de agentes contaminadores tóxicos atmosféricos en la niebla ácida o lluvias tóxicas',
              alt_img: 'https://i.pinimg.com/564x/06/85/48/068548b2fb8b95a3d594473952908d6f.jpg',
              assets_img: 0,
              usuarioId: 3
            },
            {
              superhero: 'Él - Magnus',
              publisher: 'Marvel Comics',
              alter_ego: 'Adam Warlock',
              first_appearance: 'Fantastic Four n.º 66',
              characters: 'Adam Warlock',
              habilities: 'Posee varios poderes y características sobrehumanas derivadas de su estructura genética artificial, como fuerza y resistencia aumentadas, así como la capacidad de transformar energía cósmica con diferentes efectos y usos',
              alt_img: 'https://i.annihil.us/u/prod/marvel/i/mg/4/00/5c9d29256c960/clean.jpg',
              assets_img: 0,
              usuarioId: 3
            }
        ];

        await Usuario.bulkCreate(usuarios, { validate: true });
        await Heroe.bulkCreate(heroes, { validate: true });
    };
};

module.exports = {
    sequelize,
    DataTypes,
    popular
};