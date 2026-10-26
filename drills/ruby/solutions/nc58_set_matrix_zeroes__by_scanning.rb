def set_zeroes(matrix)
  # The condition stated outright: a cell is cleared exactly when its own row
  # holds a zero or its own column does. Nothing is recorded and nothing is
  # ordered, so the two-pass trap cannot arise, at the cost of rescanning a
  # row and a column for every single cell.
  columns = matrix.transpose
  matrix.map do |row|
    row.each_with_index.map { |value, c| row.include?(0) || columns[c].include?(0) ? 0 : value }
  end
end
