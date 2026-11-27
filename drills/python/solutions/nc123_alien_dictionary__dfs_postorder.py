def alienOrder(words):
    letters = {letter for word in words for letter in word}  # @1

    after = {letter: [] for letter in letters}  # @2
    for first, second in zip(words, words[1:]):  # @3
        for a, b in zip(first, second):  # @4
            if a != b:  # @5
                after[a].append(b)  # @6
                break  # @7
        else:  # @8
            if len(first) > len(second):  # @9
                return ""  # @9

    # Depth-first, recording a letter only once everything that must follow it
    # has been recorded -- and recording it by prepending, which is what puts it
    # back in front of them. The in-progress set is the cycle check: a letter
    # met again on the current path contradicts itself.
    onPath, done, order = set(), set(), []  # @10

    def visit(letter):
        if letter in onPath:  # @11
            return False  # @11
        if letter in done:  # @12
            return True  # @12
        onPath.add(letter)  # @13
        for following in after[letter]:  # @14
            if not visit(following):  # @15
                return False  # @15
        onPath.discard(letter)  # @16
        done.add(letter)  # @17
        order.append(letter)  # @17
        return True  # @18

    for letter in letters:  # @19
        if not visit(letter):  # @20
            return ""  # @20

    return "".join(reversed(order))  # @21
