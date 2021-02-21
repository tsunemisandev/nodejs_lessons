class Question {
  constructor(category, difficulty, question, correct_answer, incorrect_answers) {
    this.category = category;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
}

module.exports = Question;
