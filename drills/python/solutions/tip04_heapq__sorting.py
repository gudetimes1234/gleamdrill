def kSmallest(nums, k):
    # Sorting is O(n log n) against the heap's O(n + k log n). For small k the
    # heap wins; for k near n they are the same, and this is far shorter.
    return sorted(nums)[:k]

def kLargest(nums, k):
    return sorted(nums, reverse=True)[:k]
