import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';

const brend = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');

// ЗАГРУЖАЮ СПИСОК ЙОБАНЫЙ КОТОВ !!! Вставляю его в OPTIONS
fetchBreeds()
  .then(data => {
    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      brend.appendChild(option);
    });
  })
  .catch(err => console.log(err));

function fetchBreeds(el) {
  const BASE_URL = 'https://api.thecatapi.com/';
  const API_KEY =
    'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';
  const END_POINT = 'v1/breeds';
  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}/${END_POINT}?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(`Fetch errorr with ${resp.status}: ${resp.statusText}`);
    }
    return resp.json();
  });
}

// Загружаю инфу про выбраного ЙОБАНОГО котА!!! ДОБАВЛЯЮ РАЗМЕТКУ
document.querySelector('.breed-select').addEventListener('change', function () {
  let idbreed = this.value;

  fetchCatByBreed(idbreed)
    .then(data => {
      console.log(data);
      console.log(data.url);
      console.log(data.name);
      console.log(data.description);
      console.log(data.temperament);
      info.insertAdjacentElement("beforeend", createMarkup(data));
    })
    .catch(err => console.log(err));
});

function fetchCatByBreed(idbreed) {
  const BASE_URL = 'https://api.thecatapi.com/';
  const API_KEY =
    'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';
  let ID_BREED = idbreed;
  const END_POINT = 'v1/images/search';
  const params = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: ID_BREED,
  });

  return fetch(`${BASE_URL}/${END_POINT}?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(`Fetch errorr with ${resp.status}: ${resp.statusText}`);
    }
    return resp.json();
  });
};

function createMarkup(arr) {
  return arr
    .map(
      ({ url, name, description, temperament }) => `
      <li class = "cat-card">
        <img src="${url}" alt="${name}">
        <div class="cat-info>
          <h2>${name}</h2>
          <p>${description}</p>
          <p>Tempeerament: ${temperament}</p>
        </div>
      </li>
  `
    )
    .join("");
};

