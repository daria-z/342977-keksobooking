'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters'); // нашли блок фльтров
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingWiFi = mapFilters.querySelector('#filter-wifi');
  var housingDishwasher = mapFilters.querySelector('#filter-dishwasher');
  var housingParking = mapFilters.querySelector('#filter-parking');
  var housingWasher = mapFilters.querySelector('#filter-washer');
  var housingElevator = mapFilters.querySelector('#filter-elevator');
  var housingConditioner = mapFilters.querySelector('#filter-conditioner');

  var backendArr = [];
  var downloadArray = function (data) {
    backendArr = data;
  };
  window.backend.load(downloadArray, window.backend.onErrorMessage); // скачали данные с сервера

  var filterAdFeatures = function (arrAds) { // фильтр по чекбоксам
    var featuresChecked = mapFilters.querySelectorAll('#housing-features [type="checkbox"]:checked'); // выбираем все отмеченные удобства в массив
    var featuresChoice = arrAds;
    [].forEach.call(featuresChecked, function (item) { //  для каждого отмеченного удобства запускаем фильтр по массиву объявлений
      featuresChoice = featuresChoice.filter(function (it) {
        return it.offer.features.indexOf(item.value) >= 0;
      });
    });
    return featuresChoice;
  };

  var updateAdds = function (data) { // фильтр по селектам
    var workingArray = data.slice();


    var filterSelects = function (type, what) {
      workingArray = workingArray.filter(function (ad) {
        switch (type) {
          case 'type':
            return ad.offer.type === what;
          case 'rooms':
            return ad.offer.rooms === what;
          case 'guests':
            return ad.offer.guests === what;
        }
        return ad.offer.type === what;
      });
    };

    var filterPrice = function (minPrice, maxPrice) {
      workingArray = workingArray.filter(function (ad) {
        return ad.offer.price >= minPrice && ad.offer.price < maxPrice;
      });
    };

    switch (housingType.value) {
      case 'flat':
        filterSelects('type', 'flat');
        break;
      case 'house':
        filterSelects('type', 'house');
        break;
      case 'bungalo':
        filterSelects('type', 'bungalo');
        break;
    }

    switch (housingPrice.value) {
      case 'low':
        filterPrice(0, 10000);
        break;
      case 'middle':
        filterPrice(10000, 50000);
        break;
      case 'high':
        filterPrice(50000, 100000000);
        break;
    }

    switch (housingRooms.value) {
      case '1':
        filterSelects('rooms', 1);
        break;
      case '2':
        filterSelects('rooms', 2);
        break;
      case '3':
        filterSelects('rooms', 3);
        break;
    }

    switch (housingGuests.value) {
      case '1':
        filterSelects('guests', 1);
        break;
      case '2':
        filterSelects('guests', 2);
        break;
    }

    workingArray = filterAdFeatures(workingArray);
    window.pins.insertPins(workingArray);
    return workingArray;
  };

  var resetFilters = function () { // сброс фильтров
    housingType.value = 'any';
    housingPrice.value = 'any';
    housingRooms.value = 'any';
    housingGuests.value = 'any';
    housingWiFi.checked = false;
    housingDishwasher.checked = false;
    housingParking.checked = false;
    housingWasher.checked = false;
    housingElevator.checked = false;
    housingConditioner.checked = false;
  };

  // СЛУШАТЕЛИ ФИЛЬТРОВ
  housingType.addEventListener('input', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });
  housingPrice.addEventListener('input', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });
  housingRooms.addEventListener('input', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });
  housingGuests.addEventListener('input', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });
  housingWiFi.addEventListener('click', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });
  housingDishwasher.addEventListener('click', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });
  housingParking.addEventListener('click', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });
  housingWasher.addEventListener('click', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });

  housingElevator.addEventListener('click', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });

  housingConditioner.addEventListener('click', function () {
    window.util.resetMap();
    window.util.debounce(updateAdds, backendArr);
  });

  window.filters = {
    resetFilters: resetFilters
  };
})();
