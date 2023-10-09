import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const BASE_URL_BREEDS = 'https://api.thecatapi.com/v1/breeds';
const BASE_URL_IMAGES = 'https://api.thecatapi.com/v1/images/search';

const API_KEY =
  'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';

axios.defaults.headers.common['x-api-key'] =
'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';

const loader = document.querySelector('.loader');
loader.style.display = "block";
const error = document.querySelector('.error');
error.style.display = 'none';
const brend = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
info.style.listStyleType = "none";
let idbreed;

fetchWithAxios(BASE_URL_BREEDS)
  .get()
  .then(resp => {
    if (resp.status !== 200) {
      loader.style.display = 'none';
      error.style.display = 'block';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw new Error(`Fetch errorr with ${resp.status}: ${resp.statusText}`);
    }
    return resp.data;
  })
  .then(data => {
    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      brend.appendChild(option);
    });
    loader.style.display = 'none';
  })
  .catch(err => console.log(err));


document.querySelector('.breed-select').addEventListener('change', function () {
  idbreed = this.value;
  error.style.display = 'none';
  loader.style.display = 'block';

fetchWithAxios(BASE_URL_IMAGES)
  .get()
  .then(resp => {
    if (resp.status !== 200) {
      loader.style.display = 'none';
      error.style.display = 'block';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw new Error(`Fetch errorr with ${resp.status}: ${resp.statusText}`);
    }
    return resp.data;
  })
  .then(data => {
    info.innerHTML = '';
    data.forEach(cat => {
      info.insertAdjacentHTML('beforeend', createMarkup(cat));
    });
    loader.style.display = 'none';
  })
  .catch(err => console.log(err));
});  

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
}

function fetchWithAxios(url) {
  const instance = axios.create({
    baseURL: url,
    timeout: 1000,
    headers: { 'x-api-key': API_KEY, 'breed_id': idbreed },
    breed_id: idbreed,
  });
  return instance;
}
