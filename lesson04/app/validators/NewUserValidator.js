const { check } = require('express-validator');

module.exports = [
  check('username').not().isEmpty().withMessage('ユーザー名は、必須項目です。'),
  check('email').not().isEmpty().withMessage('メールは、必須項目です。'),
  check('password').not().isEmpty().withMessage('パスワードは、必須項目です。'),
  check('password').isLength({ min: 7 }).withMessage('パスワードは、7文字以上入力してください。'),
  check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('確認パスワードは、必須項目です。')
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('パスワードと確認用が一致しません。');
      } else {
        return true;
      }
    }),
];
