# maemob-management-suquad

## 概要
このリポジトリは Maemob Management Squad のプロジェクトです。
ローカル環境での起動方法について記載しています。

## コマンド手順

1. docker-composeの起動

PostgreSQLの起動

```zsh
docker compose up -d
```

2. gRPCサーバーの起動

backend-grpc-serverディレクトリで実行

```zsh
go run cmd/grpcserver/main.go
```

3. bff(GraphQLサーバー)の起動

bffディレクトリで実行

```zsh
npm run start
```

4. フロントエンドアプリの起動

frontendディレクトリで実行(next.js)

```zsh
npm run dev
```
