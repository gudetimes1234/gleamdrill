from collections import Counter


def isNStraightHand(hand, groupSize):
    if groupSize <= 0 or len(hand) % groupSize != 0:
        return False

    counts = Counter(hand)

    # The smallest card left has no smaller neighbour to hide behind, so
    # whatever group it belongs to must start with it. That removes all choice,
    # which is what makes the greedy correct -- and every copy of it needs its
    # own group, so they are all taken at once.
    for smallest in sorted(counts):
        copies = counts[smallest]
        if copies == 0:
            continue
        for card in range(smallest, smallest + groupSize):
            if counts[card] < copies:
                return False
            counts[card] -= copies

    return True
