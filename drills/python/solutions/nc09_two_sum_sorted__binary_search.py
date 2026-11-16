def twoSum(numbers, target):
    for i, number in enumerate(numbers):  # @1
        wanted = target - number  # @2
        lo, hi = i + 1, len(numbers) - 1  # @3
        while lo <= hi:  # @4
            mid = lo + (hi - lo) // 2  # @5
            if numbers[mid] == wanted:  # @6
                return [i + 1, mid + 1]  # @6
            if numbers[mid] < wanted:  # @7
                lo = mid + 1  # @7
            else:  # @8
                hi = mid - 1  # @8
    return []  # @9
