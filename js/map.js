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

var getFeatures = function () {
  var featuresArray = []; // массив актуальных фич
  for (var i = 1; i <= getRandomNumber(PLACE_FEATURES.length); i++) { // цикл для генерации массива актуальных фич из массива возможных фич
    var index = getRandomNumber(PLACE_FEATURES.length); // выбираем индекс случайного элемента массива
    var placeFeature = PLACE_FEATURES.slice(index, index + 1); // копируем рандомный элемент из массива возможных фич
    featuresArray.push(placeFeature); // вставляем элемент в массив актуальных фич
  }
  return featuresArray;
};

var mixPhotos = function () {
  var photosArray = PLACE_PHOTOS.slice(0);
  photosArray.reverse();
  return photosArray;
};

var generateObject = function () { // функция для генерации одного объекта массива предложений
  var objectResult = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + Math.floor(Math.random() * 8 + 1) + '.png'
    },
    'offer': {
      'title': AD_TITLES[getRandomNumber(AD_TITLES.length)],
      'address': OBJECT_LOCATION_X + ', ' + OBJECT_LOCATION_Y,
      'price': Math.floor(Math.random() * 1000 + 1) * 1000,
      'type': PLACE_TYPES[getRandomNumber(PLACE_TYPES.length)],
      'rooms': Math.floor(Math.random() * 5 + 1),
      'guests': Math.floor(Math.random() * 20 + 1),
      'checkin': CHECKIN_TIMES[getRandomNumber(CHECKIN_TIMES.length)],
      'checkout': CHECKOUT_TIMES[getRandomNumber(CHECKOUT_TIMES.length)],
      'features': getFeatures(),
      'description': '',
      'photos': mixPhotos()
    },
    'location': {
      'x': OBJECT_LOCATION_X,
      'y': OBJECT_LOCATION_Y
    }
  };

  return objectResult;
};

var similarObjects = []; // массив предложений

for (var j = 0; j <= 8; j++) { // цикл для генерации массива актуальных предложений
  var object = generateObject(); // генирируем актуальный объект
  similarObjects.push(object); // Записываем актуальный объект в массив
}
