def searchMatrix(matrix, target):
    if not matrix or not matrix[0]:  # @1
        return False  # @1

    # From the top-right corner every step is forced: too big and the whole
    # column is too big, so drop it; too small and the whole row is too small,
    # so drop that. O(m + n), and it never uses the fact that rows do not
    # overlap -- it works on any matrix sorted along both axes.
    row, column = 0, len(matrix[0]) - 1  # @2
    while row < len(matrix) and column >= 0:  # @3
        value = matrix[row][column]  # @4
        if value == target:  # @5
            return True  # @5
        if value > target:  # @6
            column -= 1  # @6
        else:  # @7
            row += 1  # @7
    return False  # @8
