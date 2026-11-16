def alienOrder(words):
    letters = {letter for word in words for letter in word}  # @1

    # Two adjacent words agree up to their first difference, and that difference
    # is the only thing they say about the alphabet -- everything after it is
    # unordered. The one case with no letters to compare is a word followed by a
    # prefix of itself, which no alphabet can explain.
    waiting = {letter: 0 for letter in letters}  # @2
    unlocks = {letter: [] for letter in letters}  # @3
    for first, second in zip(words, words[1:]):  # @4
        for a, b in zip(first, second):  # @5
            if a != b:  # @6
                unlocks[a].append(b)  # @7
                waiting[b] += 1  # @7
                break  # @8
        else:  # @9
            if len(first) > len(second):  # @10
                return ""  # @10

    ready = [letter for letter in letters if waiting[letter] == 0]  # @11
    order = []  # @12
    while ready:  # @13
        letter = ready.pop()  # @14
        order.append(letter)  # @15
        for following in unlocks[letter]:  # @16
            waiting[following] -= 1  # @17
            if waiting[following] == 0:  # @18
                ready.append(following)  # @18

    # Short means the leftovers all depend on each other: the ordering the words
    # describe is contradictory, so no alphabet satisfies it.
    return "".join(order) if len(order) == len(letters) else ""  # @19
