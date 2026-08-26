def firstIndexOf(nums, target):
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1

def dotProduct(a, b):
    total = 0
    for i in range(min(len(a), len(b))):
        total += a[i] * b[i]
    return total
