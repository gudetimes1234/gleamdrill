def combinationSum2(candidates, target):
    return build(sorted(candidates), target)


# Each candidate is used at most once, so taking one moves past it. The
# duplicate rule is the same as in Subsets II: skipping a value means skipping
# every copy of it, otherwise the same combination is rebuilt from a different
# copy of the same number.
def build(sorted_candidates, target):
    if target == 0:
        return [[]]
    if not sorted_candidates:
        return []

    first = sorted_candidates[0]
    if first > target:
        return []

    with_first = [[first] + rest for rest in build(sorted_candidates[1:], target - first)]

    past = 1
    while past < len(sorted_candidates) and sorted_candidates[past] == first:
        past += 1

    return with_first + build(sorted_candidates[past:], target)
