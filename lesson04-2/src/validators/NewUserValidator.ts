import { check } from 'express-validator';
import UserDao from '../daos/UserDao';
import User from '../models/User';

export default [
  check('name').not().isEmpty().withMessage('必須項目です。'),
  check('name').custom(async (userName: any, req: any) => {
    const userDao: UserDao = new UserDao();
    const user = new User('', userName, '', '');
    const registeredUser = await userDao.exists(user);
    if (registeredUser) {
      throw new Error('記入されたユーザー名は利用できません');
    } else {
      return true;
    }
  }),
  check('email').not().isEmpty().withMessage('必須項目です。').isEmail().withMessage('メール形式が無効です。'),
  check('email').custom(async (email: any, req: any) => {
    const userDao: UserDao = new UserDao();
    const isRegisteredEmail = await userDao.existsByEmail(email);
    if (isRegisteredEmail) {
      throw new Error('記入されたメールは利用できません');
    } else {
      return true;
    }
  }),
  check('password').not().isEmpty().withMessage('必須項目です。'),
  check('password').isLength({ min: 7 }).withMessage('7文字以上入力してください。'),
  check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('必須項目です。')
    .bail()
    .custom((value: any, { req }: any) => {
      if (value !== req.body.password) {
        throw new Error('パスワードと確認用が一致しません。');
      } else {
        return true;
      }
    }),
];
