import express from 'express';
import router from './routes/redFlagRouter';

const server = express();

server.use(express.static('.'));
server.use(express.json());
server.use(express.urlencoded({extended:false}));

server.use('/', router);

const port = process.env.port || 3000;
server.listen( port, () => console.log("Server running on localhost:" + port) );

module.exports = server;