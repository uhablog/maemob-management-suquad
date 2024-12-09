package service

import (
	"context"

	"github.com/uhablog/maemob-management-squad/pkg/domain/team"
)

type TeamService struct {
	repo team.Repository
}

func NewTeamService(repo team.Repository) *TeamService {
	return &TeamService{repo: repo}
}

func (s *TeamService) GetTeamsByConventionId(ctx context.Context, conventionId string) ([]*team.Team, error) {
	return s.repo.GetTeamsByConventionId(conventionId)
}
