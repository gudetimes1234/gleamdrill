def firstIndexOf(nums, target):
    for i, value in enumerate(nums):
        if value == target:
            return i
    return -1

def dotProduct(a, b):
    return sum(x * y for x, y in zip(a, b))
