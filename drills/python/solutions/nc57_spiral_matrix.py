def spiralOrder(matrix):
    # Take the top row, then turn the problem ninety degrees and do it again.
    # Rotating what is left anticlockwise puts the column you would have walked
    # down next along the top, so there is only ever one move to make.
    out = []  # @1
    while matrix:  # @2
        out.extend(matrix[0])  # @3
        matrix = [list(row) for row in zip(*matrix[1:])][::-1]  # @4
    return out  # @5
