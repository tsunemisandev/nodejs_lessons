const fetch = require('node-fetch');
const Question = require('../models/Question');
const QUESTION_API_URL = 'https://opentdb.com/api.php?amount=2';

async function getQuestions(res) {
  fetch(QUESTION_API_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      res.send(createListQuestions(json));
    })
    .catch((error) => {
      console.log(error);
    });
}
function createListQuestions(json) {
  const questions = json.results.map((item) => {
    return createQuestion(item);
  });

  return questions;
}

function createQuestion(item) {
  return new Question(item.category, item.difficulty, item.question, item.correct_answer, item.incorrect_answers);
}

module.exports = getQuestions;
