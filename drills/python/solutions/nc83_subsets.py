def subsets(nums):
    # Every element is either in or out, independently, so the subsets of a list
    # are the subsets of its tail twice over: once with the head added and once
    # without. That is the whole recursion, and it is why there are 2^n of them.
    if not nums:
        return [[]]
    without = subsets(nums[1:])
    return [[nums[0]] + subset for subset in without] + without
