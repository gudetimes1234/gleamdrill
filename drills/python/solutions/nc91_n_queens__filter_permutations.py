from itertools import permutations


def solveNQueens(n):
    # One queen per row with no two sharing a column *is* a permutation of the
    # columns, so the row and column rules are satisfied by construction and
    # only the diagonals are left to test. Generating all n! and filtering is
    # far slower than pruning as you go -- it explores arrangements a
    # backtracker would have abandoned at the second queen -- but it names what
    # the search space actually is.
    return [
        ["." * c + "Q" + "." * (n - c - 1) for c in chosen]
        for chosen in permutations(range(n))
        if noDiagonalClash(chosen)
    ]


def noDiagonalClash(chosen):
    return all(
        abs(r1 - r2) != abs(chosen[r1] - chosen[r2])
        for r1 in range(len(chosen))
        for r2 in range(r1 + 1, len(chosen))
    )
