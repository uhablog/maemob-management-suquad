package player

import "time"

type Player struct {
	ID                  string
	FootballapiPlayerId string
	FootballapiTeamId   string
	PlayerName          string
	TeamAuth0UserId     string
	BirthDate           time.Time
	Nationality         string
	Height              string
	Weight              string
	CreatedDate         time.Time
	UpdatedDate         time.Time
	CreatedUser         string
	UpdatedUser         string
}
