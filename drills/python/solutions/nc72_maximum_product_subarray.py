def maxProduct(nums):
    if not nums:
        return 0

    # A negative number turns the best running product into the worst and the
    # worst into the best, so both have to be carried. Zero resets them both,
    # which falls out of taking the element itself as an option.
    high = low = best = nums[0]
    for n in nums[1:]:
        candidates = (n, high * n, low * n)
        high, low = max(candidates), min(candidates)
        best = max(best, high)

    return best
