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

// ПЕРЕМЕННЫЕ ДЛЯ КОНКРЕТНЫХ DOM-ОБЪЕКТОВ
var tokyoMap = document.querySelector('.map'); // нашли блок map
var mapPins = document.querySelector('.map__pins'); // нашли блок map__pins
var userForm = document.querySelector('.ad-form');
var formFieldset = userForm.querySelectorAll('fieldset');
var mainPin = mapPins.querySelector('.map__pin, .map-pin--main');
var addressField = document.getElementById('address');

// ТЕМПЛЕЙТЫ
var adTemplate = document.querySelector('template') // находим шаблон объявления и записываем в переменную
    .content // обращаемся к обертке
    .querySelector('.map__card'); // и к элементам внутри обертки

var pinTemplate = document.querySelector('template') // находим шаблон пина и записываем в переменную
    .content // обращаемся к обертке
    .querySelector('.map__pin'); // и к элементам внутри обертки

// НОВЫЕ, СГЕНЕРИРОВАННЫЕ ОБЪЕКТЫ
var allPins = document.createElement('pins'); // создали переменную в которую сложим сгенерированные пины
var fragmentPins = document.createDocumentFragment(); // создали фрагмент для вставки всех пинов за раз

// ПОДСЧЕТ АДРЕСА МЕТКИ
var pinButtonLocation = (parseInt(mainPin.style.left, 10) - PIN_BUTTON_SIZE / 2) + ' , ' + (parseInt(mainPin.style.top, 10) - PIN_BUTTON_SIZE / 2);
var pinLocation = (parseInt(mainPin.style.left, 10) - PIN_WIDTH / 2) + ' , ' + (parseInt(mainPin.style.top, 10) - PIN_HEIGHT);

// МАССИВЫ
var similarAds = []; // массив похожих предложений

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
var getRandomNumber = function (lengthOfArray) { // выбор случайного числа из массива
  return Math.floor(Math.random() * lengthOfArray);
};

function getRandomInt(min, max) { // выбор случайного числа из диапазона (не включая max)
  return Math.floor(Math.random() * (max - min)) + min;
}

