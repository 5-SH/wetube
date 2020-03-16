"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.getElementById('jsAddComment');
var commentList = document.getElementById('jsCommentList');
var commentNumber = document.getElementById('jsCommentNumber');

var increaseNumber = function increaseNumber() {
  commentNumber.innerText = parseInt(commentNumber.innerHTML, 10) + 1;
};

var decreaseNumber = function decreaseNumber() {
  commentNumber.innerText = parseInt(commentNumber.innerHTML, 10) - 1;
};

var addComment = function addComment(comment, id) {
  var li = document.createElement('li');
  var span = document.createElement('span');
  var input = document.createElement('input');
  input.setAttribute('type', 'submit');
  input.setAttribute('value', 'delete');
  input.setAttribute('id', id);
  span.innerHTML = comment;
  li.appendChild(span);
  li.appendChild(input);
  commentList.prepend(li);

  var handleDeleteClick =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _axios["default"])({
                url: "/api/".concat(id, "/comment"),
                method: 'DELETE'
              });

            case 2:
              response = _context.sent;

              if (response.status === 200) {
                li.remove();
                decreaseNumber();
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleDeleteClick() {
      return _ref.apply(this, arguments);
    };
  }();

  input.addEventListener('click', handleDeleteClick);
  increaseNumber();
};

function sendComment(_x) {
  return _sendComment.apply(this, arguments);
}

function _sendComment() {
  _sendComment = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(comment) {
    var videoId, response, id;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            videoId = window.location.href.split('/videos/')[1];
            _context2.next = 3;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment"),
              method: 'POST',
              data: {
                comment: comment
              }
            });

          case 3:
            response = _context2.sent;

            if (response.status === 200) {
              id = response.data.id;
              addComment(comment, id);
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _sendComment.apply(this, arguments);
}

function handleSubmit(event) {
  event.preventDefault();
  var commentInput = addCommentForm.querySelector('input');
  var comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
}

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}