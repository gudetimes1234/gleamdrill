def combinationSum(candidates, target):
    usable = sorted(c for c in candidates if c > 0)

    # Bottom-up instead of by recursion: the combinations making a target are
    # every combination making a smaller amount with one more candidate added.
    # Requiring each added candidate to be no smaller than the combination's
    # largest is what keeps one combination from appearing in several orders.
    table = {0: [[]]}
    for amount in range(1, target + 1):
        found = []
        for candidate in usable:
            if candidate > amount:
                break
            for combination in table.get(amount - candidate, []):
                if not combination or candidate >= combination[0]:
                    found.append([candidate] + combination)
        table[amount] = found

    return table.get(target, [])
