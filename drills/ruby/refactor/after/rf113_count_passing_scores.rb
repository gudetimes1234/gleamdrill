def passing_count(scores, pass_mark)
  scores.count { |score| score >= pass_mark }
end
