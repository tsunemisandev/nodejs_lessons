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
      let correctedAnswerNum = QuestionService.getCorrectedNum(questionsJson, UserChoices.choices);
      ResultUI.render(correctedAnswerNum);
    }
  }

  static createHeader(questionsJson, currentQuestionNum) {
    let question = questionsJson[currentQuestionNum];

    //問題番号を表示する
    let title = `問題${QuestionService.getCurrentQuestionDisplayNum(currentQuestionNum)}`;
    let h1 = document.createElement('h1');
    let text = document.createTextNode(title);
    h1.appendChild(text);
    let header = document.querySelector('.js-header');
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
    let question = questionsJson[currentQuestionNum];
    let text = question.question;
    let content = document.querySelector('.js-content');
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
    let question = questionsJson[currentQuestionNum];
    let btn_answer = document.createElement('button');

    btn_answer.innerHTML = question.correct_answer;
    btn_answer.value = question.correct_answer;
    btn_answer.style.display = 'block';

    btn_answer.addEventListener('click', function (e) {
      let userAnswer = e.target.value;
      UserChoices.choices.push(userAnswer);
      currentQuestionNum++;
      QuestionsUI.renderQuestion(questionsJson, currentQuestionNum);
    });

    let footer = document.querySelector('.js-footer');
    footer.innerHTML = '<div class="js-choices"></div>';

    let choices = footer.querySelector('.js-choices');
    choices.appendChild(btn_answer);

    question.incorrect_answers.forEach((item) => {
      let btn_incorrect = document.createElement('button');
      btn_incorrect.innerHTML = item;
      btn_incorrect.value = item;
      btn_incorrect.style.display = 'block';
      btn_incorrect.addEventListener('click', function (e) {
        let userAnswer = e.target.value;
        UserChoices.choices.push(userAnswer);
        currentQuestionNum++;
        QuestionsUI.renderQuestion(questionsJson, currentQuestionNum);
      });
      choices.appendChild(btn_incorrect);
    });
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
