def combinationSum2(candidates, target):
    # Generate every subset that hits the target and collapse the repeats
    # afterwards. Correct, and exponentially wasteful on inputs with many equal
    # values -- which is exactly why the skipping rule is worth getting right.
    found = []
    for subset in everySubset(sorted(candidates)):
        if sum(subset) == target and subset not in found:
            found.append(subset)
    return found


def everySubset(sorted_candidates):
    if not sorted_candidates:
        return [[]]
    without = everySubset(sorted_candidates[1:])
    return [[sorted_candidates[0]] + subset for subset in without] + without
