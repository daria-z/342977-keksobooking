'use strict';

(function () {

  var userForm = document.querySelector('.ad-form');
  var formFieldset = userForm.querySelectorAll('fieldset');
  var adTemplate = document.querySelector('template') // находим шаблон объявления и записываем в переменную
      .content // обращаемся к обертке
      .querySelector('.map__card'); // и к элементам внутри обертки

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

  var renderAd = function () { // функция для генирации одного объявления в темплейт на осове данных из массива
    var adElement = adTemplate.cloneNode(true); // копируем теиплейт
    window.util.tokyoMap.appendChild(adElement);
    var firstAdd = window.util.tokyoMap.querySelector('article');
    firstAdd.classList.add('hidden');
  };

  window.util.addTextInField(window.util.addressField, window.pins.pinButtonLocation); // добавили адрес в форму
  addFormDisabled(); // заблокировали форму

  window.pins.mainPin.addEventListener('mousedown', function () { // перевели все в активное состояние по опусканию пина
    cancelPageInactive(); // разблокировали форму
    renderAd();
    window.backend.load(window.pins.insertPins, window.backend.onErrorMessage);
    window.adds.adClose();
  });

})();
