def lengthOfLIS(nums):
    # The longest subsequence ending at each position: one plus the best of
    # every earlier position holding a smaller value. Building the answers in
    # order means every "earlier position" is already known.
    endings = []  # @1
    best = 0  # @2

    for n in nums:  # @3
        here = 1 + max((length for value, length in endings if value < n), default=0)  # @4
        endings.append((n, here))  # @5
        best = max(best, here)  # @6

    return best  # @7
