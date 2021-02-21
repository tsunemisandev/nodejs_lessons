const { check } = require('express-validator');

module.exports = [
  check('userName').not().isEmpty().withMessage('必須項目です。'),
  check('emailAddress').not().isEmpty().withMessage('必須項目です。'),
  check('password').not().isEmpty().withMessage('必須項目です。'),
  check('password').isLength({ min: 7 }).withMessage('7文字以上入力してください。'),
  check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('必須項目です。')
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('パスワードと確認用が一致しません。');
      } else {
        return true;
      }
    }),
];
