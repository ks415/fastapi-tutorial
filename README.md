# FastAPI Todo App with Authentication

JWT 認証機能付きの Todo アプリケーションです。ユーザー登録、ログイン、認証が必要なタスク管理機能を提供します。

## 機能

- ユーザー登録とログイン
- JWT（JSON Web Token）ベースの認証
- 認証が必要なタスク管理（CRUD 操作）
- セキュアなパスワードハッシュ化
- トークンベースのセッション管理

## 技術スタック

### バックエンド

- FastAPI
- SQLAlchemy
- MySQL
- UV
- Docker
- **認証・セキュリティ**:
  - JWT (JSON Web Token)
  - Passlib (bcrypt)
  - Python-JOSE

### フロントエンド

- React
- Axios
- CSS3
- **認証機能**:
  - Context API for 状態管理
  - ローカルストレージでのトークン管理
  - 認証ガード

## セットアップ方法

1. リポジトリのクローン:

```bash
git clone https://github.com/ks415/fastapi-todo-app.git
cd fastapi-todo-app
```

2. Docker で環境を起動:

```bash
docker-compose up -d
```

3. アプリケーションにアクセス:

- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:8000
- API ドキュメント: http://localhost:8000/docs

## 認証機能の使用方法

### 1. ユーザー登録

1. http://localhost:3000 にアクセス
2. 「新規登録」をクリック
3. ユーザー名、メールアドレス、パスワードを入力
4. 「登録」ボタンをクリック

### 2. ログイン

1. 登録完了後、ログイン画面に自動で切り替わります
2. ユーザー名とパスワードを入力
3. 「ログイン」ボタンをクリック

### 3. タスク管理

- ログイン後、認証されたユーザーのみがタスクの作成、編集、削除が可能
- ログアウトするまでセッションが維持されます

### API エンドポイント

#### 認証関連

- `POST /auth/register` - ユーザー登録
- `POST /auth/token` - ログイン（JWT トークン取得）
- `GET /auth/me` - 現在のユーザー情報取得

#### タスク関連（認証必須）

- `GET /tasks` - タスク一覧取得
- `POST /tasks` - タスク作成
- `PUT /tasks/{id}` - タスク更新
- `DELETE /tasks/{id}` - タスク削除
- `PUT /tasks/{id}/done` - タスク完了マーク
- `DELETE /tasks/{id}/done` - タスク完了解除

## 開発環境での実行

バックエンド:

```bash
docker-compose up backend
```

フロントエンド:

```bash
docker-compose up frontend
```

## テストの実行

```bash
docker-compose run --rm backend uv run pytest
```

## ローカル開発 (UV を使用)

1. UV のインストール:

```bash
pip install uv
```

2. 依存関係のインストール:

```bash
uv sync
```

3. データベースのマイグレーション:

```bash
# データベースコンテナを起動
docker-compose up -d db

# マイグレーション実行
uv run python api/migrate_db.py
```

4. アプリケーションの実行:

```bash
uv run uvicorn api.main:app --reload
```

5. テストの実行:

```bash
uv run pytest
```

## セキュリティ機能

### パスワードセキュリティ

- bcrypt による強力なパスワードハッシュ化
- ソルト付きハッシュで辞書攻撃を防御

### JWT トークンセキュリティ

- HS256 アルゴリズムによる署名
- 30 分間の有効期限
- 自動トークン検証

### API セキュリティ

- 全てのタスク関連 API で認証が必須
- 無効なトークンの場合は 401 エラーを返却
- CORS 設定によるクロスオリジン制御

## 環境変数

本番環境では以下の環境変数を設定してください：

```bash
# JWT秘密鍵（本番環境では必ず変更）
SECRET_KEY=your-super-secret-key-here

# データベース設定
DB_URL=mysql+pymysql://user:password@host:port/database

# トークン有効期限（分）
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## トラブルシューティング

### 認証エラー

- ブラウザのローカルストレージをクリアしてください
- トークンの有効期限が切れている可能性があります

### データベース接続エラー

- MySQL コンテナが起動していることを確認してください
- データベースのマイグレーションが実行されていることを確認してください
