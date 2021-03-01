/**
 * ホーム画面を作成し、表示する。
 * 問題集の回答ページを表示するボタンを作成する。
 */
class HomeUI {
  static render() {
    HomeUI.createHeader();
    HomeUI.createContent();
    HomeUI.createFooter();
  }
  static createHeader() {
    const title = 'ようこそ';
    const h1 = document.createElement('h1');
    const text = document.createTextNode(title);
    h1.appendChild(text);
    const header = document.querySelector('.js-header');
    header.innerHTML = '';
    header.appendChild(h1);
  }
  static createContent() {
    const text = '以下のボタンをクリック';
    const content = document.querySelector('.js-content');
    content.innerHTML = text;
  }
  static createFooter() {
    const btnStart = createBtnStart();
    const footer = document.querySelector('.js-footer');
    footer.innerHTML = '';
    footer.appendChild(btnStart);
  }
}

function createBtnStart() {
  const btnStart = document.createElement('button');
  btnStart.innerHTML = '開始';
  btnStart.addEventListener('click', function () {
    QuestionsUI.render();
  });
  return btnStart;
}
