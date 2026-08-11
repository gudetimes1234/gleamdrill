def lengthOfLongestSubstring(s):
    # No set, no dict: ask the string itself whether this character already
    # appeared inside the current window, and if so start just past it.
    longest = 0
    start = 0

    for right, char in enumerate(s):
        found = s.find(char, start, right)
        if found != -1:
            start = found + 1
        longest = max(longest, right - start + 1)

    return longest
