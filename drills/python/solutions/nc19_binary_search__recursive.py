def search(nums, target):
    return halve(nums, target, 0, len(nums) - 1)

def halve(nums, target, lo, hi):
    if lo > hi:
        return -1

    mid = lo + (hi - lo) // 2
    if nums[mid] == target:
        return mid
    if nums[mid] < target:
        return halve(nums, target, mid + 1, hi)
    return halve(nums, target, lo, mid - 1)
