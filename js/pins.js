'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins'); // нашли блок map__pins
  var mainPin = mapPins.querySelector('.map__pin, .map-pin--main');
  var activePin = null;

  // ТЕМПЛЕЙТЫ
  var pinTemplate = document.querySelector('template') // находим шаблон пина и записываем в переменную
      .content // обращаемся к обертке
      .querySelector('.map__pin'); // и к элементам внутри обертки

  // НОВЫЕ, СГЕНЕРИРОВАННЫЕ ОБЪЕКТЫ
  var allPins = document.createElement('div'); // создали переменную в которую сложим сгенерированные пины
  var fragmentPins = document.createDocumentFragment(); // создали фрагмент для вставки всех пинов за раз

  var renderPin = function (pin) { // функция для генирации одного пина
    var pinElement = pinTemplate.cloneNode(true); // копируем теиплейт

    pinElement.id = pin.id.pin;
    pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px;' + 'top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.addEventListener('click', function () { // функция для генерации слушателя для каждого пина
      var actualAd = window.util.tokyoMap.querySelector('article');
      if (activePin !== null) {
        activePin.classList.remove('map__pin--active');
      }
      activePin = pinElement;
      pinElement.classList.add('map__pin--active');

      if (actualAd === null) {
        window.adds.insertAd(pin.id.pin);
      } else {
        window.util.tokyoMap.removeChild(actualAd);
        window.adds.insertAd(pin.id.pin);
      }
    });
    return pinElement;
  };

  // ПОДСЧЕТ АДРЕСА МЕТКИ
  var pinLocation = (parseInt(mainPin.style.left, 10) - PIN_WIDTH / 2) + ' , ' + (parseInt(mainPin.style.top, 10) - PIN_HEIGHT);

  // РЕАЛИЗАЦИЯ ПЕРЕТАСКИВАНИЯ ПИНА
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var mapCoords = window.util.tokyoMap.querySelector('.map__overlay').getBoundingClientRect();
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
      window.util.addTextInField(window.util.addressField, pinLocation); // добавили адрес в форму
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pins = {
    mainPin: mainPin,
    allPins: allPins,
    insertPins: function () { // добавляем все пины
      for (var i = 0; i < window.adds.similarAds.length; i++) { // проходимся по всему массиву
        fragmentPins.appendChild(renderPin(window.adds.similarAds[i])); // добавляем пин во фрагмент
      }
      allPins.appendChild(fragmentPins); // записываем пины во фрагмент
      mapPins.appendChild(allPins); // вставляем фрагмент пинов в html
    }
  };
})();
