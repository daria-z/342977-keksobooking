'use strict';

(function () {
  var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = CHECKIN_TIMES;
  var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // как расположить стоки в произвольном порядке

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  // ТЕМПЛЕЙТЫ
  var adTemplate = document.querySelector('template') // находим шаблон объявления и записываем в переменную
      .content // обращаемся к обертке
      .querySelector('.map__card'); // и к элементам внутри обертки

  // МАССИВЫ
  var similarAds = []; // массив похожих предложений

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  var getRandomNumber = function (lengthOfArray) { // выбор случайного числа из массива
    return Math.floor(Math.random() * lengthOfArray);
  };

  var getRandomInt = function (min, max) { // выбор случайного числа из диапазона (не включая max)
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var removeAllChildren = function (parent) { // удаляет всех детей parent
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  };

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

  window.adds = {
    similarAds: similarAds,
    generateSimilarAds: function () { // функция для генерации восьми похожих объявлений
      for (var j = 0; j < 8; j++) {
        var actualAd = generateAd(); // генирируем актуальный объект
        actualAd.id.ad = '0' + j;
        actualAd.id.pin = j;
        similarAds.push(actualAd); // Записываем актуальный объект в массив
      }
    },
    insertAd: function (idNum) { // добавляем одно объявление перед блоком фильтров
      window.util.tokyoMap.insertBefore(renderAd(similarAds[idNum]), document.querySelector('.map__filters-container'));
    },
    adClose: function () {
      var adNew = document.querySelector('article');
      var close = adNew.querySelector('.popup__close');


      var closeAd = function () {
        adNew.classList.add('hidden');
        document.removeEventListener('keydown', onAdEscPress);
      };

      close.addEventListener('click', function () {
        closeAd();
      });

      close.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          closeAd();
        }
      });

      var onAdEscPress = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closeAd();
        }
      };
    }
  };
})();
