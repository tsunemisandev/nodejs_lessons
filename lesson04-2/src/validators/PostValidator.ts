import { check } from 'express-validator';

export default [
  check('title').not().isEmpty().withMessage('必須項目です。'),
  check('content').not().isEmpty().withMessage('必須項目です。'),
  check('content').isLength({max: 140}).withMessage('制限文字数140を超えています。')
  ,
];
