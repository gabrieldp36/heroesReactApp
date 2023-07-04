import axios from 'axios';

export const getHeroesByPublisher = ( publisher, user ) =>{

    let heroes = [];

    const listarHeroes = async () => {
        let response =  await axios.get('http://localhost:3001/heroes');
        heroes = response.data;
        return (publisher) 
        ? heroes.filter( heroe => heroe.publisher === publisher ) 
        : heroes.filter( heroe => heroe.usuario.id === user.id )
    };

    return listarHeroes();
};


