'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPlace = document.querySelector('#images');
  var previewPlace = document.querySelector('.ad-form__photo');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  fileChooserPlace.addEventListener('change', function () {
    var file = fileChooserPlace.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var placePhoto = document.createElement('img');
        placePhoto.style.width = 70 + 'px';
        placePhoto.style.height = 70 + 'px';
        previewPlace.appendChild(placePhoto);
        placePhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
