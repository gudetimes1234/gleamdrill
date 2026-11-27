def maxProduct(nums):
    if not nums:  # @1
        return 0  # @1

    # A negative number turns the best running product into the worst and the
    # worst into the best, so both have to be carried. Zero resets them both,
    # which falls out of taking the element itself as an option.
    high = low = best = nums[0]  # @2
    for n in nums[1:]:  # @3
        candidates = (n, high * n, low * n)  # @4
        high, low = max(candidates), min(candidates)  # @5
        best = max(best, high)  # @6

    return best  # @7
