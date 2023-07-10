import axios from 'axios';

export const getHeroById = async ( id ) => {
    let response =  await axios.get(`http://localhost:3001/heroes/${id}`);
    return response.data;
};