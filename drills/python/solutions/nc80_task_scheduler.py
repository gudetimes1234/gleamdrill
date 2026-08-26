from collections import Counter


def leastInterval(tasks, n):
    if not tasks:
        return 0

    counts = Counter(tasks)
    busiest = max(counts.values())
    ties = sum(1 for count in counts.values() if count == busiest)

    # Lay the most frequent task out first with gaps of n between its copies.
    # That skeleton is (busiest - 1) full frames of n + 1 slots, plus the final
    # row of every task tied for busiest. Everything else either fits into an
    # idle slot or has already pushed the total past the skeleton -- in which
    # case no idling happens and the answer is just the number of tasks.
    return max(len(tasks), (busiest - 1) * (n + 1) + ties)
