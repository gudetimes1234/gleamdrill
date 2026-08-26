def numIslands(grid):
    land = {
        (r, c)
        for r, row in enumerate(grid)
        for c, value in enumerate(row)
        if value == "1"
    }

    # Union-find instead of flood fill: every square starts as its own island
    # and each adjacency merges two. Only right and down are needed -- every
    # pair of neighbours is reached once that way -- and the answer is how many
    # roots are left. This is the version that keeps working when the grid
    # arrives one square at a time and the count has to be reported after each.
    parents = {at: at for at in land}

    def find(at):
        while parents[at] != at:
            parents[at] = parents[parents[at]]
            at = parents[at]
        return at

    for r, c in land:
        for other in ((r + 1, c), (r, c + 1)):
            if other in land:
                a, b = find((r, c)), find(other)
                if a != b:
                    parents[a] = b

    return len({find(at) for at in land})
