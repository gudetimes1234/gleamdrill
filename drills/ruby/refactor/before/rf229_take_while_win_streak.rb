def opening_streak(results)
  streak = 0
  for result in results
    break unless result == :win
    streak += 1
  end
  streak
end
