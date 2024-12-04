package main

import (
	"context"
	"log"
	"net"

	"github.com/uhablog/maemob-management-squad/pkg/api/handler"
	pb "github.com/uhablog/maemob-management-squad/pkg/api/pb"
	"github.com/uhablog/maemob-management-squad/pkg/infrastructure/db"
	"github.com/uhablog/maemob-management-squad/pkg/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	// DB接続
	conn, err := db.ConnectDB()
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	defer conn.Close(context.Background())

	// リポジトリとサービスの初期化
	squadRepo := db.NewPostgresSquadRepository(conn)
	squadService := service.NewSquadService(squadRepo)
	squadHandler := handler.NewSquadHandler(squadService)

	playerRepo := db.NewPostgresPlayerRepository(conn)
	playerService := service.NewPlayerService(playerRepo)
	playerHandler := handler.NewPlayerHandler(playerService)

	// gRPCサーバー設定
	server := grpc.NewServer()
	pb.RegisterSquadServiceServer(server, squadHandler)
	pb.RegisterPlayerServiceServer(server, playerHandler)

	// Reflectionを有効化
	reflection.Register(server)

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen on port 50051: %v", err)
	}

	log.Println("gRPC server running on :50051")
	if err := server.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}

}
