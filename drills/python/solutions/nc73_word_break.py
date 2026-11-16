def wordBreak(s, wordDict):
    words = set(wordDict)  # @1

    # Reachable positions rather than a table of booleans: start at 0, and a
    # position is reachable when some word in the dictionary bridges the gap
    # from a position already reached.
    reached = {0}  # @2
    for end in range(1, len(s) + 1):  # @3
        if any(start in reached and s[start:end] in words for start in range(end)):  # @4
            reached.add(end)  # @5

    return len(s) in reached  # @6
