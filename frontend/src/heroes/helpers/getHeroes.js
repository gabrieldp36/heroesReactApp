import axios from 'axios';

export const getHeroesByPublisher = async ( publisher, user ) =>{
    let heroes = [];
    let response =  await axios.get('http://localhost:3001/heroes');
    heroes = response.data;
    return (publisher) 
    ? heroes.filter( heroe => heroe.publisher === publisher ) 
    : heroes.filter( heroe => heroe.usuario.id === user.id )
};

export const getHeroesTable = async ( ) =>{
    let response =  await axios.get('http://localhost:3001/heroes');
    return response.data;
};


