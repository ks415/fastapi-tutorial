# FastAPI Todo App

## 技術スタック

### バックエンド

- FastAPI
- SQLAlchemy
- MySQL
- UV
- Docker

### フロントエンド

- React
- Axios
- CSS3

## セットアップ方法

1. リポジトリのクローン:

```bash
git clone https://github.com/yourusername/fastapi-todo-app.git
cd fastapi-todo-app
```

2. Docker で環境を起動:

```bash
docker-compose up -d
```

3. アプリケーションにアクセス:

- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:8000

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

3. アプリケーションの実行:

```bash
uv run uvicorn api.main:app --reload
```

4. テストの実行:

```bash
uv run pytest
```
