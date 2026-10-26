def opening_streak(results)
  results.take_while { |result| result == :win }.size
end
