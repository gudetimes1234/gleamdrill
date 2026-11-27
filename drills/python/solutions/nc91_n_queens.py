def solveNQueens(n):
    boards = []  # @1

    # One queen per row, so the only choice is which column. A diagonal is
    # identified by row - column and an anti-diagonal by row + column, which
    # turns "is this square attacked?" into three set lookups -- and lets the
    # search abandon a whole subtree the moment one fails.
    def place(row, chosen, columns, diagonals, antiDiagonals):
        if row == n:  # @2
            boards.append(["." * c + "Q" + "." * (n - c - 1) for c in chosen])  # @3
            return  # @3
        for column in range(n):  # @4
            if column in columns or row - column in diagonals or row + column in antiDiagonals:  # @5
                continue  # @5
            place(  # @6
                row + 1,  # @6
                chosen + [column],  # @7
                columns | {column},  # @8
                diagonals | {row - column},  # @8
                antiDiagonals | {row + column},  # @8
            )

    place(0, [], set(), set(), set())  # @9
    return boards  # @10
