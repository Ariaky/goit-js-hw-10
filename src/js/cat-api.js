import axios from 'axios';
import Notiflix from 'notiflix';
export { fetchBreeds, fetchCatByBreed };

axios.defaults.headers.common['x-api-key'] = 'live_18k2XlPw6MprRRmUb9yWqlhMgcfqpkjuWiAJG7tPZyHhoEghvhyOj1KStpY97HdT';

function fetchBreeds () {
    return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
        if (response.status !== 200) {
            return Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        }
        return response.data;
    });
}

function fetchCatByBreed(breedId) {
    return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
        if (response.status !== 200) {
            return Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        }
        return response;
    });
}