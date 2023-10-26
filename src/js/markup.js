function createMarkup(breeds, breedSelectEl) {
    const breedsList = breeds
        .map(({ id, name}) => {
            return `<option value="${id}">${name}</option>`;
        })
        .join('');
    breedSelectEl.innerHTML = breedsList;
};

function createMarkupCatInfo(catData, catInfoEl, loaderEl) {
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

export { createMarkup, createMarkupCatInfo };