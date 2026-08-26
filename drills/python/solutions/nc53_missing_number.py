def missingNumber(nums):
    # XOR every value against every index it should have had. Each present
    # number meets its own index and cancels; the missing one has an index with
    # no partner, so that index is what survives.
    result = len(nums)
    for i, n in enumerate(nums):
        result ^= i ^ n
    return result
