def best_scores(scores)
  best = {}
  scores.keys.each do |name|
    best[name] = scores[name].max
  end
  best
end
