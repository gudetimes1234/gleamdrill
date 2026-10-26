def search_matrix(matrix, target)
  # The rows are sorted and do not overlap, so the row a value could live in
  # is itself found by halving: compare the target against a row's ends.
  low = 0
  high = matrix.length - 1
  while low <= high
    mid = (low + high) / 2
    if matrix[mid][-1] < target
      low = mid + 1
    elsif matrix[mid][0] > target
      high = mid - 1
    else
      return contains(matrix[mid], target)
    end
  end
  false
end

def contains(row, target)
  low = 0
  high = row.length - 1
  while low <= high
    mid = (low + high) / 2
    return true if row[mid] == target

    if row[mid] < target
      low = mid + 1
    else
      high = mid - 1
    end
  end
  false
end
