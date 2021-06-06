import { Request, Response } from 'express';

class PostController {
  posts(req: Request, res: Response) {
    res.render('posts');
  }
}
export default PostController;
