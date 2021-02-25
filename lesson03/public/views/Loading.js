class Loading {
  static render() {
    Loading.createHeader();
    Loading.createContent();
    Loading.createFooter();
  }
  static createHeader() {
    let title = '取得中';
    let h1 = document.createElement('h1');
    let text = document.createTextNode(title);
    h1.appendChild(text);
    let header = document.querySelector('.js-header');
    header.innerHTML = '';
    header.appendChild(h1);
  }
  static createContent() {
    let text = '少々お待ちください';
    let content = document.querySelector('.js-content');
    content.innerHTML = '';
    content.innerHTML = text;
  }

  static createFooter() {
    let footer = document.querySelector('.js-footer');
    footer.innerHTML = '';
  }
}
