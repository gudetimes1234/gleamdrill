def setZeroes(matrix):
    # Two passes, and they cannot be one: writing a zero as you find it would be
    # indistinguishable from a zero that was already there, and the whole grid
    # would clear. So record which rows and columns are doomed first, then apply.
    rows = set()
    columns = set()
    for r, row in enumerate(matrix):
        for c, value in enumerate(row):
            if value == 0:
                rows.add(r)
                columns.add(c)

    return [
        [0 if r in rows or c in columns else value for c, value in enumerate(row)]
        for r, row in enumerate(matrix)
    ]
