package service

import (
	"context"

	"github.com/uhablog/maemob-management-squad/pkg/domain/convention"
)

type ConventionService struct {
	repo convention.Repository
}

func NewConventionService(repo convention.Repository) *ConventionService {
	return &ConventionService{repo: repo}
}

func (s *ConventionService) GetConventions(ctx context.Context, page int) ([]*convention.Convention, int, error) {
	return s.repo.GetConventions(page)
}
