class Main {
  /**
   * ルート画面を表示する
   */
  static init() {
    HomeUI.render();
    //結果表示ページのボタンから表示するページを指定
    ResultUI.setHomePage(HomeUI);
  }
}
