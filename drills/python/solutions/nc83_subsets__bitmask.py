def subsets(nums):
    # The in-or-out choices *are* the bits of a number, so counting from 0 to
    # 2^n - 1 enumerates every subset exactly once with no recursion at all.
    # Worth knowing: it also gives every subset a stable index, which matters
    # when subsets have to be compared or cached.
    return [
        [value for i, value in enumerate(nums) if mask >> i & 1]
        for mask in range(1 << len(nums))
    ]
