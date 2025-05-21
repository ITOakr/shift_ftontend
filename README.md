# 出退勤管理アプリケーション

## 環境構築手順

### 前提条件
- Git
- Docker

### 1. リポジトリのクローン
```bash
git clone https://github.com/TsunakawaShunya/attendance-front.git
cd attendance-app
```

### 2. 依存関係のインストール
```bash
# フロントエンドの依存関係をインストール
make setup
```
最初の1回だけで大丈夫です

### 3. アプリケーションの起動
```bash
# 起動
make up
```
開発を始める前に毎回行ってください

### 4. アプリケーションへのアクセス
- 管理者用フロントエンド: http://localhost:3000
- ユーザー用フロントエンド: http://localhost:3001

### 5. 開発を始める前に
- フロントエンドのコードは`frontend-admin`と`frontend-user`ディレクトリ内にあります
- コードの変更は自動的にホットリロードされます
- エラーはブラウザのコンソールに表示されます

### 6. アプリケーションの停止
```bash
make down
```

## 利用可能なコマンド

### `make setup`
- フロントエンドの依存関係をインストールします
- `frontend-admin`と`frontend-user`の両方の`npm install`を実行します

### `make up`
- Dockerコンテナを起動します
- バックグラウンドで実行されます（`-d`オプション付き）

### `make down`
- 実行中のDockerコンテナを停止します

## トラブルシューティング

### ポートが既に使用されている場合
- 3000番または3001番ポートが既に使用されている場合は、`docker-compose.yml`のポート設定を変更してください

### 依存関係のインストールでエラーが発生する場合
```bash
# node_modulesを削除して再インストール
cd frontend-admin && rm -rf node_modules && npm install
cd ../frontend-user && rm -rf node_modules && npm install
```

### Dockerコンテナの再ビルドが必要な場合
```bash
make down
docker-compose build --no-cache
make up
```
```

このREADMEでは、Makefileで定義されている以下のコマンドを活用した手順を記載しています：
- `make setup`: 依存関係のインストール
- `make up`: アプリケーションの起動
- `make down`: アプリケーションの停止

これにより、複雑なコマンドを覚える必要がなく、簡単な`make`コマンドで環境構築やアプリケーションの操作が可能になります。