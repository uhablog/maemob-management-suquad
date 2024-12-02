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
