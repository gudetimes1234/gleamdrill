def rotate(matrix):
    # A quarter turn is a reflection through the main diagonal followed by a
    # reflection through the vertical centre line. Two easy operations instead
    # of one four-way element cycle, and neither needs index arithmetic.
    return [list(row)[::-1] for row in zip(*matrix)]
