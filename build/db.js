"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParse: true,
  useFindModify: false
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  console.log('Connected to DB');
};

var handleError = function handleError(error) {
  console.log("Error on DB Connection: ".concat(error));
};

db.once('open', handleOpen);
db.on('error', handleError);