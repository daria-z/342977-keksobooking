'use strict';

(function () {

  var adTemplate = document.querySelector('template') // находим шаблон объявления и записываем в переменную
      .content // обращаемся к обертке
      .querySelector('.map__card'); // и к элементам внутри обертки

  // ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРАНИЦЕЙ

  var cancelPageInactive = function () { // отменяет неактивное состояние страницы
    window.util.tokyoMap.classList.remove('map--faded');
    window.form.removeFormDisabled();
  };

  var renderAd = function () { // функция для генирации одного объявления в темплейт на осове данных из массива
    var adElement = adTemplate.cloneNode(true); // копируем теиплейт
    window.util.tokyoMap.appendChild(adElement);
    var firstAdd = window.util.tokyoMap.querySelector('article');
    firstAdd.classList.add('hidden');
  };

  window.util.addTextInField(window.util.addressField, window.pins.pinButtonLocation); // добавили адрес в форму
  window.form.addFormDisabled(); // заблокировали форму

  window.pins.mainPin.addEventListener('mousedown', function () { // перевели все в активное состояние по опусканию пина
    cancelPageInactive(); // разблокировали форму
    window.backend.load(window.pins.insertPins, window.backend.onErrorMessage);
  });
  renderAd();
  window.adds.adClose();

})();
