def numIslands(grid):
    land = {  # @1
        (r, c)  # @1
        for r, row in enumerate(grid)  # @1
        for c, value in enumerate(row)  # @1
        if value == "1"  # @1
    }  # @1

    # Counting connected components: start a search at every piece of land not
    # already reached, and each search that has to be started is one more
    # island. Marking as you go is what stops a component being counted once per
    # square.
    seen = set()  # @2
    count = 0  # @3

    for at in land:  # @4
        if at in seen:  # @5
            continue  # @5
        count += 1  # @6
        stack = [at]  # @7
        while stack:  # @8
            r, c = stack.pop()  # @9
            if (r, c) not in land or (r, c) in seen:  # @10
                continue  # @10
            seen.add((r, c))  # @11
            stack.extend([(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)])  # @12

    return count  # @13
