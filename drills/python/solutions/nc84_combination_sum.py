def combinationSum(candidates, target):
    return build(candidates, target)  # @1


# Each step either takes the current candidate again -- reuse is allowed -- or
# drops it for good. Never going back to a dropped candidate is what stops the
# same combination appearing in several orders, so no deduplication is needed.
def build(candidates, target):
    if target == 0:  # @2
        return [[]]  # @2
    if not candidates:  # @3
        return []  # @3

    first = candidates[0]  # @4
    if first > target or first <= 0:  # @5
        return build(candidates[1:], target)  # @5

    with_first = [[first] + rest for rest in build(candidates, target - first)]  # @6
    return with_first + build(candidates[1:], target)  # @7
