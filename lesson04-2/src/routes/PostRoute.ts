import express from 'express';
import PostController from '../controllers/PostController';
import isAuthenticated from '../middleware/IsAuthenticated';
import postValidator from '../validators/PostValidator';

const postRoute = express.Router();
const postController = new PostController();

postRoute.use(isAuthenticated);
//List posts
postRoute.get('/post', postController.listPage);
postRoute.get('/post/list', postController.list);

//Show include page
postRoute.get('/post/new', postController.includePage);
postRoute.post('/post/new', postValidator, postController.include);

//Show edit page
postRoute.get('/post/edit', postController.editPage);
postRoute.put('/post/edit', postValidator, postController.edit);

//Get post
postRoute.get('/post/:id', postController.getPost);

export default postRoute;
