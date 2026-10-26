def leaderboard(players)
  players.sort_by { |player| -player.points }.map(&:name)
end
