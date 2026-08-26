def findTargetSumWays(nums, target):
    # Rewrite the problem. If P is the set given a plus and N the set given a
    # minus, then P - N = target and P + N = total, so P = (total + target) / 2.
    # That turns a sign-assignment question into "how many subsets sum to a
    # fixed value" -- a knapsack, with no negative totals to track at all.
    total = sum(nums)
    wanted = total + target
    if wanted < 0 or wanted % 2 or total < abs(target):
        return 0

    goal = wanted // 2
    counts = {0: 1}
    for n in nums:
        following = dict(counts)
        for reached, ways in counts.items():
            if reached + n <= goal:
                following[reached + n] = following.get(reached + n, 0) + ways
        counts = following

    return counts.get(goal, 0)
