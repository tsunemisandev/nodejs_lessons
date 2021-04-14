const authConfig = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errors = require('../config/error.config');
const db = require('../models');
const { USER } = require('../config/db.config');
const User = db.user;

function setToken(res, user, token) {
  res.cookie('jwt-token', {
    id: user.id,
    accessToken: token,
    maxAge: authConfig.expirationTime,
  });
}

function createToken(user) {
  return jwt.sign({ id: user.id, user: user.username }, authConfig.secret, {
    expiresIn: authConfig.expirationTime,
  });
}
module.exports = {
  setToken: function (req, res, next) {
    const user = res.locals.user;
    const token = createToken(user);
    setToken(res, user, token);
    next();
  },
  verify(req, res, next) {
    const cookie = req.cookies['jwt-token'];
    //check cookie exists
    if (cookie) {
      //validate token
      jwt.verify(cookie.accessToken, authConfig.secret, (error, decoded) => {
        //check verification
        if (error) {
          console.log(error);
          //throw unauthorized error
          res.redirect('/');
        } else {
          const userId = decoded.id;
          try {
            //verify user exists
            User.findByPk(userId).then((user) => {
              if (!user) {
                console.log('user not exists');
                //throw unauthorized error
                next(new Error(errors.get401Error()));
              } else {
                next();
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    } else {
      console.log('invalid cookie');
      next(new Error(errors.get401Error()));
    }
  },
  doGetLogout: function (req, res, next) {
    const cookie = req.cookies['jwt-token'];
    if (!cookie) {
      console.log('cookie already removed');
      next();
    } else {
      res.cookie('jwt-token', {
        maxAge: Date.now(),
      });
      next();
    }
  },
  /**
   * ログイン中のユーザーをクッキーから取得する
   * 次の条件の場合、ログイン中ユーザー名をからとする：クッキーが存在しない、トークンが存在しない
   */
  setLoggedUser: function (req, res, next) {
    const cookie = req.cookies['jwt-token'];
    res.locals.username = '';
    if (!cookie || !cookie['accessToken']) {
      next();
    } else {
      const token = cookie['accessToken'];

      jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) {
          res.locals.username = null;
          next();
        } else {
          res.locals.username = decoded.user;
          next();
        }
      });
    }
  },
  /**
   *フォームからユーザー情報をDBと照らし合わせる。
   */
  doPostLogin: function (req, res, next) {
    //get form values
    const userEmail = req.body.email;
    const userPass = req.body.password;
    console.log(userEmail);
    //find user by user name
    User.findOne({ where: { email: userEmail } }).then((user) => {
      if (!user) {
        res.locals.error = errors.ERROR_USER_NOT_REGISTERED;
        res.render('login');
      }
      //check password
      else {
        const userPassDB = user.password;
        if (!bcrypt.compareSync(userPass, userPassDB)) {
          res.locals.error = errors.ERROR_USER_OR_PASS_WRONG;
          res.render('login');
        } else {
          //クッキーにユーザー情報を設定
          const token = createToken(user);
          setToken(res, user, token);
          next();
        }
      }
    });
  },
};
