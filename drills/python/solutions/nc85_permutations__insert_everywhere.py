def permute(nums):
    # Build up instead of choosing: every permutation of n elements is a
    # permutation of n-1 with the new element wedged into one of its n
    # positions. No recursion into a shrinking remainder, and it explains the
    # factorial directly -- one more choice of position at every step.
    permutations = [[]]
    for value in nums:
        permutations = [
            permutation[:at] + [value] + permutation[at:]
            for permutation in permutations
            for at in range(len(permutation) + 1)
        ]
    return permutations
