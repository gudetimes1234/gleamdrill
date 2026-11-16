def setZeroes(matrix):
    # Two passes, and they cannot be one: writing a zero as you find it would be
    # indistinguishable from a zero that was already there, and the whole grid
    # would clear. So record which rows and columns are doomed first, then apply.
    rows = set()  # @1
    columns = set()  # @2
    for r, row in enumerate(matrix):  # @3
        for c, value in enumerate(row):  # @4
            if value == 0:  # @5
                rows.add(r)  # @6
                columns.add(c)  # @6

    return [  # @7
        [0 if r in rows or c in columns else value for c, value in enumerate(row)]  # @7
        for r, row in enumerate(matrix)  # @7
    ]
