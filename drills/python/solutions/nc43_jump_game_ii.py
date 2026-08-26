def jump(nums):
    # Breadth-first search without a queue. Everything reachable in k jumps
    # forms a contiguous window; when the walk reaches that window's end, one
    # more jump is spent and the next window runs to the furthest index seen.
    jumps = 0
    window_end = 0
    furthest = 0

    for i in range(len(nums) - 1):
        furthest = max(furthest, i + nums[i])
        if i == window_end:
            jumps += 1
            window_end = furthest

    return jumps
