import { check } from 'express-validator';

export default [
  check('email').not().isEmpty().withMessage('必須項目です。').isEmail().withMessage('メール形式が無効です。'),
  check('password').not().isEmpty().withMessage('必須項目です。'),
];
