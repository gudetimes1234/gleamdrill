def kSmallest(nums, k):
    return sorted(nums)[:k]

def kLargest(nums, k):
    return sorted(nums, reverse=True)[:k]
