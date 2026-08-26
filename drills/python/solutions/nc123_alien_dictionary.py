def alienOrder(words):
    letters = {letter for word in words for letter in word}

    # Two adjacent words agree up to their first difference, and that difference
    # is the only thing they say about the alphabet -- everything after it is
    # unordered. The one case with no letters to compare is a word followed by a
    # prefix of itself, which no alphabet can explain.
    waiting = {letter: 0 for letter in letters}
    unlocks = {letter: [] for letter in letters}
    for first, second in zip(words, words[1:]):
        for a, b in zip(first, second):
            if a != b:
                unlocks[a].append(b)
                waiting[b] += 1
                break
        else:
            if len(first) > len(second):
                return ""

    ready = [letter for letter in letters if waiting[letter] == 0]
    order = []
    while ready:
        letter = ready.pop()
        order.append(letter)
        for following in unlocks[letter]:
            waiting[following] -= 1
            if waiting[following] == 0:
                ready.append(following)

    # Short means the leftovers all depend on each other: the ordering the words
    # describe is contradictory, so no alphabet satisfies it.
    return "".join(order) if len(order) == len(letters) else ""
