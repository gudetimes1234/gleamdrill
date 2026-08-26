def searchMatrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    # From the top-right corner every step is forced: too big and the whole
    # column is too big, so drop it; too small and the whole row is too small,
    # so drop that. O(m + n), and it never uses the fact that rows do not
    # overlap -- it works on any matrix sorted along both axes.
    row, column = 0, len(matrix[0]) - 1
    while row < len(matrix) and column >= 0:
        value = matrix[row][column]
        if value == target:
            return True
        if value > target:
            column -= 1
        else:
            row += 1
    return False
