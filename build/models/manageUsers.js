'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require('pg');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, [{
    key: 'addUser',
    value: async function addUser(usr) {
      var flag = false;
      var connectionString = process.env.DATABASE_URL;

      var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
      });

      try {
        client.connect();
        var query = 'INSERT INTO users(firstname, lastname, othernames, email, phone, registered, isadmin, password, username) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        var values = ['' + usr.firstname, '' + usr.lastname, '' + usr.othernames, '' + usr.email, '' + usr.phone, 'now', '' + usr.isAdmin, '' + usr.pwd, '' + usr.usrname];
        var Result = await client.query(query, values);
        client.end();
        return Result;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: 'fetchData',
    value: async function fetchData(login) {
      var Result = void 0;
      var connectionString = process.env.DATABASE_URL;

      var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
      });

      var sql = 'SELECT * FROM users WHERE username=$1';
      var values = ['' + login.usr];

      try {
        client.connect();
        Result = await client.query(sql, values);
        client.end();
        return Result.rows;
      } catch (error) {
        console.log(error);
      }
    }
  }]);

  return Users;
}();

exports.default = new Users();
