def maxSubArray(nums):
    if not nums:  # @1
        return 0  # @1

    # Kadane: at each position the best subarray ending here either extends the
    # one ending just before it or starts fresh. A running total that has gone
    # negative can only hurt whatever follows, so it is dropped.
    here = best = nums[0]  # @2
    for n in nums[1:]:  # @3
        here = max(n, here + n)  # @4
        best = max(best, here)  # @5
    return best  # @6
