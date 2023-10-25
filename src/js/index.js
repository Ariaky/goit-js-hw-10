import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
import Notiflix from "notiflix";

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

fetchBreeds()
    .then(breeds => {
        breedSelectEl.style.display = 'flex';
        createMarkup(breeds);
        breedSelectEl.style.width = '500px';
        new SlimSelect({
            select: '.breed-select',
        });
        loaderEl.style.display = 'none';
    })
    .catch(RequestError);
    
breedSelectEl.addEventListener('change', e => {
    catInfoEl.style.display = 'none';
    loaderEl.style.display = 'block';
    const breedId = e.target.value;
    fetchCatByBreed(breedId)
        .then(createMarkupCatInfo)
        .catch(RequestError);
});

function createMarkup(breeds) {
    const breedsList = breeds
        .map(({ id, name}) => {
            return `<option value="${id}">${name}</option>`;
        })
        .join('');
    breedSelectEl.innerHTML = breedsList;
};

function createMarkupCatInfo(catData) {
    const { url, breeds } = catData.data[0];
    const { name, description, temperament } = breeds[0];
    catInfoEl.innerHTML = `<img src="${url}" width="300">
        <div class="description-card">
        <h2 class="title">${name}</h2>
        <p class="description">${description}</p>
        <p class="temperament"><strong>Temperament:</strong> ${temperament}</p></div>`;
        loaderEl.style.display = 'none';
        catInfoEl.style.display = 'flex';
};

function RequestError() {
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    loaderEl.style.display = 'none';
};