def search(nums, target):
    # Two plain steps instead of one clever one: find where the rotation
    # wrapped, which splits the input into two ordinary sorted arrays, then
    # binary search each. Nothing has to reason mid-search about which half is
    # sorted.
    pivot = rotationPoint(nums)
    found = binarySearch(nums, target, 0, pivot - 1)
    if found != -1:
        return found
    return binarySearch(nums, target, pivot, len(nums) - 1)

def rotationPoint(nums):
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return i
    return 0

def binarySearch(nums, target, lo, hi):
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
