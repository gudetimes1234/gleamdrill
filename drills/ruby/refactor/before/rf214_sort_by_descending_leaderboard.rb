def leaderboard(players)
  sorted = players.sort { |a, b| b.points <=> a.points }
  names = []
  sorted.each { |player| names << player.name }
  names
end
