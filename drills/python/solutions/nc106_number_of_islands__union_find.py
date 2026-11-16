def numIslands(grid):
    land = {  # @1
        (r, c)  # @1
        for r, row in enumerate(grid)  # @1
        for c, value in enumerate(row)  # @1
        if value == "1"  # @1
    }  # @1

    # Union-find instead of flood fill: every square starts as its own island
    # and each adjacency merges two. Only right and down are needed -- every
    # pair of neighbours is reached once that way -- and the answer is how many
    # roots are left. This is the version that keeps working when the grid
    # arrives one square at a time and the count has to be reported after each.
    parents = {at: at for at in land}  # @2

    def find(at):
        while parents[at] != at:  # @3
            parents[at] = parents[parents[at]]  # @4
            at = parents[at]  # @5
        return at  # @6

    for r, c in land:  # @7
        for other in ((r + 1, c), (r, c + 1)):  # @8
            if other in land:  # @9
                a, b = find((r, c)), find(other)  # @10
                if a != b:  # @11
                    parents[a] = b  # @11

    return len({find(at) for at in land})  # @12
