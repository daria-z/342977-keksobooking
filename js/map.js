'use strict';

var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = CHECKIN_TIMES;
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // как расположить стоки в произвольном порядке

var PIN_BUTTON_SIZE = 65;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var tokyoMap = document.querySelector('.map'); // нашли блок map
var mapPins = document.querySelector('.map__pins'); // нашли блок map__pins

var adTemplate = document.querySelector('template') // находим шаблон объявления и записываем в переменную
    .content // обращаемся к обертке
    .querySelector('.map__card'); // и к элементам внутри обертки

var pinTemplate = document.querySelector('template') // находим шаблон пина и записываем в переменную
    .content // обращаемся к обертке
    .querySelector('.map__pin'); // и к элементам внутри обертки

var allPins = document.createElement('pins'); // создали переменную в которую сложим сгенерированные пины
var fragmentPins = document.createDocumentFragment(); // создали фрагмент для вставки всех пинов за раз

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

function removeAllChildren(parent) { // удаляет всех детей parent
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}
// var generateIdNumber = function (quantity) {
//   for (var j = 0; j < quantity; j++) {
//     var idNumber = j;
//   }
//   return idNumber;
// };


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
    },
    'id': {
      'ad': '',
      'pin': ''
    }
  };

  return adResult;
};

var generateSimilarAds = function () { // функция для генерации восьми похожих объявлений
  for (var j = 0; j < 8; j++) { // цикл для генерации массива актуальных предложений
    var actualAd = generateAd(); // генирируем актуальный объект
    actualAd.id.ad = '0' + j;
    actualAd.id.pin = j;
    similarAds.push(actualAd); // Записываем актуальный объект в массив
  }
};

var pickUpNumeEnding = function (number, titles) { // функция для генерации окончаний числительных
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var renderAd = function (ad) { // функция для генирации одного объявления в темплейт на осове данных из массива
  var adElement = adTemplate.cloneNode(true); // копируем теиплейт
  var featuresList = adElement.querySelector('.popup__features'); // список фич в темплейте
  var roomsNumeral = pickUpNumeEnding(ad.offer.rooms, ['комната', 'комнаты', 'комнат']);
  var guestsNumeral = pickUpNumeEnding(ad.offer.guests, ['гостя', 'гостей', 'гостей']);

  adElement.id = ad.id.ad;
  adElement.querySelector('.popup__title').textContent = ad.offer.title; // добавили заголовок из массива
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address; // добавили адрес из массива
  adElement.querySelector('.popup__text--price').textContent = ad.offer.price + '\u20bd/ночь';
  adElement.querySelector('.popup__type').textContent = determineFlatType(ad.offer.type); // добавили заголовок из массива !!! Квартира для flat, Бунгало для bungalo, Дом для house
  adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' + roomsNumeral + ' ' + 'для ' + ad.offer.guests + ' ' + guestsNumeral;
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout + '.';
  removeAllChildren(featuresList); // удаляем дочерние элементы списка фич из темплейта
  for (var j = 0; j < ad.offer.features.length; j++) { // создаем и добавляем нужное количество фич в список
    var featuresListItem = document.createElement('li');
    featuresListItem.className = 'popup__feature popup__feature--' + ad.offer.features[j];
    featuresList.appendChild(featuresListItem);
  }
  adElement.querySelector('.popup__description').textContent = ad.offer.description; // добавили заголовок из массива
  for (var i = 0; i < ad.offer.photos.length - 1; i++) { // увеличили количество img до нужного числа
    adElement.querySelector('.popup__photos').appendChild(adElement.querySelector('.popup__photo').cloneNode(true));
  }
  for (i = 0; i < ad.offer.photos.length; i++) { // отдали img нужные адреса
    adElement.querySelector('.popup__photo:nth-child(' + (i + 1) + ')').src = ad.offer.photos[i];
  }
  adElement.querySelector('.popup__avatar').src = ad.author.avatar; // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.

  return adElement;
};

var renderPin = function (pin) { // функция для генирации одного пина
  var pinElement = pinTemplate.cloneNode(true); // копируем теиплейт

  pinElement.id = pin.id.pin;
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px;' + 'top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var insertAd = function (idNum) {
  tokyoMap.insertBefore(renderAd(similarAds[idNum]), document.querySelector('.map__filters-container')); // добавляем одно объявление перед блоком фильтров
};

var insertPins = function () {
  for (var i = 0; i < similarAds.length; i++) { // проходимся по всему массиву
    fragmentPins.appendChild(renderPin(similarAds[i])); // добавляем пин во фрагмент
  }

  allPins.appendChild(fragmentPins); // записываем пины во фрагмент
  mapPins.appendChild(allPins); // вставляем фрагмент пинов в html
};

generateSimilarAds(); // сгенерировали 8 похожишь объявлений

var userForm = document.querySelector('.ad-form');
var formFieldset = userForm.querySelectorAll('fieldset');
var mainPin = mapPins.querySelector('.map__pin, .map-pin--main');
var addressField = document.getElementById('address');
var pinButtonLocation = (parseInt(mainPin.style.left, 10) - PIN_BUTTON_SIZE / 2) + ' , ' + (parseInt(mainPin.style.top, 10) - PIN_BUTTON_SIZE / 2);
var pinLocation = (parseInt(mainPin.style.left, 10) - PIN_WIDTH / 2) + ' , ' + (parseInt(mainPin.style.top, 10) - PIN_HEIGHT);

var addFormDisabled = function () { // добавляет неактивное состояние формы
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = 'true';
  }
};

var removeFormDisabled = function () { // отменяет неактивное состояние формы
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = '';
  }
  userForm.classList.remove('ad-form--disabled');
};

