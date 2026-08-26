def solveNQueens(n):
    boards = []

    # One queen per row, so the only choice is which column. A diagonal is
    # identified by row - column and an anti-diagonal by row + column, which
    # turns "is this square attacked?" into three set lookups -- and lets the
    # search abandon a whole subtree the moment one fails.
    def place(row, chosen, columns, diagonals, antiDiagonals):
        if row == n:
            boards.append(["." * c + "Q" + "." * (n - c - 1) for c in chosen])
            return
        for column in range(n):
            if column in columns or row - column in diagonals or row + column in antiDiagonals:
                continue
            place(
                row + 1,
                chosen + [column],
                columns | {column},
                diagonals | {row - column},
                antiDiagonals | {row + column},
            )

    place(0, [], set(), set(), set())
    return boards
