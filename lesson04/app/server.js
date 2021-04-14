const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const router = require('./routes/index');
var cookieParser = require('cookie-parser');
const app = express();
const errorController = require('./controllers/ErrorController');

var corsOptions = {
  origin: 'http://localhost:8081',
};

db.sequelize.sync({ force: process.env.DB_DROP_EXISTING }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

app.use(cookieParser());
app.use(cors(corsOptions));

// set template engine
app.set('view engine', 'ejs');

const layout = require('express-ejs-layouts');

app.use(layout);

//for form POST
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.use('/', router);
app.use(errorController.errorHandling);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
