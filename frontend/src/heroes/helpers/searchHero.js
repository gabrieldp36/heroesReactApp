import axios from 'axios';

export const searchHero = async ( termino = '' ) => {
    termino = termino.toLocaleLowerCase().trim();
    if ( termino.length === 0 ) return [];
    let resultados = [];
    let response =  await axios.get(`http://localhost:3001/buscar?termino=${termino}&limite=5`);
    resultados = response.data;
    return resultados;
};



