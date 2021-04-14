const db = require('../models');
const User = db.user;
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.config');
const errors = require('../config/error.config');
const { validationResult } = require('express-validator');
const { render } = require('ejs');
module.exports = {
  doGetLogin: function (req, res, next) {
    res.render('login.ejs');
  },
  doGetRegister: function (req, res) {
    res.render('register.ejs');
  },
  doPostRegister: function (req, res, next) {
    //バリデーション
    const result = validationResult(req);
    const hasError = !result.isEmpty();

    //バリデーションエラーを表示
    if (hasError) {
      res.locals.errorList = getErrorMessages(result);
      res.render('register');
    } else {
      //既に利用中のユーザー名が存在するか確認
      User.findOne({ where: { username: req.body.username } }).then((user) => {
        if (user) {
          res.locals.error = errors.ERROR_USER_EXISTS;
          res.render('register');
        } else {
          //既に利用中のメールが存在するか確認
          User.findOne({ where: { email: req.body.email } }).then((user) => {
            if (user) {
              res.locals.error = errors.ERROR_EMAIL_EXISTS;
              res.render('register');
            } else {
              //ユーザーの登録
              User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, authConfig.salt),
              }).then((user) => {
                res.locals.user = user;
                console.log('user registered');
                next();
              });
            }
          });
        }
      });
    }
  },
  doGetHome: function (req, res) {
    res.render('home');
  },
  doRedirectHome: function (req, res) {
    res.redirect('/user/home');
  },
  doRedirectLogin: function (req, res) {
    res.redirect('/');
  },
};

function getErrorMessages(validationResult) {
  const errorFields = validationResult.mapped();
  let errorMsg = [];
  if (errorFields.username != null) errorMsg.push(errorFields.username.msg);
  if (errorFields.email != null) errorMsg.push(errorFields.email.msg);
  if (errorFields.password != null) errorMsg.push(errorFields.password.msg);
  if (errorFields.confirmPassword != null) errorMsg.push(errorFields.confirmPassword.msg);

  return errorMsg;
}
