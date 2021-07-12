import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.message === 'UNAUTHORIZED') {
    res.redirect('/login');
  } else {
    console.log(error);
    res.status(500).json({ error: '予期しないエラーが発生しました。' });
  }
};
