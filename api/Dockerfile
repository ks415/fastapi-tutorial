# python3.9のイメージをダウンロード
FROM python:3.9-buster
ENV PYTHONUNBUFFERED=1

WORKDIR /src

# pipを使ってuvをインストール
RUN pip install uv

# uvの定義ファイルをコピー
COPY pyproject.toml uv.lock README.md ./

# uvでライブラリをインストール
RUN uv sync

# アプリケーションコードをコピー
COPY api/ ./api/
COPY tests/ ./tests/

# uvicornのサーバーを立ち上げる
ENTRYPOINT ["uv", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--reload"]
