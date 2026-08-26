def canCompleteCircuit(gas, cost):
    if not gas:
        return -1

    # Two facts do all the work. If the total gas is short of the total cost no
    # start works at all; and if the tank runs dry between i and j, no station
    # in between can start either, so the search jumps straight to j + 1.
    total = 0
    tank = 0
    start = 0

    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        tank += diff
        if tank < 0:
            start = i + 1
            tank = 0

    return start if total >= 0 else -1
