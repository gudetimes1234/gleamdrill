def jump(nums):
    # Breadth-first search without a queue. Everything reachable in k jumps
    # forms a contiguous window; when the walk reaches that window's end, one
    # more jump is spent and the next window runs to the furthest index seen.
    jumps = 0  # @1
    window_end = 0  # @2
    furthest = 0  # @3

    for i in range(len(nums) - 1):  # @4
        furthest = max(furthest, i + nums[i])  # @5
        if i == window_end:  # @6
            jumps += 1  # @7
            window_end = furthest  # @8

    return jumps  # @9
