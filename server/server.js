import app from '../server/app';
//import https from 'https';
import http from 'http';
//mport fs from 'fs';



const httpport = process.env.PORT || 3000;
//const httpsport = process.env.PORT || 8443;
// let key = fs.readFileSync(__dirname, '../selfsigned.key');
// let cert = fs.readFileSync(__dirname, '../selfsigned.crt');

// let credentials = {
//     key,
//     cert
// }

let httpServer = http.createServer(app);
//let httpsServer = https.createServer(credentials, app);


httpServer.listen( httpport, () => console.log("Server running on localhost:" + httpport) );
//httpsServer.listen( httpsport, () => console.log("HTTPS Server running on localhost:" + httpsport) );

export default httpServer;