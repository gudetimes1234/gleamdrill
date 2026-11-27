from collections import defaultdict, deque


def ladderLength(beginWord, endWord, wordList):
    words = set(wordList)  # @1
    if endWord not in words:  # @2
        return 0  # @2

    # The graph is never built: "hot" and "dot" are neighbours because they
    # share the pattern "*ot", so bucketing every word under each of its
    # wildcard patterns gives the adjacency for free. Comparing every pair
    # instead costs O(n^2) comparisons before the search even starts.
    buckets = defaultdict(list)  # @3
    for word in words:  # @4
        for i in range(len(word)):  # @5
            buckets[word[:i] + "*" + word[i + 1:]].append(word)  # @6

    seen = {beginWord}  # @7
    frontier = deque([beginWord])  # @8
    steps = 1  # @9

    while frontier:  # @10
        for _ in range(len(frontier)):  # @11
            word = frontier.popleft()  # @12
            if word == endWord:  # @13
                return steps  # @13
            for i in range(len(word)):  # @14
                for neighbour in buckets[word[:i] + "*" + word[i + 1:]]:  # @15
                    if neighbour not in seen:  # @16
                        seen.add(neighbour)  # @17
                        frontier.append(neighbour)  # @17
        steps += 1  # @18

    return 0  # @19
