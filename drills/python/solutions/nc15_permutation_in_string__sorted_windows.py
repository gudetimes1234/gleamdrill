def checkInclusion(s1, s2):
    # Every window of the right length, sorted and compared. Slower than
    # sliding counts, but there is no incremental state to get wrong: the whole
    # method is "is this window an anagram?".
    if len(s1) > len(s2):
        return False

    needle = sorted(s1)
    size = len(s1)

    for start in range(len(s2) - size + 1):
        if sorted(s2[start:start + size]) == needle:
            return True

    return False
