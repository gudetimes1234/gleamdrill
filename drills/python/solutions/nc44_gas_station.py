def canCompleteCircuit(gas, cost):
    if not gas:  # @1
        return -1  # @1

    # Two facts do all the work. If the total gas is short of the total cost no
    # start works at all; and if the tank runs dry between i and j, no station
    # in between can start either, so the search jumps straight to j + 1.
    total = 0  # @2
    tank = 0  # @3
    start = 0  # @4

    for i in range(len(gas)):  # @5
        diff = gas[i] - cost[i]  # @6
        total += diff  # @7
        tank += diff  # @8
        if tank < 0:  # @9
            start = i + 1  # @10
            tank = 0  # @10

    return start if total >= 0 else -1  # @11
