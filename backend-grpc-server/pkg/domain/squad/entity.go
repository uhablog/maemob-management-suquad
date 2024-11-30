package squad

import "time"

type Squad struct {
	ID          string
	TeamId      string
	PlayerId    string
	CreatedDate time.Time
	UpdatedDate time.Time
	CreatedUser string
	UpdatedUser string
}
