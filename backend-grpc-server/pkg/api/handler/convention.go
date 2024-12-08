package handler

import (
	"context"

	pb "github.com/uhablog/maemob-management-squad/pkg/api/pb"
	"github.com/uhablog/maemob-management-squad/pkg/service"
)

type ConventionHandler struct {
	pb.UnimplementedConventionsServiceServer
	service *service.ConventionService
}

func NewConventionHandler(service *service.ConventionService) *ConventionHandler {
	return &ConventionHandler{service: service}
}

func (h *ConventionHandler) GetConventions(ctx context.Context, req *pb.GetConventionsRequest) (*pb.GetConventionsResponse, error) {
	conventions, total, err := h.service.GetConventions(ctx, int(req.Page))
	if err != nil {
		return nil, err
	}

	var grpcConventions []*pb.Convention
	for _, convention := range conventions {
		grpcConventions = append(grpcConventions, &pb.Convention{
			ConventionId:   convention.ID,
			ConventionName: convention.ConventionName,
			HeldDate:       convention.HeldDay,
		})
	}

	return &pb.GetConventionsResponse{
		Page:        req.Page,
		Total:       int32(total),
		Conventions: grpcConventions,
	}, nil
}
