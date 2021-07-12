import { errors } from 'celebrate';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import PostsDao from '../daos/PostsDao';
import Post from '../models/Post';
import PostView from '../models/PostView';
import AuthUtil from '../utils/AuthUtil';

class PostController {
 async getPost(req: Request, res: Response) {
        //Get user id
        const userId = AuthUtil.getUserId(req);
        //Check post is editable by user
        const postId = Number(req.params['id']);

        const postDao = new PostsDao();
        const post = await postDao.get(postId);
        //Return post json or error message
        if(post && post.userId === userId){
          res.status(200).json({post:{title: post.title, content: post.content, id: post.id}});
        }else{
          res.status(403).json({error:'投稿者のみ編集可能です。'})
        }
    }
    async edit(req: Request, res: Response) {
    //Get validation result
    const error = validationResult(req);
    //If validation error return error code and message
    if (!error.isEmpty()) {
      res.status(422).json({ errors: error.array() });
    } else {
      //Get parameters
      const { title, content, id } = req.body;
      const userId = AuthUtil.getUserId(req);
      const postDao = new PostsDao();
      //Verify if editable
      const registeredPost = await postDao.get(id);
      if(registeredPost && registeredPost.userId === userId){
        //Get register by id
        var postToUpdate = new Post({userId:Number(userId), title, content, id: id});
        //Create data object to update
        //Update db
        postDao.update(postToUpdate);
        //Send suc status
        res.status(204).json({message:'OK'});
      }else{
        res.status(403).json({error:'投稿者のみ編集可能です。'})
      }
    }
  }
  async list(req: Request, res: Response) {
    //Get all posts
    const postDao = new PostsDao();
    const posts = await postDao.list();
    const userId = AuthUtil.getUserId(req);
    //Create list for view
    const postsView = posts.map(post=> new PostView(post.id, post.title, post.content, post.userId, post.userName, (userId === post.userId)));
    //Return as json
    //Return unexpected error
    res.status(200).json({ posts: postsView });
  }
  editPage(req: Request, res: Response) {
    res.render('edit');
  }
  async include(req: Request, res: Response) {
    //Get validation result
    const error = validationResult(req);
    //If validation error return error code and message
    if (!error.isEmpty()) {
      res.status(422).json({ errors: error.array() });
    } else {
      //Get parameters
      const { title, content} = req.body;
      const userId = AuthUtil.getUserId(req);
      const postDao = new PostsDao();
      const newPost = new Post({userId: userId, title, content});
      const postId = postDao.include(newPost);
        //Send suc status
      res.status(204).json({postId:postId});

    }
  }
  includePage(req: Request, res: Response) {
    res.render('new');
  }
  listPage(req: Request, res: Response) {
    res.render('posts');
  }
}
export default PostController;
