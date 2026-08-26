def permute(nums):
    # Pick each element in turn as the first, then permute what is left.
    # Removing the chosen element from the remainder is what the "used" set does
    # in an in-place version -- here the remainder is simply a shorter list.
    if not nums:
        return [[]]
    return [
        [value] + tail
        for i, value in enumerate(nums)
        for tail in permute(nums[:i] + nums[i + 1:])
    ]
