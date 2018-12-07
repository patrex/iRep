import express from 'express';
import router from './routes/redFlagRouter';
import bodyParser from 'body-parser';

const server = express();

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', router);

const port = process.env.port || 3000;
server.listen(port, () => console.log("Server running on localhost:" + port));

export default server;