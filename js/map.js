'use strict';

var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = CHECKIN_TIMES;
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // как расположить стоки в произвольном порядке


var map = document.querySelector('.map'); // нашли блок map
var mapPins = document.querySelector('.map__pins');

var adTemplate = document.querySelector('template') // находим шаблон и записываем в переменную
    .content // обращаемся к обертке
    .querySelector('.map__card'); // и к элементам внутри обертки

var pinTemplate = document.querySelector('template') // находим шаблон и записываем в переменную
    .content // обращаемся к обертке
    .querySelector('.map__pin'); // и к элементам внутри обертки


var similarAds = []; // массив похожих предложений


var getRandomNumber = function (lengthOfArray) {
  return Math.floor(Math.random() * lengthOfArray);
}; // выбор случайного числа из массива

var getFeatures = function () {
  var featuresArray = []; // массив актуальных фич
  var featuresQuantity = getRandomNumber(PLACE_FEATURES.length);
  var temporaryArray = PLACE_FEATURES.slice(0); // создаем временный массив -  копию оригинального массива фич внитри функции
  for (var i = 1; i <= featuresQuantity; i++) { // цикл для генерации массива актуальных фич из массива возможных фич
    var featureIndex = getRandomNumber(temporaryArray.length); // выбираем индекс случайного элемента массива
    var placeFeature = temporaryArray[featureIndex]; // копируем рандомный элемент из массива возможных фич
    featuresArray.push(placeFeature); // вставляем элемент в массив актуальных фич
    temporaryArray.splice(featureIndex, 1); // удаляем скопированный элемент из временного массива фич
  }
  return featuresArray;
};

var mixPhotos = function () { // перемешивает фотографии
  var photosArray = PLACE_PHOTOS.slice(0);
  photosArray.sort(function () {
    return 0.5 - Math.random();
  });
  return photosArray;
};

var determineFlatType = function (flatParam) { // определяет параметр предлогаемого жилья и замен
  var flat;
  if (flatParam === 'palace') {
    flat = 'Дворец';
  } else if (flatParam === 'flat') {
    flat = 'Квартира';
  } else if (flatParam === 'bungalo') {
    flat = 'Бунгало';
  } else if (flatParam === 'house') {
    flat = 'Дом';
  }
  return flat;
};

var generateAd = function () { // функция для генерации одного объекта массива предложений
  var OBJECT_LOCATION_X = Math.floor((Math.random() * 2 + 1) * 300);
  var OBJECT_LOCATION_Y = Math.floor((Math.random() * 35 + 15) * 10);
  var adResult = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + Math.floor(Math.random() * 8 + 1) + '.png'
    },
    'offer': {
      'title': AD_TITLES[getRandomNumber(AD_TITLES.length)],
      'address': OBJECT_LOCATION_X + ', ' + OBJECT_LOCATION_Y,
      'price': Math.floor(Math.random() * 1000 + 1) * 1000,
      'type': PLACE_TYPES[getRandomNumber(PLACE_TYPES.length)],
      'rooms': Math.floor(Math.random() * 5 + 1),
      'guests': Math.floor(Math.random() * 20 + 1),
      'checkin': CHECKIN_TIMES[getRandomNumber(CHECKIN_TIMES.length)],
      'checkout': CHECKOUT_TIMES[getRandomNumber(CHECKOUT_TIMES.length)],
      'features': getFeatures(),
      'description': '',
      'photos': mixPhotos()
    },
    'location': {
      'x': OBJECT_LOCATION_X,
      'y': OBJECT_LOCATION_Y
    }
  };

  return adResult;
};

var generateSimilarAds = function () { // функция для генерации восьми похожих объявлений
  for (var j = 0; j <= 7; j++) { // цикл для генерации массива актуальных предложений
    var actualAd = generateAd(); // генирируем актуальный объект
    similarAds.push(actualAd); // Записываем актуальный объект в массив
  }
};

var renderAd = function (ad) { // функция для генирации одного объявления в темплейт на осове данных из массива
  var adElement = adTemplate.cloneNode(true); // копируем теиплейт

  adElement.querySelector('.popup__title').textContent = ad.offer.title; // добавили заголовок из массива
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address; // добавили адрес из массива
  adElement.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;' + '<span>/ночь</span>';
  adElement.querySelector('.popup__type').textContent = determineFlatType(ad.offer.type); // добавили заголовок из массива !!! Квартира для flat, Бунгало для bungalo, Дом для house
  adElement.querySelector('.popup__text--capacity').innerHTML = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout + '.';
  adElement.querySelector('.popup__features').textContent = ad.offer.features; // добавили заголовок из массива
  adElement.querySelector('.popup__description').textContent = ad.offer.description; // добавили заголовок из массива
  for (var i = 0; i < PLACE_PHOTOS.length - 1; i++) {
    adElement.querySelector('.popup__photos').appendChild(adElement.querySelector('.popup__photo').cloneNode(true));
  }
  for (i = 0; i < PLACE_PHOTOS.length; i++) {
    adElement.querySelector('.popup__photo:nth-child(' + (i + 1) + ')').src = ad.offer.photos[i];
  }
  adElement.querySelector('.popup__avatar').src = ad.author.avatar; // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.

  return adElement;
};

var renderPin = function (pin) { // функция для генирации одного пина
  var pinElement = pinTemplate.cloneNode(true); // копируем теиплейт

  pinElement.style = 'left: ' + (pin.location.x + 25) + 'px;' + 'top: ' + (pin.location.y + 70) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

map.classList.remove('map--faded');

var oneAd = document.createElement('ad-card'); // создали переменную в которую сложим сгенерированные элементы
var onePin = document.createElement('pin'); // создали переменную в которую сложим сгенерированные элементы

var fragment = document.createDocumentFragment(); // создали фрагмент для вставки
var fragmentPins = document.createDocumentFragment(); // создали фрагмент для вставки

generateSimilarAds(); // сгенерировали 8 похожишь объявлений

for (var i = 0; i < similarAds.length; i++) { // проходимся по всему массиву
  fragment.appendChild(renderAd(similarAds[i])); // добавляем объявление во фрагмент
  fragmentPins.appendChild(renderPin(similarAds[i])); // добавляем пин во фрагмент
}

map.insertBefore(oneAd, document.querySelector('.map__filters-container'));
mapPins.appendChild(onePin);
oneAd.appendChild(fragment);
onePin.appendChild(fragmentPins);
