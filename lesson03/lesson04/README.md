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

# JS 課題 4-1

# Features

主に以下を学習するプロジェクト

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

App.env ファイルにて、環境変数を設定。以下は、クローン時のものです。

```bash
DB_HOST=my_sql　＃DBのホストアドレス、dockerサービスを指しています。
DB_USER=root　　
DB_PASSWORD=123123
DB_BASE_NAME=node_app

APP_PORT=3000
AUTH_SECRET=12312　＃JWTをエンコードするためのキー
```

DB とアプリサーバーの起動

```bash
docker-compose build
docker-compose up
```

ログインページをアクセス
[ログインページ](http://localhost:3000/login)

# Note

新規ログイン登録に全角が使用できません。今後の課題です。
