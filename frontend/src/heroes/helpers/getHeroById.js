import axios from 'axios';

export const getHeroById = ( id ) => {

    const obtenerHeroe = async () => {
        let response =  await axios.get(`http://localhost:3001/heroes/${id}`);
        return response.data;
    };
    return obtenerHeroe();
};