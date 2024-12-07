package db

import (
	"context"
	"fmt"

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

func (r *PostgresPlayerRepository) GetPlayers(page int32) ([]*player.Player, int32, error) {
	var pageSize int32 = 100
	offset := (page - 1) * pageSize

	query := `
		SELECT
			id
			,footballapi_player_id
			,footballapi_team_id
			,player_name
			,team_auth0_user_id
			,birth_date
			,nationality
			,height
			,weight
			,created_date
			,created_user
			,updated_date
			,updated_user
		FROM
			player_master
		ORDER BY
			id ASC
		LIMIT $1 OFFSET $2
	`

	countQuery := `SELECT COUNT(*) FROM player_master`

	rows, err := r.conn.Query(context.Background(), query, pageSize, offset)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to execute query: %w", err)
	}
	defer rows.Close()

	var players []*player.Player
	for rows.Next() {
		var p player.Player
		if err := rows.Scan(
			&p.ID,
			&p.FootballapiPlayerId,
			&p.FootballapiTeamId,
			&p.PlayerName,
			&p.TeamAuth0UserId,
			&p.BirthDate,
			&p.Nationality,
			&p.Height,
			&p.Weight,
			&p.CreatedDate,
			&p.CreatedUser,
			&p.UpdatedDate,
			&p.UpdatedUser); err != nil {
			return nil, 0, fmt.Errorf("failed to scan row: %w", err)
		}
		players = append(players, &p)
	}

	var total int32
	err = r.conn.QueryRow(context.Background(), countQuery).Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	return players, total, nil
}
