import express from 'express';
import router from ('./routes/main.js');
import bodyParser from ('body-parser');

const server = express();

server.use(router);
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.port || 3000;
server.listen(port, () => console.log("Server running on localhost:" + port));

export {server}