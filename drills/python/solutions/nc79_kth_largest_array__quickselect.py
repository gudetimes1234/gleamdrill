def findKthLargest(nums, k):
    if k < 1 or k > len(nums):
        return None
    return select(nums, k)


# Quickselect: partition around a pivot, then recurse into the side that must
# contain the answer rather than sorting both. Expected O(n), because the work
# halves each time instead of being repeated -- the same saving binary search
# makes over a scan.
def select(nums, k):
    pivot = nums[0]
    bigger = [n for n in nums[1:] if n > pivot]
    equal = [n for n in nums[1:] if n == pivot]
    smaller = [n for n in nums[1:] if n < pivot]

    if k <= len(bigger):
        return select(bigger, k)
    if k <= len(bigger) + 1 + len(equal):
        return pivot
    return select(smaller, k - len(bigger) - 1 - len(equal))
