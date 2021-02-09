const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userController = require('./controllers/UserController');
const homeController = require('./controllers/HomeController');
const validateNewUser = require('./validators/NewUserValidator');

app.set('view engine', 'ejs');

const layout = require('express-ejs-layouts');
const UserController = require('./controllers/UserController');

app.use(layout);

//POST処理用
app.use(bodyParser.urlencoded({ extended: false }));

//Sessionスコープ利用用
const expressSession = require('express-session'),
  cookieParser = require('cookie-parser'),
  connectFlash = require('connect-flash');

app.use(cookieParser('secretpassfortest'));

app.use(
  expressSession({
    secret: 'secretpassfortest',
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(connectFlash());

//どのパスに対してもログインユーザー名のパラメータを設定する
app.use(userController.doCheckLoggedUser);

app.get('/home', homeController.doGetHome);
app.get('/', userController.doGetLogin);
app.post('/login', userController.doPostLogin);
app.get('/login', userController.doGetLogin);
app.get('/register', userController.doGetRegister);
app.post('/register', validateNewUser, userController.doPostRegister);

app.listen(3000);

console.log('server started');
