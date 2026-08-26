def mergeTriplets(triplets, target):
    # A triplet with any component above the target can never be used: merging
    # takes maxima, so that component would be stuck too high forever. Throw
    # those away and the rest can all be merged, because a max only ever helps.
    best = [0, 0, 0]
    for triplet in triplets:
        if all(triplet[i] <= target[i] for i in range(3)):
            best = [max(best[i], triplet[i]) for i in range(3)]
    return best == list(target)
