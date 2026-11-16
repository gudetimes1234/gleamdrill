def searchMatrix(matrix, target):
    # The rows are sorted and do not overlap, so the row a value could live in
    # is itself found by halving: compare the target against a row's ends.
    low, high = 0, len(matrix) - 1  # @1
    while low <= high:  # @2
        mid = (low + high) // 2  # @3
        if matrix[mid][-1] < target:  # @4
            low = mid + 1  # @4
        elif matrix[mid][0] > target:  # @5
            high = mid - 1  # @5
        else:  # @6
            return contains(matrix[mid], target)  # @6
    return False  # @7


def contains(row, target):
    low, high = 0, len(row) - 1  # @8
    while low <= high:  # @9
        mid = (low + high) // 2  # @10
        if row[mid] == target:  # @11
            return True  # @11
        if row[mid] < target:  # @12
            low = mid + 1  # @12
        else:  # @13
            high = mid - 1  # @13
    return False  # @14
