# backend-grpc-server

## 概要

MaeMobのプレイヤーマスターやチームの選手を管理するためのバックエンドサーバー。
Go言語を使って、gRPCサーバーを構築した。

## 技術スタック

- Go: 1.23.0

## ディレクトリ構成

```
.
└── backend-grpc-server/
    ├── cmd/
    │   └── grpcserver/
    │       └── main.go -- エントリポイント
    └── pkg/
        ├── api/
        │   ├── handler
        │   ├── pb
        │   └── proto/
        │       └── squad-service.proto -- gRPCのprotoファイル
        ├── domain
        ├── infrastructure
        ├── service
        └── util
```

## 各種コマンド

1. PostgreSQLの起動

本gRPCサーバーはPostgreSQLに依存している。まずはPostgreSQLを起動するのが良い。
本リポジトリのルートディレクトリに、docker-compose.ymlファイルがある。
ルートディレクトリで以下コマンドを実行することで、PostgreSQLが起動し、テーブル作成とテストデータ投入がされる。

```zsh
docker compose up -d
```

2. gRPCサーバーの起動

gRPCサーバーの起動は以下コマンド

```zsh
go run cmd/grpcserver/main.go
```

3. protoファイルの更新

gRPCのprotoファイルを更新した後、コードを自動生成する際はbackend-grpc-serverで以下のコマンド

```zsh
make proto
```
