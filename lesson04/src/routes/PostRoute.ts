import express from 'express';
import PostController from '../controllers/PostController';
import isAuthenticated from '../middleware/IsAuthenticated';

const postRoute = express.Router();
const postController = new PostController();

postRoute.use(isAuthenticated);
postRoute.get('/posts', postController.posts);

export default postRoute;