function removeAllChildren(parent) { // удаляет всех детей parent
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

var pickUpNumeEnding = function (number, titles) { // функция для генерации окончаний числительных
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

// ФУНКЦИИ ДЛЯ РАБОТЫ С ТЕМПЛЕЙТОМ -- вспомогательные
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

// ФУНКЦИИ ДЛЯ РАБОТЫ С ТЕМПЛЕЙТОМ -- осовные
var generateAd = function () { // функция для генерации одного объекта массива предложений
  var OBJECT_LOCATION_X = getRandomInt(300, 901);
  var OBJECT_LOCATION_Y = getRandomInt(150, 501);
  var adResult = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + getRandomInt(1, 9) + '.png'
    },
    'offer': {
      'title': AD_TITLES[getRandomNumber(AD_TITLES.length)],
      'address': OBJECT_LOCATION_X + ', ' + OBJECT_LOCATION_Y,
      'price': getRandomInt(1000, 1000001),
      'type': PLACE_TYPES[getRandomNumber(PLACE_TYPES.length)],
      'rooms': getRandomInt(1, 6),
      'guests': getRandomInt(1, 16),
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
  for (var j = 0; j < 8; j++) {
    var actualAd = generateAd(); // генирируем актуальный объект
    actualAd.id.ad = '0' + j;
    actualAd.id.pin = j;
    similarAds.push(actualAd); // Записываем актуальный объект в массив
  }
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

var insertAd = function (idNum) { // добавляем одно объявление перед блоком фильтров
  tokyoMap.insertBefore(renderAd(similarAds[idNum]), document.querySelector('.map__filters-container'));
};

var renderPin = function (pin) { // функция для генирации одного пина
  var pinElement = pinTemplate.cloneNode(true); // копируем теиплейт

  pinElement.id = pin.id.pin;
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px;' + 'top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.addEventListener('click', function () { // функция для генерации слушателя для каждого пина
    var actualAd = tokyoMap.querySelector('article');
    if (actualAd === null) {
      insertAd(pin.id.pin);
    } else {
      tokyoMap.removeChild(actualAd);
      insertAd(pin.id.pin);
    }
  });
  return pinElement;
};

var insertPins = function () { // добавляем все пины
  for (var i = 0; i < similarAds.length; i++) { // проходимся по всему массиву
    fragmentPins.appendChild(renderPin(similarAds[i])); // добавляем пин во фрагмент
  }
  allPins.appendChild(fragmentPins); // записываем пины во фрагмент
  mapPins.appendChild(allPins); // вставляем фрагмент пинов в html
};

// ФУНКЦИИ ДЛЯ РАБОТЫ С ФОРМОЙ
var formType = document.getElementById('type');
var formPrice = document.getElementById('price');
var formCheckIn = document.getElementById('timein');
var formCheckOut = document.getElementById('timeout');
var formRooms = document.getElementById('room_number');
var formGuests = document.getElementById('capacity');

var addTextInField = function (where, what) { // добавление текста в поле
  where.value = what;
};

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

formType.addEventListener('input', function () { // соответствие цены и типа жилья
  if (formType.value === 'bungalo') {
    formPrice.min = '0';
    formPrice.placeholder = '0';
  } else if (formType.value === 'flat') {
    formPrice.min = '1000';
    formPrice.placeholder = '1000';
  } else if (formType.value === 'house') {
    formPrice.min = '5000';
    formPrice.placeholder = '5000';
  } else if (formType.value === 'palace') {
    formPrice.min = '10000';
    formPrice.placeholder = '10000';
  }
});

formCheckIn.addEventListener('input', function () { // время выезда в зависимости от времени въезда
  if (formCheckIn.value === '12:00') {
    formCheckOut.value = '12:00';
  } else if (formCheckIn.value === '13:00') {
    formCheckOut.value = '13:00';
  } else if (formCheckIn.value === '14:00') {
    formCheckOut.value = '14:00';
  }
});

formCheckOut.addEventListener('input', function () { // время въезда в зависимости от времени выезда
  if (formCheckOut.value === '12:00') {
    formCheckIn.value = '12:00';
  } else if (formCheckOut.value === '13:00') {
    formCheckIn.value = '13:00';
  } else if (formCheckOut.value === '14:00') {
    formCheckIn.value = '14:00';
  }
});

formGuests.addEventListener('input', function () { // соответсвие количества комнат и жильцов реализация без учета 100 комнат
  if (formGuests.value === '0' && formRooms.value !== '100') {
    formGuests.valid = '';
    formGuests.setCustomValidity('Количество мест должно быть не меньше количества комнат');
  } else if (formRooms.value < formGuests.value) {
    formGuests.valid = '';
    formGuests.setCustomValidity('Количество мест должно быть не меньше количества комнат');
  } else {
    formGuests.valid = 'true';
    formGuests.setCustomValidity('');
  }
});

formRooms.addEventListener('input', function () {
  if (formGuests.value === '0' && formRooms.value !== '100') {
    formGuests.valid = '';
    formGuests.setCustomValidity('Количество мест должно быть не меньше количества комнат');
  } else if (formRooms.value < formGuests.value) {
    formGuests.valid = '';
    formGuests.setCustomValidity('Количество мест должно быть не меньше количества комнат');
  } else {
    formGuests.valid = 'true';
    formGuests.setCustomValidity('');
  }
});

formRooms.addEventListener('input', function () { // соответсвие количества комнат и жильцов реализация без учета 100 комнат
  if (formRooms.value === '1') {
    formGuests.options[0].disabled = 'true'; // 3 гостя
    formGuests.options[1].disabled = 'true'; // 2 гостя
    formGuests.options[2].disabled = ''; // 1 гость
    formGuests.options[3].disabled = 'true'; // не для гостей
  } else if (formRooms.value === '2') {
    formGuests.options[0].disabled = 'true'; // 3 гостя
    formGuests.options[1].disabled = ''; // 2 гостя
    formGuests.options[2].disabled = ''; // 1 гость
    formGuests.options[3].disabled = 'true'; // не для гостей
  } else if (formRooms.value === '3') {
    formGuests.options[0].disabled = ''; // 3 гостя
    formGuests.options[1].disabled = ''; // 2 гостя
    formGuests.options[2].disabled = ''; // 1 гость
    formGuests.options[3].disabled = 'true'; // не для гостей
  } else if (formRooms.value === '100') {
    formGuests.options[0].disabled = 'true'; // 3 гостя
    formGuests.options[1].disabled = 'true'; // 2 гостя
    formGuests.options[2].disabled = 'true'; // 1 гость
    formGuests.options[3].disabled = ''; // не для гостей
  }
});

// ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРАНИЦЕЙ
var cancelPageInactive = function () { // отменяет неактивное состояние страницы
  tokyoMap.classList.remove('map--faded');
  removeFormDisabled();
};

var switchGroupElementsClasses = function (groupElement, className) { // переключает классы между пинами
  var removeOldClass = function () {
    oldClass.classList.remove(className);
  };
  var addNewClass = function (evt) {
    var newPin = evt.target;
    newPin.classList.add(className);
  };

  var oldClass = '';

  groupElement.addEventListener('click', function (evt) {
    if (oldClass === '') {
      addNewClass(evt);
      oldClass = evt.target;
    } else {
      removeOldClass();
      addNewClass(evt);
      oldClass = evt.target;
    }
    return oldClass;
  });
};

generateSimilarAds(); // сгенерировали 8 похожишь объявлений
switchGroupElementsClasses(allPins, 'map__pin--active'); // добавили переключатель классов между пинами
addTextInField(addressField, pinButtonLocation); // добавили адрес в форму
addFormDisabled(); // заблокировали форму

mainPin.addEventListener('mousedown', function () { // перевели все в активное состояние по опусканию пина
  cancelPageInactive(); // разблокировали форму
  insertPins(); // сгененрировали и добавили пины
});

// РЕАЛИЗАЦИЯ ПЕРЕТАСКИВАНИЯ ПИНА

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var mapCoords = tokyoMap.querySelector('.map__overlay').getBoundingClientRect();
    var mapMinX = (mapCoords.x - mapCoords.left) - (PIN_WIDTH / 2);
    var mapMaxX = mapCoords.height - (PIN_HEIGHT / 2);
    var mapMinY = mapCoords.y;
    var mapMaxY = mapCoords.width - (PIN_WIDTH / 2);

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var pinTop = mainPin.offsetTop - shift.y;
    var pinLeft = mainPin.offsetLeft - shift.x;

    if (pinLeft > mapMinX && pinLeft < mapMaxY && pinTop > mapMinY && pinTop < mapMaxX) {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }

    pinLocation = (parseInt(mainPin.style.left, 10) - PIN_WIDTH / 2) + ' , ' + (parseInt(mainPin.style.top, 10) - PIN_HEIGHT);
    addTextInField(addressField, pinLocation); // добавили адрес в форму
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
