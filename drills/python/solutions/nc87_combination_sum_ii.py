def combinationSum2(candidates, target):
    return build(sorted(candidates), target)  # @1


# Each candidate is used at most once, so taking one moves past it. The
# duplicate rule is the same as in Subsets II: skipping a value means skipping
# every copy of it, otherwise the same combination is rebuilt from a different
# copy of the same number.
def build(sorted_candidates, target):
    if target == 0:  # @2
        return [[]]  # @2
    if not sorted_candidates:  # @3
        return []  # @3

    first = sorted_candidates[0]  # @4
    if first > target:  # @5
        return []  # @5

    with_first = [[first] + rest for rest in build(sorted_candidates[1:], target - first)]  # @6

    past = 1  # @7
    while past < len(sorted_candidates) and sorted_candidates[past] == first:  # @8
        past += 1  # @9

    return with_first + build(sorted_candidates[past:], target)  # @10
