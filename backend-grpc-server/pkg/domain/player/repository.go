package player

type Repository interface {
	CreatePlayer(player *Player) error
}
