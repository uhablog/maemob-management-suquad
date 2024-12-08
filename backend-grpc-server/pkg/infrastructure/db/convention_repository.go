package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/uhablog/maemob-management-squad/pkg/domain/convention"
)

type PostgresConventionRepository struct {
	conn *pgx.Conn
}

func NewPostgresConventionRepository(conn *pgx.Conn) *PostgresConventionRepository {
	return &PostgresConventionRepository{conn: conn}
}

func (r *PostgresConventionRepository) GetConventions(page int) ([]*convention.Convention, int, error) {

	var pageSize int = 3
	offset := (page - 1) * pageSize

	query := `
		SELECT
			id
			,convention_name
			,held_day
		FROM
			CONVENTIONS
		ORDER BY
			id ASC
		LIMIT $1 OFFSET $2
	`

	countQuery := `SELECT COUNT(*) FROM "CONVENTIONS"`

	rows, err := r.conn.Query(context.Background(), query, pageSize, offset)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to execute query: %w", err)
	}
	defer rows.Close()

	var conventions []*convention.Convention
	for rows.Next() {
		var c convention.Convention
		if err := rows.Scan(
			&c.ID,
			&c.ConventionName,
			&c.HeldDay); err != nil {
			return nil, 0, fmt.Errorf("failed to scan row: %w", err)
		}
		conventions = append(conventions, &c)
	}

	var total int
	err = r.conn.QueryRow(context.Background(), countQuery).Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	return conventions, total, nil

}
