def canJump(nums):
    # Only one number matters: the furthest index reachable so far. Walk forward
    # and extend it; the moment the walk gets past it, nothing further is
    # reachable.
    reach = 0
    for i, jump in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + jump)
    return reach >= len(nums) - 1
