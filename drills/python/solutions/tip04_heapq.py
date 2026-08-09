import heapq

def kSmallest(nums, k):
    heap = list(nums)
    heapq.heapify(heap)
    return [heapq.heappop(heap) for _ in range(min(k, len(heap)))]

def kLargest(nums, k):
    heap = [-n for n in nums]
    heapq.heapify(heap)
    return [-heapq.heappop(heap) for _ in range(min(k, len(heap)))]
