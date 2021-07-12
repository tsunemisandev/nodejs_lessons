import auth from '../config/auth';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request } from 'express';
import authConfig from '../config/auth';

class AuthUtil {
  static sign(user: User): string {
    const secret = auth.SECRET;
    const token = jwt.sign(
      {
        exp: auth.EXPIRATION,
        data: {
          success: true,
          userName: user.name,
          userId: user.id,
        },
      },
      secret
    );
    return token;
  }
  static getUserId(req: Request): number{
    const token = req.cookies['token'];

    try {
      const decodedToken = jwt.verify(token, authConfig.SECRET);
      const userId = (<any>decodedToken).data.userId;
      return userId;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default AuthUtil;
