'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logout = exports.verifyToken = exports.isLoggedIn = exports.verifyAdmin = exports.checkLogin = exports.checkReg = undefined;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkReg(request, response, next) {
    if (!request.body.fname) {
        return response.status(400).json({
            message: 'You must enter at least a firstname'
        });
    } else if (!request.body.psw) {
        return response.status(400).json({
            message: 'No password set'
        });
    } else if (request.body.psw !== request.body.psw2) {
        return response.status(400).json({
            message: "Passwords don't match. Re-enter password"
        });
    } else next();
}

function checkLogin(request, response, next) {
    if (!request.body.username) {
        var string = _querystring2.default.stringify({
            status: 1,
            msg: 'Invalid username'
        });
        response.redirect('/?' + string);
    } else if (!request.body.pwd) {
        var _string = _querystring2.default.stringify({
            status: 1,
            msg: 'Invalid password'
        });
        response.redirect('/?' + _string);
    } else next();
}

function isLoggedIn(request, response, next) {
    if (!request.session.token) {
        var string = _querystring2.default.stringify({
            status: 1,
            msg: 'You are not logged in. qq'
        });
        response.redirect('/?' + string);
    } else {
        next();
    }
}

function verifyAdmin(request, response, next) {
    var user = request.session.user;
    var userJSON = JSON.parse(user);
    var isAdmin = userJSON.isAdmin;

    if (!isAdmin) {
        response.status(403).send('You don\'t have authorization to access this route');
    } else next();
}

function verifyToken(request, response, next) {
    var token = request.session.token;
    _jsonwebtoken2.default.verify(token, 'secret', function (err, res) {
        if (err) {
            var string = _querystring2.default.stringify({
                status: 1,
                msg: 'We could not verify you'
            });
            response.redirect('/?' + string);
        } else next();
    });
}

function logout(request, response, next) {
    if (request.session.token) {
        if (request.session.token) {
            request.session.destroy();
            response.redirect('/');
        }
    }
    next();
}

exports.checkReg = checkReg;
exports.checkLogin = checkLogin;
exports.verifyAdmin = verifyAdmin;
exports.isLoggedIn = isLoggedIn;
exports.verifyToken = verifyToken;
exports.logout = logout;