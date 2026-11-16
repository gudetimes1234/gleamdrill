def permute(nums):
    # Pick each element in turn as the first, then permute what is left.
    # Removing the chosen element from the remainder is what the "used" set does
    # in an in-place version -- here the remainder is simply a shorter list.
    if not nums:  # @1
        return [[]]  # @1
    return [  # @2
        [value] + tail  # @2
        for i, value in enumerate(nums)  # @3
        for tail in permute(nums[:i] + nums[i + 1:])  # @4
    ]
