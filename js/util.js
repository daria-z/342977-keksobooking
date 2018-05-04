'use strict';

(function () {

  var addTextInField = function (where, what) { // добавление текста в поле
    where.value = what;
  };

  var setStartCondition = function () {
    window.util.tokyoMap.classList.add('map--faded'); // блокируется карта
    window.pins.mainPin.style.top = 375 + 'px'; // прокидываются стартовые координаты метке
    window.pins.mainPin.style.left = 570 + 'px';
    window.util.addTextInField(window.util.addressField, window.pins.pinButtonLocation); // добавляется адрес метки в форму
    window.form.addFormDisabled(); // заблокировали форму
    window.pins.mainPin.addEventListener('mousedown', onMainPinClick); // слушатель нажатия на главный пин
  };

  var cancelPageInactive = function () { // отменяет неактивное состояние страницы
    window.util.tokyoMap.classList.remove('map--faded');
    window.form.removeFormDisabled();
  };

  var onMainPinClick = function () {
    cancelPageInactive(); // разблокировали форму
    window.backend.load(window.pins.insertPins, window.backend.onErrorMessage);
    window.pins.mainPin.removeEventListener('mousedown', onMainPinClick);
  };

  var resetPins = function () {
    window.util.fragmentPins = null;
    var allPinsParent = window.util.tokyoMap.querySelector('.map__pins');
    var pinsFragment = allPinsParent.querySelector('.map__allPins');
    window.adds.removeAllChildren(pinsFragment);
  };

  var resetNotice = function () {
    var noticeFragment = window.util.tokyoMap.querySelector('.map__card');
    window.util.tokyoMap.removeChild(noticeFragment);
  };

  var resetMap = function () {
    resetPins();
    resetNotice();
    window.adds.renderFirstNotice();
    window.adds.adClose();
  };


  window.util = {
    tokyoMap: document.querySelector('.map'),
    addressField: document.getElementById('address'),
    addTextInField: addTextInField,
    setStartCondition: setStartCondition,
    resetMap: resetMap
  };
})();
