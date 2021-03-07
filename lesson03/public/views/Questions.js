/**
 * 問題集の画面を作成し、表示する。
 */
class QuestionsUI {
  /**
   * APIから問題集を取得する。
   * 問題集取得中の間は、Loadingページを表示する。
   * 取得終了したら、1問目を表示する。
   */
  static render() {
    UserChoices.init();
    Loading.render();
    QuestionService.getQuestionsJson().then((questionsJson) => {
      QuestionsUI.renderQuestion(questionsJson, QuestionService.getFirstQuestionNum());
    });
  }
  /**
   *　問題集から指定された問題番号の問題を表示する。
   * 指定された番号が、問題集の総数より高い場合、終了とする。
   * 終了の場合、回答結果画面を表示する。
   *
   * @param {object} questionsJson 問題集
   * @param {int} currentQuestionNum 問題番号　連番
   */
  static renderQuestion(questionsJson, currentQuestionNum) {
    if (QuestionService.hasMore(questionsJson, currentQuestionNum)) {
      QuestionsUI.createHeader(questionsJson, currentQuestionNum);
      QuestionsUI.createQuestion(questionsJson, currentQuestionNum);
      QuestionsUI.createChoices(questionsJson, currentQuestionNum);
    } else {
      const correctedAnswerNum = QuestionService.getCorrectedNum(questionsJson, UserChoices.choices);
      ResultUI.render(correctedAnswerNum);
    }
  }

  static createHeader(questionsJson, currentQuestionNum) {
    const question = questionsJson[currentQuestionNum];

    //問題番号を表示する
    const title = `問題${QuestionService.getCurrentQuestionDisplayNum(currentQuestionNum)}`;
    const h1 = document.createElement('h1');
    const text = document.createTextNode(title);
    h1.appendChild(text);
    const header = document.querySelector('.js-header');
    header.innerHTML = '';
    header.appendChild(h1);

    //ジャンルを表示する
    let h4 = document.createElement('h4');
    h4.innerHTML = `【ジャンル】${question.category}`;
    header.appendChild(h4);

    //難易度を表示する
    h4 = document.createElement('h4');
    h4.innerHTML = `【難易度】${question.difficulty}`;
    header.appendChild(h4);
  }
  /**
   *
   * 問題文を表示する
   *
   */
  static createQuestion(questionsJson, currentQuestionNum) {
    const question = questionsJson[currentQuestionNum];
    const text = question.question;
    const content = document.querySelector('.js-content');
    content.innerHTML = '';
    content.innerHTML = text;
  }

  /**
   * 選択肢ボタンを表示する
   *　ボタンのイベントを作成する
      イベント：
      　　・ユーザーの選択肢を記憶する。
      　　・次の問題を表示する
   * @param {object} questionsJson
   * @param {int} currentQuestionNum
   */
  static createChoices(questionsJson, currentQuestionNum) {
    const question = questionsJson[currentQuestionNum];
    const btnAnswer = document.createElement('button');

    btnAnswer.innerHTML = question.correctAnswer;
    btnAnswer.value = question.correctAnswer;
    btnAnswer.style.display = 'block';

    const footer = document.querySelector('.js-footer');
    footer.innerHTML = '';
    const choices = document.createElement('div');
    choices.class = 'js-choices';
    footer.appendChild(choices);

    const shuffledChoices = this.shuffleChoices(question);

    shuffledChoices.forEach((item) => {
      const btnIncorrect = document.createElement('button');
      btnIncorrect.innerHTML = item;
      btnIncorrect.value = item;
      btnIncorrect.style.display = 'block';
      btnIncorrect.addEventListener('click', function (e) {
        const userAnswer = e.target.value;
        UserChoices.choices.push(userAnswer);
        currentQuestionNum++;
        QuestionsUI.renderQuestion(questionsJson, currentQuestionNum);
      });
      choices.appendChild(btnIncorrect);
    });
  }
  static shuffleChoices(question) {
    const choices = [];
    choices.push(question.correctAnswer);
    choices.push(question.incorrectAnswers);

    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = choices[i];
      choices[i] = choices[j];
      choices[j] = temp;
    }
    return choices;
  }
}

/**
 * ユーザーの選択を保持する
 */
class UserChoices {
  static choices = [];
  static init() {
    this.choices = [];
  }
}
