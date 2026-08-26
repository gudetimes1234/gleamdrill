def canCompleteCircuit(gas, cost):
    # Drive the whole loop from each start and see whether the tank ever goes
    # negative. O(n^2) -- the definition, and what the single pass replaces.
    diffs = [g - c for g, c in zip(gas, cost)]

    for start in range(len(diffs)):
        tank = 0
        survives = True
        for diff in diffs[start:] + diffs[:start]:
            tank += diff
            if tank < 0:
                survives = False
                break
        if survives:
            return start

    return -1
