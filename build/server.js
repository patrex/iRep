"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require("../server/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
var server = _app2.default.listen(port, function () {
  return console.log("Server running on localhost:" + port);
});

exports.default = server;