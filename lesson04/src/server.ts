import express from 'express';
import { errors } from 'celebrate';
import routes from './routes';
import appConf from './config/app';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/ErrorHandler';

const app = express();
app.set('view engine', 'ejs');

const layout = require('express-ejs-layouts');
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.use(errorHandler);
app.use(errors());

app.listen(appConf.PORT, () => {
  console.log(`Is running at port: ${appConf.PORT}`);
});
