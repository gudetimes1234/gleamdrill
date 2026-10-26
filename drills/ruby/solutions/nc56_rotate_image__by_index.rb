def rotate(matrix)
  # Straight from where each element lands: after a clockwise quarter turn the
  # entry at (row, column) came from (n - 1 - column, row). Writing the mapping
  # out once is the surest way not to get the direction backwards.
  n = matrix.length
  (0...n).map { |r| (0...n).map { |c| matrix[n - 1 - c][r] } }
end
