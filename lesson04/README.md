# JS 課題 4-1

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

# Features

主に以下を学習するためのプロジェクト

- JWT によるユーザーの認証、認可
- 新規ユーザーの登録
- ログイン機能
- ログアウト機能

# Requirement

- Docker compose

# Usage

プロジェクトをクローン

```bash
git clone https://github.com/tsunemisandev/nodejs_lessons.git
```

次のフォルダに移動

```bash
cd lesson04
```

そのフォルダ内に環境変数ファイル 「.env」 を作成
クローンした「.env.example」のファイル名を編集してそのまま利用しても OK
内容は以下の通り。

```bash
#新たな環境変数を追加した場合、docker-compose.ymlにも追加する

＃DB周りの環境変数
 MYSQL_ROOT_PASSWORD: '123123'
 MYSQL_DATABASE: 'node_app'

#アプリ周りの環境変数
DB_HOST=my_sql
DB_USER=root
DB_PASSWORD=123123
DB_BASE_NAME=node_app
APP_PORT=3000
AUTH_SECRET=123123
```

ログインページをアクセス
[ログインページ](http://localhost:3000/login)

ログインされていない場合、常にログインページを表示します
以下と同じ登録画面へのリンクが画面にも表示されます。

[登録]()

ログイン済みの場合、

- [posts へアクセス可能になります](http://localhost:3000/posts)
- [ログアウトリンク](http://localhost:3000/register)が常に表示されます。

# Note

新規登録に全角を使用するとエラーが発生します。今後の課題です。
