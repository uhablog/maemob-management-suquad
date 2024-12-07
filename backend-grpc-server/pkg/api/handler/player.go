package handler

import (
	"context"

	pb "github.com/uhablog/maemob-management-squad/pkg/api/pb"
	"github.com/uhablog/maemob-management-squad/pkg/service"
)

type PlayerHandler struct {
	pb.UnimplementedPlayerServiceServer
	service *service.PlayerService
}

func NewPlayerHandler(service *service.PlayerService) *PlayerHandler {
	return &PlayerHandler{service: service}
}

func (h *PlayerHandler) CreatePlayer(ctx context.Context, req *pb.CreatePlayerRequest) (*pb.CreatePlayerResponse, error) {
	id, err := h.service.CreatePlayer(
		ctx, req.FootballapiPlayerId, req.FootballapiTeamId,
		req.PlayerName, req.TeamAuth0UserId, req.BirthDate,
		req.Nationality, req.Height, req.Weight)

	if err != nil {
		return nil, err
	}
	return &pb.CreatePlayerResponse{PlayerId: id}, nil
}

func (h *PlayerHandler) GetPlayers(ctx context.Context, req *pb.GetPlayersRequest) (*pb.GetPlayersResponse, error) {
	players, total, err := h.service.GetPlayers(ctx, req.Page)
	if err != nil {
		return nil, err
	}

	var grpcPlayers []*pb.Player
	for _, player := range players {
		grpcPlayers = append(grpcPlayers, &pb.Player{
			PlayerId:   player.ID,
			PlayerName: player.PlayerName,
		})
	}

	return &pb.GetPlayersResponse{
		Page:    req.Page,
		Total:   total,
		Players: grpcPlayers,
	}, nil
}
