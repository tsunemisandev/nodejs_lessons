class QuestionsUI {
  static render() {
    UserChoices.init();
    Loading.render();
    QuestionService.getQuestionsJson().then((questionsJson) => {
      QuestionsUI.renderQuestion(questionsJson, QuestionService.getFirstQuestionNum());
    });
  }
  static renderQuestion(questionsJson, currentQuestionNum) {
    if (QuestionService.hasMore(questionsJson, currentQuestionNum)) {
      QuestionsUI.createHeader(questionsJson, currentQuestionNum);
      QuestionsUI.createQuestion(questionsJson, currentQuestionNum);
      QuestionsUI.createChoices(questionsJson, currentQuestionNum);
    } else {
      let correctedAnswerNum = QuestionService.getCorrectedNum(questionsJson, UserChoices.choices);
      ResultUI.render(correctedAnswerNum);
    }
  }

  static createHeader(questionsJson, currentQuestionNum) {
    let question = questionsJson[currentQuestionNum];
    let title = `問題${QuestionService.getCurrentQuestionDisplayNum(currentQuestionNum)}`;
    let h1 = document.createElement('h1');
    let text = document.createTextNode(title);
    h1.appendChild(text);
    let header = document.querySelector('.js-header');
    header.innerHTML = '';
    header.appendChild(h1);

    //genre
    let h4 = document.createElement('h4');
    h4.innerHTML = `【ジャンル】${question.category}`;
    header.appendChild(h4);
    //level
    h4 = document.createElement('h4');
    h4.innerHTML = `【難易度】${question.difficulty}`;
    header.appendChild(h4);
  }
  static createQuestion(questionsJson, currentQuestionNum) {
    let question = questionsJson[currentQuestionNum];
    let text = question.question;
    let content = document.querySelector('.js-content');
    content.innerHTML = '';
    content.innerHTML = text;
  }
  static createChoices(questionsJson, currentQuestionNum) {
    let question = questionsJson[currentQuestionNum];
    let btn_answer = document.createElement('button');
    //TODO btn code duplication
    btn_answer.innerHTML = question.correct_answer;
    btn_answer.value = question.correct_answer;
    btn_answer.style.display = 'block';
    btn_answer.addEventListener('click', function (e) {
      let userAnswer = e.target.value;
      //console.log(userAnswer);
      UserChoices.choices.push(userAnswer);
      currentQuestionNum++;
      QuestionsUI.renderQuestion(questionsJson, currentQuestionNum);
    });

    let footer = document.querySelector('.js-footer');
    footer.innerHTML = '<div class="js-choices"></div>';

    let choices = footer.querySelector('.js-choices');
    choices.appendChild(btn_answer);

    question.incorrect_answers.forEach((item) => {
      //TODO btn code duplication
      let btn_incorrect = document.createElement('button');
      btn_incorrect.innerHTML = item;
      btn_incorrect.value = item;
      btn_incorrect.style.display = 'block';
      btn_incorrect.addEventListener('click', function (e) {
        //console.log(e.target.value);
        let userAnswer = e.target.value;
        UserChoices.choices.push(userAnswer);
        currentQuestionNum++;
        QuestionsUI.renderQuestion(questionsJson, currentQuestionNum);
      });
      choices.appendChild(btn_incorrect);
    });
  }
}

class UserChoices {
  static choices = [];
  static init() {
    this.choices = [];
  }
}
