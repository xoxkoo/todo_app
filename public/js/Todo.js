"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import _trim from '../node_modules/lodash-es/each.js'  
var Todo = /*#__PURE__*/function () {
  function Todo(list, input) {
    _classCallCheck(this, Todo);

    this.list = list;
    this.input = input;
    this.text = '';
    this.id = '';
  }

  _createClass(Todo, [{
    key: "addNew",
    value: function addNew() {
      if (this.createNewNode()) {
        this.input.parentElement.parentElement.reset();
      }
    }
  }, {
    key: "createNewHtml",
    value: function createNewHtml() {
      return "\n      <li data-index=\"".concat(this.id, "\">\n        <p>").concat(this.text, "</p> \n        <a href=\"#\">x</a>\n      </li>\n    ").trim();
    }
  }, {
    key: "createNewNode",
    value: function createNewNode() {
      this.id = this.getNewIndex();
      this.text = this.input.value;

      if (this.validate()) {
        this.list.innerHTML += this.createNewHtml();
        return true;
      }
    }
  }, {
    key: "getLastIndex",
    value: function getLastIndex() {
      var lastEl = document.querySelector('li:last-child');
      return lastEl ? +lastEl.dataset.index : 0;
    }
  }, {
    key: "getNewIndex",
    value: function getNewIndex() {
      return this.getLastIndex() + 1;
    }
  }, {
    key: "validate",
    value: function validate() {
      return this.text.trim();
    }
  }, {
    key: "saveItems",
    value: function saveItems() {
      var _this = this;

      window.addEventListener('beforeunload', function (e) {
        localStorage.setItem('elements', _this.list.innerHTML.trim());
      });
    }
  }, {
    key: "getItems",
    value: function () {
      var _getItems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch('/app');

              case 2:
                _context.next = 4;
                return _context.sent.json();

              case 4:
                response = _context.sent;
                _context.next = 7;
                return this.getData();

              case 7:
                this.list.innerHTML = _context.sent;

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getItems() {
        return _getItems.apply(this, arguments);
      }

      return getItems;
    }()
    /**
    * get data and create elements
    */

  }, {
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch('/app');

              case 2:
                _context2.next = 4;
                return _context2.sent.json();

              case 4:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getData() {
        return _getData.apply(this, arguments);
      }

      return getData;
    }() //TODO - adding to database

  }, {
    key: "dataHandle",
    value: function dataHandle() {
      console.log(this.list);
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.list.innerHTML.trim())
      }; //sending stuff

      fetch('/app', options);
    }
  }]);

  return Todo;
}();

exports["default"] = Todo;