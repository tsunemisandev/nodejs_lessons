import { check } from 'express-validator';

export default [
  check('name').not().isEmpty().withMessage('必須項目です。'),
  check('email').not().isEmpty().withMessage('必須項目です。').isEmail().withMessage('メール形式が無効です。'),
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
