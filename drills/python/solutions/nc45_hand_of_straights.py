from collections import Counter


def isNStraightHand(hand, groupSize):
    if groupSize <= 0 or len(hand) % groupSize != 0:  # @1
        return False  # @1

    counts = Counter(hand)  # @2

    # The smallest card left has no smaller neighbour to hide behind, so
    # whatever group it belongs to must start with it. That removes all choice,
    # which is what makes the greedy correct -- and every copy of it needs its
    # own group, so they are all taken at once.
    for smallest in sorted(counts):  # @3
        copies = counts[smallest]  # @4
        if copies == 0:  # @5
            continue  # @5
        for card in range(smallest, smallest + groupSize):  # @6
            if counts[card] < copies:  # @7
                return False  # @7
            counts[card] -= copies  # @8

    return True  # @9
