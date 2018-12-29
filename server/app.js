import express from 'express';
import path from 'path';
import router from './routes/router';
import session from 'express-session'
import bc from 'bcryptjs';

const app = express();

const salt = bc.genSaltSync();

app.use(session({
    secret: salt,
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', router);

module.exports = app;