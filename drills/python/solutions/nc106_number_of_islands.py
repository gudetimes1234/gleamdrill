def numIslands(grid):
    land = {
        (r, c)
        for r, row in enumerate(grid)
        for c, value in enumerate(row)
        if value == "1"
    }

    # Counting connected components: start a search at every piece of land not
    # already reached, and each search that has to be started is one more
    # island. Marking as you go is what stops a component being counted once per
    # square.
    seen = set()
    count = 0

    for at in land:
        if at in seen:
            continue
        count += 1
        stack = [at]
        while stack:
            r, c = stack.pop()
            if (r, c) not in land or (r, c) in seen:
                continue
            seen.add((r, c))
            stack.extend([(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)])

    return count