var cancelInactiveState = function () { // отменяет неактивное состояние страницы
  tokyoMap.classList.remove('map--faded');
  removeFormDisabled();
};

var addTextInField = function (where, what) { // добавление текста в поле
  where.value = what;
};

addTextInField(addressField, pinButtonLocation); // добавили текас в поле адреса
addFormDisabled(); // заблокировали форму

var clickPin = function () { // создание блока объявления по клику на определенный пин
  var Pin0 = document.getElementById('0');
  var Pin1 = document.getElementById('1');
  var Pin2 = document.getElementById('2');
  var Pin3 = document.getElementById('3');
  var Pin4 = document.getElementById('4');
  var Pin5 = document.getElementById('5');
  var Pin6 = document.getElementById('6');
  var Pin7 = document.getElementById('7');
  Pin0.addEventListener('click', function () {
    var actualAd = tokyoMap.querySelector('article');
    var previousAd = tokyoMap.querySelector('article:first-of-type');
    if (actualAd === null) {
      insertAd(0);
    } else if (previousAd !== null) {
      tokyoMap.removeChild(actualAd);
      insertAd(0);
    }
  });
  Pin1.addEventListener('click', function () {
    var actualAd = tokyoMap.querySelector('article');
    var previousAd = tokyoMap.querySelector('article:first-of-type');
    if (actualAd === null) {
      insertAd(1);
    } else if (previousAd !== null) {
      tokyoMap.removeChild(actualAd);
      insertAd(1);
    }
  });
  Pin2.addEventListener('click', function () {
    var actualAd = tokyoMap.querySelector('article');
    var previousAd = tokyoMap.querySelector('article:first-of-type');
    if (actualAd === null) {
      insertAd(2);
    } else if (previousAd !== null) {
      tokyoMap.removeChild(actualAd);
      insertAd(2);
    }
  });
  Pin3.addEventListener('click', function () {
    var actualAd = tokyoMap.querySelector('article');
    var previousAd = tokyoMap.querySelector('article:first-of-type');
    if (actualAd === null) {
      insertAd(3);
    } else if (previousAd !== null) {
      tokyoMap.removeChild(actualAd);
      insertAd(3);
    }
  });
  Pin4.addEventListener('click', function () {
    var actualAd = tokyoMap.querySelector('article');
    var previousAd = tokyoMap.querySelector('article:first-of-type');
    if (actualAd === null) {
      insertAd(4);
    } else if (previousAd !== null) {
      tokyoMap.removeChild(actualAd);
      insertAd(4);
    }
  });
  Pin5.addEventListener('click', function () {
    var actualAd = tokyoMap.querySelector('article');
    var previousAd = tokyoMap.querySelector('article:first-of-type');
    if (actualAd === null) {
      insertAd(5);
    } else if (previousAd !== null) {
      tokyoMap.removeChild(actualAd);
      insertAd(5);
    }
  });
  Pin6.addEventListener('click', function () {
    var actualAd = tokyoMap.querySelector('article');
    var previousAd = tokyoMap.querySelector('article:first-of-type');
    if (actualAd === null) {
      insertAd(6);
    } else if (previousAd !== null) {
      tokyoMap.removeChild(actualAd);
      insertAd(6);
    }
  });
  Pin7.addEventListener('click', function () {
    var actualAd = tokyoMap.querySelector('article');
    var previousAd = tokyoMap.querySelector('article:first-of-type');
    if (actualAd === null) {
      insertAd(7);
    } else if (previousAd !== null) {
      tokyoMap.removeChild(actualAd);
      insertAd(7);
    }
  });
};

mainPin.addEventListener('mouseup', function () { // перевели все в активное состояние по опусканию пина
  cancelInactiveState();
  addTextInField(addressField, pinLocation);
  insertPins(); // сгененрировали и добавили пины
  clickPin(); // добавление объявлений по клику
});
