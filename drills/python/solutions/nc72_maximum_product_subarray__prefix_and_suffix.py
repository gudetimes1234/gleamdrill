def maxProduct(nums):
    if not nums:  # @1
        return 0  # @1
    # A different argument entirely: the best subarray always runs to one end of
    # the block it sits in, so sweeping running products from both directions --
    # resetting at every zero -- is enough.
    return max(sweep(nums), sweep(nums[::-1]))  # @2


def sweep(nums):
    running = 1  # @3
    best = float("-inf")  # @4
    for n in nums:  # @5
        running = n if running == 0 else running * n  # @6
        best = max(best, running)  # @7
    return best  # @8
