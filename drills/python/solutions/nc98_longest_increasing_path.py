def longestIncreasingPath(matrix):
    if not matrix or not matrix[0]:
        return 0

    memo = {}

    # Strictly increasing means the moves can never form a cycle -- the grid is
    # a directed acyclic graph -- so the longest path from each square is
    # well-defined and can simply be cached. Without that guarantee memoisation
    # would be unsound, which is the fact the problem is really testing.
    def longest(r, c):
        if (r, c) not in memo:
            best = 1
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < len(matrix) and 0 <= nc < len(matrix[0]):
                    if matrix[nr][nc] > matrix[r][c]:
                        best = max(best, 1 + longest(nr, nc))
            memo[(r, c)] = best
        return memo[(r, c)]

    return max(longest(r, c) for r in range(len(matrix)) for c in range(len(matrix[0])))
