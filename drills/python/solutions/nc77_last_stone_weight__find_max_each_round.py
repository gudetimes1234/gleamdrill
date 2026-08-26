def lastStoneWeight(stones):
    # No ordering kept at all: scan for the heaviest, remove it, scan again.
    # O(n) per round against a heap's O(log n) -- worse, but it makes clear that
    # the only operation the problem needs is "give me the largest", which is
    # exactly the interface a heap provides.
    stones = list(stones)

    while len(stones) > 1:
        heaviest = max(stones)
        stones.remove(heaviest)
        following = max(stones)
        stones.remove(following)
        if heaviest != following:
            stones.append(heaviest - following)

    return stones[0] if stones else 0
