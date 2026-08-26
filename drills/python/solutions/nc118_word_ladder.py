from collections import defaultdict, deque


def ladderLength(beginWord, endWord, wordList):
    words = set(wordList)
    if endWord not in words:
        return 0

    # The graph is never built: "hot" and "dot" are neighbours because they
    # share the pattern "*ot", so bucketing every word under each of its
    # wildcard patterns gives the adjacency for free. Comparing every pair
    # instead costs O(n^2) comparisons before the search even starts.
    buckets = defaultdict(list)
    for word in words:
        for i in range(len(word)):
            buckets[word[:i] + "*" + word[i + 1:]].append(word)

    seen = {beginWord}
    frontier = deque([beginWord])
    steps = 1

    while frontier:
        for _ in range(len(frontier)):
            word = frontier.popleft()
            if word == endWord:
                return steps
            for i in range(len(word)):
                for neighbour in buckets[word[:i] + "*" + word[i + 1:]]:
                    if neighbour not in seen:
                        seen.add(neighbour)
                        frontier.append(neighbour)
        steps += 1

    return 0
