'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('../server/app');

var _app2 = _interopRequireDefault(_app);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//mport fs from 'fs';


var httpport = process.env.PORT || 3000;
//const httpsport = process.env.PORT || 8443;
// let key = fs.readFileSync(__dirname, '../selfsigned.key');
// let cert = fs.readFileSync(__dirname, '../selfsigned.crt');

// let credentials = {
//     key,
//     cert
// }

//import https from 'https';
var httpServer = _http2.default.createServer(_app2.default);
//let httpsServer = https.createServer(credentials, app);


httpServer.listen(httpport, function () {
  return console.log("Server running on localhost:" + httpport);
});
//httpsServer.listen( httpsport, () => console.log("HTTPS Server running on localhost:" + httpsport) );

exports.default = httpServer;