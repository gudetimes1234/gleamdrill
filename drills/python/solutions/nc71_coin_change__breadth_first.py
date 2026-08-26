def coinChange(coins, amount):
    if amount == 0:
        return 0

    # The amounts reachable with k coins form one level of a breadth-first
    # search from zero, so the first level containing the target is the answer.
    # Same bound as the table, but it stops the moment it arrives rather than
    # filling in every amount below the target.
    frontier = [0]
    seen = {0}
    used = 0

    while frontier:
        used += 1
        following = []
        for total in frontier:
            for coin in coins:
                nxt = total + coin
                if nxt == amount:
                    return used
                if nxt < amount and nxt not in seen:
                    seen.add(nxt)
                    following.append(nxt)
        frontier = following

    return -1
