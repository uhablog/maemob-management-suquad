package team

type Repository interface {
	GetTeamsByConventionId(conventionId string) ([]*Team, error)
}
