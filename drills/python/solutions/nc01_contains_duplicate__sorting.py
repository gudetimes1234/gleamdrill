def containsDuplicate(nums):
    # Duplicates are adjacent once sorted, so one pass over the sorted copy
    # answers it — O(n log n) time but no extra structure to hold every value.
    ordered = sorted(nums)
    for i in range(1, len(ordered)):
        if ordered[i] == ordered[i - 1]:
            return True
    return False
