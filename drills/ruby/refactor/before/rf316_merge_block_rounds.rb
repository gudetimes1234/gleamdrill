def best_of(round1, round2)
  best = {}
  (round1.keys | round2.keys).each do |name|
    scores = [round1[name], round2[name]].compact
    best[name] = scores.max
  end
  best
end
