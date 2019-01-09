'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var salt = _bcryptjs2.default.genSaltSync();

app.use((0, _expressSession2.default)({
    secret: salt,
    resave: true,
    saveUninitialized: true
}));

app.use(_express2.default.static(_path2.default.join(__dirname, '../public/')));

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.use('/', _router2.default);

module.exports = app;