def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1  # @1

    while left < right:  # @2
        total = numbers[left] + numbers[right]  # @3
        if total == target:  # @4
            return [left + 1, right + 1]  # @4
        elif total < target:  # @5
            left += 1  # @5
        else:  # @6
            right -= 1  # @6

    return []  # @7
