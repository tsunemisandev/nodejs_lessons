import express from 'express';
import userRout from './UserRouter';
import postRout from './PostRoute';
import postRoute from './PostRoute';

const routes = express.Router();

routes.use(userRout);
routes.use(postRoute);

export default routes;
