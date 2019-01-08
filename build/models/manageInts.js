"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require("pg");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO: always check if respective table exists
var Incidents = function () {
  function Incidents() {
    _classCallCheck(this, Incidents);
  }

  _createClass(Incidents, [{
    key: "returnAll",
    value: async function returnAll() {
      var connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      var client = new _pg.Client({
        connectionString: connectionString
      });

      var sql = "SELECT * FROM interventions";
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
      var connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      var client = new _pg.Client({
        connectionString: connectionString
      });

      var sql = "SELECT * FROM interventions WHERE id=$1";
      var values = ["" + id];
      var Result = void 0;

      try {
        client.connect();
        Result = await client.query(sql, values);
        client.end();
        return Result.rows;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: "create",
    value: async function create(int) {
      var connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      var client = new _pg.Client({
        connectionString: connectionString
      });

      var sql = "INSERT INTO interventions(created_by, creadted_on, current_status, location, comment) VALUES($1, $2, $3, $4, $5)";
      var values = ["" + int.createdBy, "now", "" + int.status, "" + int.location, "" + int.desc];

      try {
        client.connect();
        var Result = await client.query(sql, values);
        return Result;
      } catch (err) {
        console.error(err);
      }
    }
  }, {
    key: "delete",
    value: async function _delete(id) {
      var connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      var client = new _pg.Client({
        connectionString: connectionString
      });

      var sql = "DELETE FROM interventions WHERE id=$1";

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
    value: async function changeStatus(int) {
      var connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      var client = new _pg.Client({
        connectionString: connectionString
      });

      var Result = void 0;

      var sql = "UPDATE interventions SET status=$1 WHERE id=$2";
      var values = ["" + int.status, "" + int.id];

      try {
        client.connect();

        Result = client.query(sql, values);
        client.end();
        return Result;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: "comment",
    value: async function comment(int) {
      var connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      var client = new _pg.Client({
        connectionString: connectionString
      });

      var Result = void 0;

      var sql = "UPDATE interventions SET comment=$1 WHERE id=$2";
      var values = ["" + int.comments, "" + int.rID];

      try {
        client.connect();

        Result = await client.query(sql, values);
        client.end();
        return Result;
      } catch (err) {
        console.error(err.message);
      }
    }
  }, {
    key: "location",
    value: async function location(int) {
      var connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      var client = new _pg.Client({
        connectionString: connectionString
      });

      var _int$location$split = int.location.split(','),
          _int$location$split2 = _slicedToArray(_int$location$split, 2),
          a = _int$location$split2[0],
          b = _int$location$split2[1];

      var Result = void 0;

      var sql = "UPDATE interventions SET location=point($1,$2) WHERE id=$3";
      var values = ["" + a, "" + b, "" + int.rID];

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

  return Incidents;
}();

exports.default = new Incidents();