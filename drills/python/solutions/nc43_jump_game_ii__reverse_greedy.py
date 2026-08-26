def jump(nums):
    if len(nums) <= 1:
        return 0

    # From the goal, step back to the *earliest* index that can reach it: taking
    # the earliest can never cost more jumps, and it is the only choice that is
    # obviously safe. O(n^2), and it makes the greedy argument visible.
    goal = len(nums) - 1
    jumps = 0
    while goal > 0:
        for i in range(len(nums)):
            if i + nums[i] >= goal:
                goal = i
                jumps += 1
                break
        else:
            break
    return jumps
