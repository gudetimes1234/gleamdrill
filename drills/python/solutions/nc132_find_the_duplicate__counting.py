def findDuplicate(nums):
    # Binary search over the *values*, not the positions. For a candidate v,
    # count how many numbers are at most v: with no duplicate that count is
    # exactly v, so a count that runs ahead says the repeat is at or below v.
    # O(n log n) against Floyd's O(n), but it needs no insight about cycles --
    # only that the pigeonhole is what makes the count informative.
    low, high = 1, len(nums) - 1
    while low < high:
        middle = (low + high) // 2
        if sum(1 for value in nums if value <= middle) > middle:
            high = middle
        else:
            low = middle + 1
    return low
