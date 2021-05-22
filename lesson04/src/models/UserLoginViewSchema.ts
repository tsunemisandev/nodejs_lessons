import Joi from 'joi';
export = {
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.empty': '必須入力です',
      'string.email': 'メール形式が無効です',
    }),
    password: Joi.string().required().messages({
      'string.empty': '必須入力です',
    }),
  }),
};
