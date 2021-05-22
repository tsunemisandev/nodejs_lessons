import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default (req: Request, res: Response, next: NextFunction) => {
  //get token
  const token = req.cookies['token'];
  //verify token
  try {
    const decodedToken = jwt.verify(token, authConfig.SECRET);
    const userName = (<any>decodedToken).data.userName;

    res.locals.userName = userName;
    res.locals.logged = true;
    next();
  } catch (e) {
    const error = new Error('UNAUTHORIZED');
    next(error);
  }
};
