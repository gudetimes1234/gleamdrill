def search_matrix(matrix, target)
  return false if matrix.empty? || matrix[0].empty?

  # From the top-right corner every step is forced: too big and the whole
  # column is too big, so drop it; too small and the whole row is too small,
  # so drop that. O(m + n), and it never uses the fact that rows do not
  # overlap: it works on any matrix sorted along both axes.
  row = 0
  column = matrix[0].length - 1
  while row < matrix.length && column >= 0
    value = matrix[row][column]
    return true if value == target

    if value > target
      column -= 1
    else
      row += 1
    end
  end
  false
end
