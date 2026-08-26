from collections import Counter


def subsetsWithDup(nums):
    # A different framing: the answer is not a choice per *element* but a choice
    # per distinct *value* -- how many copies of it to take, from none up to
    # however many there are. Duplicates then cannot arise at all, so there is
    # no skipping rule to remember.
    subsets = [[]]
    for value, count in sorted(Counter(nums).items()):
        subsets = [
            subset + [value] * taken for subset in subsets for taken in range(count + 1)
        ]
    return subsets
