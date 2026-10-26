def passing_count(scores, pass_mark)
  passed = 0
  scores.each do |score|
    passed += 1 if score >= pass_mark
  end
  passed
end
