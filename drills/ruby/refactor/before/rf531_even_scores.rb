def even_scores(scores)
  scores.select { |score| score % 2 == 0 }
end
