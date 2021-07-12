# JS 課題 4-2

# Features

主に以下を学習するためのプロジェクト

- JWT によるユーザーの認証、認可
- 新規ユーザーの登録
- ログイン機能
- ログアウト機能
- 新規投稿の登録
- 投稿の編集
- 投稿一覧の表示

# Requirement

- Docker compose

# Usage

プロジェクトをクローン

```bash
git clone https://github.com/tsunemisandev/nodejs_lessons.git
```

次のフォルダに移動

```bash
cd lesson04-2
```

そのフォルダ内に環境変数ファイル 「.env」 を作成\
クローンした「.env.example」のファイル名を編集してそのまま利用しても OK\
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

Docker compose を用いてイメージをビルドし、実行

```bash
docker-compose build
```

```bash
docker-compose up
```

ログインページをアクセス
[ログインページ](http://localhost:3000/login)

ログインされていない場合、常にログインページを表示します
以下と同じ登録画面へのリンクが画面にも表示されます。

[登録]()

ログイン済みの場合、

- [全投稿の一覧 へアクセス可能になります](http://localhost:3000/post)
- [新規投稿が出来ます](http://localhost:3000/post/new)
- [自身の投稿が編集できます.クエリパラメータは登録時のものになります。](http://localhost:3000/posts/edit?postId=3)
- [ログアウトリンク](http://localhost:3000/register)が常に表示されます。

# Note
