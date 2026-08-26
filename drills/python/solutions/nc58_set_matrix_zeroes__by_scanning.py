def setZeroes(matrix):
    # The condition stated outright: a cell is cleared exactly when its own row
    # holds a zero or its own column does. Nothing is recorded and nothing is
    # ordered, so the two-pass trap cannot arise -- at the cost of rescanning a
    # row and a column for every single cell.
    columns = [list(column) for column in zip(*matrix)]
    return [
        [0 if 0 in row or 0 in columns[c] else value for c, value in enumerate(row)]
        for row in matrix
    ]
