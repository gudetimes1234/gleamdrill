def coinChange(coins, amount):
    if amount == 0:  # @1
        return 0  # @1

    # The amounts reachable with k coins form one level of a breadth-first
    # search from zero, so the first level containing the target is the answer.
    # Same bound as the table, but it stops the moment it arrives rather than
    # filling in every amount below the target.
    frontier = [0]  # @2
    seen = {0}  # @3
    used = 0  # @4

    while frontier:  # @5
        used += 1  # @6
        following = []  # @7
        for total in frontier:  # @8
            for coin in coins:  # @9
                nxt = total + coin  # @10
                if nxt == amount:  # @11
                    return used  # @11
                if nxt < amount and nxt not in seen:  # @12
                    seen.add(nxt)  # @13
                    following.append(nxt)  # @13
        frontier = following  # @14

    return -1  # @15
