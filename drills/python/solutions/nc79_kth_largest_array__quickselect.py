def findKthLargest(nums, k):
    if k < 1 or k > len(nums):  # @1
        return None  # @1
    return select(nums, k)  # @2


# Quickselect: partition around a pivot, then recurse into the side that must
# contain the answer rather than sorting both. Expected O(n), because the work
# halves each time instead of being repeated -- the same saving binary search
# makes over a scan.
def select(nums, k):
    pivot = nums[0]  # @3
    bigger = [n for n in nums[1:] if n > pivot]  # @4
    equal = [n for n in nums[1:] if n == pivot]  # @5
    smaller = [n for n in nums[1:] if n < pivot]  # @6

    if k <= len(bigger):  # @7
        return select(bigger, k)  # @7
    if k <= len(bigger) + 1 + len(equal):  # @8
        return pivot  # @8
    return select(smaller, k - len(bigger) - 1 - len(equal))  # @9
