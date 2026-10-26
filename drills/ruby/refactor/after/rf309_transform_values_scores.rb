def best_scores(scores)
  scores.transform_values { |list| list.max }
end
