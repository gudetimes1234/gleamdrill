def missingNumber(nums):
    # XOR every value against every index it should have had. Each present
    # number meets its own index and cancels; the missing one has an index with
    # no partner, so that index is what survives.
    result = len(nums)  # @1
    for i, n in enumerate(nums):  # @2
        result ^= i ^ n  # @3
    return result  # @4
