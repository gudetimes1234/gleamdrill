def mergeTriplets(triplets, target):
    # Ask a different question: is each of the three positions hit exactly by
    # some usable triplet? The answer is yes exactly when all three are covered
    # -- the same condition, arrived at without taking maxima.
    usable = [t for t in triplets if all(t[i] <= target[i] for i in range(3))]
    return all(any(t[i] == target[i] for t in usable) for i in range(3))
