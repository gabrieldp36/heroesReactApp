import axios from 'axios';

export const deleteUsuarios = async (id) =>{ 
    let response =  await axios.delete(`http://localhost:3001/usuarios/${id}`);
    return response.data;
};