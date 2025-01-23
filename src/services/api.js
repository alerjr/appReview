// import
import axios from 'axios';

// url da api
const apiUrl = 'http://localhost:3000/api/dados';

// requisicao da api
export const getData = () => {
    return axios.get(apiUrl).then(response => response.data).catch(error => {
        console.log('Erro ao carregar os dados: ', error);
        throw error;
    });
};

// funcao para buscar os dados com base no termo de pesquisa
export const searchData = (searchTerm) => {
    const url = 'http://localhost:3000/api/search';  // Endpoint da sua API

    return axios
        .get(url, {
            params: { term: searchTerm },  // Passa o termo de pesquisa como parâmetro
        })
        .then((response) => response.data)  // Retorna os dados da resposta
        .catch((error) => {
            console.error('Erro ao buscar dados:', error);
            throw error;  // Lança o erro para o componente lidar com ele
        });
};