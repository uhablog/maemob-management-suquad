package db

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/uhablog/maemob-management-squad/pkg/domain/player"
)

type PostgresPlayerRepository struct {
	conn *pgx.Conn
}

func NewPostgresPlayerRepository(conn *pgx.Conn) *PostgresPlayerRepository {
	return &PostgresPlayerRepository{conn: conn}
}

func (r *PostgresPlayerRepository) CreatePlayer(player *player.Player) error {
	_, err := r.conn.Exec(context.Background(),
		"INSERT INTO player_master (id, footballapi_player_id, footballapi_team_id, player_name, team_auth0_user_id, birth_date, nationality, height, weight, created_date, created_user, updated_date, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
		player.ID, player.FootballapiPlayerId, player.FootballapiTeamId,
		player.PlayerName, player.TeamAuth0UserId, player.BirthDate,
		player.Nationality, player.Height, player.Weight,
		player.CreatedDate, player.CreatedUser, player.UpdatedDate, player.UpdatedUser)

	return err
}
