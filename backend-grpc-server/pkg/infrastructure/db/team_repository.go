package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/uhablog/maemob-management-squad/pkg/domain/team"
)

type PostgresTeamRepository struct {
	conn *pgx.Conn
}

func NewPostgresTeamRepository(conn *pgx.Conn) *PostgresTeamRepository {
	return &PostgresTeamRepository{conn: conn}
}

func (r *PostgresTeamRepository) GetTeamsByConventionId(conventionId string) ([]*team.Team, error) {

	query := `
		SELECT
			id
			,team_name
		FROM
			-- TEAMS
			"TEAMS"
		WHERE
			convention_id = $1
	`

	rows, err := r.conn.Query(context.Background(), query, conventionId)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
	}
	defer rows.Close()

	var teams []*team.Team
	for rows.Next() {
		var t team.Team
		if err := rows.Scan(
			&t.ID,
			&t.TeamName); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}
		teams = append(teams, &t)
	}

	return teams, nil
}
