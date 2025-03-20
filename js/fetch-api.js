const API_URL_GET = 'https://31.javascript.htmlacademy.pro/kekstagram/data/';
const API_URL_POST = 'https://31.javascript.htmlacademy.pro/kekstagram/';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте ещё раз',
  [Method.POST]: 'Не удалось отправить данные формы',
};

const load = (url, method = Method.GET, body = null) =>
  fetch(url, { method, body })
    .then((response) =>
      response.ok ? response.json() : Promise.reject(new Error(ErrorText[method]))
    );

const getData = () => load(API_URL_GET);
const sendData = (body) => load(API_URL_POST, Method.POST, body);


export {getData, sendData};
