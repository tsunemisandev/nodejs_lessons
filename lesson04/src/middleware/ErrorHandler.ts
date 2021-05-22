import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.message === 'UNAUTHORIZED') {
    res.redirect('/login');
  } else {
    res.status(500).send();
  }
};
