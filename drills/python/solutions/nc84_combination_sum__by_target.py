def combinationSum(candidates, target):
    usable = sorted(c for c in candidates if c > 0)  # @1

    # Bottom-up instead of by recursion: the combinations making a target are
    # every combination making a smaller amount with one more candidate added.
    # Requiring each added candidate to be no smaller than the combination's
    # largest is what keeps one combination from appearing in several orders.
    table = {0: [[]]}  # @2
    for amount in range(1, target + 1):  # @3
        found = []  # @4
        for candidate in usable:  # @5
            if candidate > amount:  # @6
                break  # @6
            for combination in table.get(amount - candidate, []):  # @7
                if not combination or candidate >= combination[0]:  # @8
                    found.append([candidate] + combination)  # @9
        table[amount] = found  # @10

    return table.get(target, [])  # @11
