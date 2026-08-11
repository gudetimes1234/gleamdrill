def twoSum(numbers, target):
    # Instead of converging two pointers, fix each number and binary search the
    # tail for its complement. O(n log n), and it reuses a search you already
    # know rather than a second pointer discipline.
    for i, number in enumerate(numbers):
        wanted = target - number
        lo, hi = i + 1, len(numbers) - 1
        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if numbers[mid] == wanted:
                return [i + 1, mid + 1]
            if numbers[mid] < wanted:
                lo = mid + 1
            else:
                hi = mid - 1
    return []
