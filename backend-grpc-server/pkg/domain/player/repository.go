package player

type Repository interface {
	CreatePlayer(player *Player) error
	GetPlayers(page int32) ([]*Player, int32, error)
}
