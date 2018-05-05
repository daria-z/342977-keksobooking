'use strict';

(function () {
  var deleteErrorMessage = function () { // удаление сообщения об ошибке
    var body = document.querySelector('body');
    var errorDiv = document.querySelector('.errorMessage');
    body.removeChild(errorDiv);
  };

  var generateRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться');
    });
    return xhr;
  };

  var generateRequestSave = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          window.form.successMessage.classList.remove('hidden'); // показали сообщение об успешной отправке
          setTimeout(window.form.deleteSuccessMessage, 1500); // скрыли сообщение об успешной отправке
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться');
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = generateRequest(onLoad, onError);
      xhr.timeout = 10000;
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = generateRequestSave(onLoad, onError);
      xhr.timeout = 10000;
      xhr.open('POST', URL);
      xhr.send(data);
    },
    onErrorMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.classList.add('errorMessage');
      node.style.zIndex = 100;
      node.style.width = '50%';
      node.style.transform = 'translateX(-50%) translateY(-50%)';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.backgroundColor = '#e74c3c';
      node.style.fontWeight = 'bold';
      node.style.position = 'fixed';
      node.style.top = '50%';
      node.style.left = '50%';
      node.style.fontSize = '28px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
      setTimeout(deleteErrorMessage, 1500);
    }
  };
})();
