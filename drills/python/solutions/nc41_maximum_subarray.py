def maxSubArray(nums):
    if not nums:
        return 0

    # Kadane: at each position the best subarray ending here either extends the
    # one ending just before it or starts fresh. A running total that has gone
    # negative can only hurt whatever follows, so it is dropped.
    here = best = nums[0]
    for n in nums[1:]:
        here = max(n, here + n)
        best = max(best, here)
    return best
