def maxSubArray(nums):
    if not nums:  # @1
        return 0  # @1

    # The sum from i to j is prefix[j] - prefix[i-1], so the best subarray
    # ending at j is prefix[j] minus the smallest prefix before it. One pass
    # carrying that minimum answers the whole thing.
    running = 0  # @2
    smallest = 0  # @3
    best = float("-inf")  # @4
    for n in nums:  # @5
        running += n  # @6
        best = max(best, running - smallest)  # @7
        smallest = min(smallest, running)  # @8
    return best  # @9
