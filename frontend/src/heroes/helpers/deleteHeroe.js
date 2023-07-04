import axios from 'axios';

export const deleteHeroe = async ( id ) => {
    let response =  await axios.delete(`http://localhost:3001/heroes/${id}`);
    return response.data;
};