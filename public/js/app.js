'use strict';

var _Todo = _interopRequireDefault(require("./Todo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var form = document.querySelector('form'),
    input = document.querySelector('input[name=todo]'),
    list = document.querySelector('ul');
var todo = new _Todo["default"](list, input);
form.addEventListener('submit', function (e) {
  e.preventDefault();
  todo.addNew();
});
list.addEventListener('click', function (e) {
  if (e.target.localName === 'a') {
    e.target.parentElement.classList.add('animation');
    setTimeout(function () {
      e.target.parentElement.remove();
    }, 500);
  }
});
todo.dataHandle();
todo.getItems();