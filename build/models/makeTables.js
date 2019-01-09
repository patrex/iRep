'use strict';

var _pg = require('pg');

var connectionString = process.env.DATABASE_URL;

var client = new _pg.Client({
  connectionString: connectionString
});

var tables = 'CREATE TABLE IF NOT EXISTS\n    users(\n      id SERIAL PRIMARY KEY,\n      firstname VARCHAR(128) NOT NULL,\n      lastname VARCHAR(128) NOT NULL,\n      othernames VARCHAR(128) NOT NULL,\n      email VARCHAR(128) NOT NULL UNIQUE,\n      phone VARCHAR(128) NOT NULL UNIQUE,\n      username VARCHAR(128) NOT NULL UNIQUE,\n      password VARCHAR(256) NOT NULL,\n      registered timestamptz NOT NULL,\n      is_admin boolean\n    );\n\nCREATE TYPE status AS ENUM(\'rejected\', \'under-investigation\', \'resolved\');\n    \nCREATE TABLE IF NOT EXISTS\n  images(\n    id SERIAL,\n    owner INT NOT NULL,\n    title varchar(128),\n    uploaded_on timestamptz NOT NULL,\n    foreign key (owner) references users(id),\n    primary key(owner, title)\n);\n\nCREATE TABLE IF NOT EXISTS\n  interventions(\n    id SERIAL PRIMARY KEY,\n    creadted_on timestamptz NOT NULL,\n    created_by VARCHAR(128) NOT NULL,\n    location point,\n    current_status status,\n    comment text,\n    foreign key (created_by) references users(username)\n  );\n\nCREATE TABLE IF NOT EXISTS\n  redflags(\n    id SERIAL PRIMARY KEY,\n    creadted_on timestamptz NOT NULL,\n    created_by VARCHAR(128) NOT NULL,\n    location point,\n    current_status status,\n    comment text,\n    foreign key (created_by) references users(username)\n  );';

try {
  client.connect();
  client.query(tables).then(function (res) {
    return client.end();
  }, function (rej) {
    console.log('Operation failed');
    console.log(rej);
    client.end();
  });
} catch (err) {
  console.log(err.message);
}
