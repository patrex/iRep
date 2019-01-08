'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _manageUsers = require('../models/manageUsers');

var _manageUsers2 = _interopRequireDefault(_manageUsers);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User() {
        _classCallCheck(this, User);
    }

    _createClass(User, [{
        key: 'createUser',
        value: async function createUser(request, response) {
            var pwd = request.body.psw;
            var firstname1 = request.body.fname;
            var passwordHash = undefined;
            var Result = void 0;

            var hash0 = new Promise(function (resolve) {
                resolve(_bcryptjs2.default.hash(pwd, 10));
            });

            passwordHash = await hash0;

            var user = {
                firstname: request.body.fname,
                lastname: request.body.lname,
                othernames: request.body.oname,
                email: request.body.email,
                phone: request.body.phone,
                pwd: passwordHash,
                isAdmin: false,
                usrname: firstname1.toLowerCase() + (new Date().getTime() % 1000).toString()
            };

            Result = await _manageUsers2.default.addUser(user);

            if (Result.rowCount > 0) {

                var string = _querystring2.default.stringify({
                    status: 0,
                    msg: 'Account creation successful'
                });
                response.redirect('/?' + string);
            } else {
                var _string = _querystring2.default.stringify({
                    status: 1,
                    msg: 'Your account could not be created'
                });
                response.redirect('/?' + _string);
            }
        }
    }, {
        key: 'logUserIn',
        value: async function logUserIn(request, response) {
            var active = 0;
            var usr = request.body.username;
            var pwd = request.body.pwd;

            var Result = void 0;

            Result = await _manageUsers2.default.fetchData({ usr: usr, pwd: pwd });

            try {
                _bcryptjs2.default.compare(pwd, Result[0].password).then(function (res) {
                    if (res == true) {
                        var user = {
                            usr: Result[0].username,
                            isAdmin: Result[0].is_admin
                        };
                        var token = _jsonwebtoken2.default.sign(user, 'secret');
                        request.session.user = JSON.stringify(user);
                        request.session.token = token;
                        active += 1;
                        console.log('Active users: ' + active);
                        console.log(request.session.usr);

                        var username = _querystring2.default.stringify({
                            user: user.usr
                        });

                        response.redirect('/profile?' + username);
                    } else {
                        var string = _querystring2.default.stringify({
                            status: 1,
                            msg: 'Authentication failed'
                        });
                        response.redirect('/?' + string);
                    }
                });
            } catch (err) {
                var string = _querystring2.default.stringify({
                    status: 1,
                    msg: 'Authentication failed'
                });
                response.redirect('/?' + string);
            }
        }
    }]);

    return User;
}();

exports.default = new User();