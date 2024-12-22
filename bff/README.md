# bff

## 概要

フロントエンドと各種バックエンドシステムの間を受け持つbffで、Nest.jsを使ってGraphQLサーバーで構築。

利用するAPIは以下の通り

- Auth0: Management APIを使って、データの取得
- FootballAPI
- gRPC: 本リポジトリのbackend-grpc-serverを利用する

## 各種コマンド

1. サーバーの起動

```zsh
npm run start
```
