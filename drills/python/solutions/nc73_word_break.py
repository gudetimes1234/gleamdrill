def wordBreak(s, wordDict):
    words = set(wordDict)

    # Reachable positions rather than a table of booleans: start at 0, and a
    # position is reachable when some word in the dictionary bridges the gap
    # from a position already reached.
    reached = {0}
    for end in range(1, len(s) + 1):
        if any(start in reached and s[start:end] in words for start in range(end)):
            reached.add(end)

    return len(s) in reached
