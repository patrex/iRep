var express = require('express');
var router = require('./routes/main.js');
var bodyParser = require('body-parser');

const server = express();

server.use(router);
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.port || 3000;
server.listen(port, () => console.log("Server running on localhost:" + port));

module.exports = server;