import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';


const loader = document.querySelector('.loader');
loader.style.display = "block";
const error = document.querySelector('.error');
error.style.display = 'none';
const brend = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
info.style.listStyleType = "none";
let idbreed;

// ЗАГРУЖАЮ СПИСОК ЙОБАНЫЙ КОТОВ !!! Вставляю его в OPTIONS
fetchBreeds()
  .then(data => {
    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      brend.appendChild(option);
    });
    loader.style.display = 'none';
    // new SlimSelect({
    //   select: 'select.breed-select',
    // });
  })
  .catch(err => console.log(err));

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  const API_KEY =
    'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';
  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}?${params}`).then(resp => {
    if (!resp.ok) {
      loader.style.display = 'none';
      // error.style.display = 'block';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw new Error(`Fetch errorr with ${resp.status}: ${resp.statusText}`);
    }
    return resp.json();
  });
}

// Загружаю инфу про выбраного ЙОБАНОГО котА!!! ДОБАВЛЯЮ РАЗМЕТКУ
document.querySelector('.breed-select').addEventListener('change', function () {
  idbreed = this.value;
  error.style.display = 'none';
  loader.style.display = 'block'; 
  fetchCatByBreed()
    .then(data => {
      info.innerHTML = '';
      data.forEach(cat => {
        info.insertAdjacentHTML('beforeend', createMarkup(cat));
      });
      loader.style.display = 'none'; 
    })
    .catch(err => console.log(err));
});

function fetchCatByBreed() {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
  const API_KEY = 'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';
  let ID_BREED = idbreed;
  
  const params = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: ID_BREED,
  });

  return fetch(`${BASE_URL}?${params}`).then(resp => {
    if (!resp.ok) {
      loader.style.display = 'none';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw new Error(`Fetch errorr with ${resp.status}: ${resp.statusText}`);
    }
    return resp.json();
  });
};

function createMarkup(cat) {
  const breed = cat.breeds[0];
  return `
  <li class="cat-card">
    <img src="${cat.url}" alt="${breed.name}" width="${cat.width}" height="${cat.height}">
    <div class="cat-info">
      <h2>${breed.name}</h2>
      <p>${breed.description}</p>
      <p><strong>Temperament: </strong>${breed.temperament}</p>
    </div>
  </li>
  `;
};



