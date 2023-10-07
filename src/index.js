// HTTP-запити
// Використовуй публічний The Cat API. Для початку роботи необхідно зареєструватися й отримати унікальний ключ доступу, щоб прикріплювати його до кожного запиту. Заходимо на головну сторінку та натискаємо нижче кнопку Signup for free, дотримуємося інструкції, ключ буде надіслано на вказану пошту.

// Для використання ключа необхідно використовувати HTTP-заголовок x-api-key. Рекомендується використовувати axios та додати заголовок до всіх запитів.

// import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = "твій ключ";

// Колекція порід
// Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід. Для цього необхідно виконати GET-запит на ресурс https://api.thecatapi.com/v1/breeds, що повертає масив об'єктів. У разі успішного запиту, необхідно наповнити select.breed-select опціями так, щоб value опції містило id породи, а в інтерфейсі користувачеві відображалася назва породи.

// Напиши функцію fetchBreeds(), яка виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту. Винеси її у файл cat-api.js та зроби іменований експорт.

// Інформація про кота
// Коли користувач обирає якусь опцію в селекті, необхідно виконувати запит за повною інформацією про кота на ресурс https://api.thecatapi.com/v1/images/search. Не забудь вказати в цьому запиті параметр рядка запиту breed_ids з ідентифікатором породи.

// Ось як буде виглядати URL-запит для отримання повної інформації про собаку за ідентифікатором породи:

// https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи

// Напиши функцію fetchCatByBreed(breedId), яка очікує ідентифікатор породи, робить HTTP-запит і повертає проміс із даними про кота - результатом запиту. Винеси її у файл cat-api.js і зроби іменований експорт.

// Якщо запит був успішний, під селектом у блоці div.cat-info з'являється зображення і розгорнута інформація про кота: назва породи, опис і темперамент.

// Опрацювання стану завантаження
// Поки відбувається будь-який HTTP-запит, необхідно показувати завантажувач - елемент p.loader. Поки запитів немає або коли запит завершився, завантажувач необхідно приховувати. Використовуй для цього додаткові CSS класи.

// Поки виконується запит за списком порід, необхідно приховати select.breed-select та показати p.loader.
// Поки виконується запит за інформацією про кота, необхідно приховати div.cat-info та показати p.loader.
// Як тільки будь-який запит завершився, p.loader треба приховати.
// Опрацювання помилки
// Якщо у користувача сталася помилка під час будь-якого HTTP-запиту, наприклад, впала мережа, була втрата пакетів тощо, тобто проміс було відхилено, необхідно відобразити елемент p.error, а при кожному наступному запиті приховувати його. Використовуй для цього додаткові CSS класи.

// Протестувати працездатність відображення помилки дуже просто - зміни адресу запиту додавши в кінець будь-який символ, наприклад замість https://api.thecatapi.com/v1/breeds використай https://api.thecatapi.com/v1/breeds123. Запит отримання списку порід буде відхилено з помилкою. Аналогічно для запиту інформації про кота за породою.

// Інтерфейс
// Додай мінімальне оформлення елементів інтерфейсу.
// Замість select.breed-select можеш використовувати будь-яку бібліотеку з красивими селектом, наприклад https://slimselectjs.com/
// Замість p.loader можеш використовувати будь-яку бібліотеку з красивими CSS-завантажувачами, наприклад https://cssloaders.github.io/
// Завантажувач p.error можеш використовувати будь-яку бібліотеку з гарними сповіщеннями, наприклад Notiflix


// 'api_key=live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';
// live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN - АPI KEY
// https://api.thecatapi.com/v1/breeds - BASE URL

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'live_byDUUQmQekkLRlI0L9gIRy8RBj14h6KEagneJBWPmRPtldgkqC5Hwb1BsoZTJwhN';
const brend = document.querySelector('.breed-select');

brend.addEventListener("click", onload);

serviceCat().then((data) => {
    console.log(data);
    data.forEach(el => {
        console.log(el);
        const catCard = el.name;
        console.log(catCard)
    //   const option = document.createElement('option');
    //   option.value = catCard.name;
    //   option.text = catCard.name;
    //   brend.appendChild(option.value);
    });
});

function onload() {
    
};

function serviceCat(id) {
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
};

  
