class QuestionService {
  static async getQuestionsJson() {
    return fetch('/questions/list/').then((res) => {
      return res.json();
    });
  }

  static getCorrectedNum(questionsJson, userChoices) {
    let correctedAnswerNum = 0;

    questionsJson.forEach((questionJson, questionNum) => {
      const correctAnswer = questionJson.correctAnswer;
      const userAnswer = userChoices[questionNum];

      if (correctAnswer === userAnswer) {
        correctedAnswerNum++;
      }
    });
    return correctedAnswerNum;
  }

  static hasMore(questionsJson, currentQuestionNum) {
    if (questionsJson.length < currentQuestionNum + 1) {
      return false;
    } else {
      return true;
    }
  }

  static getFirstQuestionNum() {
    return 0;
  }
  static getCurrentQuestionDisplayNum(currentQuestionNum) {
    return currentQuestionNum + 1;
  }
}
