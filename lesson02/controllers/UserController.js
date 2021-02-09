const { render } = require('ejs');
const { response } = require('express');
const express = require('express');
const { validationResult } = require('express-validator');

let formObj = function () {
  return {
    userName: null,
    emailAddress: null,
    password: null,
    confirmPassword: null,
    userNameError: null,
    emailError: null,
    passError: null,
    confirmPassError: null,
  };
};

function setErrorMessages(form, validationResult) {
  const errorFields = validationResult.mapped();
  form.userNameError = errorFields.userName != null ? errorFields.userName.msg : null;
  form.emailError = errorFields.emailAddress != null ? errorFields.emailAddress.msg : null;
  form.passError = errorFields.password != null ? errorFields.password.msg : null;
  form.confirmPassError = errorFields.confirmPassword != null ? errorFields.confirmPassword.msg : null;
}

module.exports = {
  doGetLogin: function (req, res) {
    res.render('login.ejs');
  },
  doGetRegister: function (req, res) {
    let form = formObj();
    res.render('register', { form: form });
  },
  doPostRegister: function (req, res) {
    //入力フォームの値をバインド
    let form = formObj();
    form.userName = req.body.userName;
    form.emailAddress = req.body.emailAddress;
    form.password = req.body.password;
    form.confirmPassword = req.body.confirmPassword;

    //バリデーション
    const result = validationResult(req);
    const hasError = !result.isEmpty();

    //バリデーションエラーの場合、エラーメッセージを追加して、フォームを再表示する
    if (hasError) {
      console.log(result.array());
      setErrorMessages(form, result);
      res.render('register', { form: form });
    } else {
      //バリデーションがOKなら、ホーム画面へリダイレクト
      req.session.userName = form.userName;
      res.redirect('/home');
    }
  },
  doPostLogin(req, res, next) {
    const userName = req.body.userName;
    req.session.userName = userName;
    res.redirect('/home');
  },
  doCheckLoggedUser(req, res, next) {
    res.locals.userName = req.session.userName;
    next();
  },
};
