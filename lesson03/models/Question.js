class Question {
  constructor(category, difficulty, question, correct_answer, incorrect_answers) {
    this.category = category;
    this.difficulty = difficulty;
    this.question = question;
    this.correctAnswer = correct_answer;
    this.incorrectAnswers = incorrect_answers;
  }
}

module.exports = Question;
