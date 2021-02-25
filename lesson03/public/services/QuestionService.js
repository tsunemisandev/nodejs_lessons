class QuestionService {
  static async getQuestionsJson() {
    return fetch('/questions/list/').then((res) => {
      return res.json();
    });
  }

  static getCorrectedNum(questionsJson, userChoices) {
    let correctedAnswerNum = 0;
    for (let i in questionsJson) {
      let correctAnswer = questionsJson[i].correct_answer;
      let userAnswer = userChoices[i];
      if (correctAnswer === userAnswer) {
        correctedAnswerNum++;
      }
    }
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
