const express = require('express');

module.exports = {
  doGetHome: function (req, res) {
    res.render('home.ejs');
  },
};
