'use strict';

(function () {
  window.util = {
    tokyoMap: document.querySelector('.map'),
    addressField: document.getElementById('address'),
    addTextInField: function (where, what) { // добавление текста в поле
      where.value = what;
    },
  };
})();
