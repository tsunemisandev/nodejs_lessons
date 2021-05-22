import { resolveSoa } from 'dns';
import { Response, Request, NextFunction } from 'express';
import UserDao from '../daos/UserDao';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import bcrypt, { hash } from 'bcryptjs';
import auth from '../config/auth';
import { celebrate } from 'celebrate';
import Joi from 'joi';
import { send } from 'process';
import AuthUtil from '../utils/AuthUtil';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    const userDao: UserDao = new UserDao();
    console.log('register()');
    try {
      //フォームデータの取得
      const { name, email, password, confirmPassword } = req.body;
      //パスワードのハッシュを取得
      const hashedPassword = bcrypt.hashSync(password, auth.SALT);
      //DB登録用のユーザーオブジェクトを作成
      const newUser = new User(name, email, hashedPassword);
      //ユーザー名が登録済みの場合、エラーメッセージを返す
      const userExists = await userDao.exists(newUser);
      if (userExists) {
        const userAlreadyExistsError = 'ユーザー名はすでに利用されています。';
        res.status(200).json({ error: userAlreadyExistsError });
      } else {
        //ユーザーをDBに挿入
        const id = userDao.insert(newUser);
        //jwtを生成
        const token = AuthUtil.sign(newUser);
        //jwtをクッキーにてクライアントに補完する
        res.cookie('token', token, {
          httpOnly: true,
        });
        res.status(200).json({ token: token });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: '予期しないエラーが発生しました。' });
    }
  }

  async validator() {
    console.log('validator()');
    await celebrate({
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
      }),
    });
  }

  registerPage(req: Request, res: Response) {
    res.render('register');
  }
  loginPage(req: Request, res: Response) {
    res.render('login');
  }
  async login(req: Request, res: Response) {
    const userDao: UserDao = new UserDao();
    const { email, password } = req.body;
    const user: User = await userDao.existsByEmail(email);
    //Check if user exists
    if (user) {
      //verify if password is same
      const isUser = await bcrypt.compare(password, user.password);
      if (isUser) {
        //generate JWT
        const token = AuthUtil.sign(user);
        //jwtをクッキーにてクライアントに補完する
        res.cookie('token', token, {
          httpOnly: true,
        });
        //send status code OK
        res.status(200).send('OK');
      } else {
        //if not send error
        res.status(401).json({ error: 'ログインまたはパスワードが間違っています。' });
      }
    } else {
      //if send error message
      res.status(401).json({ error: 'ログインまたはパスワードが間違っています。' });
    }
  }
  logout(req: Request, res: Response) {
    res.clearCookie('token');
    res.redirect('login');
  }
}

export default UserController;
