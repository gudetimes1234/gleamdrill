def singleNumber(nums):
    # XOR is its own inverse and does not care about order, so every value that
    # appears twice cancels itself out and only the lone one survives.
    result = 0  # @1
    for n in nums:  # @2
        result ^= n  # @3
    return result  # @4
