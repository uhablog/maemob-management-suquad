package db

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/uhablog/maemob-management-squad/pkg/domain/squad"
)

type PostgresSquadRepository struct {
	conn *pgx.Conn
}

func NewPostgresSquadRepository(conn *pgx.Conn) *PostgresSquadRepository {
	return &PostgresSquadRepository{conn: conn}
}

func (r *PostgresSquadRepository) CreateSquad(squad *squad.Squad) error {
	_, err := r.conn.Exec(context.Background(),
		"INSERT INTO squad (id, team_id, player_id, created_date, updated_date, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		squad.ID, squad.TeamId, squad.PlayerId, squad.CreatedDate, squad.UpdatedDate, squad.CreatedUser, squad.UpdatedUser)

	return err
}
