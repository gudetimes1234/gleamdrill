def lengthOfLIS(nums):
    # The longest subsequence ending at each position: one plus the best of
    # every earlier position holding a smaller value. Building the answers in
    # order means every "earlier position" is already known.
    endings = []
    best = 0

    for n in nums:
        here = 1 + max((length for value, length in endings if value < n), default=0)
        endings.append((n, here))
        best = max(best, here)

    return best
