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
  window.backend.load(downloadArray, window.backend.onErrorMessage);

  var updateAdds = function (data) {
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

    // if (housingWiFi.checked) {
    //   var wifiArr = guestsArr.filter(function (ad) {
    //     return ad.offer.features === 'wifi';
    //   });
    // }
    //
    // if (housingDishwasher.checked) {
    //   workingArray = workingArray.filter(function (ad) {
    //     return ad.offer.features === 'dishwasher';
    //   });
    // }
    //
    //
    // if (housingParking.checked) {
    //   workingArray = workingArray.filter(function (ad) {
    //     return ad.offer.features === 'parking';
    //   });
    // }
    //
    // if (housingWasher.checked) {
    //   workingArray = workingArray.filter(function (ad) {
    //     return ad.offer.features === 'washer';
    //   });
    // }
    //
    // if (housingElevator.checked) {
    //   workingArray = workingArray.filter(function (ad) {
    //     return ad.offer.features === 'elevator';
    //   });
    // }
    //
    // if (housingConditioner.checked) {
    //   workingArray = workingArray.filter(function (ad) {
    //     return ad.offer.features === 'conditioner';
    //   });
    // }
    //
    // arrAds -  массив прошедший предыдущие фильтры
    var filterAdFeatures = function (arrAds) {
      var featuresChecked = mapFilters.querySelectorAll('#housing-features [type="checkbox"]:checked'); // выбираем все отмеченные удобства в массив
      var featuresChoice = arrAds;
      [].forEach.call(featuresChecked, function (item) { //  для каждого отмеченного удобства запускаем фильтр по массиву объявлений
        featuresChoice = featuresChoice.filter(function (it) {
          return it.offer.features.indexOf(item.value) >= 0;
        });
      });
      return featuresChoice;
    };
    filterAdFeatures(workingArray);
    window.pins.insertPins(workingArray);
    // window.adds.getTextInNotice(workingArray);
    return workingArray;
  };


  housingType.addEventListener('input', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingPrice.addEventListener('input', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingRooms.addEventListener('input', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingGuests.addEventListener('input', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingWiFi.addEventListener('click', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingDishwasher.addEventListener('click', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingParking.addEventListener('click', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingWasher.addEventListener('click', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingElevator.addEventListener('click', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
  housingConditioner.addEventListener('click', function () {
    window.util.resetMap();
    updateAdds(backendArr);
  });
})();
