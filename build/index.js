'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _redFlagRouter = require('./routes/redFlagRouter');

var _redFlagRouter2 = _interopRequireDefault(_redFlagRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

server.use(_express2.default.static('../UI'));
server.use(_express2.default.json());
server.use(_express2.default.urlencoded({ extended: false }));

server.use('/', _redFlagRouter2.default);

var port = process.env.PORT || 3000;
server.listen(port, function () {
  return console.log("Server running on localhost:" + port);
});

module.exports = server;