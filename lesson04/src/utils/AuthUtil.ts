import auth from '../config/auth';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthUtil {
  static sign(user: User): string {
    const secret = auth.SECRET;
    const token = jwt.sign(
      {
        exp: auth.EXPIRATION,
        data: {
          success: true,
          userName: user.name,
        },
      },
      secret
    );
    return token;
  }
}

export default AuthUtil;
