package service

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/uhablog/maemob-management-squad/pkg/domain/squad"
)

type SquadService struct {
	repo squad.Repository
}

func NewSquadService(repo squad.Repository) *SquadService {
	return &SquadService{repo: repo}
}

func (s *SquadService) CreateSquad(ctx context.Context, teamId, playerId string) (string, error) {

	fmt.Println("go squad service start!!")
	fmt.Println(teamId)
	fmt.Println(playerId)

	// idを生成する
	id, err := uuid.NewRandom()
	if err != nil {
		log.Fatalf("UUIDの生成でエラーが発生")
		return "", err
	}

	now := time.Now()

	squad := &squad.Squad{
		ID:          id.String(),
		TeamId:      teamId,
		PlayerId:    playerId,
		CreatedDate: now,
		UpdatedDate: now,
		CreatedUser: "Yuha",
		UpdatedUser: "Yuha",
	}

	s.repo.CreateSquad(squad)
	fmt.Println("go squad service end!!")

	return id.String(), nil
}
