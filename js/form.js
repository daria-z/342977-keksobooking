'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formCheckIn = form.querySelector('#timein');
  var formCheckOut = form.querySelector('#timeout');
  var formRooms = form.querySelector('#room_number');
  var formGuests = form.querySelector('#capacity');
  var formFieldset = form.querySelectorAll('fieldset');
  var successMessage = document.querySelector('.success');

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

  formGuests.addEventListener('input', function () { // соответсвие кол-ва гостей комнатам
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

  formRooms.addEventListener('input', function () { // соответсвие кол-ва гостей комнатам
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

  formRooms.addEventListener('input', function () { // блокировка выбора не подходящих условий
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

  var addFormDisabled = function () { // заблокировали форму
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = 'true';
    }
  };

  var removeFormDisabled = function () { // отменяет неактивное состояние формы
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = '';
    }
    form.classList.remove('ad-form--disabled');
  };

  var resetForm = function () { // сброс формы
    form.reset();
    window.util.removeAllChildren(window.photo.previewPlace);
    window.filters.resetFilters();
    window.photo.previewAvatar.src = 'img/muffin-grey.svg';
    window.util.addTextInField(window.util.addressField, window.pins.pinButtonLocation);
  };

  var deleteSuccessMessage = function () { // удаление сообщения об успешной отпрвке
    successMessage.classList.add('hidden');
  };

  form.addEventListener('reset', function () { // все события при сбросе формы
    window.util.resetMap();
    resetForm();
    window.util.setStartCondition();
  });

  form.addEventListener('submit', function (evt) { // все события при отправке формы
    evt.preventDefault();
    window.backend.save(new FormData(form), resetForm, window.backend.onErrorMessage);
    successMessage.classList.remove('hidden');
    setTimeout(deleteSuccessMessage, 1500);
  });

  window.form = {
    form: form,
    addFormDisabled: addFormDisabled,
    removeFormDisabled: removeFormDisabled
  };
})();
