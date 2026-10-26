def top_scorers(players, n)
  players
    .select { |player| player[:score].positive? }
    .sort_by { |player| -player[:score] }
    .first(n)
    .map { |player| player[:name] }
end
