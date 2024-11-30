package squad

type Repository interface {
	CreateSquad(squad *Squad) error
}
