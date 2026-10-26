def unique_paths(m, n)
  return 0 if m <= 0 || n <= 0

  # Every path is exactly m-1 downs and n-1 rights in some order, so the count
  # is the number of ways to choose which of the m+n-2 moves are downs: a
  # binomial coefficient, and no grid at all. Multiplying and dividing in step
  # keeps every intermediate an exact integer.
  downs = m - 1
  total = m + n - 2
  result = 1
  (1..downs).each do |i|
    result = result * (total - downs + i) / i
  end

  result
end
