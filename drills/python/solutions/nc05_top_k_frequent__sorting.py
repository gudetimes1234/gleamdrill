def topKFrequent(nums, k):
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1

    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return [num for num, _ in ordered[:k]]
