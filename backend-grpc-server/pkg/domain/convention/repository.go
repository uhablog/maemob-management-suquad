package convention

type Repository interface {
	GetConventions(page int) ([]*Convention, int, error)
}
