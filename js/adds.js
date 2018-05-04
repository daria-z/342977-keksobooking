'use strict';

(function () {

  var noticeTemplate = document.querySelector('template') // находим шаблон объявления и записываем в переменную
      .content // обращаемся к обертке
      .querySelector('.map__card'); // и к элементам внутри обертки

  var removeAllChildren = function (parent) { // удаляет всех детей parent
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  };

  var pickUpNumeEnding = function (number, titles) { // функция для генерации окончаний числительных
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
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

  var renderFirstNotice = function () { // функция для генирации одного объявления в темплейт на осове данных из массива
    var adElement = noticeTemplate.cloneNode(true); // копируем теиплейт
    window.util.tokyoMap.appendChild(adElement);
    var firstNotice = window.util.tokyoMap.querySelector('article');
    firstNotice.classList.add('hidden');
  };

  var getTextInNotice = function (ad) {
    var adElement = window.util.tokyoMap.querySelector('article');
    var featuresList = adElement.querySelector('.popup__features'); // список фич
    var roomsNumeral = pickUpNumeEnding(ad.offer.rooms, ['комната', 'комнаты', 'комнат']);
    var guestsNumeral = pickUpNumeEnding(ad.offer.guests, ['гостя', 'гостей', 'гостей']);
    var photosList = adElement.querySelector('.popup__photos');
    var createFeaturesList = function () {
      removeAllChildren(featuresList); // удаляем дочерние элементы списка фич из темплейта
      for (var j = 0; j < ad.offer.features.length; j++) { // создаем и добавляем нужное количество фич в список
        var featuresListItem = document.createElement('li');
        featuresListItem.className = 'popup__feature popup__feature--' + ad.offer.features[j];
        featuresList.appendChild(featuresListItem);
      }
    };
    var createPhotosList = function () {
      removeAllChildren(photosList);
      for (var i = 0; i < ad.offer.photos.length; i++) { // увеличили количество img до нужного числа
        var onePhoto = document.createElement('img');
        photosList.appendChild(onePhoto);
        onePhoto.className = 'popup__photo';
        onePhoto.width = 45;
        onePhoto.height = 40;
        onePhoto.alt = 'Фотография жилья';
        onePhoto.src = ad.offer.photos[i];
      }
    };

    adElement.querySelector('.popup__title').textContent = ad.offer.title; // добавили заголовок из массива
    adElement.querySelector('.popup__text--address').textContent = ad.offer.address; // добавили адрес из массива
    adElement.querySelector('.popup__text--price').textContent = ad.offer.price + '\u20bd/ночь';
    adElement.querySelector('.popup__type').textContent = determineFlatType(ad.offer.type); // добавили заголовок из массива !!! Квартира для flat, Бунгало для bungalo, Дом для house
    adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' + roomsNumeral + ' ' + 'для ' + ad.offer.guests + ' ' + guestsNumeral;
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout + '.';
    createFeaturesList();
    adElement.querySelector('.popup__description').textContent = ad.offer.description; // добавили заголовок из массива
    createPhotosList();
    adElement.querySelector('.popup__avatar').src = ad.author.avatar; // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
    if (adElement.classList.contains('hidden')) {
      adElement.classList.remove('hidden');
    }
    document.addEventListener('keydown', window.adds.onAdEscPress);
    return adElement;
  };

  window.adds = {
    showedAd: window.util.tokyoMap.querySelector('article'),
    renderFirstNotice: renderFirstNotice,
    getTextInNotice: getTextInNotice,
    onAdEscPress: function (evt) {
      if (evt.keyCode === 27) {
        window.adds.closeAd();
      }
    },
    closeAd: function () {
      var showedAd = document.querySelector('article');
      showedAd.classList.add('hidden');
      document.removeEventListener('keydown', window.adds.onAdEscPress);
    },
    adClose: function () {
      var showedAd = document.querySelector('article');
      var closeButton = showedAd.querySelector('.popup__close');
      closeButton.addEventListener('click', function () {
        window.adds.closeAd();
      });
    }
  };
})();
