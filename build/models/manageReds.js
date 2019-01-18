"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require("pg");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO: always check if respective table exists
var RedFlags = function () {
  function RedFlags() {
    _classCallCheck(this, RedFlags);
  }

  _createClass(RedFlags, [{
    key: "returnAll",
    value: async function returnAll(username) {
      var connectionString = process.env.DATABASE_URL;

      var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
      });

      var sql = "SELECT * FROM redflags";
      var Result = void 0;

      try {
        client.connect();
        Result = await client.query(sql);
        client.end();
        return Result.rows;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: "getOne",
    value: async function getOne(id) {
      var sql = "SELECT * FROM redflags WHERE id=$1";
      var Result = void 0;

      try {
        client.connect();
        Result = client.query(sql, ["" + id]);
        client.end();
        return Result.rows;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: "create",
    value: async function create(red) {
      var connectionString = process.env.DATABASE_URL;

      var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
      });

      var Result = void 0;

      var sql = "INSERT INTO redflags(creadted_on, created_by, location, current_status, comment) VALUES($1, $2, $3, $4, $5)";
      var values = ['now', "" + red.createdBy, "" + red.location, "" + red.status, "" + red.comment];

      try {
        client.connect();

        Result = await client.query(sql, values);
        client.end();
        return Result;
      } catch (err) {
        console.error(err.message);
        client.end();
      }
    }
  }, {
    key: "delete",
    value: async function _delete(id) {
      var connectionString = process.env.DATABASE_URL;

      var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
      });

      var sql = "DELETE FROM redflags WHERE id=$1";

      try {
        client.connect();
        var Result = await client.query(sql, [id]);
        client.end();
        return Result;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: "changeStatus",
    value: async function changeStatus(red) {
      var connectionString = process.env.DATABASE_URL;

      var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
      });

      var sql = "UPDATE redflags SET status=$1 WHERE id=$2";
      var values = ["" + red.status, "" + red.id];

      try {
        client.connect();

        var Result = await client.query(sql, values);
        client.end();
        return Result;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: "comment",
    value: async function comment(red) {
      var connectionString = process.env.DATABASE_URL;

      var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
      });

      var sql = "UPDATE redflags SET comment=$1 WHERE id=$2";
      var values = ["" + red.comment, "" + red.id];

      try {
        client.connect();

        var Result = await client.query(sql, values);
        client.end();
        return Result;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: "location",
    value: async function location(red) {
      var connectionString = process.env.DATABASE_URL;

      var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
      });

      var _int$location$split = int.location.split(','),
          _int$location$split2 = _slicedToArray(_int$location$split, 2),
          a = _int$location$split2[0],
          b = _int$location$split2[1];

      var Result = void 0;

      var sql = "UPDATE redflags SET location=point($1,$2) WHERE id=$3";
      var values = ["" + a, "" + b, "" + red.rID];

      try {
        client.connect();

        Result = await client.query(sql, values);
        client.end();
        return Result;
      } catch (err) {
        console.error(err.message);
      }
    }
  }]);

  return RedFlags;
}();

exports.default = new RedFlags();
