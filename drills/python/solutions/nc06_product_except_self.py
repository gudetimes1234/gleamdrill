def productExceptSelf(nums):
    n = len(nums)  # @1
    result = [1] * n  # @2

    prefix = 1  # @3
    for i in range(n):  # @4
        result[i] = prefix  # @5
        prefix *= nums[i]  # @6

    suffix = 1  # @7
    for i in range(n - 1, -1, -1):  # @8
        result[i] *= suffix  # @9
        suffix *= nums[i]  # @10

    return result  # @11
