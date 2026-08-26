def searchMatrix(matrix, target):
    # The rows are sorted and do not overlap, so the row a value could live in
    # is itself found by halving: compare the target against a row's ends.
    low, high = 0, len(matrix) - 1
    while low <= high:
        mid = (low + high) // 2
        if matrix[mid][-1] < target:
            low = mid + 1
        elif matrix[mid][0] > target:
            high = mid - 1
        else:
            return contains(matrix[mid], target)
    return False


def contains(row, target):
    low, high = 0, len(row) - 1
    while low <= high:
        mid = (low + high) // 2
        if row[mid] == target:
            return True
        if row[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return False
