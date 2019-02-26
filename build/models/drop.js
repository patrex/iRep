'use strict';

var _pg = require('pg');

var connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

var client = new _pg.Client({
    connectionString: connectionString
});

var sql = 'drop table images, interventions, redflags, users; drop type status';

client.connect();
client.query(sql).then(function (res) {
    return client.end();
}, function (rej) {
    console.log('Operation failed');
    client.end();
});