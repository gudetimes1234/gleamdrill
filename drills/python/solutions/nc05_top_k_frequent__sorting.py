def topKFrequent(nums, k):
    # Straight sort by frequency: O(n log n) rather than the bucket version's
    # O(n), but it is the version you can write without thinking.
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1

    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return [num for num, _ in ordered[:k]]
