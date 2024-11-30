package handler

import (
	"context"

	pb "github.com/uhablog/maemob-management-squad/pkg/api/pb"
	"github.com/uhablog/maemob-management-squad/pkg/service"
)

type SquadHandler struct {
	pb.UnimplementedSquadServiceServer
	service *service.SquadService
}

func NewSquadHandler(service *service.SquadService) *SquadHandler {
	return &SquadHandler{service: service}
}

func (h *SquadHandler) CreateSquad(ctx context.Context, req *pb.CreateSquadRequest) (*pb.CreateSquadResponse, error) {
	id, err := h.service.CreateSquad(ctx, req.TeamId, req.PlayerId)
	if err != nil {
		return nil, err
	}
	return &pb.CreateSquadResponse{SquadId: id}, nil
}
