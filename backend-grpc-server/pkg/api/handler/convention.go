package handler

import (
	"context"

	pb "github.com/uhablog/maemob-management-squad/pkg/api/pb"
	"github.com/uhablog/maemob-management-squad/pkg/service"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ConventionHandler struct {
	pb.UnimplementedConventionsServiceServer
	conventionService *service.ConventionService
	teamService       *service.TeamService
}

func NewConventionHandler(conventionService *service.ConventionService, teamService *service.TeamService) *ConventionHandler {
	return &ConventionHandler{
		conventionService: conventionService,
		teamService:       teamService,
	}
}

func (h *ConventionHandler) GetConventions(ctx context.Context, req *pb.GetConventionsRequest) (*pb.GetConventionsResponse, error) {
	conventions, total, err := h.conventionService.GetConventions(ctx, int(req.Page))
	if err != nil {
		return nil, err
	}

	var grpcConventions []*pb.Convention
	for _, convention := range conventions {
		heldDateProto := timestamppb.New(convention.HeldDay)
		grpcConventions = append(grpcConventions, &pb.Convention{
			ConventionId:   convention.ID,
			ConventionName: convention.ConventionName,
			HeldDate:       heldDateProto,
		})
	}

	return &pb.GetConventionsResponse{
		Page:        req.Page,
		Total:       int32(total),
		Conventions: grpcConventions,
	}, nil
}

func (h *ConventionHandler) GetTeams(ctx context.Context, req *pb.GetTeamsRequest) (*pb.GetTeamsResponse, error) {
	teams, err := h.teamService.GetTeamsByConventionId(ctx, req.ConventionId)
	if err != nil {
		return nil, err
	}

	var grpcTeams []*pb.Teams
	for _, team := range teams {
		grpcTeams = append(grpcTeams, &pb.Teams{
			TeamId:   team.ID,
			TeamName: team.TeamName,
		})
	}

	return &pb.GetTeamsResponse{
		Teams: grpcTeams,
	}, nil
}
