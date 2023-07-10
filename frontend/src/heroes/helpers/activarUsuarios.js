import axios from 'axios';

export const reactivarUsuarios = async (id) =>{ 
    let response =  await axios.patch(`http://localhost:3001/usuarios/reactivar/${id}`);
    return response.data;
};