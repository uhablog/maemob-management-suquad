package service

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/uhablog/maemob-management-squad/pkg/domain/player"
)

type PlayerService struct {
	repo player.Repository
}

func NewPlayerService(repo player.Repository) *PlayerService {
	return &PlayerService{repo: repo}
}

func (s *PlayerService) CreatePlayer(ctx context.Context, footballApiPlayerId string, footballApiTeamId string, playerName string, teamAuth0UserId string, birthDate string, nationality string, height string, weight string) (string, error) {

	fmt.Println("player service: CreatePlayer Start!!")

	// idを生成する
	id, err := uuid.NewRandom()
	if err != nil {
		log.Fatalf("UUIDの生成でエラーが発生")
		return "", err
	}

	now := time.Now()

	// 生年月日をtime.Time型に変換
	layout := "2006-01-02" // 日付部分だけのフォーマット
	parsedBirthDate, err := time.Parse(layout, birthDate)
	if err != nil {
		fmt.Println("エラー:", err)
		return "", err
	}

	player := &player.Player{
		ID:                  id.String(),
		FootballapiPlayerId: footballApiPlayerId,
		FootballapiTeamId:   footballApiTeamId,
		PlayerName:          playerName,
		TeamAuth0UserId:     teamAuth0UserId,
		BirthDate:           parsedBirthDate,
		Nationality:         nationality,
		Height:              height,
		Weight:              weight,
		CreatedDate:         now,
		CreatedUser:         "Yuha",
		UpdatedDate:         now,
		UpdatedUser:         "Yuha",
	}

	s.repo.CreatePlayer(player)
	fmt.Println("Player Service end!!")

	return id.String(), nil
}

func (s *PlayerService) GetPlayers(ctx context.Context, page int32) ([]*player.Player, int32, error) {
	return s.repo.GetPlayers(page)
}
