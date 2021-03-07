/**
 * 結果を表示する画面を作成
 * ホーム画面へ返す手段を作成
 */
class ResultUI {
  /**
   *　画面を作成し、表示する
   *
   * @param {int} correctAnswer ユーザーの正答数
   */
  static render(correctAnswer) {
    this.createHeader(correctAnswer);
    this.createBody();
    this.createFooter();
  }

  static createHeader(correctedAnswerNum) {
    const text = `あなたの正答数は ${correctedAnswerNum}です！`;
    const header = document.querySelector('.js-header');
    header.innerHTML = '';
    const h1 = document.createElement('h1');
    h1.innerHTML = text;
    header.appendChild(h1);
  }
  static createBody() {
    const text = '再チャレンジしたい場合は、以下をクリック';
    const content = document.querySelector('.js-content');
    content.innerHTML = text;
  }

  static createFooter() {
    const btnBackHome = this.createBtnHome();
    const footer = document.querySelector('.js-footer');
    footer.innerHTML = '';
    footer.appendChild(btnBackHome);
  }

  static createBtnHome() {
    const btnBackHome = document.createElement('button');
    btnBackHome.innerHTML = 'ホームへ戻る';
    btnBackHome.addEventListener('click', function () {
      ResultUI.homePage.render();
    });
    return btnBackHome;
  }
  /**
   *
   * 「ホームへ戻る」ボタンが表示するUIクラスを記憶する
   *
   * @param {class} homePage
   */
  static setHomePage(homePage) {
    this.homePage = homePage;
  }
}
