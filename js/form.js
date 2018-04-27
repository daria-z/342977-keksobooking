'use strict';

(function () {
  // ФУНКЦИИ ДЛЯ РАБОТЫ С ФОРМОЙ
  var form = document.querySelector('.ad-form');
  var formTitle = document.getElementById('title');
  var formType = document.getElementById('type');
  var formPrice = document.getElementById('price');
  var formCheckIn = document.getElementById('timein');
  var formCheckOut = document.getElementById('timeout');
  var formRooms = document.getElementById('room_number');
  var formGuests = document.getElementById('capacity');

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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      formTitle.removeAttribute('value');
    });
  });
})();
