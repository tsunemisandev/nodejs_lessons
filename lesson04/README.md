【要件】

- [1]新規登録画面&新規登録処理

- [2]ログイン画面&ログイン処理

  [https://s3-us-west-2.amazonaws.com/secure.notion-static.com/62b6d18e-6a5d-4cbf-810f-be7aa56fb92e/\_2020-10-18_14.33.39.mov](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/62b6d18e-6a5d-4cbf-810f-be7aa56fb92e/_2020-10-18_14.33.39.mov)

- [3]ログイン成功（email と password の認証成功）で token が生成される。

- [4]新規登録ないしログイン後に、ログアウトドロップダウンメニューが親テンプレートのメニュー上からログアウトが出来ていること。

- [5]新規登録またはログインページ以外 token の認証処理が走り、ログインしていないユーザが入ろうとするとログインページにリダイレクトされること。（URL を直接叩くなどしても入れないようにすること）

- [学習内容]
  - 新規登録・ログインによるデータベース上の users テーブルとの紐付け
  - token の管理方法（token 生成には JWT を使用してください）
