class ResultUI {
  static render(correctAnswer) {
    this.createHeader(correctAnswer);
    this.createBody();
    this.createFooter();
  }

  static createHeader(correctedAnswerNum) {
    let text = `あなたの正答数は ${correctedAnswerNum}です！`;
    let header = document.querySelector('.js-header');
    header.innerHTML = `<h1>${text}</h1>`;
  }
  static createBody() {
    let text = '再チャレンジしたい場合は、以下をクリック';
    let content = document.querySelector('.js-content');
    content.innerHTML = text;
  }

  static createFooter() {
    let btn_start = createBtnStart();
    let footer = document.querySelector('.js-footer');
    footer.innerHTML = '';
    footer.appendChild(btn_start);
  }

  static createBtnHome() {
    let btn_start = document.createElement('button');
    btn_start.innerHTML = 'ホームへ戻る';
    btn_start.addEventListener('click', function () {
      this.HomeUI.render();
    });
    return btn_start;
  }
  static setHome(HomeUI) {
    this.HomeUI = HomeUI;
  }
}
