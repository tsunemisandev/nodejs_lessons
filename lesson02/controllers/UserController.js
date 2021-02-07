const { render } = require('ejs');
const { response } = require('express');
const express = require('express');

let formObj = function () {
  return {
    hasError: false,
    userName: null,
    emailAddress: null,
    password: null,
    confirmPassword: null,
    userNameError: null,
    emailError: null,
    passError: null,
    confirmPassError: null,
    passNotMatchError: null,
  };
};

function validateForm(form) {
  let hasError = false;
  if (!form.userName) {
    form.userNameError = 'ユーザー名は必須入力です。';
    hasError = true;
  }
  if (!form.emailAddress) {
    form.emailError = 'メールは必須入力です。';
    hasError = true;
  }
  if (!form.password) {
    form.passError = 'パスワードは必須入力です。';
    hasError = true;
  } else if (form.password.length < 7) {
    form.passError = 'パスワードは7文字以上入力して下さい。';
    hasError = true;
  }

  if (!form.confirmPassword) {
    form.confirmPassError = '確認用パスワードは必須入力です。';
    hasError = true;
  }
  if (form.password != form.confirmPassword) {
    form.passNotMatchError = 'パスワードが確認用と一致しません';
    hasError = true;
  }
  return hasError;
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
    const hasError = validateForm(form);

    //バリデーションエラーの場合、エラーメッセージを追加して、フォームを再表示する
    if (hasError) {
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
