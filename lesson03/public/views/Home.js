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
    let title = 'ようこそ';
    let h1 = document.createElement('h1');
    let text = document.createTextNode(title);
    h1.appendChild(text);
    let header = document.querySelector('.js-header');
    header.innerHTML = '';
    header.appendChild(h1);
  }
  static createContent() {
    let text = '以下のボタンをクリック';
    let content = document.querySelector('.js-content');
    content.innerHTML = text;
  }
  static createFooter() {
    let btn_start = createBtnStart();
    let footer = document.querySelector('.js-footer');
    footer.innerHTML = '';
    footer.appendChild(btn_start);
  }
}

function createBtnStart() {
  let btn_start = document.createElement('button');
  btn_start.innerHTML = '開始';
  btn_start.addEventListener('click', function () {
    QuestionsUI.render();
  });
  return btn_start;
}
