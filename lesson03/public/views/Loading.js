/**
 * 非同期処理待機中に表示する画面
 */
class Loading {
  /**
   * 画面を作成する
   */
  static render() {
    Loading.createHeader();
    Loading.createContent();
    Loading.createFooter();
  }

  static createHeader() {
    const title = '取得中';
    const h1 = document.createElement('h1');
    const text = document.createTextNode(title);
    h1.appendChild(text);
    const header = document.querySelector('.js-header');
    header.innerHTML = '';
    header.appendChild(h1);
  }
  static createContent() {
    const text = '少々お待ちください';
    const content = document.querySelector('.js-content');
    content.innerHTML = '';
    content.innerHTML = text;
  }

  static createFooter() {
    const footer = document.querySelector('.js-footer');
    footer.innerHTML = '';
  }
}
