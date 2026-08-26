from bisect import bisect_left


def lengthOfLIS(nums):
    # Patience sorting. Keep the smallest value that any subsequence of each
    # length ends with; that list is always sorted, so each number either
    # extends it or replaces the first entry it is no bigger than. The list is
    # not the answer subsequence -- only its length is meaningful.
    tails = []
    for n in nums:
        at = bisect_left(tails, n)
        if at == len(tails):
            tails.append(n)
        else:
            tails[at] = n
    return len(tails)
