def unique_paths(m, n)
  return 0 if m <= 0 || n <= 0

  # Only right and down moves, so the ways to reach a square are the ways to
  # reach the one above plus the one to its left. Rows are filled top to
  # bottom, and only the row above is ever needed, so one row of counters
  # does for the whole grid.
  row = Array.new(n, 1)
  (m - 1).times do
    (1...n).each { |c| row[c] += row[c - 1] }
  end

  row[-1]
end
