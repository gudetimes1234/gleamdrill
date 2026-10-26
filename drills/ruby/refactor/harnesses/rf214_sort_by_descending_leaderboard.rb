need :leaderboard

Player = Struct.new(:name, :points)
players = [Player.new("Ann", 40), Player.new("Bo", 95), Player.new("Cy", 0), Player.new("Di", 61)]
tc "leaderboard(players)", %w[Bo Di Ann Cy], leaderboard(players)
tc "leaderboard([])", [], leaderboard([])
tc "leaderboard([Ed -5, Fy 3]) -- negative points sort last", %w[Fy Ed], leaderboard([Player.new("Ed", -5), Player.new("Fy", 3)])
uses(/\.sort_by\b/, "sort_by")
avoids(/<=>/, "the spaceship operator")
avoids(/\.each\b/, "each loop")
