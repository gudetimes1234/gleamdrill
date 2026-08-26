def alienOrder(words):
    letters = {letter for word in words for letter in word}

    after = {letter: [] for letter in letters}
    for first, second in zip(words, words[1:]):
        for a, b in zip(first, second):
            if a != b:
                after[a].append(b)
                break
        else:
            if len(first) > len(second):
                return ""

    # Depth-first, recording a letter only once everything that must follow it
    # has been recorded -- and recording it by prepending, which is what puts it
    # back in front of them. The in-progress set is the cycle check: a letter
    # met again on the current path contradicts itself.
    onPath, done, order = set(), set(), []

    def visit(letter):
        if letter in onPath:
            return False
        if letter in done:
            return True
        onPath.add(letter)
        for following in after[letter]:
            if not visit(following):
                return False
        onPath.discard(letter)
        done.add(letter)
        order.append(letter)
        return True

    for letter in letters:
        if not visit(letter):
            return ""

    return "".join(reversed(order))
