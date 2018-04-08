'use strict';

var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = CHECKIN_TIMES;
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // как расположить стоки в произвольном порядке
var OBJECT_LOCATION_X = Math.floor((Math.random() * 2 + 1) * 300);
var OBJECT_LOCATION_Y = Math.floor((Math.random() * 35 + 15) * 10);

var getRandomNumber = function (lengthOfArray) {
  return Math.floor(Math.random() * lengthOfArray);
}; // выбор случайного числа из массива

var generateObject = function () { // функция для генерации одного объекта массива предложений
  var objectResult = {};
  objectResult.offer.title = AD_TITLES[getRandomNumber(AD_TITLES.length)];
  objectResult.offer.address = OBJECT_LOCATION_X + ', ' + OBJECT_LOCATION_Y;
  objectResult.offer.price = Math.floor(Math.random() * 1000 + 1) * 1000;
  objectResult.offer.type = PLACE_TYPES[getRandomNumber(PLACE_TYPES.length)];
  objectResult.offer.rooms = Math.floor(Math.random() * 5 + 1);
  objectResult.offer.guests = Math.floor(Math.random() * 20 + 1);
  objectResult.offer.checkin = CHECKIN_TIMES[getRandomNumber(CHECKIN_TIMES.length)];
  objectResult.offer.checkout = CHECKOUT_TIMES[getRandomNumber(CHECKOUT_TIMES.length)];
  objectResult.offer.features = featuresArray; // массив актуальных фич
  objectResult.offer.description = '';
  objectResult.offer.photos = PLACE_PHOTOS.reverse(); // меняем местами порядок фотографий
  objectResult.location.x = OBJECT_LOCATION_X;
  objectResult.location.y = OBJECT_LOCATION_Y;
  return objectResult;
};

var objects = []; // массив предложений
var featuresArray = []; // массив актуальных фич

for (var i = 1; i <= getRandomNumber(PLACE_FEATURES.length); i++) { // цикл для генерации массива актуальных фич из массива возможных фич
  var placeFeature = PLACE_FEATURES.slice(PLACE_FEATURES[getRandomNumber(PLACE_FEATURES.length)], (PLACE_FEATURES[getRandomNumber(PLACE_FEATURES.length)] + 1)); // копируем рандомный элемент из массива возможных фич
  featuresArray.push(placeFeature); // вставляем элемент в массив актуальных фич
}

for (var j = 0; j <= 8; j++) { // цикл для генерации массива актуальных предложений
  var object = generateObject(); // генирируем актуальный объект
  objects.push(object); // Записываем актуальный объект в массив
}
