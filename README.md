# FastAPI Todo App

## 技術スタック

### バックエンド

- FastAPI
- SQLAlchemy
- MySQL
- Poetry
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
docker-compose run --rm backend poetry run pytest
```
