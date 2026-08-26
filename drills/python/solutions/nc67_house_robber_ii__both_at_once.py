def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    # One pass carrying both stories at the same time: the run that is allowed
    # to take the first house, and the run that is not. Neither ever looks at
    # the other, so this is the two-pass version interleaved -- useful when the
    # input can only be walked once.
    with_first = (0, 0)
    without_first = (0, 0)

    for i, value in enumerate(nums):
        if i != len(nums) - 1:
            with_first = step(with_first, value)
        if i != 0:
            without_first = step(without_first, value)

    return max(with_first[0], without_first[0])


def step(state, value):
    best, previous = state
    return max(best, previous + value), best
