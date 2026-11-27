def lengthOfLongestSubstring(s):
    window = set()  # @1
    left = 0  # @2
    longest = 0  # @3

    for right in range(len(s)):  # @4
        while s[right] in window:  # @5
            window.remove(s[left])  # @6
            left += 1  # @7
        window.add(s[right])  # @8
        longest = max(longest, right - left + 1)  # @9

    return longest  # @10
