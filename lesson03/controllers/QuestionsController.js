//express インポート
const { json } = require('express');
const express = require('express');
const fetch = require('node-fetch');
const Question = require('../models/Question');
const QUESTION_API_URL = 'https://opentdb.com/api.php?amount=10';
//get questions
//if error return empty
async function getQuestionsFromAPI(res) {
  fetch(QUESTION_API_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      res.send({ questions: createListQuestions(json) });
    })
    .catch((error) => {
      console.log(error);
    });
}
//bind questions to class
function createListQuestions(json) {
  let questions = [];
  for (let i in json.results) {
    let question = createQuestion(json.results[i]);
    questions.push(question);
  }
  return questions;
}

function createQuestion(item) {
  return new Question(item.category, item.difficulty, item.question, item.correct_answer, item.incorrect_answers);
}

//serve list of questions
module.exports = {
  doGetListQuestions: function (req, res) {
    getQuestionsFromAPI(res);
  },
};
