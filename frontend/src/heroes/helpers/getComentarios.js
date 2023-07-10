import axios from 'axios';

export const getComentariosTable = async ( ) =>{
    let response =  await axios.get('http://localhost:3001/comentarios');
    return response.data;
};