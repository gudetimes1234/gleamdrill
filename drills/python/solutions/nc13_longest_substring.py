def lengthOfLongestSubstring(s):
    window = set()
    left = 0
    longest = 0

    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        longest = max(longest, right - left + 1)

    return longest
