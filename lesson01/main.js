const express = require('express');
const app = express();
const userController = require('./controllers/UserController');
const homeController = require('./controllers/HomeController');

app.set('view engine', 'ejs');

const layout = require('express-ejs-layouts');

app.use(layout);

app.get('/', homeController.doGetHome);

app.get('/login', userController.doGetLogin);

app.get('/register', userController.doGetRegister);

app.listen(3000);

console.log('server started');
