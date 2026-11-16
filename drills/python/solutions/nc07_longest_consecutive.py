def longestConsecutive(nums):
    num_set = set(nums)  # @1
    longest = 0  # @2

    for num in num_set:  # @3
        # only start counting from the beginning of a run
        if num - 1 not in num_set:  # @4
            length = 1  # @5
            while num + length in num_set:  # @6
                length += 1  # @7
            longest = max(longest, length)  # @8

    return longest  # @9
