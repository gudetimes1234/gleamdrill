from bisect import bisect_left


def lengthOfLIS(nums):
    # Patience sorting. Keep the smallest value that any subsequence of each
    # length ends with; that list is always sorted, so each number either
    # extends it or replaces the first entry it is no bigger than. The list is
    # not the answer subsequence -- only its length is meaningful.
    tails = []  # @1
    for n in nums:  # @2
        at = bisect_left(tails, n)  # @3
        if at == len(tails):  # @4
            tails.append(n)  # @4
        else:  # @5
            tails[at] = n  # @5
    return len(tails)  # @6
