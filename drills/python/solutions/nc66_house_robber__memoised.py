def rob(nums):
    memo = {}

    # The same choice written as a recursion from the front: rob this house and
    # skip the next, or skip this one. Exponential without the cache and linear
    # with it -- which is the lesson, since the rolling pair hides that the
    # problem ever had a tree of choices at all.
    def best(index):
        if index >= len(nums):
            return 0
        if index not in memo:
            memo[index] = max(nums[index] + best(index + 2), best(index + 1))
        return memo[index]

    return best(0)
