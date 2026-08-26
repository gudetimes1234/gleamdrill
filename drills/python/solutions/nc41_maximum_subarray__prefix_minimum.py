def maxSubArray(nums):
    if not nums:
        return 0

    # The sum from i to j is prefix[j] - prefix[i-1], so the best subarray
    # ending at j is prefix[j] minus the smallest prefix before it. One pass
    # carrying that minimum answers the whole thing.
    running = 0
    smallest = 0
    best = float("-inf")
    for n in nums:
        running += n
        best = max(best, running - smallest)
        smallest = min(smallest, running)
    return best
