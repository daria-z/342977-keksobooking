'use strict';

(function () {

  window.util.setStartCondition();
  window.adds.renderFirstNotice();
  window.adds.adClose();

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

  var updateAdds = function (data) {
    var backendAdds = data;
    switch (housingType.value) {
      case 'any':
        var typeArr = backendAdds.filter(function (ad) {
          return ad.offer.type === 'flat' || ad.offer.type === 'house' || ad.offer.type === 'bungalo';
        });
        break;
      case 'flat':
        typeArr = backendAdds.filter(function (ad) {
          return ad.offer.type === 'flat';
        });
        break;
      case 'house':
        typeArr = backendAdds.filter(function (ad) {
          return ad.offer.type === 'house';
        });
        break;
      case 'bungalo':
        typeArr = backendAdds.filter(function (ad) {
          return ad.offer.type === 'bungalo';
        });
        break;
    }

    switch (housingPrice.value) {
      case 'any':
        var priceArr = typeArr.filter(function (ad) {
          return ad.offer.price >= 0;
        });
        break;
      case 'low':
        priceArr = typeArr.filter(function (ad) {
          return ad.offer.price < 10000;
        });
        break;
      case 'middle':
        priceArr = typeArr.filter(function (ad) {
          return ad.offer.price >= 10000 && ad.offer.price < 50000;
        });
        break;
      case 'high':
        priceArr = typeArr.filter(function (ad) {
          return ad.offer.price > 50000;
        });
        break;
    }

    switch (housingRooms.value) {
      case 'any':
        var roomsArr = priceArr.filter(function (ad) {
          return ad.offer.rooms >= 0;
        });
        break;
      case '1':
        roomsArr = priceArr.filter(function (ad) {
          return ad.offer.rooms === 1;
        });
        break;
      case '2':
        roomsArr = priceArr.filter(function (ad) {
          return ad.offer.rooms === 2;
        });
        break;
      case '3':
        roomsArr = priceArr.filter(function (ad) {
          return ad.offer.rooms === 3;
        });
        break;
    }

    switch (housingGuests.value) {
      case 'any':
        var guestsArr = roomsArr.filter(function (ad) {
          return ad.offer.guests >= 0;
        });
        break;
      case '1':
        guestsArr = roomsArr.filter(function (ad) {
          return ad.offer.guests === 1;
        });
        break;
      case '2':
        guestsArr = roomsArr.filter(function (ad) {
          return ad.offer.guests === 2;
        });
        break;
    }

    if (housingWiFi.checked) {
      var wifiArr = guestsArr.filter(function (ad) {
        return ad.offer.features === 'wifi';
      });
    } else {
      wifiArr = guestsArr;
    }

    if (housingDishwasher.checked) {
      var dishwasherArr = wifiArr.filter(function (ad) {
        return ad.offer.features === 'dishwasher';
      });
    } else {
      dishwasherArr = wifiArr;
    }

    if (housingParking.checked) {
      var parkingArr = dishwasherArr.filter(function (ad) {
        return ad.offer.features === 'parking';
      });
    } else {
      parkingArr = dishwasherArr;
    }

    if (housingWasher.checked) {
      var washerArr = parkingArr.filter(function (ad) {
        return ad.offer.features === 'washer';
      });
    } else {
      washerArr = parkingArr;
    }

    if (housingElevator.checked) {
      var elevatorArr = washerArr.filter(function (ad) {
        return ad.offer.features === 'elevator';
      });
    } else {
      elevatorArr = washerArr;
    }

    if (housingConditioner.checked) {
      var conditionerArr = elevatorArr.filter(function (ad) {
        return ad.offer.features === 'conditioner';
      });
    } else {
      conditionerArr = elevatorArr;
    }

    var lastArr = conditionerArr;

    window.pins.insertPins(lastArr);
  };


  housingType.addEventListener('input', function () {
    if (window.pins.allPins === null) {
      window.adds.renderFirstNotice();
      window.backend.load(updateAdds, window.backend.onErrorMessage);
    } else {
      window.util.resetPins();
      window.util.resetNotice();
      window.adds.renderFirstNotice();
      window.backend.load(updateAdds, window.backend.onErrorMessage);
    }
  });
  housingPrice.addEventListener('input', function () {
    if (window.pins.allPins === null) {
      window.backend.load(updateAdds, window.backend.onErrorMessage);
    } else {
      window.util.resetPins();
      window.util.resetNotice();
      window.backend.load(updateAdds, window.backend.onErrorMessage);
    }
  });
  housingRooms.addEventListener('input', function () {
    if (window.pins.allPins === null) {
      window.backend.load(updateAdds, window.backend.onErrorMessage);
    } else {
      window.util.resetPins();
      window.util.resetNotice();
      window.backend.load(updateAdds, window.backend.onErrorMessage);
    }
  });
  housingGuests.addEventListener('input', function () {
    if (window.pins.allPins === null) {
      window.backend.load(updateAdds, window.backend.onErrorMessage);
    } else {
      window.util.resetPins();
      window.util.resetNotice();
      window.backend.load(updateAdds, window.backend.onErrorMessage);
    }
  });
  housingWiFi.addEventListener('click', function () {
    window.util.resetPins();
    window.util.resetNotice();
    window.backend.load(updateAdds, window.backend.onErrorMessage);
  });
  housingDishwasher.addEventListener('click', function () {
    window.util.resetPins();
    window.util.resetNotice();
    window.backend.load(updateAdds, window.backend.onErrorMessage);
  });
  housingParking.addEventListener('click', function () {
    window.util.resetPins();
    window.util.resetNotice();
    window.backend.load(updateAdds, window.backend.onErrorMessage);
  });
  housingWasher.addEventListener('click', function () {
    window.util.resetPins();
    window.util.resetNotice();
    window.backend.load(updateAdds, window.backend.onErrorMessage);
  });
  housingElevator.addEventListener('click', function () {
    window.util.resetPins();
    window.util.resetNotice();
    window.backend.load(updateAdds, window.backend.onErrorMessage);
  });
  housingConditioner.addEventListener('click', function () {
    window.util.resetPins();
    window.util.resetNotice();
    window.backend.load(updateAdds, window.backend.onErrorMessage);
  });

})();
