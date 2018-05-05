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

    switch (housingType.value) {
      case 'flat':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.type === 'flat';
        });
        break;
      case 'house':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.type === 'house';
        });
        break;
      case 'bungalo':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.type === 'bungalo';
        });
        break;
    }

    switch (housingPrice.value) {
      case 'low':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.price < 10000;
        });
        break;
      case 'middle':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.price >= 10000 && ad.offer.price < 50000;
        });
        break;
      case 'high':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.price > 50000;
        });
        break;
    }

    switch (housingRooms.value) {
      case '1':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.rooms === 1;
        });
        break;
      case '2':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.rooms === 2;
        });
        break;
      case '3':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.rooms === 3;
        });
        break;
    }

    switch (housingGuests.value) {
      case '1':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.guests === 1;
        });
        break;
      case '2':
        workingArray = workingArray.filter(function (ad) {
          return ad.offer.guests === 2;
        });
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

  var lastTimeout;

  // СЛУШАТЕЛИ ФИЛЬТРОВ
  housingType.addEventListener('input', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingPrice.addEventListener('input', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingRooms.addEventListener('input', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingGuests.addEventListener('input', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingWiFi.addEventListener('click', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingDishwasher.addEventListener('click', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingParking.addEventListener('click', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingWasher.addEventListener('click', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingElevator.addEventListener('click', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });
  housingConditioner.addEventListener('click', function () {
    window.util.resetMap();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateAdds(backendArr);
    }, 500);
  });

  window.filters = {
    resetFilters: resetFilters
  };
})();
