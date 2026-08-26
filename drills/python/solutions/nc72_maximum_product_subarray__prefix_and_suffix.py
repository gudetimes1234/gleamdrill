def maxProduct(nums):
    if not nums:
        return 0
    # A different argument entirely: the best subarray always runs to one end of
    # the block it sits in, so sweeping running products from both directions --
    # resetting at every zero -- is enough.
    return max(sweep(nums), sweep(nums[::-1]))


def sweep(nums):
    running = 1
    best = float("-inf")
    for n in nums:
        running = n if running == 0 else running * n
        best = max(best, running)
    return best
