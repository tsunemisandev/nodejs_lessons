const express = require('express');
const getQuestions = require('../services/QuestionsAPI');

module.exports = {
  doGetListQuestions: function (req, res) {
    getQuestions(res);
  },
};
