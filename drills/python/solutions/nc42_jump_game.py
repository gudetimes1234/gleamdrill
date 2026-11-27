def canJump(nums):
    # Only one number matters: the furthest index reachable so far. Walk forward
    # and extend it; the moment the walk gets past it, nothing further is
    # reachable.
    reach = 0  # @1
    for i, jump in enumerate(nums):  # @2
        if i > reach:  # @3
            return False  # @4
        reach = max(reach, i + jump)  # @5
    return reach >= len(nums) - 1  # @6
