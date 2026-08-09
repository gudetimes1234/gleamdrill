pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player {
  Player(name: name, score: 0, level: 1)
}

pub fn add_points(player: Player, points: Int) -> Player {
  Player(..player, score: player.score + points)
}

pub fn level_up(player: Player) -> Player {
  Player(..player, level: player.level + 1, score: 0)
}
