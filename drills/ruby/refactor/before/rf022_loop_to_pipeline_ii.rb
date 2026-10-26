def top_scorers(players, n)
  scored = []
  players.each do |player|
    scored << player if player[:score] > 0
  end
  scored = scored.sort { |a, b| b[:score] <=> a[:score] }
  names = []
  i = 0
  while i < n && i < scored.length
    names << scored[i][:name]
    i += 1
  end
  names
end
