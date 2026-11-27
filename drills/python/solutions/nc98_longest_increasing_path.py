def longestIncreasingPath(matrix):
    if not matrix or not matrix[0]:  # @1
        return 0  # @1

    memo = {}  # @2

    # Strictly increasing means the moves can never form a cycle -- the grid is
    # a directed acyclic graph -- so the longest path from each square is
    # well-defined and can simply be cached. Without that guarantee memoisation
    # would be unsound, which is the fact the problem is really testing.
    def longest(r, c):
        if (r, c) not in memo:  # @3
            best = 1  # @4
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):  # @5
                nr, nc = r + dr, c + dc  # @6
                if 0 <= nr < len(matrix) and 0 <= nc < len(matrix[0]):  # @7
                    if matrix[nr][nc] > matrix[r][c]:  # @8
                        best = max(best, 1 + longest(nr, nc))  # @9
            memo[(r, c)] = best  # @10
        return memo[(r, c)]  # @11

    return max(longest(r, c) for r in range(len(matrix)) for c in range(len(matrix[0])))  # @12
