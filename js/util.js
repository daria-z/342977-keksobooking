'use strict';

(function () {
  var START_TOP = 375;
  var START_LEFT = 570;
  var ESC_KEY = 27;
  var tokyoMap = document.querySelector('.map');
  var addressField = document.querySelector('#address');

  var removeAllChildren = function (parent) { // удаляет всех детей parent
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  };

  var addTextInField = function (where, what) { // добавление текста в поле
    where.value = what;
  };

  var setStartCondition = function () {
    window.util.tokyoMap.classList.add('map--faded'); // блокируется карта
    window.pins.mainPin.style.top = START_TOP + 'px'; // прокидываются стартовые координаты метке
    window.pins.mainPin.style.left = START_LEFT + 'px';
    window.util.addTextInField(window.util.addressField, window.pins.pinButtonLocation); // добавляется адрес метки в форму
    window.form.addFormDisabled(); // заблокировали форму
    window.pins.mainPin.addEventListener('mousedown', onMainPinClick); // слушатель нажатия на главный пин
  };

  var cancelPageInactive = function () { // отменяет неактивное состояние страницы
    window.util.tokyoMap.classList.remove('map--faded');
    window.form.removeFormDisabled();
  };

  var onMainPinClick = function () { // действия нажатии на главный пин
    cancelPageInactive(); // разблокировали форму
    window.backend.load(window.pins.insertPins, window.backend.onErrorMessage); // загрузили данные
    window.pins.mainPin.removeEventListener('mousedown', onMainPinClick); // сняли слушатель
  };

  var resetPins = function () { // удаление пинов с карты
    var allPinsParent = window.util.tokyoMap.querySelector('.map__pins');
    var pinsFragment = allPinsParent.querySelector('.map__allPins');
    removeAllChildren(pinsFragment);
  };

  var resetNotice = function () { // удаление объявления с карты
    var noticeFragment = window.util.tokyoMap.querySelector('.map__card');
    window.util.tokyoMap.removeChild(noticeFragment);
  };

  var resetMap = function () {
    resetPins(); // удалили пины
    resetNotice(); // удалили объявление
    window.adds.renderFirstNotice(); // сгенерировали скрытую основу объявления
  };


  window.util = {
    tokyoMap: tokyoMap,
    addressField: addressField,
    ESC_KEY: ESC_KEY,
    removeAllChildren: removeAllChildren,
    addTextInField: addTextInField,
    setStartCondition: setStartCondition,
    resetMap: resetMap
  };
})();
