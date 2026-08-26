def canJump(nums):
    if not nums:
        return True

    # Walk backwards carrying the leftmost index known to reach the end. Any
    # index that can reach *that* can reach the end, so it becomes the new goal.
    goal = len(nums) - 1
    for i in range(len(nums) - 1, -1, -1):
        if i + nums[i] >= goal:
            goal = i
    return goal == 0
