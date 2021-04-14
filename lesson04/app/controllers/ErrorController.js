const errors = require('../config/error.config');
module.exports = {
  errorHandling(error, req, res, next) {
    if (error.statusCode == 401) {
      res.redirect('/');
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
