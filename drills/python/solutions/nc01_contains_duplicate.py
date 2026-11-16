def containsDuplicate(nums):
    seen = set()  # @1
    for num in nums:  # @2
        if num in seen:  # @3
            return True  # @4
        seen.add(num)  # @5
    return False  # @6
