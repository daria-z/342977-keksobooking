'use strict';

(function () {
  var PIN_BUTTON_SIZE = 65;
  var pinPikeX = parseInt(window.pins.mainPin.style.left, 10) - PIN_BUTTON_SIZE / 2;
  var pinPikeY = parseInt(window.pins.mainPin.style.top, 10) - PIN_BUTTON_SIZE / 2;
  var pinButtonLocation = pinPikeX + ' , ' + pinPikeY;
  var userForm = document.querySelector('.ad-form');
  var formFieldset = userForm.querySelectorAll('fieldset');

  // ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРАНИЦЕЙ


  var cancelPageInactive = function () { // отменяет неактивное состояние страницы
    window.util.tokyoMap.classList.remove('map--faded');
    removeFormDisabled();
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

  // ОФОРМЛЕНИЕ ПИНА ПО КЛИКУ
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

  window.adds.generateSimilarAds(); // сгенерировали 8 похожишь объявлений
  switchGroupElementsClasses(window.pins.allPins, 'map__pin--active'); // добавили переключатель классов между пинами
  window.util.addTextInField(window.util.addressField, pinButtonLocation); // добавили адрес в форму
  addFormDisabled(); // заблокировали форму

  window.pins.mainPin.addEventListener('mousedown', function () { // перевели все в активное состояние по опусканию пина
    cancelPageInactive(); // разблокировали форму
    window.pins.insertPins(); // сгененрировали и добавили пины
  });
})();
