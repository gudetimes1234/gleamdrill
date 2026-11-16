def threeSum(nums):
    nums.sort()  # @1
    result = []  # @2

    for i, a in enumerate(nums):  # @3
        if i > 0 and a == nums[i - 1]:  # @4
            continue  # @4

        left, right = i + 1, len(nums) - 1  # @5
        while left < right:  # @6
            total = a + nums[left] + nums[right]  # @7
            if total < 0:  # @8
                left += 1  # @8
            elif total > 0:  # @9
                right -= 1  # @9
            else:  # @10
                result.append([a, nums[left], nums[right]])  # @11
                left += 1  # @12
                while left < right and nums[left] == nums[left - 1]:  # @13
                    left += 1  # @13

    return result  # @14
