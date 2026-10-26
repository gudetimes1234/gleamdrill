def longest_increasing_path(matrix)
  return 0 if matrix.empty? || matrix[0].empty?

  rows = matrix.length
  columns = matrix[0].length

  # The same acyclicity used the other way round: process the squares from
  # largest value to smallest, and by the time a square is reached every
  # square it can move to has already been settled. A topological order
  # without ever building the graph: sorting by value *is* the order.
  cells = []
  matrix.each_with_index do |row, r|
    row.each_with_index { |value, c| cells << [value, r, c] }
  end
  lengths = {}

  cells.sort.reverse_each do |value, r, c|
    best = 1
    [[1, 0], [-1, 0], [0, 1], [0, -1]].each do |dr, dc|
      nr = r + dr
      nc = c + dc
      next unless nr.between?(0, rows - 1) && nc.between?(0, columns - 1)

      best = [best, 1 + lengths[[nr, nc]]].max if matrix[nr][nc] > value
    end
    lengths[[r, c]] = best
  end

  lengths.values.max
end
