def findKthLargest(nums, k):
    # Sorting answers every k at once, which is more than asked for but is the
    # version nobody gets wrong. O(n log n).
    if k < 1 or k > len(nums):
        return None
    return sorted(nums, reverse=True)[k - 1]
