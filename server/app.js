import express from 'express';
import path from 'path';
import router from './routes/redFlagRouter';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', router);

module.exports = app;