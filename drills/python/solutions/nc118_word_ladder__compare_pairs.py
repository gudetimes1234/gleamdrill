from collections import deque


def ladderLength(beginWord, endWord, wordList):
    words = set(wordList)
    if endWord not in words:
        return 0

    # Neighbours found by comparing against every remaining word. Simpler to
    # state and O(n) comparisons per expansion rather than a constant number of
    # lookups -- which is the cost the wildcard buckets remove.
    seen = {beginWord}
    frontier = deque([beginWord])
    steps = 1

    while frontier:
        for _ in range(len(frontier)):
            word = frontier.popleft()
            if word == endWord:
                return steps
            for candidate in words:
                if candidate in seen:
                    continue
                if differsByOne(word, candidate):
                    seen.add(candidate)
                    frontier.append(candidate)
        steps += 1

    return 0


def differsByOne(a, b):
    return len(a) == len(b) and sum(x != y for x, y in zip(a, b)) == 1
