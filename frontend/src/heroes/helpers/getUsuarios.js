import axios from 'axios';

export const getUsuarios = async () =>{ 
    let response =  await axios.get(`http://localhost:3001/usuarios`);
    return response.data;
};