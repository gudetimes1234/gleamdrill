from collections import Counter

def topKFrequent(nums, k):
    counts = Counter(nums)  # @1
    buckets = [[] for _ in range(len(nums) + 1)]  # @2
    for num, freq in counts.items():  # @3
        buckets[freq].append(num)  # @4

    result = []  # @5
    for freq in range(len(buckets) - 1, 0, -1):  # @6
        for num in buckets[freq]:  # @7
            result.append(num)  # @8
            if len(result) == k:  # @9
                return result  # @9
    return result  # @10
