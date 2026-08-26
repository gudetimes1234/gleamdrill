def combinationSum(candidates, target):
    return build(candidates, target)


# Each step either takes the current candidate again -- reuse is allowed -- or
# drops it for good. Never going back to a dropped candidate is what stops the
# same combination appearing in several orders, so no deduplication is needed.
def build(candidates, target):
    if target == 0:
        return [[]]
    if not candidates:
        return []

    first = candidates[0]
    if first > target or first <= 0:
        return build(candidates[1:], target)

    with_first = [[first] + rest for rest in build(candidates, target - first)]
    return with_first + build(candidates[1:], target)
