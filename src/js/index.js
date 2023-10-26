import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
import Notiflix from "notiflix";
import { breedSelectEl,catInfoEl, loaderEl } from "./refs";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { createMarkup, createMarkupCatInfo } from "./markup";

fetchBreeds()
    .then(breeds => {
        breedSelectEl.style.display = 'flex';
        createMarkup(breeds, breedSelectEl);
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
        .then(catData => createMarkupCatInfo(catData, catInfoEl, loaderEl))
        .catch(RequestError);
});

function RequestError() {
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    loaderEl.style.display = 'none';
};