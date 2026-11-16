def subsetsWithDup(nums):
    return build(sorted(nums))  # @1


# Sorting puts equal values next to each other, which is what makes the
# duplicate rule expressible: when the head is skipped, skip *every* copy of it
# at once. Skipping one copy and keeping the next would rebuild the same subset
# by a different route.
def build(sorted_nums):
    if not sorted_nums:  # @2
        return [[]]  # @2

    first = sorted_nums[0]  # @3
    with_first = [[first] + subset for subset in build(sorted_nums[1:])]  # @4

    past = 1  # @5
    while past < len(sorted_nums) and sorted_nums[past] == first:  # @6
        past += 1  # @7

    return with_first + build(sorted_nums[past:])  # @8
